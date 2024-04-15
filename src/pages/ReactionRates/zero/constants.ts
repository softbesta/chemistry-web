
export const tutorialSteps = [
  [ // 0
    `This is a zero order reaction in which a reactant A turns into the product B. But what does it mean? Let's find out!`,
    '',
    `<span>Set the initial concentration of A (c1) and the initial time at which it'll start (t1)</span>.`,
  ],
  [ // 1
    `Great! Now you can set the <span>concentration of A at the end of the reaction (c_2_)</span> and the <span>time the reaction will end (t_2_)</span>.`,
  ],
  [ // 2
    `The order of a reaction has to do with the rate of it. <span>Rate</span> is the rate of \
      change in the concentration per unit time. The rate constant <span>k</span> is a value on \
      which the <span>rate</span> depends. For this reaction, $k=\(k.str(decimals: 3))M/s$.`,
  ],
  [ // 3
    `<span>Half-life (t_1/2_)</span> is an expression to easily calculate the point in time at \
      which the concentration of the reactant, in this case <span>A</span>, is half of what the \
      initial concentration was. For this reaction, $<span>t_1/2_=\(halfLife.str(decimals: 2))s</span>$.`,
  ],
  [ // 4
    `<p>Let's watch how all the molecules are changing! As \(display.reactant.name) \
      disappears, \(display.product.name) is being produced.</p>`,
    `This happens at a constant <span>rate (in units of $M/s$),</span> which is dependent on <span>k</span>.`,
  ],
  [ // 5 here goes next step automatically after action
    `For this zero order reaction, <span>rate</span> is constant and it's equal to <span>k</span>, that's why a graph plotting \(Strings.aVsT) is a straight line.`,
  ],
  [ // 6
    `You can click the button in the top right corner to see the initial and final concentration and time for this reaction.`,
    `<span>Try clicking the toggle to see your results</span>.`,
  ],
  [ // 7
    `Amazing! Let's take a snapshot!`,
    `Try <span>dragging the time indicator</span> to scrub through the reaction time.`,
  ],
  [ // 8
    `Now, let's try choosing a different reaction, which has a fixed rate constant, <span>k</span>.`,
    `<span>Choose a reaction above</span>.`,
  ],
  [ // 9
    `Great! You picked a reaction with a rate constant \(rateConstant.str(decimals: 2)).`,
    `Why don't you <span>set the initial concentration and initial time</span>?`,
  ],
  [ // 10
    `Awesome! Now set the time the reaction ends.`,
    `Notice how the final concentration varies as you adjust the final time.`,
  ],
  [ // 11
    `<span style="font-size: 16px">Let's watch all the molecules changing!",
      "As \(display.reactant.name) disappears, \(display.product.name) is being produced.</span>`,
    `<span style="font-size: 16px">This happens at a variable *rate (in units of $M/s$)*, which is dependent on *k* \
      and *[\(display.reactant.name)]*.</span>`,
  ],
  [ // 12
    `Amazing! Let's take a snapshot!`,
    `Try <span>dragging the time indicator</span> to scrub through the reaction time.`,
  ],
  [ // 13
    `Now, let's try choosing a different reaction, which has a fixed rate constant, *k*.`,
    `*Choose a reaction above*.`,
  ],
  [ // 14
    `Great! You picked a reaction with a rate constant \(rateConstant.str(decimals: 2)).`,
    `Why don't you *set the initial concentration and initial time*?`,
  ],
  [ // 15
    `Awesome! Now set the final concentration of the reaction.`,
    `Notice how the final time varies as you adjust the final concentration.`,
  ],
  [ // 16
    `Let's watch all the molecules changing!",
      "As \(display.reactant.name) disappears, \(display.product.name) is being produced.`,
    `This happens at a variable *rate (in units of $M/s$)*, which is dependent on *k* \
      and *[\(display.reactant.name)]*.`,
  ],
  [ // 17
    `Amazing, let's take another snapshot!`,
    `Try *dragging the time indicator* to scrub through the reaction time.`,
    `Then, let's take a quiz to review what we've learnt.`,
  ],
  // open Quiz
]

export const stepHightlights = [
  // 0   This is zero...
  [],

  // 1   Great! Now you ...
  [],

  // 2   The order of a ...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_math1', 'tur_math2'],

  // 3   Half-lie (t12) ...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_math3'],

  // 4   Let's watch how all...
  [],

  // 5   For this zero order ...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_canvasTime'], // +

  // 6   You can click the....
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_watchMenuIcon'], // Choose reaction 'C to D'

  // 7   Amazing! Let's take...
  [],

  // 8   Now, let's try choosing...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_chooseMenuIcon'],

  // 9   Great! You picked a...
  [],

  // 10   Awesome! Now set ...
  [],

  // 11   Let's watch how all the...
  [],

  // 12   Amazing, let's take...
  [],

  // 13   Now, let's try choosing... EF
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_chooseMenuIcon'],

  // 14   Great! You picked a ...
  [],

  // 15   Awesome! Now set the ...
  [],

  // 16   Let's watch how all ...
  [],

  // here goes to Quiz
]

export const stepsActions = [
  // (A - 0, B - 1), (C - 2, D - 3), (E - 4, F - 5)
  {
    showIndexAB: [2]
  },
  {
    showIndexAB: [1, 2]
  },
]
