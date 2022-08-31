import React, { useState } from 'react'
import mainLogo from '../../assets/logo.png';
import '../../styles/styleLib.scss'
import '../../styles/LoginPage.scss';
import '../../styles/navbar.scss'
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_BY_EMAIL } from '../../queries/userQuery';
import { GENERATE_RESET_PASSWORD_LINK } from '../../queries/resetPassQuery';

export default function ResetPasswordPage() {
    const [emailSent, setEmailSent] = useState(false)
    const [emailInput, setEmailInput] = useState("")
    const [genLink] = useMutation(GENERATE_RESET_PASSWORD_LINK)
    const { loading, error, data } = useQuery(GET_USER_BY_EMAIL, {
        variables: {
            email: emailInput
        }
    })
    
    function generateLink(){
        genLink({
            variables:{
                userID: data.getUserByEmail.id,
                email: data.getUserByEmail.email
            }
        })
        setEmailSent(true)
    }

    function resetPassHandler(){
        if(emailInput === ""){
            alert("Insert your email!");
        }else if(error){
            alert("Email not found!");
        }else{
            generateLink();
        }
    }

    return (
        <div className='body full-screen'>
            <header className='flex justify-between items-center'>
                <img src={mainLogo} alt='img' className='imgLogo'/>
                <ul className='ul mr-8'>
                    <Link to={'/register'} className='li rounded'>
                        Sign up
                    </Link>
                    <Link to={'/'} className='li rounded-3xl border-2-grey'>
                        Sign in
                    </Link>
                </ul>
            </header>

            <div className='flex full-screen center-all'>
                {emailSent ? 
                    <div>   
                        <h2>We have sent the reset password link to your email</h2>
                    </div>      
                : 
                    <div className='form'>
                        <span className='signIn'>Forgot password ?</span>
                        <p className='pl-3'>Reset your password with the new one</p>
                        <input onChange={(e)=>{setEmailInput(e.target.value)}} type={'email'} placeholder='Email' className='inputBox ml-2'/>
                        <div className='center-all mt-5'>
                            <button className='button ml-1' onClick={resetPassHandler}>Reset password</button> 
                            <Link to={'/'}>
                                <button className='w-32 mt-4'>Back</button>
                            </Link>
                        </div>
                    </div> 
                }      
            </div>
        </div>
    )
}
