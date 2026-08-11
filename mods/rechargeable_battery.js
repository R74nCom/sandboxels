elements.rechargeable_battery = {
    name: "Rechargeable Battery",
    color: "#39d353",
    category: "Energy",
    state: "solid",
    density: 3000,

    desc: "A rechargeable battery. Starts full and stores electrical charge.",

    behavior: behaviors.WALL,

    properties: {
        charge: 100
    },

    tick: function(pixel) {

        // Make sure old/saved batteries always have a charge value.
        if (typeof pixel.charge !== "number") {
            pixel.charge = 100;
        }

        pixel.charge = Math.max(0, Math.min(100, pixel.charge));

        /*
         * Look for nearby electricity.
         */
        var charging = false;
        var connected = false;

        for (var dx = -1; dx <= 1; dx++) {
            for (var dy = -1; dy <= 1; dy++) {

                if (dx === 0 && dy === 0) continue;

                var nx = pixel.x + dx;
                var ny = pixel.y + dy;

                if (
                    nx < 0 || ny < 0 ||
                    nx >= width || ny >= height
                ) continue;

                var other = pixelMap[nx][ny];

                if (!other || other === pixel) continue;

                /*
                 * A pixel with electrical charge is a charger.
                 */
                if (
                    typeof other.charge === "number" &&
                    other.charge > 0
                ) {
                    charging = true;
                }

                /*
                 * Check whether this is a conductive pixel.
                 */
                if (
                    elements[other.element] &&
                    elements[other.element].conduct &&
                    elements[other.element].conduct > 0
                ) {
                    connected = true;
                }
            }
        }

        /*
         * CHARGE
         *
         * IMPORTANT:
         * If the battery is being charged, DO NOT discharge it
         * during the same tick.
         */
        if (charging && pixel.charge < 100) {

            pixel.charge += 0.5;

            if (pixel.charge > 100) {
                pixel.charge = 100;
            }

            // Reset discharge timer while charging.
            pixel.chargeTimer = 0;
        }

        /*
         * DISCHARGE
         *
         * Only discharge when:
         * - the battery is NOT being charged
         * - the battery is connected to a conductor
         */
        else if (
            !charging &&
            connected &&
            pixel.charge > 0
        ) {

            if (pixel.chargeTimer === undefined) {
                pixel.chargeTimer = 0;
            }

            pixel.chargeTimer++;

            // Discharge every 2 ticks.
            if (pixel.chargeTimer >= 2) {
                pixel.chargeTimer = 0;

                pixel.charge -= 0.5;

                if (pixel.charge < 0) {
                    pixel.charge = 0;
                }
            }
        }

        /*
         * Nothing connected:
         * don't discharge.
         */
        else {
            pixel.chargeTimer = 0;
        }

        /*
         * Change appearance according to charge.
         *
         * Full = bright green
         * Empty = dark red
         */
        var percentage = pixel.charge / 100;

        var r = Math.floor(180 * (1 - percentage));
        var g = Math.floor(80 + 140 * percentage);
        var b = Math.floor(40 + 40 * percentage);

        pixel.color = "rgb(" + r + "," + g + "," + b + ")";
    },

    onClicked: function(pixel) {
        if (typeof pixel.charge !== "number") {
            pixel.charge = 100;
        }
    }
};
