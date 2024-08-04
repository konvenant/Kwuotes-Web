"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { loginUser } from '@/app/lib/actions';
import StateModal from '@/components/ui/modal';
import { useAuth } from '../../../contexts/AuthContext';


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      setIsLoading(true)
     const response = await loginUser(username,password)
     
     if(response.status === 0){
     setIsLoading(false)
      toast(response.message);
      alert(response.message)
     } else{
      setIsLoading(false)
      toast(response.message)
      login(response.data);
      router.push("/dashboard")
     }
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoading(false)
      toast("Login failed")
      alert("Login failed")
    }
  };

  return (
    <div className="container">
         {
          isLoading ? 
          <StateModal
          isOpen={true}
          message='Loading'
          onClose={()=>{}}  
          /> :
          <>
          <Image 
      src="/logo1.png" 
       alt="Logo" 
       width={90} height={90}
      />
      <form onSubmit={handleSubmit}>
        <h1 style={{color: '#fff'}}>Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>

         <Link style={{color: '#fff'}} href="/register" >Dont have an account?,Register now</Link>
         <Link style={{color: '#fff'}} href="/reset">Reset Password</Link>
      </form>
          </>
         }
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }

        .container h1{
         color: white
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        input, button {
          padding: 0.5rem;
          font-size: 1rem;
        }
        button {
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
}
