import {
    Link,
} from "react-router-dom";
import Login from './../pages/Login';

const Nav = (props:{name:string,setName:(name:string)=> void }) => {

  const logout=async()=>{
    
    await fetch('http://localhost:8000/api/logout',
      {method:"POST",
      headers:{'Content-Type':'application/json'},
      credentials:'include'}
    )

    props.setName('');
  }
  let menu;
  let taskmenu;
 
  if(props.name===undefined){
    menu=( <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link className="nav-link" to="/login" >Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link"  to="/register"  >Register</Link>
            </li>
            
          </ul>)

         
          }
          else{
          menu=(  <ul className="navbar-nav me-auto mb-2 mb-md-0">
                  
                    <li className="nav-item">
                      <Link className="nav-link" to="/login" onClick={logout} >Logout</Link>
                    </li>
            
                  </ul>)
          
           taskmenu=(
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item"> 
                <Link className="navbar-brand" to="/tasklist"  >Task</Link>
              </li>
            </ul>
          )
          }

  return (
    <div> <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div className="container-fluid">
      <ul className="navbar-nav  home-menu"> 
            <li className="nav-item "> 
              <Link className="navbar-brand app-menu" to="/"  >POS App</Link>
            </li>
            <li className="nav-item "> 
              <Link className="navbar-brand" to="/"  >Home</Link>
            </li>
       </ul>
      {taskmenu}

      <div>
       {menu}
        
      </div>
    </div>
  </nav></div>
  )
}

export default Nav