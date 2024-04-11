
export const routes = {
  ch1_zero: {
    title: 'Zero order reaction',
    path: '/',
    // path: 'reaction/zero',
  },
  ch1_first: {
    title: 'First order reaction',
    path: 'reaction/first',
  },
  ch1_second: {
    title: 'Second order reaction',
    path: 'reaction/second',
  },
  ch1_reaction: {
    title: 'Reaction comparison',
    path: 'reaction/reaction',
  },
  ch1_energy: {
    title: 'Energy profile',
    path: 'reaction/energy',
  }
}

export const tutorialSteps = [
  {
    text: `This is a zero order reaction in which a reactant A turns into the product B. But what does it mean? Let's find out!`,
    desc: `<span>Set the initial concentration of A (c1) and the initial time at which it'll start (t1)</span>.`,
  },
  {
    text: `Amazing! Let's take a snapshot!`,
    desc: `Try <span>dragging the time indicator</span> to scrub through the reaction time.`,
  },
]
