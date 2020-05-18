import React from 'react'
import styled, { css } from 'styled-components'

interface IProps {
  isHeader?: boolean
  index?: number
  animate?: boolean
}

const StyledRow = styled.tr<IProps>`
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
`

const TableRow: React.FC<IProps> = ({ children, ...rest }) => {
  return (
    <StyledRow {...rest}>
      {children}
    </StyledRow>
  )
}

export default TableRow
