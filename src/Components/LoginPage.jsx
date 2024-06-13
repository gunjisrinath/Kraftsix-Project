import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href="/Home";
      console.log("User logged in successfully");
      toast.success('User logged in successfully"',{
        position:'top-center'
      });

      //alert("login Successfully")
    } catch (error) {
      console.log(error.message);
      toast.error('Login failed. Please check your credentials.',{
        position:'bottom-center'
      });
    
    }
  };

  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button onClick={handleLogin}>Login</button>
      <h3>
        New User? <Link to="/signup">SignUp</Link> here!
      </h3>
    </div>
  );
};

export default LoginPage;
