import QuizReaction from "../../../components/QuizReaction"
import { quizData } from "./constants"

// Main page
const ReactionFirstQuiz = () => {
  return <QuizReaction quizKind={'first'} quizData={quizData} />
}
export default ReactionFirstQuiz