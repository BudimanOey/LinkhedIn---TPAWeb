import { useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_USER } from '../queries/userQuery';
import mainLogo from '../assets/logo.png';
import '../styles/LoginPage.scss';
import { useContext } from 'react';
import { UserContext } from '../contextProvider/userContext';

export default function LoginPage() {

  const [loginUser] = useMutation(LOGIN_USER);
  const {user, setUser } = useContext(UserContext)
  const navigate = useNavigate();

  function login(){
    loginUser({
      variables: {
        email: (document.getElementById('emailInput') as HTMLInputElement).value,
        password: (document.getElementById('passInput') as HTMLInputElement).value
      }
    }).then((u)=>{
      if(u.data.loginUser.activated === true){
        setUser(u.data.loginUser);
        navigate('/home');
      }else{
        alert("Activate your account first!");
      }
    }).catch((err)=>{
      alert(err);
    })
  }

  return (
    <div className='body'>
      <div className='imgContainer'>
        <img src={mainLogo} className='imgLogo'/>
      </div>
      <div className='formContainer'>
        <div className='form'>
          <span className='signIn'>Sign in</span>
          <p>Stay updated and connected</p>
          <input id='emailInput' type={'email'} placeholder='Email' className='inputBox'/>
          <input id='passInput' type={'password'} placeholder='Password' className='inputBox'/>
          <button onClick={login} className='button'>Sign in</button> 
          <p className='spliter'>or</p>

          <a href='/'>Link Google</a>
          <Link to={"/register"}>Click here</Link>
        </div>
      </div>
    </div>
  )
}
