import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import avatar1 from '../../img/1.png'
import avatar2 from '../../img/2.png'
import avatar3 from '../../img/3.png'
import avatar4 from '../../img/4.png'
import { menuItems } from '../../Utils/menuItems'
import { signout } from '../../Utils/icons'
import { useNavigate } from 'react-router-dom'
import { getLoggedInUser, logout } from '../Service/AuthService'


const Navigation = ({active,setActive}) => {
    console.log(active);

    const[imgurl,setImgurl] = useState()

    const image = [
      avatar1,avatar2,avatar3,avatar4
    ];
    const user = getLoggedInUser();

    useEffect(()=>{
        const randomImg = image[Math.floor(Math.random()*image.length)];
        setImgurl(randomImg);

    },user)

    


    const navigate = useNavigate();

    const handelLogout= (e)=>{
        
        logout()
        navigate("/");  
    }

    
   


  return (
   <NavStyled>
        <div className="user-container">
            <img src={avatar2} alt="profile pic"/>
            <div className="text">
                <h2>{user}</h2>
             
            </div>
        </div>
        <ul className="menu-items">
            {
                menuItems.map(item=>{
                    return(
                        <li key={item.id}
                        onClick={()=>setActive(item.id)}
                        className={active===item.id?'active':''}>
                    {item.icon}
                    <span>{item.title}</span>
                    
                    </li>

                    )
                    
                })}
        </ul>
        <div className='bottom-div'>
            <li onClick={(e)=>handelLogout(e)}>
                {signout} Sign Out
            </li>
        </div>

   </NavStyled>
  )
}

const NavStyled = styled.nav`
    padding: 2rem 1.5rem;
    width: 374px;
    height: 100%;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    gap: 2rem;

    .user-container{
        height: 100px;
        display: flex;
        align-items: center;
        gap: 1rem;
        img{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: fit;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }
        h2{
            color: rgba(34, 34, 96, 1);
        }
        p{
            color: rgba(34, 34, 96, .6);
        }

    }
     .menu-items{
        flex:1;
        display: flex;
        flex-direction: column;
        font-size: 1rem;
        /* margin-top: 20px;
        margin-left: 10px; */
        
        li{
            display: grid;
            grid-template-columns: 40px auto;
            align-items: center;
            font-weight: 600;
            cursor: pointer;
            margin:.6rem 0;
            transition: all .4s ease-in-out;
            color: rgba(34, 34, 96, .6);
            padding-left: 1rem;
            position: relative;
            i{
                color: rgba(34, 34, 96, 0.6);
                font-size: 1.6rem;
                transition: all .4s ease-in-out;
            }
            

        }

     }
     .active{
        color: rgb(34, 34, 96);
        i{
            color: rgb(34, 34, 96) !important;
             font-size: 1.4rem;
             transition: all .4s ease-in-out;
            
        }
        span{
            transition: all .2s ease-in-out;
            color: rgb(34, 34, 96);
            font-weight: 600;
            font-size: 1.rem;

        }
        &::before{
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 4px;
            height: 100%;
            font-size: 0.8rem;
            background: #222260;
            border-radius: 0 10px 10px 0;
        }
     }

     .bottom-div{
        opacity: 1;
        transition: opacity 0.1s ease-in-out;
        cursor: pointer;
        li{
            font-size: 1rem;
        }

       &:hover{
        opacity: 1;
        color:#222260fb ;
       }

        
    }
     


    
`

export default Navigation