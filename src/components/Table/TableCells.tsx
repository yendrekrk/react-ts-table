import styled, { css } from 'styled-components'

interface ICellProps {
  cellWidth: number
  isLast: boolean
}

const cellStyles = css<ICellProps>`
  width: ${props => props.cellWidth}px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: flex-start;
  padding: 4px 8px;
  align-items: center;
  word-break: break-word;
  border-collapse: collapse;
  transition: 150ms all;
  ${props => props.isLast && css`
    position: sticky;
    right: 0;
    background-color: palegreen!important;
  `}
`

export const ColumnHeader = styled.th<{ cellWidth: number, isLast: boolean, isSorting: boolean }>`
  ${cellStyles}
  cursor: pointer;
  background-color: lightsteelblue;
  font-size: 18px;
  position: sticky;
  top: 0;
  ${props => props.isSorting && css`
    text-decoration: underline;
  `}
`

export const TableCell = styled.td<ICellProps>`
  ${cellStyles}
`