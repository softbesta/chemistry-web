import { tutorialSteps } from '../constants'
import styles from './tutorialControl.module.scss'
import ImgBeacky from '../assets/ReactionRates/reaction_boxes/beaky.png'
import useAppData from '../hooks/useAppData'

const TutorialControl = () => {
  const { stepPlay, updateStepPlay } = useAppData()
  const tutorialHints = tutorialSteps
  const handleStepPrev = () => {
    console.log('===handleStepPrev===', stepPlay)
    updateStepPlay(-1)
  }
  const handleStepNext = () => {
    console.log('===handleStepNext===', stepPlay)
    updateStepPlay(1)
  }
  return (<div className={styles.tutorialControl}>
    <div className={styles.tutorialTextContainer}>
      <div className={styles.tutorialText}>
        <div dangerouslySetInnerHTML={{ __html: tutorialHints[0].text }} />
        <div dangerouslySetInnerHTML={{ __html: tutorialHints[0].desc }} />
      </div>
      <div className={styles.beakyIcon}>
        <img src={ImgBeacky} alt='beacky' />
      </div>
    </div>
    <div className={styles.stepButtons}>
      <button
        className={styles.prevBtn}
        onClick={() => handleStepPrev()}
      >
        &#9664;
      </button>
      <button
        className={styles.nextBtn}
        onClick={() => handleStepNext()}
      >
        Next <span>&#9654;</span>
      </button>
      {/* <p>&#9664;</p>
      <p>	&#9654;</p> */}
    </div>
  </div>)
}
export default TutorialControl