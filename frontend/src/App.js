import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './Layout';
import Shop from './Components/Shop/Shop';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import SingleProduct from './Components/SingleProduct/SingleProduct';
import Admin from './Components/Admin/Admin';
import { useContext } from 'react';
import { Context } from './Components/Context/Context';
import Register from './Components/Register/Register';
import  Cart from './Components/Cart/Cart';
import  Tshirt from './Tshirt'; 
import Setting from './Components/Settings/Setting'
import Search from './Components/Search/Search';
function App() {
  const { user } = useContext(Context);
  console.log("hellouser",user)
  const location = useLocation();
  
  // Check if the current route is '/login' or '/Register'
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/Register';

  return (
    <>
      {/* Conditionally render Layout component */}
      {!isLoginPage && !isRegisterPage && <Layout />}
      
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/SingleProduct/:id" element={user ? <SingleProduct/> : <Register/>}/>
          <Route path="/Register" element={<Register/>}/>
          <Route path="/Admin" element={user ? <Admin/> :<Register/>}/>
          <Route path="/cart/:id" element={user ? <Cart/> :<Register/>}/>
          <Route path='/category/:cname' element={user ? <Shop/> : <Register/>}/>
          <Route path='/category/:cname/:sub' element={user ? <Shop/> : <Register/>}/>
          <Route path="/setting" element={user ? <Setting/> :<Register/>}/>
          <Route path='/tshirtDesigner' element={user ? <Tshirt/>:<Register/>}/> 
          <Route path='/search/:name' element={<Search/>}/>
      </Routes>
    </>
  );
}

export default App;
