import HomePage from './pages/HomePage';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Profile from './pages/Profile';

function App() {

  const myStorage = window.localStorage;

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
