import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { GET_USER_BY_EMAIL, LOGIN_BY_GMAIL, LOGIN_USER, REGISTER_USER } from '../queries/userQuery';
import mainLogo from '../assets/logo.png';
import '../styles/LoginPage.scss';
import { useContext, useEffect } from 'react';
import { UserContext } from '../contextProvider/userContext';
import jwtDecode from 'jwt-decode';

export default function LoginPage() {

  const [loginUser] = useMutation(LOGIN_USER);
  const [loginUserByGmail] = useMutation(LOGIN_BY_GMAIL);
  const [registerUser] = useMutation(REGISTER_USER);
  const [getUserByEmail, {loading, error, data}] = useLazyQuery(GET_USER_BY_EMAIL);
  const {user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function login(){
    loginUser({
      variables: {
        email: (document.getElementById('emailInput') as HTMLInputElement).value,
        password: (document.getElementById('passInput') as HTMLInputElement).value
      }
    }).then((u)=>{
      if(u.data.loginUser.activated === true){
        console.log(u.data.loginUser)
        setUser(u.data.loginUser);
        navigate('/home');
      }else{
        alert("Activate your account first!");
      }
    }).catch((err)=>{
      alert(err);
    })
  }

  function loginByGmail(gmail:any){
    loginUserByGmail({
      variables: {
        email: gmail
      }
    }).then((u)=>{
      console.log(u)
      if(u.data.loginUserByGmail.activated === true){
        setUser(u.data.loginUserByGmail);
        navigate('/home');
      }else{
        alert("Activate your account first!");
      }
    }).catch((e)=>{
      console.log(e)
    })
  }

  function handleCallbackResponse(response:any){
    console.log("Encoded JWT Token :" + response.credential);
    type User = {
      given_name:String,
      family_name:String,
      email:String,
    }
    const user:User = jwtDecode(response.credential);
    
    getUserByEmail({
      variables: {
        email: user.email
      }
    }).then((e)=>{
      console.log(e)
      loginByGmail(e.data.getUserByEmail.email)
    }).catch(()=>{
      navigate("/register", {state: user});
    })
  }

  useEffect(() => {
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: "304920929253-oj9vghvbhuq66205vqtte96jbqfpg4nj.apps.googleusercontent.com",
      callback: handleCallbackResponse
    })

    // @ts-ignore
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline", size: "large"}
    )
  }, [])
  

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
          <Link to={"/resetpass"} className="mt-5">Forget password ?</Link>
          <button onClick={login} className='button'>Sign in</button> 
          <span className='mt-10'>New to LinkhedIn ? <Link to={"/register"}> Join now!</Link></span>
          <p className='spliter'>or</p>
          <div id='signInDiv'></div>
        </div>
      </div>
    </div>
  )
}
