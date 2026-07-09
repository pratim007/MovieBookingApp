import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';  
import './App.css';
import MovieDetail from './pages/MovieDetail';
import BookShow from './pages/BookShow';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/movie/:movieId' element={<MovieDetail/>}/>
        <Route path='/book-show/:showId' element={<BookShow/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
