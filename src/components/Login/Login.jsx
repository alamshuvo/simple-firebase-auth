import React, { useRef, useState } from 'react';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from '../../Firebase/Firebase.config';
import { Link } from 'react-router-dom';
const Login = () => {
  const [regesterError,setRegesterError]=useState('')
  const [sucess,setSucess]=useState('');
  const emailref=useRef(null);
    const handleLogin=(e)=>{
      setRegesterError("");
      setSucess("")
       e.preventDefault();
        const email=e.target.email.value;
        const password=e.target.password.value;
        console.log(email,password);
        signInWithEmailAndPassword(auth,email,password)
        .then(result=>{
          const a=result.user;
          console.log(a);
          if (a.emailVerified) {
            setSucess("user Created Sucessfully")
          }
          else{
            alert("please verified your email adress ")
          }
        }).catch(error=>{
            console.error(error.message)
            setRegesterError(error.message)
        })
    }


    const handleResetPassword=()=>{
      const emaile=emailref.current.value;
      console.log(emaile);
      if (!emaile) {
         alert("please provide a valid email");
         return        
      }
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emaile)) {
        alert("Please provide a valid email format email");
        return;
      }
      sendPasswordResetEmail(auth,emaile)
      .then(()=>{
        alert("please check your email")
      })
      .catch(error=>{
        console.log(error);
      })
    }
    return (
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name='email' ref={emailref} placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                <label className="label">
                  <a onClick={handleResetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            {
            regesterError && <p className="text-red-500 text-2xl">{regesterError}</p>
        }
        {
            sucess && <p className="text-green-500 text-2xl">{sucess}</p>
        }
        <p>New to this website? Please<Link className="btn bg-purple-400 text-white ml-5" to={"/regester"}>Regester</Link></p>
          </div>
        </div>
      </div>
    );
};

export default Login;