import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import image from "../Assessts/files.png"


const Login = () => {
  const [email,setEmail]= useState('');
  const [password,setPassword]= useState('');
  const [error,setError] = useState('');
  const navigate = useNavigate();


// const navigate=useNavigate()
// const location=useLocation(); for url changing controling
// const isAdmin=location.pathname.startsWith("/admin);

 const handleLogin= (e) =>{
    e.preventDefault();

    if(!email || !password){
        setError("Please fill all fields");
        return;
    }
    if(email === 'user@example.com' && password === 'password123'){
        alert('Login Successful');
        navigate("/dashboard");
    }else{
        setError('Invalid credentials')
    }
 }
    return (
    <>
<div className="flex min-h-screen text-justify">
    {/* Left Side Text */}
    <div className="w-1/3 bg-custom-blue text-white p-8 flex flex-col pt-48">
      <h2 className="text-4xl font-bold mb-4 animate-slideIn">Welcome Back!</h2>
      <p className="text-lg mb-6">Please log in to manage your events and make them unforgettable!</p>
      <p className="text-justify leading-relaxed tracking-wide">Don't have an account? <a href="/signup" className="font-extrabold">Sign Up</a></p>
      <img 
  src={image} 
  className="w-56 h-60 mt-8 rounded-lg  rotate-animation"
/>
    </div>

     {/* Right Side Login Form */}
<div className="flex justify-center items-center w-full bg-white rounded-lg ">
  <div className="w-full max-w-lg min-h-[550px] border border-dashed p-12 shadow-2xl">
    <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

    <form onSubmit={handleLogin} className='my-10'>
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700" htmlFor="email">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-6">
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

      <button
        type="submit"
        className="w-full p-3 bg-custom-blue text-white font-semibold rounded-lg hover:transition duration-200"
      >
        Login
      </button>
    </form>

    <div className="mt-4 text-center">
      <p className="text-sm text-gray-600">
        Don't have an account?{" "}
        <button
          onClick={() => navigate("/signup")}
          className="text-custom-blue"
        >
          Sign Up
        </button>
      </p>
    </div>
  </div>
</div>

   

</div>


</>
  )
}

export default Login


