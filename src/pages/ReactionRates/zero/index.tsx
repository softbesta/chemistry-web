import useAppData from "../../../hooks/useAppData"
import styles from './styles.module.scss'

const ReactionZero = () => {
  const { count } = useAppData()
  return <div className={styles.container}>
    This is ReactionZero
    <p>{count}</p>
  </div>
}
export default ReactionZero
