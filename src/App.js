import Login from './components/Login'
import Signup from './components/Signup';
import Products from './components/Products';
import './App.css';
import HomePage from './components/HomePage';
import AddProduct from './components/AddProduct';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path='/products' element={<Products/>}></Route>
        <Route path='/addproduct' element={<AddProduct/>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
