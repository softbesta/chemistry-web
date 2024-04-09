import useAppData from "../../../hooks/useAppData"

const ReactionFirst = () => {
  const { count } = useAppData()
  console.log({count})
  return <div className="container">
    This is ReactionFirst
    <p>{count}</p>
  </div>
}
export default ReactionFirst