import { tutorialSteps } from '../constants'
import styles from './TutorialControl.module.scss'
import ImgBeacky from '../assets/ReactionRates/reaction_boxes/beaky.png'
import useAppData from '../hooks/useAppData'
import { useHighLight } from '../hooks/useHighlight'

const stepHightlights = [
  [],
  [],
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_math1', 'tur_math2'],
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_math3'],
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton', 'tur_chartTime'],
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton'], // +
  [],
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton'], // Choose reaction 'C to D'
  [],
  [],
  ['tur_tutorialText', 'tur_stepPrevButton', 'tur_stepNextButton'], // Choose reaction 'E to F'
  [],
  [],
  // open Quiz
]

const TutorialControl = () => {
  const {
    curMenu,
    curStep,
    setCurStep,
  } = useAppData()
  const tutorialHints = tutorialSteps

  const { highlightElement, removeHighlightElement, isHighlight } = useHighLight()

  const getNextStep = (step: number) => {
    let update = curStep + step
    if (update < 0) update = 0
    // else if (update > stepPlayCount[activeMenu]) update = stepPlayCount[activeMenu]
    else if (update >= stepHightlights.length) update = stepHightlights.length - 1
    return update
  }

  const handleStepPrev = () => {
    console.log('===handleStepPrev===', curStep)
    const nextStep = getNextStep(-1)
    if (curStep === nextStep) return
    console.log({ curStep }, stepHightlights[curStep])
    console.log({ nextStep }, stepHightlights[nextStep])
    removeHighlightElement(stepHightlights[curStep])
    if (stepHightlights[nextStep].length > 0) {
      highlightElement(stepHightlights[nextStep])
    }
    setCurStep(nextStep)
  }
  const handleStepNext = () => {
    console.log('===handleStepNext===', curStep)
    const nextStep = getNextStep(1)
    if (curStep === nextStep) return
    console.log({ curStep }, stepHightlights[curStep])
    console.log({ nextStep }, stepHightlights[nextStep])
    removeHighlightElement(stepHightlights[curStep])
    if (stepHightlights[nextStep].length > 0) {
      highlightElement(stepHightlights[nextStep])
    }
    setCurStep(nextStep)
  }

  const handleTest = () => {
    console.log('===handleTest===')
    highlightElement(['stepPrevButton', 'stepNextButton'])
    // startTutorials()
  }
  return (<div className={styles.tutorialControl}>
    {isHighlight && <div className='overlay'></div>}

    <div
      id='tur_tutorialText'
      className={styles.tutorialTextContainer}
    >
      <div className={styles.tutorialText}>
        <div dangerouslySetInnerHTML={{ __html: tutorialHints[curStep]?.text || '' }} />
        <div dangerouslySetInnerHTML={{ __html: tutorialHints[curStep]?.desc || '' }} />
      </div>
      <div className={styles.beakyIcon}>
        <img src={ImgBeacky} alt='beacky' />
      </div>
    </div>
    <div className={styles.stepButtons}>
      <button
        id='tur_stepPrevButton'
        className={styles.prevBtn}
        onClick={() => handleStepPrev()}
      >
        &#9664;
      </button>
      <button
        id='tur_stepNextButton'
        className={styles.nextBtn}
        onClick={() => handleStepNext()}
      >
        Next <span>&#9654;</span>
      </button>
      {/* <button onClick={() => handleTest()}>Test tutorial</button> */}
    </div>
  </div>)
}
export default TutorialControl