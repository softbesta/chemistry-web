import useAppData from "../../hooks/useAppData"
import './styles.module.scss'

const HomePage = () => {
  const { count } = useAppData()
  console.log({count})
  return <div className="container">
    This is HomePage
    <p>{count}</p>
  </div>
}
export default HomePage