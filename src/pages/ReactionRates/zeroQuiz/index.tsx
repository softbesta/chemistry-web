
import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import Buttons from '../../../components/Buttons/Buttons'
import { QuizAnswerType, QuizItemType, quizData } from './constants'
import { getItemsRandomlyFromArray } from '../../../helper/functions'
import useFunctions from '../../../hooks/useFunctions'
import useAppData from '../../../hooks/useAppData'

// Quiz answer steps
interface QuestionStepProps {
  quizItem: QuizItemType
  selectedAnswers: number[]
  onSelectAnswers: (val: number[]) => void
  isCorrectAnswered: boolean
  onCorrectAnswer: (val: number) => void
}
const QuestionStep = ({ quizItem, selectedAnswers, onSelectAnswers, isCorrectAnswered, onCorrectAnswer }: QuestionStepProps) => {
  const { question, correctAnswer, allAnswerItems } = quizItem
  const correctAnswerIndex = allAnswerItems?.findIndex((item: { answer: string }) => item.answer === correctAnswer.answer) ?? -1

  // useEffect(() => {
  //   console.log('isCorrectAnswered; ', { isCorrectAnswered })
  // }, [isCorrectAnswered])

  const handleSelect = (idx: number) => {
    if (isCorrectAnswered) return
    if (correctAnswerIndex === idx) {
      onCorrectAnswer(idx)
    }
    onSelectAnswers([...selectedAnswers, idx])
  }

  if (!quizItem || !allAnswerItems || correctAnswerIndex < 0) return null
  return <div className={styles.quizStep}>
    <h3
      className={`${styles.quizQuestion} ${question.length < 60 ? styles.textCenter : ''}`}
    >
      {question}
    </h3>
    <div>
      {allAnswerItems.map((item, index) => {
        const isSelected = selectedAnswers.includes(index)
        let answered = 0
        if (isSelected) {
          // console.log('aad 1', { isSelected, item, correctAnswer })
          if (item.answer === correctAnswer.answer) {
            answered = 1
          } else answered = 2
          // console.log('aad 2', { answerStyle: answer })
        }
        // answer;  0: not selected, 1: correct, 2: wrong
        return <div key={index}>
          <div
            className={`
            ${styles.quizCard} 
            ${isSelected} 
            ${answered === 1 ? styles.correctAnswer :
                (answered === 2 ? styles.wrongAnswer : '')
              }
          `}
            onClick={() => handleSelect(index)}
          >
            {answered === 1 && <div className={styles.correctIcon}>
              <i className="fa fa-check"></i>
            </div>}
            {answered === 2 && <div className={styles.wrongIcon}>
              <i className="fa fa-close"></i>
            </div>}
            {item.answer}
          </div>
          {answered === 2 && <div className={styles.explanation}>
            {item.explanation}
          </div>}
        </div>
      })}
    </div>
  </div>
}

// Quiz selection in first step
interface QuestionDifficultyProps {
  text: string
  count: number
  isActive?: boolean
  onClick: (val: number) => void
}
const QuestionDifficulty = ({
  text,
  count,
  isActive,
  onClick,
}: QuestionDifficultyProps) => {
  return <div
    className={`${styles.diffCard} ${isActive ? styles.active : ''}`}
    onClick={() => onClick(count)}
  >
    <h1>{text}</h1>
    <span className={styles.diffCardQuizCount}>{`${count} questions`}</span>
  </div>
}


// Main page
const ReactionZeroQuiz = () => {
  const [quizType, setQuizType] = useState(0)
  const [quizStep, setQuizStep] = useState(0)
  const [quizList, setQuizList] = useState<QuizItemType[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number[][]>([])
  const [correctStep, setCorrectStep] = useState(0)

  const {
    updatePageFromMenu,
    getNextMenu,
  } = useFunctions()
  const {
    availableMenuList
  } = useAppData()

  useEffect(() => {
  }, [quizType])

  const handleStep = (val: number) => {
    let nextStep = quizStep + val
    if (nextStep > quizType) {
      if (quizType > 0) {
        // show Next Course
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
export default ReactionZeroQuiz