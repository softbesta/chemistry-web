// import { MathJax, MathJaxContext } from "better-react-mathjax";
import styles from './MathContent.module.scss'

const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"]
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"]
    ],
  }
};

interface MathContentProps {
  exp0: string,
  exp1: string,
  exp2: string,
  exp3: string,
  exp4: string,
  blanks: (boolean | undefined)[][]
}
const MathContent = ({ exp0, exp1, exp2, exp3, exp4, blanks }: MathContentProps) => {
  return <div className={styles.mathContentContainer}>
    {/* <p>{exp0}</p> */}
  </div>
}
export default MathContent