import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineSearch, AiFillHome, AiFillMessage } from "react-icons/ai";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaSuitcase } from "react-icons/Fa";
import { MdNotifications } from "react-icons/md";
import logo from '../assets/logo.png'
import '../styles/navbar.scss'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorageHooks';
import { UserContext } from '../contextProvider/userContext';

export default function Navbar() {
  const user = useContext(UserContext).user;
  const logoSize = 20;
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handlePage(page:any){
    if(page.isActive){
        return 'currentPageli';
    }else{
        return 'li';
    }
  }

  return (
    <div className='nav-container'>
        <div className='left'>
            <div className='logo'>
                <Link to={"/register"}><img src={logo} alt="img" className='logo'/></Link>
            </div>
            <div className='search-container'>
                <input className='search' placeholder='search'/>
                <button className='search-btn'>
                    <AiOutlineSearch size={15}/>
                </button>
            </div>
        </div>
        

        <ul className='ul'>
            <NavLink to={'/home'} className={handlePage}>
                <AiFillHome size={logoSize}/>
                <span>Home</span>  
            </NavLink>

            <NavLink to={'/network'} className={handlePage}>
                <BsFillPersonLinesFill size={logoSize}/>
                <span>Network</span>
            </NavLink>

            <NavLink to={'/job'} className={handlePage}>
                <FaSuitcase size={logoSize}/>
                <span>Jobs</span>
            </NavLink>

            <NavLink to={'/message'} className={handlePage}>
                <AiFillMessage size={logoSize}/>
                <span>Message</span>
            </NavLink>
            
            <NavLink to={'/notification'} className={handlePage}>
                <MdNotifications size={logoSize}/>
                <span>Notifications</span>  
            </NavLink>

            <NavLink to={`/profile/${user.id}`} className={handlePage}>
                <li className='li'>
                    <img src={user.profilePic} alt="" className='avatar-nav'/>
                    <span>{user.name}</span>  
                </li>
            </NavLink>

        </ul>
    </div>
  )
}
