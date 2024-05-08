import React from 'react'
import { useEffect,useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Modal from 'react-modal'
import {GoogleLogin,GoogleOAuthProvider ,googleLogout} from '@react-oauth/google'
import {jwtDecode} from 'jwt-decode'

const headerStyles = {
  content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      margin: 'auto',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(0,0,0,0.75)',
      textAlign: 'center',
      borderRadius: '10px'
  }
};

export default function Header() {

    const[backGround, setBackGround]= useState("");
    const location =useLocation();
    useEffect(()=>{
      console.log('Location changed:', location.pathname);
        if(location.pathname==="/"||location.pathname==="/Home"){
            setBackGround("black")
        }else{
            setBackGround("rgb(158, 5, 5)")
        }
    },[location.pathname])
    
    const navigate = useNavigate();
    const navigateHome = ()=>{
      console.log('Navigating to /home');
      navigate(`/Home`);
    }

    const[loginModalOpen, setLoginModalOpen] = useState(false);
    const[accModalOpen, setAccModalOpen] = useState(false);
    const [login, setLogin] = useState(false)
    const [logUser, setLogUser] = useState([]);
    const [signUser, setSignUser] = useState([])
    const [username, setUsername] = useState("")
    const [name, setName] = useState("")
    const [mail, setMail] = useState("")
    const [pass, setPass] = useState("")

    const loginOpen =()=>{
      setLoginModalOpen(true);
    }

    const loginClose =()=>{
      setLoginModalOpen(false);
    }

    const accountOpen =()=>{
      setAccModalOpen(true);
    }

    const accountClose =()=>{
      setAccModalOpen(false);
   }

   const Logout = () => {
    googleLogout();
    setLogin(false);
    sessionStorage.clear()
   }

   const responseGoogle = (response) => {
    setLogin(true);
    var decode = jwtDecode(response.credential)
    setUsername(decode.given_name)
    // setPic(decode.picture)
    console.log(decode)
};

   const loginApi =(e)=>{
    e.preventDefault();
    const data = {
      email: mail,
      password: pass
    }
    axios.post(`/signIn`, data)
    .then((res)=>{
      setLogin(true);
      sessionStorage.setItem("user", res.data.user.username);
      setLogUser(res.data.user);
      console.log(logUser,'login success');
      var answer = sessionStorage.getItem("user")
      setUsername(answer)
      console.log(username)
    }).catch(err => err, 'login failed')

    loginClose()
   }

   const signUpApi =(e)=>{
    const data = {
      username: name,
      email: mail,
      password: pass
  }
  axios.post(`/signUp`,data)
  .then((res)=>
     setSignUser(res.data),
     console.log(signUser, 'signin success'),
  ).catch(  
    err=>err, 'signinfailed')
    accountClose();
   } 


const targetName = (e) => {
    setName(e.target.value)
}
const targetMail = (e) => {
    setMail(e.target.value)
}
const targetPass = (e) => {
    setPass(e.target.value)
}


  return (
    <div>
      <div className="sticky" style={{width:"100%",backgroundColor:backGround}}>
            
        {(location.pathname !== "/" && location.pathname !== "/Home") && <div className="logofil" onClick={navigateHome}>e!</div>}

          {!login ? (
            <div className='position'> 
              <button className="btn btn-link loginfil" style={{color: "azure"}} onClick={loginOpen}>Login</button>
              <button className="btn btn-outline-light account" onClick={accountOpen}>Create an account</button>
            </div>
            ) : (
            <div className='position'>
              <button className="btn btn-link loginfil" style={{color: "azure"}}>{username}</button>
              <button className="btn btn-outline-light account" onClick={Logout}>logOut</button>
            </div>)
          }
      </div>

      <Modal id='login' 
             isOpen={loginModalOpen} 
             style={headerStyles}>

        <h1 style={{ margin: 'auto', textAlign: 'center', color: 'white' }}>Log in</h1>
        <br />

        <label> 
          <h3 style={{ color: 'orange' }}> Email </h3> 
        </label>
        <br />

        <input type="email" 
               style={{height:'40px',textIndent:'5px'}}
               value={mail} 
               className='border border-3 rounded-3 shadow-lg  mb-3 bg-body' 
               onChange={targetMail} 
               placeholder='Enter a valid Email' />
        <br />

        <label>
          <h3 style={{ color: 'orange' }}>Password</h3>
        </label>
        <br />
       
        <input type="password" 
               style={{height:'40px',textIndent:'5px'}}
               value={pass} 
               className='border border-3 rounded-3 shadow-lg mb-3 bg-body' 
               onChange={targetPass} 
               placeholder='Enter Password' />
        <br />
        {/* <br /> */}

        <button className='btn' 
                style={{ backgroundColor: 'gray', color: 'white',borderRadius:"20px",width:"50%" }} 
                value={username} 
                onClick={loginApi} >log in</button>
        <br />
        <br />

        <div style={{ textAlign: 'center' }} className='px-5'>
          <GoogleOAuthProvider clientId="1078675744394-5vellrrjt9nksd2artskn4giorrdgot5.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={responseGoogle}
              onError={responseGoogle}
            />
          </GoogleOAuthProvider>
        </div>
        <br />

        <div className='btn' 
             style={{ backgroundColor: 'gray', color: 'white', margin:"5px",borderRadius:"20px",width:"50%" }} 
             onClick={loginClose}>close
        </div>

      </Modal>

      <Modal isOpen={accModalOpen} style={headerStyles}>

        <form onSubmit={signUpApi}>
          <h1 style={{ color: 'white' }}>Create an account</h1>
          <br />

          <label>
            <h3 style={{ color: 'orange' }}>Username</h3>
          </label>
          <br />

          <input type="text" 
                 onChange={targetName} 
                 style={{height:'40px',textIndent:'5px'}}
                 value={name} 
                 className='border border-3 rounded-3 shadow-lg  mb-3 bg-body' 
                 placeholder='Enter a name' />
          <br />

          <label>
            <h3 style={{ color: 'orange' }}>Email</h3>
          </label>
          <br />

          <input type="email" 
                 onChange={targetMail} 
                 style={{height:'40px',textIndent:'5px'}}
                 value={mail} 
                 className='border border-3 rounded-3 shadow-lg  mb-3 bg-body' 
                 placeholder='Enter a valid Email' />
          <br />

          <label>
            <h3 style={{ color: 'orange' }}>Password</h3>
          </label>
          <br />

          <input type="password" 
                 onChange={targetPass} 
                 style={{height:'40px',textIndent:'5px'}}
                 value={pass} 
                 className='border border-3 rounded-3 shadow-lg  mb-3 bg-body' 
                 placeholder='Enter Password' />
          <br />

          <a href=" " >Do you have any account.</a>
          <br /><br />
       
          <input type="button" 
                 style={{ backgroundColor: 'gray', color: 'black', marginRight:"5%",borderRadius:"20px",width:"40%",height:"35px"}} 
                 className=' border border-2 ' 
                 onClick={signUpApi} 
                 value="submit" />
          <button 
             style={{ backgroundColor: 'gray',border:"2px white solid", color: 'white', margin:"auto",borderRadius:"20px",width:"40%",height:'35px',textAlign:"center" }} 
             onClick={loginClose}>Close
         </button>
        </form>

      </Modal>
    
    </div>
  ) 
}
