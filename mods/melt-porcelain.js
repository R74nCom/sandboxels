//Porcelain turns into molten_porcelain at 3275 degrees.

elements.molten_porcelain{
  color: ["#ff0000", "#ffa500", "#ffd700"],          // Set color to red, orange, and gold.
  category: "states",
  behavior: behaviors.MOLTEN,                        // Set state to MOLTEN.
  tempLow: 3274,                                     // At 3274 Celsius, molten_porcelain turns back into...
  stateLow: "porcelain"                              // ... porcelain!
}

elements.porcelain.tempHigh = 3275;                  // At 3275 Celsius, porcelain melts into...
elements.porcelain.stateHigh = "molten_porcelain";   // molten_porcelain.
