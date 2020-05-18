import React, { useState, useEffect } from 'react'
import styled, { css, keyframes } from 'styled-components'

interface IProps {
  isHeader?: boolean
  index?: number
  animate?: boolean
}

const ANIMATION_DURATION = 500 // [ms]
const ANIMATION_DELAY_UNIT = 35 // [ms]

const appear = keyframes`
 from { 
    transform: scale(1, 0);
  }
 to { 
    transform: none;
  }
`

const StyledRow = styled.tr<IProps & { animationDelay: number }>`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  flex-wrap: no-wrap;
  transform-origin: center top;
  ${props => !props.isHeader && css`
    &:hover{
      background-color: honeydew;
    }
  `}
  ${props =>
    (!props.isHeader && props.animate) &&
    css`
      animation: ${appear} ${ANIMATION_DURATION}ms 1;
      animation-delay: ${`${props.animationDelay}ms`};
    `
  }
`

const TableRow: React.FC<IProps> = ({ children, ...rest }) => {
  const [animate, setAnimate] = useState(false)
  const animationDelay = rest.index ?
    rest.index * ANIMATION_DELAY_UNIT > ANIMATION_DELAY_UNIT * 100 ? ANIMATION_DELAY_UNIT * 100 :
      rest.index * ANIMATION_DELAY_UNIT :
    0

  useEffect(() => {
    setAnimate(true)
    if (rest.index) {
      setTimeout(() => {
        setAnimate(false)
      }, animationDelay + 500)
    }
  }, [children, animationDelay, rest.index])

  return (
    <StyledRow {...rest} animate={animate} animationDelay={animationDelay} onAnimationEnd={() => setAnimate(false)}>
      {children}
    </StyledRow>
  )
}

export default TableRow
