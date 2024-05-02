import {Navigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { useTable, TableOptions, Column , usePagination} from "react-table";
import React  from "react";
import {SyntheticEvent,useState,useEffect} from "react";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch } from 'react-redux'
import {taskedit,logout} from '../features/taskst'; 

type Cols = { taskuuid: string; title: string,description:string,status:string };

const TaskList= (props:{name:string} )  =>{

  const dispatch=useDispatch();

  const [data, setData] = useState([]);
 
  const getData = () => {
      fetch("http://localhost:8000/api/tasks/tasklist",{
        method:'GET',
        headers:{'Content-Type':'application/json'},
        credentials:'include',
         
      })
          .then((response) => response.json())
          .then((data) => {
             
              setData(data);
              
          });
  }

  useEffect(() => {
      getData();
  }, []);


  const columns: Column<{ id:number, taskuuid: string; title: string,description:string,status:string }>[] = React.useMemo(
    () => [
      {
        Header: "id",
        accessor: "id", // accessor is the "key" in the data
        show: false
      },
      {
        Header: "Uuid",
        accessor: "taskuuid", // accessor is the "key" in the data
        show: false
      },
      {
        Header: "Title",
        accessor: "title"
      }
      ,
      {
        Header: "Description",
        accessor: "description"
      }
      ,
      {
        Header: "Status",
        accessor: "status"
      },
      {
        Header:"Edit",
        maxWidth: 100,
        minWidth: 40,
        width: 40,
        
        Cell:(row:any) => (<div className="grdbuttoncontainer"><div className="editcontainer"> <a
            className="editbutton"
            aria-label="Edit"
            onClick={(event) =>btnedittask(row,event)}
        >
            <i className="">
                <img
                    alt="Edit"
                    className="editicon"
                    src="/images/edit.png"
                />
            </i>
        </a></div></div>)
      },
      {
        Header:"Delete",
        maxWidth: 100,
        minWidth: 58,
        width: 58,
        show:true,
        Cell:(row:any) => (<div className="grdbuttoncontainer"> <div className="deletecontainer"> <a
            className="deletebutton"
            aria-label="Delete"
            onClick={(event) => handledeleteclick(row,event)}
        >
            <i className="">
                <img
                    alt="Delete"
                    className="deleteicon"
                    src="/images/delete.png"
                />
            </i>
        </a></div></div>)
      }
    ],
    []
  );

  const initialState = { hiddenColumns: ['id','taskuuid'] ,pageIndex: 0, pageSize: 10};
  const options: TableOptions<{ id:number, taskuuid: string; title: string,description:string,status:string }> = {
    data,
    columns,
    initialState 
    
  };
  const [redirect,setRedirect]=useState(false);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
    
    
  } = useTable(options,
    usePagination );

  const btnadd=async(e:SyntheticEvent)=>{
    e.preventDefault();
     
    setRedirect(true);
  }

  const btnedittask =(row:any,event:SyntheticEvent)=>{
    
    dispatch(taskedit({id:row.row.original.id,taskuuid:row.row.original.taskuuid,title:row.row.original.title,
      description:row.row.original.description,status:row.row.original.status}));
      setRedirect(true);
  }

  const handledeleteclick = (row:any,event:SyntheticEvent) => {
 
    var id=row.row.original.id;
    if(row.row.original.id!=undefined && window.confirm('Are you sure to delete this record?')){
      
      fetch("http://localhost:8000/api/tasks/"+id,{
        method:'DELETE',
        //headers:{'Content-Type':'application/json'},
        credentials:'include' 
         
      })
          .then((response) => response.json())
          .then((data) => {
             
             toast.success("Task Deleted Successfully");
       
              setTimeout(()=>  getData(), 2000);  
           
              
          });
    }
    event.preventDefault();
  }

  

  if(redirect){
    
    return <Navigate to='/task' />
  }

  return (
    <div className="container-xxl my-md-4 bd-layout">

  
    <div>{props.name?<h1>Task List page</h1>:'Not validat user'}</div>
    <div className="mb-3"><button className="btn btn-primary" onClick={btnadd}>Add New</button></div>
    <table className="table table-striped table-bordered "  {...getTableProps()} >
      <thead> 
        {headerGroups.map((headerGroup) => (
          <tr className="row"  {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th className=" col-2 "
                {...column.getHeaderProps()}
                
              >
                {column.render("Header")}
              </th>
            ))}
            
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr className="row" {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td className="col-2"
                    {...cell.getCellProps()}
                     
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
             
            </tr>
          );
        })}
      </tbody>
    </table>
    
    </div>
  );
}

export default   TaskList;