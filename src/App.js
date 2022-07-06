

import { Routes,Route } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Profile from './Profile';
import Register from './Register';
import Terllo from './Terllo';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <div className="App">
{/* 
      <Terllo/> */}
          <ToastContainer closeButton={false}  position="top-right" />
      <Routes>
      <Route path='/' element={<Register/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Terllo' element={<Terllo/>}/>
      <Route path="/Profile" element={<Profile/>}/>
      

      </Routes>
      {/* <Register/> */}
      {/* <Login/> */}
   
    </div>
  );
}

export default App;
