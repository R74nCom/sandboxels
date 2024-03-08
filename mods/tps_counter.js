/*
MIT License

Copyright (c) 2024 BatteRaquette58 (a.k.a BatteRaquette581)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

const old_tick = tick

let tps_counter = document.createElement("span")
tps_counter.id = "stat-tps-counter"
tps_counter.classList = ["stat",]
const total_wrapper = document.getElementById("totalWrapper")
const first_child = total_wrapper.childNodes[0]
total_wrapper.insertBefore(tps_counter, first_child)
total_wrapper.insertBefore(document.createElement("br"), first_child)

tick = () => {
    const t1 = Date.now()
    old_tick()
    const t2 = Date.now()
    let time_elapsed = t2 - t1
    tps_counter.innerText = Math.min(tps, 1 / (time_elapsed / 1000))
}

window.clearInterval(tickInterval)
tickInterval = window.setInterval(tick, 1000 / tps)
