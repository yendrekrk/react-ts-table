import React, { useMemo, useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'

import TableRow from './TableRow'
import { ColumnHeader, TableCell } from './TableCells'
import { IColumn } from './types'

const TableWrapper = styled.table`
  position: relative; 
  display: block;
  overflow: auto;
  max-width: 100%;
  max-height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
`

interface IProps {
  columns: IColumn[]
  data: string[][]
}

const Table: React.FC<IProps> = ({ columns, data }) => {
  const [sortColumnIndex, setSortColumnIndex] = useState(0)
  const [sortedData, setSortedData] = useState<string[][] | null>([])
  const isDataValid = useMemo(() => data.every(row => row.length === columns.length), [data, columns])
  const columnsCount = columns.length

  const sortData = useCallback((data: string[][]) => new Promise<string[][]>(resolve => {
    const sorted = data.sort((a, b) => a[sortColumnIndex].localeCompare(b[sortColumnIndex]))
    resolve(sorted)
  }), [sortColumnIndex])

  useEffect(() => {
    (async () => {
      setSortedData(null)
      const newData = await sortData(data)
      setSortedData(newData)
    })()
    // eslint-disable-next-line
  }, [data, sortData])

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
        {sortedData && sortedData.map((row, i) => (
          <TableRow key={`row${i}`} index={i}>
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