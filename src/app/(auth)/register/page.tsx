"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { RegisterUser } from '@/app/lib/actions';
import StateModal from '@/components/ui/modal';
import { useAuth } from '../../../contexts/AuthContext';


export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [favoriteColor, setFavoriteColor] = useState('');
  const [isLoading,setIsLoading] = useState(false)
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      setIsLoading(true)
     const response = await RegisterUser(username,password,favoriteColor);
     

     if(response.status === 0){
     setIsLoading(false)
      toast(response.message);
      alert(response.message)
     } else{
      setIsLoading(false)
      login(response.data);
      toast(response.message)
      router.push("/category")
     }
    } catch (error) {
      console.error('Signup failed:', error);
      setIsLoading(false)
      toast("Signup failed")
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
        <h1 style={{color: '#fff'}}>Signup</h1>
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
        <input
          type="text"
          placeholder="Favorite Color"
          value={favoriteColor}
          onChange={(e) => setFavoriteColor(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
        <Link style={{color: '#fff'}} href="/login" >Already have an account? Login now</Link>

      </form></>
   }
     
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
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
