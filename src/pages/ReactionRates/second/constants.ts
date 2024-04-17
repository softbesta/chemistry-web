
export const tur_Text = [
  // display.reactant.name; A
  // display.product.name;  B
  [ // 0
    `This is a second order reaction.`,
    `Why don't you set the <span>initial concentration of A [A_0_]</span>, the reactant?.`,
  ],
  [ // 1
    `Great! Now you can set the <span>concentration of A at the end of the reaction [A<span class='sm_botom'>t</span>]</span> and the <span>time the reaction will last (t)</span>.`,
  ],
  [ // 2
    `For this reaction, $*k=\(rateConstant.str(decimals: 3))*$.`,
  ],
  [ // 3
    `For a reaction with one reactant it's usually written as $*rate=k[A]^order^*$.`,
    `For this reaction then, $*rate=k[A]^2^*$.`,
  ],
  [ // 4
    `*Half-life (t_1/2_)* is an expression to easily calculate the time at which the concentration of the reactant, in this case *A*, is half of what the initial concentration was.`,
    `For this reaction,`,
    `*t_1/2_=1/k[A_0_]=\(halfLife.str(decimals: 2))s*.",
    label: Labelling.stringToLabel("t_1/2_ = 1 /, k times [A_0_], =\(halfLife.str(decimals: 2)) s.`,
  ],
  [ // 5
    `<p>Let's watch how all the molecules are all changing!</p>`,
    `<p>As A disappears, B is being produced.</p>`,
    `<p>This happens at a variable <span>rate (in units of M/s)</span>, which is dependent on <span>k</span> and <span>[A]</span>.</p>`,
  ],
  [ // 6
    `For this second order reaction, $*rate=k[A]^2^*$, that's why a graph plotting \
    \(Strings.aVsT) is a steeper curve, given how the *rate* is proportional to the \
    concentration of *A* squared.`,
  ],
  [ // 7
    `Notice how *[A]* drops a lot faster at the beginning of the reaction because there's more of *A* present, making the *rate* much higher.`,
  ],
  [ // 8
    `Subsequently, towards the end of the reaction, there's much less *[A]* present, so the *rate* of the reaction is a lot lower, making *[A]* drop significantly slower at this point.`,
  ],
  [ // 9
    `For example, if $*[A]=0.9*$, then $*[A]^2^=0.81*$. And if $*[A]=0.8*$, then $*[A]^2^=0.64*$.`,
    ``,
    `You see that dropping *[A]* by 0.1 would make a first order reaction drop its *rate* by 0.1, and a second order reaction drop its *rate* by 0.17.`,
  ],
  [ // 10
    `Since 0.1 is less than 0.17, it's noticeable how for a second order reaction the *rate* would drop faster.`,
    `In other words, the rate of the reaction will drop *more drastically for a second order reaction at first*, and slowly reduce to a point at which the rate drops *slower than in a first order reaction towards the end*.`,
  ],
  [ // 11
    `For this second order reaction, the resultant integrated rate law is  $*k=(1/[A]-1/[A_0_])/t*$. \
    That's why a graph plotting \(Strings.aVsT) is a straight line.`,
    `1/[A]*(y)*=kt*(mx)*+1/[A_0_]*(b)`,
    `Where the slope is *k*.`,
  ],
  [ // 12
    `Amazing! Let's take a snapshot!`,
    `Try <span>dragging the time indicator</span> to scrub through the reaction time.`,
  ],
  [ // 13
    `Now, let's try choosing a different reaction, which has a fixed rate constant, <span>k</span>.`,
    `<span>Choose a reaction above</span>.`,
  ],
  [ // 14
    `Great! You picked a reaction with a rate constant 0.04.`,
    `Why don't you <span>set the initial concentration and initial time</span>?`,
  ],
  [ // 15
    `Awesome! Now set the time the reaction ends.`,
    `Notice how the final concentration varies as you adjust the final time.`,
  ],
  [ // 16
    `<p>Let's watch how all the molecules are all changing!</p>`,
    `<p>As C disappears, D is being produced.</p>`,
    `<p>This happens at a variable <span>rate (in units of M/s)</span>, which is dependent on <span>k</span> and <span>[C]</span>.</p>`,
  ],
  [ // 17
    `Amazing! Let's take a snapshot!`,
    `Try <span>dragging the time indicator</span> to scrub through the reaction time.`,
  ],
  [ // 18
    `Now, let's try choosing a different reaction, which has a fixed rate constant, <span>k</span>.`,
    `<span>Choose a reaction above</span>.`,
  ],
  [ // 19
    `Great! You picked a reaction with a rate constant 0.07.`,
    `Why don't you <span>set the initial concentration and initial time</span>?`,
  ],
  [ // 20
    `Awesome! Now set the time the reaction ends.`,
    `Notice how the final concentration varies as you adjust the final time.`,
  ],
  [ // 21
    `<p>Let's watch how all the molecules are all changing!</p>`,
    `<p>As E disappears, F is being produced.</p>`,
    `<p>This happens at a variable <span>rate (in units of M/s)</span>, which is dependent on <span>k</span> and <span>[E]</span>.</p>`,
  ],
  [ // 22
    `Amazing, let's take another snapshot!`,
    `Try <span>dragging the time indicator</span> to scrub through the reaction time.`,
    `Then, let's take a quiz to review what we've learnt.`,
  ],
  // open Quiz
]

