"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { resetPassword } from '@/app/lib/actions';
import StateModal from '@/components/ui/modal';

export default function ResetPassword() {
  const [username, setUsername] = useState('');
  const [favoriteColor, setFavoriteColor] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading,setIsLoading] = useState(false)
  const router = useRouter();

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      setIsLoading(true)
     const response = await resetPassword(username,favoriteColor,newPassword);
    
     if(response.status = 0){
     setIsLoading(false)
      toast(response.message);
      alert(response.message)
     } else{
      setIsLoading(false)
      toast(response.message)
      router.push("/login")
     }
    } catch (error) {
      console.error('Reset failed:', error);
      setIsLoading(false)
      toast("Reset failed")
      alert("Reset failed")
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
        <h1 style={{color: '#fff'}}>Reset Password</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Favorite Color"
          value={favoriteColor}
          onChange={(e) => setFavoriteColor(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
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
