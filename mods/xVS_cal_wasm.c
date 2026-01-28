// xVS_cal_wasm.c
#include <emscripten.h>
#include <stdint.h>

#define CLAMP(x, low, high) ((x) < (low) ? (low) : ((x) > (high) ? (high) : (x)))

// === LIGHT PROPAGATION ===
EMSCRIPTEN_KEEPALIVE
void propagate_lightmap_f32(
    const float* in_r, const float* in_g, const float* in_b,
    float* out_r, float* out_g, float* out_b,
    int width, int height, float falloff
) {
    const int dx[4] = {1, -1, 0, 0};
    const int dy[4] = {0, 0, 1, -1};

    for (int y = 0; y < height; ++y) {
        for (int x = 0; x < width; ++x) {
            float sum_r = 0, sum_g = 0, sum_b = 0;
            int count = 0;
            for (int d = 0; d < 4; ++d) {
                int nx = x + dx[d];
                int ny = y + dy[d];
                if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                    int nidx = ny * width + nx;
                    sum_r += in_r[nidx];
                    sum_g += in_g[nidx];
                    sum_b += in_b[nidx];
                    count++;
                }
            }
            int idx = y * width + x;
            if (count > 0) {
                float factor = falloff / count;
                out_r[idx] = CLAMP(sum_r * factor, 0.0f, 765.0f);
                out_g[idx] = CLAMP(sum_g * factor, 0.0f, 765.0f);
                out_b[idx] = CLAMP(sum_b * factor, 0.0f, 765.0f);
            } else {
                out_r[idx] = out_g[idx] = out_b[idx] = 0.0f;
            }
        }
    }
}

// === SHADOW OCCLUSION (blocker count only) ===
// Input: 1D array of element IDs (0 = empty, 1 = transparent, 2+ = opaque)
// Output: blocker count per pixel
EMSCRIPTEN_KEEPALIVE
void compute_blockers_u8(
    const uint8_t* grid,          // width × height
    uint8_t* blockers_out,        // same size
    int width, int height,
    const int8_t* coords,         // [dx0,dy0,dx1,dy1,...] length = 2*N
    int coord_count               // N
) {
    for (int y = 0; y < height; ++y) {
        for (int x = 0; x < width; ++x) {
            uint8_t blockers = 0;
            for (int i = 0; i < coord_count; ++i) {
                int nx = x + coords[i * 2];
                int ny = y + coords[i * 2 + 1];
                if (nx < 0 || nx >= width || ny < 0 || ny >= height) {
                    blockers++;
                } else {
                    uint8_t val = grid[ny * width + nx];
                    if (val >= 2) blockers++; // opaque
                }
            }
            blockers_out[y * width + x] = blockers;
        }
    }
}