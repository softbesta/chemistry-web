import QuizReaction from "../../../components/QuizReaction"
import { quizData } from "./constants"

// Main page
const ReactionComparisonQuiz = () => {
  return <QuizReaction quizKind={'comparison'} quizData={quizData} />
}
export default ReactionComparisonQuiz