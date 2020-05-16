import React, { useMemo, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'

const appear = keyframes`
 0% { opacity: 0 }
 100% { opacity: 1 }
`
const cellStyles = css<{ cellWidth: number, isLast: boolean }>`
  width: ${props => props.cellWidth}px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: flex-start;
  padding: 4px 8px;
  align-items: center;
  word-break: break-word;
  border-collapse: collapse;
  transition: 150ms all;
  animation: ${appear} 1s 1;
  ${props => props.isLast && css`
    position: sticky;
    right: 0;
    background-color: palegreen!important;
  `}
`

const TableWrapper = styled.table`
  position: relative; 
  display: block;
  overflow: auto;
  max-width: 100%;
  max-height: 100%;
`
const TableRow = styled.tr`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  flex-wrap: no-wrap;
  transition: 150ms all;

  &:hover{
    background-color: honeydew;
  }
`

const ColumnHeader = styled.th<{ cellWidth: number, isLast: boolean, isSorting: boolean }>`
  ${cellStyles}
  cursor: pointer;
  background-color: lightsteelblue;
  font-size: 18px;
  position: sticky;
  top:0;
  ${props => props.isSorting && css`
    text-decoration: underline;
  `}
`

const TableCell = styled.td<{ cellWidth: number, isLast: boolean }>`
  ${cellStyles}
`

export interface IColumn {
  name: string
  width: number
}

interface IProps {
  columns: IColumn[]
  data: string[][]
}

const Table: React.FC<IProps> = ({ columns, data }) => {
  const isDataValid = useMemo(() => data.every(row => row.length === columns.length), [data, columns])
  const [sortColumnIndex, setSortColumnIndex] = useState(0)

  const sortedData = useMemo(() => {
    return data.sort((a, b) => a[sortColumnIndex].localeCompare(b[sortColumnIndex]))
  }, [data, sortColumnIndex])

  if (!isDataValid) {
    console.error('<Table/>: Rows length has to be equal to columns number!')
    return null
  }

  const columnsCount = columns.length

  return (
    <TableWrapper>
      <thead>
        <TableRow>
          {columns.map((column, i) => (
            <ColumnHeader
              key={`${column.name}${i}`}
              onClick={() => setSortColumnIndex(i)}
              cellWidth={column.width}
              isLast={i === columnsCount - 1}
              isSorting={i === sortColumnIndex}
            >
              {column.name}
            </ColumnHeader>
          ))}
        </TableRow>
      </thead>
      <tbody>
        {sortedData.map((row, i) => (
          <TableRow key={`row${i}`}>
            {row.map((cell, j) => (
              <TableCell key={`cell${i}${j}`} cellWidth={columns[j].width} isLast={j === columnsCount - 1}>
                {cell}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </tbody>
    </TableWrapper>
  )
}

export default Table