import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import uservalidation from "../hodvalidation"
import Header from "./Header"
import SideBar from "./SideBar"

function AddHod(){
    const [user,setUser]=useState(null)
    const [errors,setErrors]=useState({})
    const [emailerr,setEmailErr]=useState(null)
 
    const handleInput=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }

    const handleVerify = e=>{
        axios.get("http://localhost:8080/api/users/verify?email="+e.target.value)
        .then(resp=>{
            console.log(resp.data)
            if(resp.data.status==="error"){
                alert(resp.data.error)
            }
            resp.data.status==="error" ? setEmailErr(resp.data.error) : setEmailErr(null)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        setErrors(uservalidation(user)) 
        
        if(Object.keys(errors).length===0){
            console.log(user)

            axios.post("http://localhost:8080/api/hod",user)
            .then(resp=>{
                console.log(resp)
                setUser(null)
                e.target.reset()
                alert("HOD registered successfully")
            })
            .catch(error=>console.log("Error",error))            
        }    
    }

    useEffect(()=>{        
        console.log(errors)  
    },[])
    return(
        <>
        <Header/>
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-2 bg-transparent p-0 border-right border-primary" style={{height:"calc(100vh - 80px)"}}>
                    <SideBar />
                </div>
                <div className="col-sm-9">
            <div className="card shadow mx-auto mt-3">
            <div className="card-body">
            <h4 className="text-center p-2">
                Add New HOD
            </h4>
            <form onSubmit={handleSubmit}>
                <div className="row">                    
                    <div className="col-sm-6 mx-auto">
                        <div className="form-group form-row">
                            <label className="col-sm-4 form-control-label">HOD Name</label>
                            <div className="col-sm-8">
                                <input type="text" name="name" value={user?.name} onChange={handleInput} className="form-control form-control-sm" />
                                {errors?.name && <small className="text-danger float-right">{errors?.name}</small>}                            
                            </div>
                            
                        </div>
                        <div className="form-group form-row">
                            <label className="col-sm-4 form-control-label">Address</label>
                            <div className="col-sm-8">
                                <input type="text" name="address" value={user?.address} onChange={handleInput} className="form-control form-control-sm" />
                                {errors?.address && <small className="text-danger float-right">{errors?.address}</small>}
                            </div>                        
                        </div>
                        <div className="form-group form-row">
                            <label className="col-sm-4 form-control-label">Gender</label>
                            <div className="col-sm-8">
                                <select name="gender" value={user?.gender} onChange={handleInput} className="form-control form-control-sm">
                                    <option value="">Select Gender</option>
                                    <option>Male</option>     
                                    <option>Female</option>     
                                </select> 
                                {errors?.gender && <small className="text-danger float-right">{errors?.gender}</small>}                      
                            </div>                        
                        </div>
                        <div className="form-group form-row">
                            <label className="col-sm-4 form-control-label">Department</label>
                            <div className="col-sm-8">
                                <select name="dept" value={user?.dept} onChange={handleInput} className="form-control form-control-sm">
                                    <option value="">Select Department</option>
                                    <option>IT</option>     
                                    <option>Management</option>     
                                    <option>Accounts</option>     
                                </select> 
                                {errors?.dept && <small className="text-danger float-right">{errors?.dept}</small>}                      
                            </div>                        
                        </div>
                        <div className="form-group form-row">
                            <label className="col-sm-4 form-control-label">Email Id</label>
                            <div className="col-sm-8">
                                <input type="email" name="email" value={user?.email} onBlur={handleVerify} onChange={handleInput} className="form-control form-control-sm" />
                                {errors?.email && <small className="text-danger float-right">{errors?.email}</small>}
                                {emailerr && <small className="text-danger float-right">{emailerr}</small>}
                            </div>
                            
                        </div>
                        
                        <div className="form-group form-row">
                            <label className="col-sm-4 form-control-label">Phone</label>
                            <div className="col-sm-8">
                                <input type="text" maxLength="10" name="phone" value={user?.phone} onChange={handleInput} className="form-control form-control-sm" />
                                {errors?.phone && <small className="text-danger float-right">{errors?.phone}</small>}
                            </div>
                            
                        </div>
                        
                        <div className="form-group form-row">
                            <label className="col-sm-4 form-control-label">Password</label>
                            <div className="col-sm-8">
                                <input type="password" name="pwd" value={user?.pwd} onChange={handleInput} className="form-control form-control-sm" />
                                {errors?.pwd && <small className="text-danger float-right">{errors?.pwd}</small>}
                            </div>
                        </div>                        
                        <button className="btn btn-primary btn-sm float-right">Submit</button>
                    </div>
                    </div>
                    </form>
                </div>
            </div>
            </div>
            </div>
            </div>
            </>
    )
}

export default AddHod;