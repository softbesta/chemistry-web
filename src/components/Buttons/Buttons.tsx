import { ReactNode } from 'react'
import styles from './Buttons.module.scss'

interface PrevButtonProps {
  id?: string
  className?: string
  children?: ReactNode
  onClick: () => void
  disabled?: boolean
}
export const StepButton = ({ className, children, onClick, ...restProps }: PrevButtonProps) => {
  return <button
    className={`${styles.prevBtn} ${className || ''}`}
    onClick={() => onClick()}
    {...restProps}
  >
    {children}
  </button>
}

interface PrevButtonProps {
  id?: string
  className?: string
  onClick: () => void
}
export const NextButton = ({ className, onClick, ...restProps }: PrevButtonProps) => {
  return <button
    className={`${styles.nextBtn} ${className || ''}`}
    onClick={() => onClick()}
    {...restProps}
  >
    Next <span>&#9654;</span>
  </button>
}

export default {
  StepButton,
  NextButton,
}