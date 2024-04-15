import styles from './TutorialControl.module.scss'
import ImgBeacky from '../assets/ReactionRates/reaction_boxes/beaky.png'
import useAppData from '../hooks/useAppData'
import { useHighLight } from '../hooks/useHighlight'
import { stepHightlights, tutorialSteps } from '../pages/ReactionRates/zero/constants'

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
        {tutorialHints[curStep].map((val, index) => <div
          key={index}
          className={styles.tutorialTextItem}
          dangerouslySetInnerHTML={{ __html: val || ''}}
        />)}
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