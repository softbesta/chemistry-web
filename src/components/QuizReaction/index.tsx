import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import Buttons from '../Buttons/Buttons'
import { getItemsRandomlyFromArray } from '../../helper/functions'
import useAppData from '../../hooks/useAppData'
import useFunctions from '../../hooks/useFunctions'
import { QuizAnswerType, QuizItemType } from '../../helper/types'
import QuestionStep from './QuestionStep'
import QuestionDifficulty from './QuestionDifficulty'

// Main page
interface QuizReactionProps {
  quizData: QuizItemType[]
}
const QuizReaction = ({quizData}: QuizReactionProps) => {
  const [quizType, setQuizType] = useState(0)
  const [quizStep, setQuizStep] = useState(0)
  const [quizList, setQuizList] = useState<QuizItemType[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number[][]>([])
  const [correctStep, setCorrectStep] = useState(0)

  const {
    updatePageFromMenu,
    getNextMenu,
  } = useFunctions()

  useEffect(() => {
  }, [quizType])

  const handleStep = (val: number) => {
    let nextStep = quizStep + val
    if (nextStep > quizType) {
      if (quizType > 0) {
        // show Next Course
        console.log('===handleStep=== 1')
        console.log(getNextMenu(1))
        updatePageFromMenu(getNextMenu(1))
      }
      return
    } else if (nextStep < 0) {
      // show Prev Course
      updatePageFromMenu(getNextMenu(-1))
      return
    }
    // console.log('handleStep', { val, nextStep })
    setQuizStep(nextStep)
  }
  const handleQuizTypeChange = (val: number) => {
    setQuizType(val)
    const updateQuizList: QuizItemType[] = getItemsRandomlyFromArray(quizData, val)
    const updateAnswerItems: QuizAnswerType[][] = []
    updateQuizList.forEach(item => {
      const { correctAnswer, otherAnswers } = item
      const res: QuizAnswerType[] = getItemsRandomlyFromArray([correctAnswer, ...otherAnswers])
      item.allAnswerItems = res
      updateAnswerItems.push(res)
    })
    // setAnswerList(updateAnswerItems)

    console.log('111', { update: updateQuizList, updateAnswerItems })
    setQuizList(updateQuizList)
    setCorrectStep(0)
    setSelectedAnswer([])
  }

  const handleSelectAnswers = (sel: number[], idx: number) => {
    // console.log('selectedAnswers 1', { sel, idx })
    const update = [...selectedAnswer]
    update[idx] = sel
    // console.log('selectedAnswers 2', { selectedAnswer, update })
    setSelectedAnswer(update)
  }
  const handleCorrectAnswer = (val: number) => {

    console.log({ correctStep, correctAnswerData: quizList[val] })
    setCorrectStep(v => v + 1)
  }

  return <>
    {/* <div className={styles.stepButtons}> */}
    <Buttons.StepButton
      onClick={() => handleStep(-1)}
      className={styles.prevBtn}
    >
      &#9664;
    </Buttons.StepButton>
    <Buttons.StepButton
      onClick={() => handleStep(1)}
      className={styles.nextBtn}
      disabled={correctStep < quizStep}
    >
      &#9654;
    </Buttons.StepButton>
    {/* </div> */}
    <div className={styles.container}>
      {/* <div className={styles.navMenuDivider}></div> */}
      {quizStep === 0 && <div className={styles.content}>
        <h1 className={styles.title}>Let's take a quiz</h1>
        <h2 className={styles.description}>Choose the difficulty level of the quiz</h2>
        <div className={styles.skipQuiz}>
          <p
            onClick={() => {
              updatePageFromMenu(getNextMenu(1), true)
            }}
          >
            Skip Quiz
          </p>
        </div>
        <div className={styles.selectQuiz}>
          <QuestionDifficulty
            text={'Easy'}
            count={5}
            onClick={handleQuizTypeChange}
            isActive={quizType === 5}
          />
          <QuestionDifficulty
            text={'Medium'}
            count={10}
            onClick={handleQuizTypeChange}
            isActive={quizType === 10}
          />
          <QuestionDifficulty
            text={'Hard'}
            count={20}
            onClick={handleQuizTypeChange}
            isActive={quizType === 20}
          />
        </div>
      </div>}
      {quizStep > 0 && <div className={styles.content}>
        <QuestionStep
          quizItem={quizList[quizStep - 1]}
          selectedAnswers={selectedAnswer[quizStep - 1] ?? []}
          onSelectAnswers={(sel) => handleSelectAnswers(sel, quizStep - 1)}
          isCorrectAnswered={correctStep >= quizStep}
          onCorrectAnswer={(val) => handleCorrectAnswer(val)}
        />
      </div>}
    </div>
  </>
}
export default QuizReaction