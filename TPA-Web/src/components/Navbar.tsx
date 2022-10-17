import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineSearch, AiFillHome, AiFillMessage } from "react-icons/ai";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { FaSuitcase } from "react-icons/Fa";
import { MdNotifications } from "react-icons/md";
import logo from '../assets/logo.png';
import profile from '../assets/profile.jpg';
import '../styles/navbar.scss'
import { BiLogOut } from "react-icons/bi";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../contextProvider/userContext';

export default function Navbar() {
  const user = useContext(UserContext).user
  const setUser = useContext(UserContext).setUser
  const logoSize = 20;
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false)

  function handleDropdown(){
    if(dropdown === true) {
        setDropdown(false)
    }else{
        setDropdown(true)
    }
  }

  function handlePage(page:any){
    if(page.isActive){
        return 'currentPageli';
    }else{
        return 'li';
    }
  }

  function navigateSearch() {
    if(search){
        navigate(`/search/${search}`)
    }else{
        alert("Insert keyword to be search!")
    }
  }

  return (
    <div className='nav-container z-index-2 bg-white'>
        <div className='left'>
            <div className='logo'>
                <Link to={"/register"}><img src={logo} alt="img" className='logo'/></Link>
            </div>
            <div className='search-container'>
                <input className='search' placeholder='search' onChange={(e)=>{setSearch(e.target.value)}}/>
                <button className='search-btn' onClick={navigateSearch}>
                    <AiOutlineSearch size={15}/>
                </button>
            </div>
        </div>
        

        <ul className='ul mr-16'>
            <NavLink to={'/home'} className={handlePage}>
                <AiFillHome size={logoSize}/>
                <span>Home</span>  
            </NavLink>

            <NavLink to={'/network'} className={handlePage}>
                <BsFillPersonLinesFill size={logoSize}/>
                <span>Network</span>
            </NavLink>

            <NavLink to={'/jobs'} className={handlePage}>
                <FaSuitcase size={logoSize}/>
                <span>Jobs</span>
            </NavLink>

            <NavLink to={'/message'} className={handlePage}>
                <AiFillMessage size={logoSize}/>
                <span>Message</span>
            </NavLink>
            
            <NavLink to={'/notifications'} className={handlePage}>
                <MdNotifications size={logoSize}/>
                <span>Notifications</span>  
            </NavLink>
            
            <li className='li' onClick={handleDropdown}>
                {user.profilePicture ? 
                <div>
                    <img src={user.profilePicture} alt="" className='avatar-nav'/>
                </div>
                :
                <div>
                    <img src={profile} alt="" className='avatar-nav'/>
                </div>
                }
                <span>{user.firstName} {user.lastName}</span>  
                {
                    dropdown === true &&
                    <div className='drop-down'>
                        <NavLink to={`/profile/${user.id}`} className="flex items-center mb-3 ml-3 mr-3">
                            {user.profilePicture ? 
                            <div>
                                <img src={user.profilePicture} alt="" className='avatar-nav'/>
                            </div>
                            :
                            <div>
                                <img src={profile} alt="" className='avatar-nav'/>
                            </div>
                            }
                            <span className='pl-2'>Profile</span>  
                        </NavLink>
                        {
                            <div className='flex items-center ml-2 cursor-pointer logoutBtn mb-3' onClick={()=>{setUser({})}}>
                                <BiLogOut className='' size={30}/>
                                <span className='pl-3'>Logout</span>
                            </div>
                        }
                    </div>
                }
            </li>

        </ul>
    </div>
  )
}
