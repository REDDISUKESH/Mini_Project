import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './Layout';
import Shop from './Components/Shop/Shop';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import SingleProduct from './Components/SingleProduct/SingleProduct';
import Admin from './Components/Admin/Admin';
import { useContext, useState } from 'react';
import { Context } from './Components/Context/Context';
import Register from './Components/Register/Register';
import  Cart from './Components/Cart/Cart';
//import Tshirt from './Components/FabricApplication/Tshirt';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Setting from './Components/Settings/Setting'
import Search from './Components/Search/Search';
function App() {
  const { user } = useContext(Context);
  console.log("hellouser",user)
  const location = useLocation();
  const [searchQuery,setSearchQuery]=useState('');
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

          {/* <Route path="/Register" element={<Register/>}/>
          <Route path="/Admin" element={user ? <Admin/> :<Register/>}/>
          <Route path="/cart/:id" element={user ? <Cart/> :<Register/>}/>
          <Route path='/category/:cname' element={user ? <Shop/> : <Register/>}/>
          <Route path='/category/:cname/:sub' element={user ? <Shop/> : <Register/>}/>
          <Route path="/setting" element={user ? <Setting/> :<Register/>}/>
           <Route path='/tshirtDesigner' element={user ? <Tshirt/>:<Register/>}/>  
          <Route path='/search/:name' element={<Search/>}/> */}
          <Route path="/Register" element={<Register />} />
                
                <Route path="/Admin" element={
                    <ProtectedRoute user={user}>
                        <Admin />
                    </ProtectedRoute>
                } />

                <Route path="/cart/:id" element={
                    <ProtectedRoute user={user}>
                        <Cart />
                    </ProtectedRoute>
                } />
                <Route  path="/SingleProduct/:id" element={
                  <ProtectedRoute user={user}>
                        <SingleProduct/>
                  </ProtectedRoute>
                }/>
                <Route path='/category/:cname' element={
                    <ProtectedRoute user={user}>
                        <Shop />
                    </ProtectedRoute>
                } />
                {/* <Route path='/fabricapplication' element={
                    <ProtectedRoute user={user}>
                        <Tshirt/>
                    </ProtectedRoute>
                }/> */}
                <Route path='/category/:cname/:sub' element={
                    <ProtectedRoute user={user}>
                        <Shop />
                    </ProtectedRoute>
                } />

                <Route path="/setting" element={
                    <ProtectedRoute user={user}>
                        <Setting />
                    </ProtectedRoute>
                } />

                {/* <Route path='/tshirtDesigner' element={
                    <ProtectedRoute user={user}>
                        <Tshirt />
                    </ProtectedRoute>
                } /> */}

                <Route path='/search/:name' element={<Search />} />
      </Routes>
    </>
  );
}

export default App;
