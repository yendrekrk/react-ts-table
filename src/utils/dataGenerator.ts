import faker from 'faker'

export const dataGenerator = (columns: number, rows: number): string[][] => {
  const data: string[][] = []
  for (let i = 0; i < rows; i++) {
    data.push([])
    for(let j = 0; j < columns; j++) {
      data[i].push(faker.random.word())
    }
  }
  return data
}