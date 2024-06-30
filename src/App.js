import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import Home from './Components/Home';

function App() {
  const [ nameList, setNameList ] = useState([])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home nameList={nameList} setNameList={setNameList}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
