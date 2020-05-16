import faker from 'faker'
import { IColumn } from '../components/Table/Table'

const dataGenerator = (columnsCount: number, rowsCount: number): { data: string[][], columns: IColumn[] } => {
  const data: string[][] = []
  const columns: IColumn[] = []

  for (let i = 0; i < rowsCount; i++) {
    data.push([])
    for (let j = 0; j < columnsCount; j++) {
      data[i].push(faker.random.word())
    }
  }

  for (let i = 0; i < columnsCount; i++) {
    columns.push({
      name: faker.random.word(),
      width: faker.random.number({
        min: 100,
        max: 200
      })
    })
  }

  return {
    data,
    columns
  }
}

export default dataGenerator