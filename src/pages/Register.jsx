import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './Page.css'
import axios from 'axios';



const Register = () => {
  const [email, setEmail] = useState('')
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const navigate = useNavigate()



  const register = event => {
    event.preventDefault()
 
    if (password === password2) {
        axios.post('http://localhost:1337/api/users',
            {username: userName, email, password, 
                role: 2,
                confirmed: true 
            })
            .then(() => navigate('/login'))
            .catch(err => console.log(err))
    } else {
        alert('Password do not match !')
    }
    if(password.length <= 3){
      alert('Password must be 6 letters !')
    }
}
  
  return (
    <div>
      <form className="form2" onSubmit={event => register(event)}>
        <p className="title2">Register </p>
        <p className="message2">Signup now and get full access to our app ! </p>
          <label className='label2'>
              <input
                id='userName'
                onInput={event => setUsername(event.target.value)}
                value={userName} 
                required="" 
                placeholder="username" 
                type="text" 
                className="input2"
              />
          </label>
 
          <label className='label2'>
              <input 
                required="" 
                id='email'
                onInput={event => setEmail(event.target.value)}
                value={email}
                placeholder="Email" 
                type="email" 
                className="input2"
              />
          </label> 
          
          <label className='label2'>
              <input 
                required="" 
                id='password'
                onInput={event => setPassword(event.target.value)}
                value={password}
                placeholder="Password" 
                type="password" 
                className="input2"
              />
          </label>
          <label className='label2'>
              <input 
                required="" 
                id='confPassword'
                onInput={event => setPassword2(event.target.value)}
                value={password2}
                placeholder="Confirm Password" 
                type="password" 
                className="input2"
              />
          </label>

        <button className="submit2">
          Submit
        </button>

        <p className="signin2">
          Already have an acount ? 
          <Link to="/login" className='log-in'>Login</Link> 
        </p>
      </form>
    </div>
  )
}

export default Register