import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email,setEmail]= useState('');
  const [password,setPassword]= useState('');
  const [error,setError] = useState('');
  const navigate = useNavigate();

 const handleLogin= (e) =>{
    e.preventDefault();

    if(!email || !password){
        setError("Please fill all fields");
        return;
    }
    if(email === 'user@example.com' && password === 'password123'){
        alert('Login Successful');
        //navigate("dashboard");
    }else{
        setError('Invalid credentials')
    }
 }
    return (
    <>
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <div className='bg-white p-8 rounded-lg shadow-lg max-w-sm w-full'>
            <h2 className='text-3xl font-bold text-center mb-6'>Login</h2>
            {error && <p className='text-red-50 text-center mb-4'>{error}</p>}

            <form onSubmit={handleLogin}>
                <div className='mb-4'>
                    <label className='block text-lg font-medium text-gray-700'htmlFor='email'>
                        Email Address
                    </label>
                    <input 
                    type='email'
                    id='email'
                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder='Enter your email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required/>
                </div>

                <div className='mb-6'>
                <label className="block text-lg font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
                </div>

                <button type='submit'
                className='w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200'
          >
Login
</button>
            </form>

       <div className='mt-4 text-center'>
        <p className='text-sm text-gray-600'>
            Don't have an account?{' '}
            <button onClick={()=>navigate('../Pages/Signup')}
            className='text-blue-500 hover:text-blue-700 font-medium'>
                Sign Up
            </button>
        </p>
       </div>

        </div>
      
    </div>
</>
  )
}

export default Login
