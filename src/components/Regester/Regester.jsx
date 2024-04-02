import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import auth from "../../Firebase/Firebase.config";
import { useState } from "react";
import { FaRegEye,FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Regester = () => {
    const [regesterError,setRegesterError]=useState('')
    const [sucess,setSucess]=useState('');
    const [show,setShow]=useState(false);
    console.log(regesterError);
  const handleRegester=e=>{
    e.preventDefault();
    console.log("form submiting");
    const name=e.target.name.value;
    const email=e.target.email.value;
    const pasword=e.target.password.value;
    const accepted=e.target.terms.checked;
    setRegesterError("");
    setSucess("")
    console.log(name,email,pasword,accepted);
    if (pasword.length<6) {
        setRegesterError("password must be max atleast 6 char");
        return
    }
    else if (! /[A-Z]/.test(pasword)) {
        setRegesterError("password should have one uppercase letter");
        return;
    }
    else if (!accepted){
           setRegesterError("please accept our terms and condition ")
           return
    }

    
    createUserWithEmailAndPassword(auth,email,pasword)
    .then(result=>{
        const a=result.user;
        console.log(a);
        setSucess("user Created Sucessfully");
        sendEmailVerification(a)
        .then(()=>{
          alert("please check your email and verify your emial.")
        })
    })
    .catch(error=>{
        console.error(error);
        setRegesterError(error.message)
    })
  };
  const handleShow=()=>{
    console.log("show");
    setShow(!show)
  }
console.log(show);


  return (
    <div className="border min-h-screen flex justify-center bg-purple-200 items-center">
      <div className=" md:w-1/2">
        <h1 className="text-3xl font-bold mb-10 ">Please Regester</h1>
        <form onSubmit={handleRegester}> 
            <input className="mb-5 p-5 md:w-full rounded-lg" placeholder="please enter your name" type="text" name="name" id="" required />
            <br />
            <input type="email" className="mb-5 p-5 md:w-full rounded-lg" placeholder="please enter your email" name="email" id="" required/>
            <br />
            <input type={ show ? "text" :"password"} className=" p-5 md:w-full rounded-lg" placeholder="please enter your password" name="password"
             id=""  required/>
            <span className="cursor-pointer absolute " onClick={()=>handleShow(show)}>{
                show ? <FaEyeSlash />:<FaRegEye />
            }</span>
            <br />
            <input type="checkbox" name="terms" id="terms" />
            <label  htmlFor="terms"> <a>Accept our terms and condition </a></label>
            <br />
            <button className="btn bg-pink-400 md:w-full font-bold text-white">Regester</button>
        </form>
        {
            regesterError && <p className="text-red-500 text-2xl">{regesterError}</p>
        }
        {
            sucess && <p className="text-green-500 text-2xl">{sucess}</p>
        }
         <p>Already have an account? Please<Link className="btn bg-pink-400 text-white ml-5" to={"/login"}>Login</Link></p>
      </div>
    </div>
  );
};

export default Regester;
