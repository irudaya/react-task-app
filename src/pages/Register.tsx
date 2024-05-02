import {SyntheticEvent, useState} from "react";
import {Navigate} from 'react-router-dom';

import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const configData = require( './../config.json');
const Register = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [redirect,setRedirect]=useState(false);


    const submit=async(e:SyntheticEvent)=>{
        e.preventDefault();
        await fetch(configData+'register',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                name,
                email,
                password
            })
        });
        toast.success("Registration done Successfully");
          
        setTimeout(()=> setRedirect(true), 4000);  
        
        
    }
    if(redirect){
        return <Navigate to='/login' />
    }

  return (
    

<div className="container-xxl my-md-4 bd-layout">
    <div className="form-signin w-100 m-auto">
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Register Form:</h1>

            <div className="mb-3">
            <label htmlFor="nameFormControlInput" className="form-label">Name</label>
            <input type="text" className="form-control"  id="nameFormControlInput" placeholder="name" required  onChange={(e)=>{setName(e.target.value)}} />
            </div>
            <div className="mb-3">
            <label htmlFor="emailFormControlInput" className="form-label">Email address</label>
            <input type="email" className="form-control"  id="emailFormControlInput" placeholder="name@example.com" required  onChange={(e)=>{setEmail(e.target.value)}} />
            </div>
            <div className="mb-3">
            <label htmlFor="passwordFormControlInput" className="form-label">Password</label>
            <input type="password"  id="passwordFormControlInput" className="form-control" onChange={(e)=>setPassword(e.target.value)} required placeholder="Password"  />
            </div>
            <button className="btn btn-primary w-100 py-2" type="submit">Submit</button>
            
        </form>
    </div>
</div>
  )
}

export default Register