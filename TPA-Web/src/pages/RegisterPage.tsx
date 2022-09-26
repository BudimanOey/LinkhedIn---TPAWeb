import { useMutation } from '@apollo/client';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import mainLogo from '../assets/logo.png'
import { storage } from '../firebase/firebaseConnect';
import { REGISTER_USER } from '../queries/userQuery';

export default function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [registerUser] = useMutation(REGISTER_USER);
  const [userGmail, setUserGmail] = useState(location.state || null);
  const [errMsg, setErrMsg] = useState("");

  function validatePass(password:String, confPass:String){
    if(password === confPass){
      return true
    }
    return false
  }

  async function registUser(firstname:String, lastname:String, email:String, profilePic: String){
    // const firstNameValue = (document.getElementById("firstNameInput") as HTMLInputElement).value;
    // const lastNameValue = (document.getElementById("lastNameInput") as HTMLInputElement).value;
    // const emailValue = (document.getElementById("emailInput") as HTMLInputElement).value;
    const passValue = (document.getElementById("passwordInput") as HTMLInputElement).value;
    const confPassValue = (document.getElementById("confPassInput") as HTMLInputElement).value;
   
    if(validatePass(passValue, confPassValue)){
      const storageRef = ref(storage, 'images/defaultBackgroundPhoto/defbackground.jpg');
      getDownloadURL(storageRef).then((url)=>{
        // console.log(url)
        registerUser({
          variables: {
            firstName: firstname,
            lastName: lastname,
            email: email, 
            password: passValue,
            profilePic: profilePic,
            backgroundPic: url
          }
        }).then(()=>{
          alert("Success Created!");
          navigate('/');
        })
      })  
    }else{
      setErrMsg("Recheck your password!");
    }

  }

  // console.log(userGmail)

  if(userGmail != null)
  return (
    <div className='body'>
      <div className='imgContainer'>
        <img src={mainLogo} className='imgLogo'/>
      </div>
      <div className='formContainer'>
        <div className='form'>
          <span className='signIn'>Sign up</span>
          <input id='passwordInput' type={'password'} placeholder='Password' className='inputBox'/>
          <input id='confPassInput' type={'password'} placeholder='Confirm password' className='inputBox'/>
          <button className='button' onClick={()=>{
            // @ts-ignore
            registUser(userGmail.given_name, userGmail.family_name, userGmail.email, userGmail.picture)
            }} >Register</button> 
          {errMsg ? <p className='errorMsg'>{errMsg}</p> : null}
          <p className='spliter'></p>
        </div>
      </div>
    </div>
  )

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
          <button className='button' onClick={()=>{registUser((document.getElementById("firstNameInput") as HTMLInputElement).value,(document.getElementById("lastNameInput") as HTMLInputElement).value,(document.getElementById("emailInput") as HTMLInputElement).value, "")}} >Register</button> 
          {errMsg ? <p className='errorMsg'>{errMsg}</p> : null}
          <p className='spliter'>or</p>

          
          <Link to={"/"}>Home</Link>
          {/* <Link to={"/register"}>Click here</Link> */}
        </div>
      </div>
    </div>
  )
}
