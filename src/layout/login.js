import React,{useRef,useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux"
import {useHistory} from 'react-router-dom'
import './loginStyle.css'
import {login} from '../redux/actions/loginAction'
const Login = () => {
    const userName = useRef();
    const password = useRef();
    const [errMsg,setErrMsg] = useState("");
    const {isLoggedIn,error,user} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useHistory()
    useEffect(() => {
        let checkLogin = (isLoggedIn,error,user) => {            
            if(!isLoggedIn && error && (user != null || typeof user != undefined)){
                setErrMsg(error)
            } 
            if(isLoggedIn === true){            
                if(user[0].role_id === 1){
                    setErrMsg('');
                    navigate.push('/Admin/Home');
                }
            }
        }
        checkLogin(isLoggedIn,error,user);
        return () => {
            checkLogin = undefined
        }
    }, [error, isLoggedIn, user,navigate])
       

    const submitLogin = (event) => {
        event.preventDefault();        
        let loginId = userName.current.value
        let loginPassword = password.current.value
        if(!loginId || !loginPassword) {
            setErrMsg("Fill all required fields");        
        }
        else{
            dispatch(login(loginId,loginPassword))
        }
    }
    useEffect(() => {
        let btn = document.querySelector('.mouse-cursor-gradient-tracking');
        function btn_mousemove(e){
            let rect = e.target.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            btn.style.setProperty('--x', x + 'px');
            btn.style.setProperty('--y', y + 'px');
        }
        btn.addEventListener('mousemove', btn_mousemove);
    
      return () => {
        btn.removeEventListener('mousemove',btn_mousemove)
      }
    }, [])
    
    return(
        <div style={{backgroundColor:"#ecfab6",height:'100vh',width:'100%'}}>
            <div className="container py-3 " >                        
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="text-center mb-3">Audit Check</h3>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card card-outline-secondary">
                            <div className="card-header">
                                <h4 className="m-0">Login</h4>
                            </div>
                            <div className="card-body">
                                <form autoComplete="off" className="form" id="loginForm" name="loginForm" onSubmit={submitLogin}>
                                    <div className="form-group">
                                        <label className="lbl" htmlFor="userName">Username</label>
                                        <input className="form-control" name="userName" ref={userName} type="text"  placeholder="Enter username or email address"/>
                                    </div>
                                    <div className="form-group">
                                        <label className="lbl" htmlFor="userPassword">Password</label>
                                        <input className="form-control" name="userPassword" ref={password} type="password"  placeholder="Enter password"/>
                                    </div>
                                    <div className="form-group py-2">
                                        <button type="submit" className="mouse-cursor-gradient-tracking btn-rounded">
                                            <span>Submit</span>
                                        </button>                                        
                                    </div>
                                    <div className="form-group text-danger">
                                        {errMsg ? `* ${errMsg}` : ''}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login