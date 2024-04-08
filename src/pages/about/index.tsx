import useAppData from "../../hooks/useAppData"
import './index.scss'

const AboutPage = () => {
  const { count } = useAppData()
  console.log({count})
  return <div className="container">
    This is AboutPage
    <p>{count}</p>
  </div>
}
export default AboutPage