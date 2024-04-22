import { TurTextType } from "../../../helper/types"

export const tur_Text: TurTextType = [
  // display.reactant.name; A
  // display.product.name;  B
  [ // 0
    `Not so fast!`,
    `Choose a reaction to work with for this experiment.`,
    `**Tap the right corner button to show the dropdown list.**`,
  ],
  [ // 1
    `We now know that the concentration can affect the **rate** of a reaction. \
    But there are other variables that can affect in one way or another the **rate** too. Let's first talk about **collision theory**.`,
  ],
  [ // 2
    `It states that the reaction rate is equal to the frequency of effective collisions between reactants. \
    For a collision to be effective, the molecules must collide with sufficient energy and in the proper orientation so that products can form.`,
  ],
  [ // 3
    `This minimum amount of energy that is needed to initiate or start a chemical reaction is called **activation energy (E__a__).** \
    As long as the collision of the molecules orientated properly have enough energy to surpass the **E__a__**, the collision will be successful.`,
  ],
  [ // 4
    `But how is the temperature related to the **rate**? Well, an equation that portrays this \
    more accurately is the **Arrhenius equation**. As you can see, the temperature \
    specifically affects the rate constant **k**.`,
  ],
  [ // 5
    `**k** is the rate constant, **A** is a term called the frequency factor that accounts for molecular orientation, \
    **e** is the natural logarithm base, **R** is the universal gas constant 8.314 J mol^-1^ K^-1^, \
    **T** is the Kelvin temperature, and **E__a__** is the activation energy.`,
  ],
  [ // 6
    `As you can tell by the equation, the higher the temperature, the higher the rate constant will be, thus making the **rate** higher too. \
    In a more practical way, high temperatures make the average energy of molecules go up, beating the **E__a__** barrier.`,
  ],
  [ // 7
    `When applying logarithmic properties to both sides, you get a version of the equation that's linear, where:`,
    `ln(k)**(y)**=(-E__a__/RT)**(mx)**+ln(a)**(b)**`,
    `With a slope of -E__a__/R.`,
  ],
  [ // 8
    `If the linear equation is used to represent 2 different points (point 1 and point 2) of the line, we can sum \
    up the equations to get this form of the Arrhenius equation. This is a very common way to use the Arrhenius equation \
    where k__1__ is the rate constant at T__1__ and k__2__ is the rate constant at T__2__.`,
  ],
  [ // 9
    `For this reaction, **E__a__ is \(eaString)** and **k is \(k.str(decimals: 1))** \
    when the temperature is **\(t.str(decimals: 0)) K**. \
    In other words, the kinetic energy of the molecules have to be one that when colliding, the potential \
    energy resultant is higher than **\(eaString)** in order for A and B to successfully transform into a C molecule.`,
  ],
  [ // 10
    `One way to depict the reaction's activation energy and potential energy is with an **energy diagram or reaction profile**. \
    The reaction profile plots the increase in potential energy of the reactants as they approach, reaching a maximum at the moment \
    of collision, and then the decrease in potential energy as the products recoil.`,
  ],
  [ // 11
    `This is an **exothermic reaction** because the reaction starts at a higher point of \
    energy than where it ends. In other words, energy is being released when the reaction \
    takes place. This energy released is usually referred to as heat, but we'll talk about \
    that deeper in other units.`,
  ],
  // [ // 12
  //   `This is an **endothermic reaction** because the reaction starts at a lower point of energy \
  //   than where it ends. In other words, energy is being absorbed when the reaction takes \
  //   place. This energy is usually referred to as heat, but we'll talk about that deeper in \
  //   other units.`,
  // ],
  [ // 12
    `The hump or bell in the graph represents the **activation energy**. The reaction energy has to be one \
    that overcomes that difference for it to occur. Otherwise, even with the proper orientation the molecules colliding of \
    A and B won't be turning into C. The higher **E__a__** is, the harder it is for the reaction to have sufficient energy to overcome it.`,
  ],
  [ // 13
    `There's a way to reduce the **activation energy**, and that is with the use of a **catalyst**. \
    Catalysts make reactions faster, and even though there are various types, in one way or another they do \
    so by reducing the activation energy, or **E__a__**.`,
  ],
  [ // 14
    `Let's try that out!`,
    `Choose a catalyst to use to make the reaction in the beaker go faster.`,
    `**Tap a catalyst to select it**.`,
  ],
  [ // 15
    `Perfect! Now shake the catalyst to drop it into the beaker, and let's see what happens.`,
    `**Shake your phone or tablet or just tap the shaker once again**.`,
  ],
  [ // 16
    `Look! The E__a__ was reduced to **\(newEa.str(decimals: 0)) J** \
    thanks to that catalyst. See that horizontal line? It represents the average kinetic energy of the molecules. \
    Right now it's lower than E__a__, so no products are going to be formed just yet.`,
  ],
  [ // 17
    `Take a look at the linear graph of ln(k) vs 1/T with a slope of \(slope.str(decimals: 0)). \
    This graph is very useful to determine the relation between the constant **k** and the temperature. \
    Here you can see too that the higher **k** is, the higher **T** is.`,
  ],
  [ // 18
    `Points of that graph are being represented in this equation. As of now, **k** went up to **\(newK.str(decimals: 1))** \
    when **T** is **\(temp.str(decimals: 0))K**, because the catalyst lowered the E__a__, making the constant **k** higher, thus making the **rate** higher too.`,
  ],
  [ // 19
    `Let's try to produce C. **Use the flame slider to increase the temperature in the beaker**. \
    This will make the kinetic energy of the molecules increase too, meaning they will go faster so that when they collide \
    there's enough energy to overcome the E__a__.`,
  ],
  [ // 20
    `Perfect! Successful collisions are taking place!`,
    `Notice how the average kinetic bar goes up when the temperature goes up too. Also, notice how the rate constant can vary with the temperature.`,
  ],
  [ // 21
    `It's all done! All of A and B has turned into C successfully.`,
    `**Choose another catalyst**, and let's see how it compares.`,
  ],
  [ // 22
    `Let's try that out!`,
    `Choose a catalyst to use to make the reaction in the beaker go faster.`,
    `**Tap a catalyst to select it**.`,
  ],
  [ // 23
    `Perfect! Now shake the catalyst to drop it into the beaker, and let's see what happens.`,
    `**Shake your phone or tablet or just tap the shaker once again**.`,
  ],
  [ // 24
    `Look! The E__a__ was reduced to **\(newEa.str(decimals: 0)) J** \
    thanks to that catalyst. See that horizontal line? It represents the average kinetic energy of the molecules. \
    Right now it's lower than E__a__, so no products are going to be formed just yet.`,
  ],
  [ // 25
    `Let's try to produce C. **Use the flame slider to increase the temperature in the beaker**. \
    This will make the kinetic energy of the molecules increase too, meaning they will go faster so that when they collide \
    there's enough energy to overcome the E__a__.`,
  ],
  [ // 26
    `Perfect! Successful collisions are taking place!`,
    `Notice how the average kinetic bar goes up when the temperature goes up too. Also, notice how the rate constant can vary with the temperature.`,
  ],
  [ // 27
    `It's all done! All of A and B has turned into C successfully.`,
    `**Choose another catalyst**, and let's see how it compares.`,
  ],
  [ // 28
    `Let's try that out!`,
    `Choose a catalyst to use to make the reaction in the beaker go faster.`,
    `**Tap a catalyst to select it**.`,
  ],
  [ // 29
    `Look! The E__a__ was reduced to **\(newEa.str(decimals: 0)) J** \
    thanks to that catalyst. See that horizontal line? It represents the average kinetic energy of the molecules. \
    Right now it's lower than E__a__, so no products are going to be formed just yet.`,
  ],
  [ // 30
    `Let's try to produce C. **Use the flame slider to increase the temperature in the beaker**. \
    This will make the kinetic energy of the molecules increase too, meaning they will go faster so that when they collide \
    there's enough energy to overcome the E__a__.`,
  ],
  [ // 31
    `Perfect! Successful collisions are taking place!`,
    `Notice how the average kinetic bar goes up when the temperature goes up too. Also, notice how the rate constant can vary with the temperature.`,
  ],
  [ // 32
    `It's all done! All of A and B has turned into C successfully.`,
    `Let's take another quiz, and then you're free to **explore further** the reaction rates.`,
  ],

  // [ // 22
  //   `Awesome!`,
  //   `Play with temperature to set T__2__. **Use the flame slider.**`,
  // ],
  // [ // 22
  //   `Keep playing with temperature to see more collisions.`,
  //   `**Use the flame slider.**`,
  // ],
  // [ // 22
  //   `You've already used this catalyst, so let's try another one.`,
  //   `**Tap a different catalyst to select it**.`,
  // ],
  // [ // 22
  //   `Now you can explore all parts of kinetics, just tap the button at the top left corner to \
  //   reveal the navigation menu, then choose your favorite part to review it once more!`,
  //   `Why don't you try **selecting the filing cabinet** to view the reactions you created earlier?`,
  // ],
  // open Quiz
]