export const tur_Hightlights = [
  // 0   This is a second ...
  [],

  // 1   Great! Now you ...
  [],

  // 2   For this reaction, ...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_math1', 'tur_math2'],

  // 3   For a reaction with...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_canvasTime', 'tur_math4'],

  // 4   Half-life (t1/2)...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_math3'],

  // 5   Let's watch how all...
  [], // +

  // 6   For this second order....
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_canvasTime'], // Choose reaction 'C to D'

  // 7   Notice how [A] drops...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_canvasTime'],

  // 8   Subsequently, towards the...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_canvasTime'],

  // 9   For example, if [A]...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_canvasTime'],

  // 10   Since 0.1 is less than ...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_canvasTime'],

  // 11   For this second order...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_canvasTime'],

  // 12   Amazing! Let's take a...
  [],

  // 13   Now, let's try choosing... 
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_chooseMenuIcon'],

  // 14   Great! You picked a reaction ... CD
  [],

  // 15   Awesome! Now set the ...
  [],

  // 16   Let's watch how all  ...
  [],

  // 17   Amazing! Let's take  ...
  [],

  // 18   Now, let's try choosing ...
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_chooseMenuIcon'],

  // 19   Great! You picked a reaction... EF
  [],

  // 20   Awesome! Now set the ...
  [],

  // 21   Let's watch how all ...
  [],
  // here goes to Quiz
]

