import { createUserWithEmailAndPassword } from 'firebase/auth';
import{auth,db} from "./firebase";
import{setDoc,doc} from "firebase/firestore";
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { Form, Link } from 'react-router-dom';


const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp =  async(e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth,email,password);
            const user = auth.currentUser;
            console.log(user);
    
            if(user){
                await setDoc(doc(db,"Users",user.uid),{
                    email:user.email,
                    username: username,
                })
            }
            console.log("successfully");
            toast.success('User logged in successfully"',{
              position:'top-center'
            });
            //alert('Signup successful!');  
        } catch (error) {
            console.log(error.message);
            toast.error(error.message,{
              position:'bottom-center'
            });
          
      
        }


        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Confirm Password:', confirmPassword);
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError('');
         
      };
    

      return (
        <div className="signUpContainer">
          <h2>Sign Up</h2>
          <div>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <button onClick={handleSignUp}>Sign Up</button>
          <h3>Already signUp <Link to="/">Login</Link> here!</h3>
          {error && <div className="error-message">{error}</div>}
        </div>
      );
    };

export default SignUp;
