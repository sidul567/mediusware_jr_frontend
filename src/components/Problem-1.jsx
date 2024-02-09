import React, {useEffect, useState} from 'react';

const Problem1 = () => {

    const [show, setShow] = useState('all');
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);

    useEffect(()=>{
        if(show === "active"){
            const newFilteredTasks = tasks.filter((task)=>task.status.toLowerCase() === "active");
            setFilteredTasks(newFilteredTasks);
        }else if(show === "completed"){
            const newFilteredTasks = tasks.filter((task)=>task.status.toLowerCase() === "completed");
            setFilteredTasks(newFilteredTasks);
        }else if(show === "all"){
            tasks.sort((task1, task2)=>{
                if(task1.status.toLowerCase() === "active" && task2.status.toLowerCase() !== "active"){
                    return -1;
                }else if(task1.status.toLowerCase() !== "active" && task2.status.toLowerCase() === "active"){
                    return 1;
                }else if(task1.status.toLowerCase() === "completed" && task2.status.toLowerCase() !== "completed"){
                    return -1;
                }else if(task1.status.toLowerCase() !== "completed" && task2.status.toLowerCase() === "completed"){
                    return 1;
                }else{
                    return 0;
                }
            })
            setFilteredTasks(tasks);
        }
    }, [show, tasks])

    const handleClick = (val) =>{
        setShow(val);
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const newTask = {name, status}
        setTasks([...tasks, newTask]);
    }

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form className="row gy-2 gx-3 align-items-center mb-4" onSubmit={handleSubmit}>
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
                        </div>
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Status" value={status} onChange={(e)=>setStatus(e.target.value)} />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button  className={`nav-link ${show==='all' && 'active'}`} type="button" onClick={()=>handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show==='active' && 'active'}`} type="button" onClick={()=>handleClick('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button  className={`nav-link ${show==='completed' && 'active'}`} type="button" onClick={()=>handleClick('completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                filteredTasks.map((task, index)=>(
                                    <tr key={index}>
                                        <td>{task.name}</td>
                                        <td>{task.status}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;