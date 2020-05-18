import React, { useMemo, useState, useEffect } from 'react'
import styled, { keyframes, css } from 'styled-components'

import TableRow from './TableRow'
import { ColumnHeader, TableCell } from './TableCells'
import { IColumn } from './types'

const appear = keyframes`
  from {
    transform: scaleY(0);
    opacity: 0.2;
  }
  to {
    transform: scaleY(1);
    opacity: 1;
  }
`

const TableWrapper = styled.table`
  position: relative; 
  display: block;
  overflow: auto;
  max-width: 100%;
  max-height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
`

const AnimatedTableBody = styled.tbody<{ animate: boolean, animationSpeed: number }>`
  transform-origin: top;
  ${({ animate, animationSpeed }) => animate && css`
    animation: ${appear} ${animationSpeed}ms 1;
  `}
`

interface IProps {
  columns: IColumn[]
  data: string[][]
}

const Table: React.FC<IProps> = ({ columns, data }) => {
  const [sortColumnIndex, setSortColumnIndex] = useState(0)
  const [sortedData, setSortedData] = useState<string[][]>([])
  const [animate, setAnimate] = useState(false)

  const isDataValid = useMemo(() => data.every(row => row.length === columns.length), [data, columns])
  const columnsCount = columns.length

  const sortDataBy = (i: number) => {
    if (animate) return
    setSortColumnIndex(i)
    const newlySortedData = data.sort((a, b) => a[i].localeCompare(b[i]))
    setSortedData(newlySortedData)
    setAnimate(true)
  }

  useEffect(() => {
    setSortedData(data.sort((a, b) => a[sortColumnIndex].localeCompare(b[sortColumnIndex])))
    // eslint-disable-next-line
  }, [data])

  if (!isDataValid) {
    console.error('<Table/>: Rows length has to be equal to columns number!')
    return null
  }

  return (
    <TableWrapper>
      <thead>
        <TableRow isHeader>
          {columns.map((column, i) => (
            <ColumnHeader
              key={`${column.name}${i}`}
              onClick={() => sortDataBy(i)}
              cellWidth={column.width}
              isLast={i === columnsCount - 1}
              isSorting={i === sortColumnIndex}
            >
              {column.name}
            </ColumnHeader>
          ))}
        </TableRow>
      </thead>
      <AnimatedTableBody
        animate={animate}
        animationSpeed={sortedData.length * 50 > 1000 ? 1000 : sortedData.length * 50}
        onAnimationEnd={() => setAnimate(false)}
      >
        {sortedData && sortedData.map((row, i) => (
          <TableRow key={`row${i}`} index={i}>
            {row.map((cell, j) => (
              <TableCell key={`cell${i}${j}`} cellWidth={columns[j].width} isLast={j === columnsCount - 1}>
                {cell}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </AnimatedTableBody>
    </TableWrapper>
  )
}

export default Table