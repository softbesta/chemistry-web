import { MathJax, MathJaxContext } from "better-react-mathjax";
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
  exp1?: string,
  exp2?: string,
  exp3?: string,
  exp4?: string,
  exp5?: string,
  blanks: (any | undefined)[]
  highlights?: (any | undefined)[]
  className?: string
}
const MathContent = ({exp0, exp1, exp2, exp3, exp4, exp5, blanks, highlights, className = '' }: MathContentProps) => {
  // console.log({highlights})
  return <div className={`${styles.mathContentContainer} ${className}`}>
    <MathJaxContext config={config}>
      <div
        id='tur_math1'
        className={styles.mathjaxRow}
      >
        <MathJax
          className={styles.mathjax}
          dynamic
        >
          {exp0}
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
          {exp1}
          {/* {`\\[ Rate = 0.07 = -\\frac{-0.53}{7.28} = -\\frac{0.26 - 0.79}{19.40 - 12.12}\\]`} */}
        </MathJax>
      </div>
      <div
        id='tur_math3'
        className={`${styles.mathjaxRow} ${styles.centerAlign}`}
      >
        <MathJax
          id='tur_math3_1'
          className={styles.mathjax}
          dynamic
        >
          {exp2}
          {/* {`\\[ t_{1/2} = [A_0]/(2k) \\]`} */}
        </MathJax>
        <MathJax
          id='tur_math3_2'
          className={styles.mathjax}
          dynamic
        >
          {exp3}
          {/* {`\\[ 11.46 = 1.68 / (2 x 0.07) \\]`} */}
        </MathJax>
      </div>
      <div
        id='tur_math4'
        className={`${styles.mathjaxRow} ${styles.centerAlign}`}
      >
        <MathJax
          id='tur_math4_1'
          className={styles.mathjax}
          dynamic
        >
          {exp4}
          {/* {`\\[ Rate = k[A]^0 \\]`} */}
        </MathJax>
        <MathJax
          id='tur_math4_2'
          className={styles.mathjax}
          inline
          dynamic
        >
          {exp5}
          {/* {`\\[ 0.07 = 0.073(0.60)^0 \\]`} */}
        </MathJax>
      </div>
    </MathJaxContext>


    {false && blanks && blanks.map((item, index) => {
      if (!item) return null
      const className = `
        ${styles.blank} 
        ${item ? styles.active : ''}
      `
      return <div
        key={index}
        className={className}
        style={item}
      />
    })}
    {/* {highlights && highlights.map((item, index) => {
      if (!item) return null
      const className = `
        ${styles.blank} 
        ${item ? styles.active : ''}
      `
      return <div
        key={index}
        id={`tur_mathHighlight${index}`}
        className={className}
        style={item}
      />
    })} */}

    {/* <div className={`
      ${styles.blank} 
      ${styles.blank_test} 
      ${styles.active}
    `} /> */}
    {/* <p>{exp0}</p> */}
  </div>
}
export default MathContent