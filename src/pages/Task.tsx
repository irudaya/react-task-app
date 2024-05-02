import { SyntheticEvent,useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import {Navigate} from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import { addOne, subOne, addSome, subSome, reset } from '../actions/task.action';
import {taskedit,logout} from '../features/taskst'; 

import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Task = (props:{name:string}) => {
  var [title,setTitle]=useState("");
  var [id,setId]=useState(undefined);

  var [description,setDescription]=useState("");
  var [status,setStatus]=useState("");
  const [redirect,setRedirect]=useState(false);
  var uid=uuidv4(); 
  const createAt=new Date();
  const updatedAt=new Date();
 
  const submitted = useSelector((state: any) => state.task.value)
  debugger;
  if(submitted.id!=undefined){
    title=submitted.title;
    description=submitted.description;
    status=submitted.status;
    id=submitted.id;

  }
  const dispatch = useDispatch();
  const onTitleChanged =(event:any)  =>{
    dispatch(taskedit({id:submitted.id, description:submitted.description, status:submitted.status, title:event}));
  } 

 const submit=async(e:SyntheticEvent)=>{
      e.preventDefault();
      
      if(submitted.id==undefined){
        var taskuuid=uid.toString();
        const response= await fetch('http://localhost:8000/api/tasks/inserttask',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            credentials:'include',
            body:JSON.stringify({taskuuid,title,description,status,createAt,updatedAt})
        });
          const content=await response.json();
          toast.success("Task Inserted Successfully");
          
          setTimeout(()=> setRedirect(true), 4000);  
    }else
    {
      debugger;
      const response= await fetch('http://localhost:8000/api/tasks/updatettask',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        credentials:'include',
        body:JSON.stringify({'id':submitted.id,'title':submitted.title,'description':submitted.description,'status':submitted.status})
    });
        const content=await response.json();
        debugger;
        toast.success("Task updated Successfully");
      
        setTimeout(()=> setRedirect(true), 3000);  

    }

  }

  if(redirect){
    
    return <Navigate to='/tasklist' />
  }

  return (
    <div>  {props.name?'Task page '+props.name:'Not validat user'}
    
    <div className="container-xxl my-md-4 bd-layout" >
    
      <div className="form-signin w-100 m-auto">
          <form  onSubmit={submit}>
              <h1 className="h3 mb-3 fw-normal">Task Form</h1>

              <div className="mb-3">
                <label htmlFor="txtTitle" className="form-label">Title</label>
                <input type="text" className="form-control"  id="txtTitle" placeholder="Title" value={title} required  onChange={e=>onTitleChanged(e.target.value)}  />
              </div>
              <div className="mb-3">
                <label htmlFor="txtinputDescription" className="form-label">Description</label>
                <input type="text" className="form-control"  id="txtinputDescription" placeholder="Description"  value={description} required onChange={(e)=>{setDescription(e.target.value)}}   />
              </div>
              <div className="mb-3">
                <label htmlFor="selectStatus" className="form-label">Status</label>
               
                <select className="form-select" aria-label="Default select example" id="selectStatus"  value={status} onChange={(e)=>{setStatus(e.target.value)}} required  >
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In-Progress</option>
                    <option value="done">Done</option>
                </select>
              </div>
              <div className="row">
                <div className="col-4">
                  <button className="btn btn-primary w-100 py-2" type="submit">Save</button>
                </div>
                <div className="col-4">
                  <button className="btn btn-secondary w-100 py-2" type="button">Cancel</button>
                </div>
              </div>
             
              
          </form>
      </div>
    
    </div>
    </div>
  )
}

export default Task