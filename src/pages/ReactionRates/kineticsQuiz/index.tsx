import QuizReaction from "../../../components/QuizReaction"
import { quizData } from "./constants"

// Main page
const ReactionKineticsQuiz = () => {
  return <QuizReaction quizKind={'kinetics'} quizData={quizData} />
}
export default ReactionKineticsQuiz