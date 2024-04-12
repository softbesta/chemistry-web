import { MathJax, MathJaxContext } from "better-react-mathjax";
import { useState } from "react";
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
    <MathJaxContext config={config}>
      <div
        id='tur_math1'
        className={styles.mathjaxRow}
      >
        <MathJax
          className={styles.mathjax}
          dynamic
        >
          {`\\[ Rate = k = -\\frac{△c}{△t} = -\\frac{c_2 - c_1}{t_2 - t_1}\\]`}
        </MathJax>
      </div>
      <div
        id='tur_math2'
        className={styles.mathjaxRow}
      >
        <MathJax
          className={styles.mathjax}
          dynamic
        >
          {exp0}
          {/* {`\\[ Rate = 0.07 = -\\frac{-0.53}{7.28} = -\\frac{0.26 - 0.79}{19.40 - 12.12}\\]`} */}
        </MathJax>
        {blanks[0][0] && <div className={styles.blank} />}
      </div>
      <div
        id='tur_math3'
        className={`${styles.mathjaxRow} ${styles.centerAlign}`}
      >
        <MathJax
          className={styles.mathjax}
          dynamic
        >
          {exp1}
          {/* {`\\[ t_{1/2} = [A_0]/(2k) \\]`} */}
        </MathJax>
        <MathJax
          className={styles.mathjax}
          dynamic
        >
          {exp2}
          {/* {`\\[ 11.46 = 1.68 / (2 x 0.07) \\]`} */}
        </MathJax>
      </div>
      <div
        id='tur_math4'
        className={`${styles.mathjaxRow} ${styles.centerAlign}`}
      >
        <MathJax
          className={styles.mathjax}
          dynamic
        >
          {exp3}
          {/* {`\\[ Rate = k[A]^0 \\]`} */}
        </MathJax>
        <MathJax
          className={styles.mathjax}
          inline
          dynamic
        >
          {exp4}
          {/* {`\\[ 0.07 = 0.073(0.60)^0 \\]`} */}
        </MathJax>
      </div>
    </MathJaxContext>
    {/* <p>{exp0}</p> */}
  </div>
}
export default MathContent