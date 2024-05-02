import React from 'react'; 
import { useEffect,useState } from "react"

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Task from './pages/Task'; 
import TaskList from './pages/TaskList';
import Nav from './components/Nav';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import { ToastContainer, toast} from 'react-toastify';

import './App.css';
 
function App() {

  const [name,setName]=useState("");
  const [taskId,setTaskId]=useState(0);


  useEffect(()=>{
    (
      async()=>{
      const response=    await fetch('http://localhost:8000/api/user',{
         
        headers:{'Content-Type':'application/json'},
        credentials:'include' 
      });
      const content=await response.json();
      setName(content.name);
      }
    )();
  })

  return (
    <div className="App">
       
     
      <BrowserRouter>
          <Nav name={name} setName={setName} />
            <Routes>
                  <Route
                      path="/"
                      element={<Home name={name} />}
                  ></Route>
                  <Route
                    path="/tasklist"
                    element={<TaskList name={name}   />} >
                  </Route>
                  <Route
                      path="/task"
                      element={<Task name={name} />}
                  ></Route>
                  <Route
                      path="/login"
                      element={<Login setName={setName} />} 
                  ></Route>
                  <Route
                      path="/register"
                      element={<Register />}
                  ></Route>
            </Routes>
      </BrowserRouter>
      <ToastContainer /> 
    </div>
  );
}

export default App;
