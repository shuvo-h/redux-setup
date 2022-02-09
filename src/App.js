import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';

function App() {
  return (
    <div>
        <Router>
          <Routes>
            <Route path='/' element={<Page1></Page1>}></Route>
            <Route path='/first-page' element={<Page1></Page1>}></Route>
            <Route path='/second-page/:id' element={<Page2></Page2>}></Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
