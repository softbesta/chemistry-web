
export const routes = {
  zero: {
    title: 'Zero order reaction',
    path: '/',
    type: 'reaction',
    // path: 'reaction/zero',
  },
  first: {
    title: 'First order reaction',
    path: '/reaction/first',
    type: 'reaction',
  },
  second: {
    title: 'Second order reaction',
    path: '/reaction/second',
    type: 'reaction',
  },
  comparison: {
    title: 'Reaction comparison',
    path: '/reaction/comparison',
    type: 'reaction',
  },
  kinetics: {
    title: 'Kinetics',
    path: '/reaction/kinetics',
    type: 'reaction',
  },
  zeroQuiz: {
    title: 'Quiz for Zero order reaction',
    path: '/quiz',
    type: 'reaction',
  },
  firstQuiz: {
    title: 'Quiz for First order reaction',
    path: '/reaction/first/quiz',
    type: 'reaction',
  },
  secondQuiz: {
    title: 'Quiz for Second order reaction',
    path: '/reaction/second/quiz',
    type: 'reaction',
  },
  comparisonQuiz: {
    title: 'Quiz for Reaction comparison',
    path: '/reaction/comparison/quiz',
    type: 'reaction',
  },
  kineticsQuiz: {
    title: 'Quiz for Kinetics',
    path: '/reaction/kinetics/quiz',
    type: 'reaction',
  },
}

export const chaptersMenuList = [
  {
    title: 'Reaction rates',
    subItems: [
      {
        title: 'Zero order reaction',
        value: 'zero',
      }, {
        title: 'First order reaction',
        value: 'first',
      }, {
        title: 'Second order reaction',
        value: 'second',
      }, {
        title: 'Reaction comparison',
        value: 'comparison',
      }, {
        title: 'Energy profile',
        value: 'kinetics',
      }
    ],
  },
  {
    title: 'Equilibrium',
    subItems: [
      {
        title: 'Aqueous reaction',
        value: 'aqueous',
      }, {
        title: 'Gaseous reaction',
        value: 'gaseous',
      }, {
        title: 'Solubility',
        value: 'solubility',
      }
    ],
  },
  {
    title: 'Acids & bases',
    subItems: [
      {
        title: 'Introduction',
        value: 'introduction',
      }, {
        title: 'Buffers',
        value: 'buffers',
      }, {
        title: 'Titration',
        value: 'titration',
      }
    ],
  },
  {
    title: 'Chemical reactions',
    subItems: [
      {
        title: 'Balanced reactions',
        value: 'balanced',
      }, {
        title: 'Limiting reagent',
        value: 'limiting',
      }, {
        title: 'Precipitation',
        value: 'precipitation',
      }
    ],
  },
]

export const enum MenuList {
  zero = 'zero',
  first = 'first',
  second = 'second',
  comparison = 'comparison',
  kinetics = 'kinetics',
  zeroQuiz = 'zeroQuiz',
  firstQuiz = 'firstQuiz',
  secondQuiz = 'secondQuiz',
  comparisonQuiz = 'comparisonQuiz',
  kineticsQuiz = 'kineticsQuiz',
  aqueous = 'aqueous',
  introduction = 'introduction',
  balanced = 'balanced',
}
// export const stepPlayCount = {
//   zero: 9,
//   first: 9,
//   second: 9,
//   comparison: 9,
//   kinetics: 9,
// }

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
  // 0
  [],

  // 1
  [],

  // 2
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_math1', 'tur_math2'],

  // 3
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_math3'],

  // 4
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_canvasTime'],

  // 5
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton'], // +

  // 6
  [],

  // 7
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton'], // Choose reaction 'C to D'

  // 8
  [],

  // 9
  [],

  // 10
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton'], // Choose reaction 'E to F'

  // 11
  [],

  // 12
  [],

  //13
  [],
]

export const Colors = {
  none: "rgba(8, 168, 232,0.2)",
  A: 'rgba(8, 168, 232, 0.8)',
  B: 'rgba(255, 19, 19, 0.8)',
  C: 'rgba(213, 111, 62, 0.8)',
  D: 'rgba(99, 105, 209, 0.8)',
  E: 'rgba(156, 109, 138, 0.8)',
  F: 'rgba(27, 153, 139, 0.8)',
  bg: 'rgba(8, 168, 232, 0.05)',
  grey: 'rgba(209, 209, 214, 0.8)',
}
export const colorsArr = [
  Colors.none, Colors.A, Colors.B, Colors.C, Colors.D, Colors.E, Colors.F
]