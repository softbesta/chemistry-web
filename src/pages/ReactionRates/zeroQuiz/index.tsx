import QuizReaction from "../../../components/QuizReaction"
import { quizData } from "./constants"

// Main page
const ReactionZeroQuiz = () => {
  return <QuizReaction quizKind={'zero'} quizData={quizData} />
}
export default ReactionZeroQuiz