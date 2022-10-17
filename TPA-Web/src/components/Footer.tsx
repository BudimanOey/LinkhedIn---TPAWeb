import React from 'react'
import "../styles/styleLib.scss"
import logo from '../assets/logo.png'

export default function Footer(){
    return (
        <div className=''>
            <div className=''>
                <a href="https://www.linkedin.com/jobs/?trk=li_FA_global_careers_jobsgtm_jsFA_v1&mcid=6899045044465016833" target="_blank">
                    
                </a>
            </div>

            <div className="">
                <a href="https://about.linkedin.com/" target="_blank">About </a>
                <a href="https://www.linkedin.com//help/linkedin?trk=footer_d_flagship3_feed&lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BVDfFHRUKRa2rgOTF6ET%2FGQ%3D%3D" target="_blank">Help Center </a>
                <a href="https://www.linkedin.com/accessibility?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BVDfFHRUKRa2rgOTF6ET%2FGQ%3D%3D" target="_blank">Accessibility </a>
                <a href="https://www.linkedin.com/legal/privacy-policy" target="_blank">Privacy Policy </a>
                <a href="https://www.linkedin.com/legal/user-agreement" target="_blank">User Aggrement </a>
            </div>

            <div className="">
                <img className='logo' src={logo} alt="" />
                <p className='linkhedin-copyright'>LinkhedIn Corporation &copy; 2022</p>
            </div>
        </div>
    )
}
