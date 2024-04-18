import { convertExpToHtml } from '../helper/functions'
import styles from './OrderCardItem.module.scss'

interface OrderCardItemProps {
  orderType: number // 0, 1, 2
  title: string
  exp0?: string
  exp1?: string
  exp2?: string
  exp3?: string
}
const OrderCardItem = ({
  orderType,
  title,
  exp0,
  exp1,
  exp2,
  exp3,
}: OrderCardItemProps) => {
  return <div
    id={`tur_orderCardItem${orderType}`}
    className={`${styles.orderItemCard} ${styles[`type${orderType}`]}`}
  >
    <div className={styles.orderTitle}>
      {title}
    </div>
    <div className={styles.orders}>
      <div className={styles.orderCol1}>
        <div dangerouslySetInnerHTML={{ __html: convertExpToHtml(exp0) || '' }} />
        <div dangerouslySetInnerHTML={{ __html: convertExpToHtml(exp1) || '' }} />
      </div>
      <div className={styles.orderCol2}>
        <div dangerouslySetInnerHTML={{ __html: convertExpToHtml(exp2) || '' }} />
        <div dangerouslySetInnerHTML={{ __html: convertExpToHtml(exp3) || '' }} />
      </div>
    </div>
  </div>
}
export default OrderCardItem