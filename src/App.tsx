import React, { useState } from 'react';

import dataGenerator from './utils/dataGenerator'
import Table from './components/Table'

import './App.css';

const App: React.FC = () => {
  const [columnsCount, setColumnsCount] = useState(5)
  const [rowsCount, setRowsCount] = useState(10)
  const { columns, data } = dataGenerator(columnsCount, rowsCount)

  return (
    <div className="App">
      <div className="App__controls">
        <label>
          Columns: {columnsCount}
          <input type='range' min='1' max='25' value={columnsCount} onChange={event => setColumnsCount(parseInt(event.target.value))} />
        </label>
        <label>
          Rows: {rowsCount}
          <input type='range' min='1' max='200' value={rowsCount} onChange={event => setRowsCount(parseInt(event.target.value))} />
        </label>
      </div>
      <Table data={data} columns={columns} />
    </div>
  );
}

export default App