export const stepsActions = [
  // energyAB;          (A - 0, B - 1), (C - 2, D - 3), (E - 4, F - 5)
  // valuesC, canvaTimeSliderC, canvaTimeSliderT;
  //                    index-0: A,  index-1: B
  // canvaTimeSliderC;  0 - hidden, 1 - disabled, 2 - active
  // canvaTimeSliderT;  0 - hidden, 1 - disabled, 2 - active
  // valuesC;           0 ~ 100
  // valuesT;           0 ~ 20
  // beakerState;       0 - show empty dots, 1 - show A dots,
  //                    2 - Animation,       3 - AB dots
  // canvaTimeState;    0 - show Frame only, 1 - show Graph
  //                    2 - Animation,       3 - show End

  // 0   This is a second ...
  { // 0
    canvaTimeSliderC: [2, 0],
    canvaTimeSliderT: [2, 0],
    canvaTimeState: 0,
    canvaBeakerState: 1,
    isEnableChooseMenu: false,
  },
  // 1   Great! Now you ...
  { // 1
    canvaTimeSliderC: [1, 2],
    canvaTimeSliderT: [2, 0],
    canvaTimeState: 0,
    canvaBeakerState: 1,
  },
  // 2   For this reaction, ...
  { // 2
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 1,
    canvaBeakerState: 1,
  },
  // 3   For a reaction with...
  { // 3
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 1,
    canvaBeakerState: 1,
  },
  // 4   Half-life (t1/2)...
  { // 4
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 1,
    canvaBeakerState: 1,
  },
  // 5   Let's watch how all...
  { // 5
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 2,
    canvaBeakerState: 2,
  },
  // 6   For this second order....
  { // 6
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 3,
    canvaBeakerState: 3,
  },
  // 7   Notice how [A] drops...
  { // 7
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 3,
    canvaBeakerState: 3,
    isEnableChooseMenu: false,
  },
  // 8   Subsequently, towards the...
  { // 8
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 3,
    canvaBeakerState: 3,
  },
  // 9   For example, if [A]...
  { // 9
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 3,
    canvaBeakerState: 3,
  },
  // 10   Since 0.1 is less than ...
  { // 10
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 3,
    canvaBeakerState: 3,
  },
  // 11   For this second order...
  { // 11
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 3,
    canvaBeakerState: 3,
  },
  // 12   Amazing! Let's take a...
  { // 12
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 3,
    canvaBeakerState: 3,
    isEnableChooseMenu: false,
  },
  // 13   Now, let's try choosing... 
  { // 13
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 3,
    canvaBeakerState: 3,
    activeDotIndex: 0,
    isEnableChooseMenu: true,
  },
  // 14   Great! You picked a reaction ... CD
  { // 14
    canvaTimeSliderC: [2, 0],
    canvaTimeSliderT: [2, 0],
    canvaTimeState: 0,
    canvaBeakerState: 1,
    activeDotIndex: 1,
    isEnableChooseMenu: false,
  },
  // 15   Awesome! Now set the ...
  { // 15
    canvaTimeSliderC: [1, 0],
    canvaTimeSliderT: [1, 2],
    canvaTimeState: 1,
    canvaBeakerState: 1,
  },
  // 16   Let's watch how all  ...
  { // 16
    canvaTimeSliderC: [1, 0],
    canvaTimeSliderT: [1, 1],
    canvaTimeState: 2,
    canvaBeakerState: 2,
  },
  // 17   Amazing! Let's take  ...
  { // 17
    canvaTimeSliderC: [1, 0],
    canvaTimeSliderT: [1, 1],
    canvaTimeState: 3,
    canvaBeakerState: 3,
    isEnableChooseMenu: false,
  },
  // 18   Now, let's try choosing ...
  { // 18
    canvaTimeSliderC: [1, 0],
    canvaTimeSliderT: [1, 1],
    canvaTimeState: 3,
    canvaBeakerState: 3,
    activeDotIndex: 1,
    isEnableChooseMenu: true,
  },
  // 19   Great! You picked a reaction... EF
  { // 19
    canvaTimeSliderC: [2, 0],
    canvaTimeSliderT: [2, 0],
    canvaTimeState: 0,
    canvaBeakerState: 1,
    activeDotIndex: 2,
    isEnableChooseMenu: false,
  },
  // 20   Awesome! Now set the ...
  { // 20
    canvaTimeSliderC: [1, 2],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 1,
    canvaBeakerState: 1,
  },
  // 21   Let's watch how all ...
  { // 21
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 2,
    canvaBeakerState: 2,
  },
  // 21   Amazing, let's take another ...
  { // 21
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 3,
    canvaBeakerState: 3,
  },
]

export const tur_MathBlanks = [
  [
    { left: -12, top: 94, width: 27 }, //0
    { left: 126, top: 81, width: 48 }, //1
    { left: 0, top: 180, width: 42 }, //2
    { left: 106, top: 180, width: 42 }, //3
    { left: 0, top: 248, width: 36 }, //4
    { left: 57, top: 248, width: 41 }, //5
    { left: 105, top: 248, width: 32 }, //6
  ],
  [
    { left: 0, top: 248, width: 36 }, //4
    { left: 105, top: 248, width: 32 }, //6
  ],
]

export const maxStep_Second = tur_Text.length // 23 steps