export const tur_Hightlights = [
  // 0   Not so fast! ...
  [],

  // 1   We now know that the concentration ...
  [],

  // 2   It states that the reaction, ...
  [],
  // ['tur__tutorialText', 'tur__stepPrevButton', 'tur__stepNextButton', 'tur__math1', 'tur__math2'],

  // 3   This minimum amount of...
  [],
  // ['tur__tutorialText', 'tur__stepPrevButton', 'tur__stepNextButton', 'tur__canvasTime', 'tur__math4'],

  // 4   But how is the temperature...
  [],
  // ['tur__tutorialText', 'tur__stepPrevButton', 'tur__stepNextButton', 'tur__math3'],

  // 5   k is the rate constant...
  [], // +

  // 6   As you can tell by the equation....
  [],
  // ['tur__tutorialText', 'tur__stepPrevButton', 'tur__stepNextButton', 'tur__canvasTime'], // Choose reaction 'C to D'

  // 7   When applying logarithmic...
  [],
  // ['tur__tutorialText', 'tur__stepPrevButton', 'tur__stepNextButton', 'tur__canvasTime'],

  // 8   If the linear equation...
  [],
  // ['tur__tutorialText', 'tur__stepPrevButton', 'tur__stepNextButton', 'tur__canvasTime'],

  // 9   For this reaction, **E__a__...
  [],
  // ['tur__tutorialText', 'tur__stepPrevButton', 'tur__stepNextButton', 'tur__canvasTime'],

  // 10   One way to depict the reaction ...
  [],
  // ['tur__tutorialText', 'tur__stepPrevButton', 'tur__stepNextButton', 'tur__canvasTime'],

  // 11   This is an **exothermic reaction...
  [],
  // ['tur__tutorialText', 'tur__stepPrevButton', 'tur__stepNextButton', 'tur__canvasTime'],

  // 12   The hump or bell in the ...
  [],

  // 13   There's a way to reduce... 
  [],
  // ['tur__tutorialText', 'tur__stepPrevButton', 'tur__stepNextButton', 'tur__chooseMenuIcon'],

  // 14   Let's try that out! ...
  [],

  // 15   Perfect! Now shake the catalyst ...
  [],

  // 16   Look! The E__a__ was reduced  ...
  [],

  // 17   Take a look at the linear  ...
  [],

  // 18   Points of that graph are ...
  [],
  // ['tur__tutorialText', 'tur__stepPrevButton', 'tur__stepNextButton', 'tur__chooseMenuIcon'],

  // 19   Let's try to produce C....
  [],

  // 20   Perfect! Successful collisions ...
  [],

  // 21   It's all done! All of ...
  [],

  // 22   Let's try that out! ...
  [],

  // 23   Perfect! Now shake the ...
  [],

  // 24   Look! The E__a__ was ...
  [],

  // 25   Let's try to produce C ...
  [],

  // 26   Perfect! Successful collisions ...
  [],

  // 27   It's all done! All of ...
  [],

  // 28   Let's try that out! ...
  [],

  // 29   Look! The E__a__ was ...
  [],

  // 30   Let's try to produce ...
  [],

  // 31   Perfect! Successful collisions ...
  [],

  // 32   It's all done! All of ...
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

  // 0   Not so fast! ...
  { // 0
    canvaTimeSliderC: [2, 0],
    canvaTimeSliderT: [2, 0],
    canvaTimeState: 0,
    canvaBeakerState: 1,
    isEnableChooseMenu: false,
  },
  // 1   We now know that the concentration ...
  { // 1
    canvaTimeSliderC: [1, 2],
    canvaTimeSliderT: [2, 0],
    canvaTimeState: 0,
    canvaBeakerState: 1,
  },
  // 2   It states that the reaction, ...
  { // 2
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 1,
    canvaBeakerState: 1,
  },
  // 3   This minimum amount of...
  { // 3
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 1,
    canvaBeakerState: 1,
  },
  // 4   But how is the temperature...
  { // 4
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 1,
    canvaBeakerState: 1,
  },
  // 5   k is the rate constant...
  { // 5
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 2,
    canvaBeakerState: 2,
  },
  // 6   As you can tell by the equation....
  { // 6
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 3,
    canvaBeakerState: 3,
  },
  // 7   When applying logarithmic...
  { // 7
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 3,
    canvaBeakerState: 3,
    // isEnableChooseMenu: false,
  },
  // 8   If the linear equation...
  { // 8
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 3,
    canvaBeakerState: 3,
  },
  // 9   For this reaction, **E__a__...
  { // 9
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 3,
    canvaBeakerState: 3,
  },
  // 10   One way to depict the reaction ...
  { // 10
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 3,
    canvaBeakerState: 3,
  },
  // 11   This is an **exothermic reaction...
  { // 11
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 3,
    canvaBeakerState: 3,
  },
  // 12   The hump or bell in the ...
  { // 12
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 3,
    canvaBeakerState: 3,
    // isEnableChooseMenu: false,
  },
  // 13   There's a way to reduce... 
  { // 13
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 3,
    canvaBeakerState: 3,
    activeDotIndex: 0,
    // isEnableChooseMenu: true,
  },
  // 14   Let's try that out! ...
  { // 14
    canvaTimeSliderC: [2, 0],
    canvaTimeSliderT: [2, 0],
    canvaTimeState: 0,
    canvaBeakerState: 1,
    activeDotIndex: 1,
    // isEnableChooseMenu: false,
  },
  // 15   Perfect! Now shake the catalyst ...
  { // 15
    canvaTimeSliderC: [1, 0],
    canvaTimeSliderT: [1, 2],
    canvaTimeState: 1,
    canvaBeakerState: 1,
  },
  // 16   Look! The E__a__ was reduced  ...
  { // 16
    canvaTimeSliderC: [1, 0],
    canvaTimeSliderT: [1, 1],
    canvaTimeState: 2,
    canvaBeakerState: 2,
  },
  // 17   Take a look at the linear  ...
  { // 17
    canvaTimeSliderC: [1, 0],
    canvaTimeSliderT: [1, 1],
    canvaTimeState: 3,
    canvaBeakerState: 3,
    // isEnableChooseMenu: false,
  },
  // 18   Points of that graph are ...
  { // 18
    canvaTimeSliderC: [1, 0],
    canvaTimeSliderT: [1, 1],
    canvaTimeState: 3,
    canvaBeakerState: 3,
    activeDotIndex: 1,
    // isEnableChooseMenu: true,
  },
  // 19   Let's try to produce C....
  { // 19
    canvaTimeSliderC: [2, 0],
    canvaTimeSliderT: [2, 0],
    canvaTimeState: 0,
    canvaBeakerState: 1,
    activeDotIndex: 2,
    // isEnableChooseMenu: false,
  },
  // 20   Perfect! Successful collisions ...
  { // 20
    canvaTimeSliderC: [1, 2],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 1,
    canvaBeakerState: 1,
  },
  // 21   It's all done! All of ...
  { // 21
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 2,
    canvaBeakerState: 2,
  },
  // 22   Let's try that out! ...
  { // 22
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 3,
    canvaBeakerState: 3,
  },
  // 23   Perfect! Now shake the ...
  { // 23
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 3,
    canvaBeakerState: 3,
  },
  // 24   Look! The E__a__ was ...
  { // 24
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 3,
    canvaBeakerState: 3,
  },
  // 25   Let's try to produce C ...
  { // 25
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 3,
    canvaBeakerState: 3,
  },
  // 26   Perfect! Successful collisions ...
  { // 26
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 3,
    canvaBeakerState: 3,
  },
  // 27   It's all done! All of ...
  { // 27
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 3,
    canvaBeakerState: 3,
  },
  // 28   Let's try that out! ...
  { // 28
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 3,
    canvaBeakerState: 3,
  },
  // 29   Look! The E__a__ was ...
  { // 29
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 3,
    canvaBeakerState: 3,
  },
  // 30   Let's try to produce ...
  { // 30
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 3,
    canvaBeakerState: 3,
  },
  // 31   Perfect! Successful collisions ...
  { // 31
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 3,
    canvaBeakerState: 3,
  },
  // 32   It's all done! All of ...
  { // 32
    canvaTimeSliderC: [1, 1],
    canvaTimeSliderT: [1, 0],
    canvaTimeState: 3,
    canvaBeakerState: 3,
  },
]

export const tur_MathBlanks = [
  [
    { left: -12, top: 94, width: 27 }, //0
    { left: 38, top: 81, width: 33 }, //1
    { left: 0, top: 180, width: 42 }, //2
    { left: 84, top: 180, width: 33 }, //3
    { left: 0, top: 248, width: 36 }, //4
    { left: 57, top: 248, width: 41 }, //5
    { left: 105, top: 248, width: 32 }, //6
  ],
  [
    { left: 0, top: 248, width: 36 }, //4
    { left: 105, top: 248, width: 32 }, //6
  ],
]

export const maxStep_Kinetics = tur_Text.length // 23 steps
