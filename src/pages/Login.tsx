 
import { SyntheticEvent,useState } from "react";
import {Navigate} from 'react-router-dom';

const Login = (props:{setName:(name:string)=> void }) => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [redirect,setRedirect]=useState(false);


  const submit=async(e:SyntheticEvent)=>{
  e.preventDefault();
  const response= await fetch('http://localhost:8000/api/login',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    credentials:'include',
    body:JSON.stringify({email,password})
  });
  const content=await response.json();
   
  props.setName(content.user.name);
  setRedirect(true);

  }
  if(redirect){
    
    return <Navigate to='/' />
  }

  return (
    <div className="container-xxl my-md-4 bd-layout">

    
    <div className="form-signin w-100 m-auto">
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
              <input type="email" className="form-control"  id="exampleFormControlInput1" placeholder="name@example.com" required  onChange={(e)=>{setEmail(e.target.value)}} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput2" className="form-label">Password</label>
              <input type="password"  id="exampleFormControlInput2" className="form-control" onChange={(e)=>setPassword(e.target.value)} required placeholder="Password"  />
            </div>
            <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
            
        </form>
    </div>
    </div>
  )
}

export default Login