import useAppData from "../../hooks/useAppData"

const HomePage = () => {
  const { count } = useAppData()
  console.log({count})
  return <div>
    This is HomePage
    <p>{count}</p>
  </div>
}
export default HomePage