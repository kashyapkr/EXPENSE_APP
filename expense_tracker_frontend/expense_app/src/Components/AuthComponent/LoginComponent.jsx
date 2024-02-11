import React, { useState } from 'react'
import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css';
import { getLoggedInUser, loginApiCall, saveLoginUser, storeToken } from '../Service/AuthService';
import { useNavigate } from 'react-router-dom';
import logo from '../../img/piggy.png'

const LoginComponent = () => {

    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errormsg, setErrormsg] = useState('');

    const navigator = useNavigate();



    const handleLogin=(e)=>{
        e.preventDefault();

        const loginDto = {usernameOrEmail,password};

        loginApiCall(loginDto).then(response=>{
            console.log(response.data);
            const token = 'Bearer '+ response.data.accessToken;
            storeToken(token);
            console.log(token);
            setErrormsg('');
            saveLoginUser(usernameOrEmail);
            
            if (getLoggedInUser()) {
                navigator('/dashboard');
                window.location.reload(false);
            } else {
                // Redirect to login page if not authenticated
                navigator('/');
            }
        }).catch(error=>{
            setErrormsg("Invalid username or password")

        }
            
            
           );
    }

    return (
        <LoginStyled>
            <div className="icon">
                <img src={logo}/>

            </div>

         
            
            <div className="login-container">
                    {errormsg && <p className='error'>{errormsg}</p>}

                <form>
                    <div className="form-group">
                        <label className='control-label' >Username:</label>
                        <input className={`form-control ${errormsg ? 'is-invalid' :''}`} placeholder="Enter username or email"type="text" id="username" value={usernameOrEmail} onChange={(e)=>setUsernameOrEmail(e.target.value)} required />

                    </div>

                    <div className="form-group">
                        <label className='control-label'>Password:</label>
                        <input className={`form-control ${errormsg ? 'is-invalid' :''}`} placeholder='Enter password' type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />

                    </div>
                    <button className='btn btn-danger' onClick={(e)=>handleLogin(e)}> Submit</button>
                    <div className="user">
                        <a href="/register">
                        <span >New User? Register Here!</span>
                        </a>
                        
                    </div>
                </form>
            </div>
        </LoginStyled>
    )
}

const LoginStyled = styled.div`
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

    

    .icon{
       height: 200px;
        width: 200px;
        
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden; 
        /* background-size: cover */
        /* background-color: black; */

        @media screen and (max-width:515px){
            height:120px;
            width:120px;
        }
      

        img{
            height: 100%;  


        }
    }

    .login-container{
        height: 50%;
        width: 50%;
        /* background-color: blue; */
        margin-top: -25px;
      
        display: flex;
        flex-direction: column;
        align-items: center;
        .error{
        color: red;
        font-weight: 500;
        margin-top: 15px;
        font-size:0.9rem;
        margin-bottom: -30px;
             @media screen and (max-width:515px ){
            font-size: 0%.5rem;
            font-weight: 400;
            margin-top: 10px;

            
            

        }

    }

        form{
            padding: 10%;
            flex-direction: column;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
            button{
                background-color: #ef536d;

                &:hover{
                    background-color: #fb2c4e;
                }
                @media screen and (max-width:515px ) {
                    width: 60px;
                    height: 30px;
                    font-size: 12px;
                    
                }
            }
            .form-group{
                display:flex;
                flex-direction: row;
                padding: 20px;

                .control-label{
                    font-weight: 800;
                    font-size: 1.3rem;
                    color: #00003bc2;
                    
                    @media screen and (max-width:515px ) {
                        font-size: 0.8rem;
                        font-weight: 500;
                        
                    }
                }
                .form-control{
                    margin-left: 10px;
                    width: 200px;
                    font-size: 0.7rem;
                    @media screen and (max-width:515px ){
                        width: 120px;
                    }
                }
               

            }
           
             span{
                font-size: 15px;
                @media screen and (max-width:515px){
                    font-size:12px;
                }
             }   
        }

    }

    
`

export default LoginComponent