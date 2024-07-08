import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import Home from './Components/Home';

function App() {
  const [ namelist, setNamelist ] = useState([])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home namelist={namelist} setNamelist={setNamelist}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
