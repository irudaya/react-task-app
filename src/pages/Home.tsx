import { useEffect,useState } from "react"

const Home = (props:{name:string}) => {

  return (
    <div className="container-xxl my-md-4 bd-layout">
    <div className=" m-auto">
      <h1>Welcome to Pos page</h1>
        {props.name?'Hi '+props.name:'Please register/login to check do task'}
     </div>
     </div>
  )
}

export default Home