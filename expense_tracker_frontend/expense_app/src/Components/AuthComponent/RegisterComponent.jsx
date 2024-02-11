import React, { useState } from 'react'
import styled from 'styled-components'
import { registerApiCall } from '../Service/AuthService';
import { useNavigate } from 'react-router-dom';


const RegisterComponent = () => {

    const[name,setName] = useState('');
    const[username,setUsername] = useState('');
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');

    const[error,setError]  = useState({name:'',username:'',email:'',password:''});

    function validateError(){
        let valid = true;
        if(name.trim()===""){
            setError(prevError => ({ ...prevError, name: "Name is mandatory" }))
            valid = false;
        }
        else{
            setError(prevError => ({ ...prevError, name: "" }))
        }
        if(username.trim()===''){
            setError(prevError => ({ ...prevError, username: "Username is mandatory" }))
            valid = false;
        }
        else{
            setError(prevError => ({ ...prevError, username: "" }));
    
        }
        if(email.trim()===''){
            setError(prevError => ({ ...prevError, email: "Email is mandatory" }))
            valid = false;
        }
        else{
            setError(prevError => ({ ...prevError, email: "" }));
        }
        if(password.trim()===''){
            setError(prevError => ({ ...prevError, password: "Password is mandatory" }))
            valid = false;
        }
        else{
            setError(prevError => ({ ...prevError, password: "" }));
        }
        return valid;


    }
    

    const navigator = useNavigate();


    function handelRegister(e){
        e.preventDefault();

        const register = {name,username,email,password};
        console.log(register);
        if(validateError()){
            registerApiCall(register).then(response=>{
                console.log(response.data);
                navigator('/');
    
            }).catch(error=>{
                console.error(error);
            })
    

        }
       

    }


  return (
    <RegisterStyled>
                <h2>Welcome User</h2>
        
                <div className="register-container">
                <form>
                <div className="form-group">
                        <label className='control-label' >Name:</label>
                        <div className="input-container">
                        <input className={`form-control s ${error.name ? 'is-invalid' : ''}`} placeholder='Enter name' type="text" id="name" value={name} onChange={(e)=>setName(e.target.value)} required />
                        {error.name && <div className='invalid-feedback'>{error.name}</div>}
                        </div>
                       
                    </div>
                    <div className="form-group">
                        
                        <label className='control-label' >Email:</label>
                        <div className="input-container">
                        <input className={`form-control s ${error.email ? 'is-invalid' : ''}`} type="email" placeholder='Enter email id' id="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                        {error.email && <div className='invalid-feedback'>{error.email}</div>}
                        </div>
                        
                    </div>
                    <div className="form-group">
                        
                        <label className='control-label'>Username:</label>
                        <div className="input-container">
                        <input className={`form-control ${error.username ? 'is-invalid' : ''}`} type="text" id="username" placeholder="Enter username"value={username} onChange={(e)=>setUsername(e.target.value)} required />
                        {error.username && <div className='invalid-feedback'>{error.username}</div>}
                        </div>
                       
                    </div>

                    <div className="form-group">
                    <label className='control-label' >Password:</label>
                        <div className="input-container">
                        <input className={`form-control ${error.password ? 'is-invalid' : ''}`} type="password" id="password" placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)} required />
                        {error.password && <div className='invalid-feedback'>{error.password}</div>}

                        </div>
                        
                       
                    </div>
                    <button className='btn btn-danger' onClick={(e)=>handelRegister(e)}> Submit</button>
                    <br></br>
                    <div className="user">
                        <a href="/">
                        <span >Already Registered? Login Here</span>
                        </a>
                        
                    </div>
                </form>
            </div>

    </RegisterStyled>
  )
  }

const RegisterStyled = styled.div`
    padding: 2rem 1.5rem;
    width: 100%;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    gap: 2rem;
    .invalid-feedback{
                    text-align: center;
                    font-weight: 500;
            }

    h2{
        font-size: 1.9rem;
        font-weight: 800;
    }

    .register-container{
        display: flex;
        flex-direction: column;
        height: 80%;
        width: 50%;
        /* background-color: black; */


        form{
            padding: 10%;
            flex-direction: column;
            display: flex;
            justify-content: center;
            align-items: center;
           

        .form-group{
            display:flex;
            flex-direction: row;
            padding: 20px;

            
                   

            .control-label{
                font-weight:700;
                color: #00003bc2;
                font-size: 1.2rem;

                
            }
            .form-control{
                    margin-left: 10px;
                    width: 200px;
                    font-size: 0.8rem;
                }
            .form-control.s{
                margin-left: 33px;
                
            } 
              
        }
        span{   
           
                font-size: 15px;
             } 
        

    }
}

    
`

export default RegisterComponent