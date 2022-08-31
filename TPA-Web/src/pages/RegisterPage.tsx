import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import mainLogo from '../assets/logo.png'
import { REGISTER_USER } from '../queries/userQuery';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [registerUser] = useMutation(REGISTER_USER);
  const [errMsg, setErrMsg] = useState("");

  function validatePass(password:String, confPass:String){
    if(password === confPass){
      return true
    }
    return false
  }

  function registUser(){
    const firstNameValue = (document.getElementById("firstNameInput") as HTMLInputElement).value;
    const lastNameValue = (document.getElementById("lastNameInput") as HTMLInputElement).value;
    const emailValue = (document.getElementById("emailInput") as HTMLInputElement).value;
    const passValue = (document.getElementById("passwordInput") as HTMLInputElement).value;
    const confPassValue = (document.getElementById("confPassInput") as HTMLInputElement).value

    if(validatePass(passValue, confPassValue)){
      registerUser({
        variables: {
          firstName: firstNameValue,
          lastName: lastNameValue,
          email: emailValue, 
          password: passValue
        }
      }).then(()=>{
        alert("Success Created!");
        navigate('/');
      })
    }else{
      setErrMsg("Recheck your password!");
    }

  }

  return (
    <div className='body'>
      <div className='imgContainer'>
        <img src={mainLogo} className='imgLogo'/>
      </div>
      <div className='formContainer'>
        <div className='form'>
          <span className='signIn'>Sign up</span>
          <input id='firstNameInput' type="text" className='inputBox' placeholder='Firstname'/>
          <input id='lastNameInput' type="text" className='inputBox' placeholder='Lastname'/>
          <input id='emailInput' type={'email'} placeholder='Email' className='inputBox'/>
          <input id='passwordInput' type={'password'} placeholder='Password' className='inputBox'/>
          <input id='confPassInput' type={'password'} placeholder='Confirm password' className='inputBox'/>
          <button className='button' onClick={registUser} >Register</button> 
          {errMsg ? <p className='errorMsg'>{errMsg}</p> : null}
          <p className='spliter'>or</p>

          <a href='/'>Link Google</a>
          <Link to={"/register"}>Click here</Link>
        </div>
      </div>
    </div>
  )
}
