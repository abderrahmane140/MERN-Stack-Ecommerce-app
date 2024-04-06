import { useState } from "react"
import useSignup from "../hooks/useSignup"
import {Link} from "react-router-dom"
import OAuth from "../Components/OAuth"

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const {signup,error,isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(username,email,password)
    }
    
    return (
        <form className="signup" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        

        <input 
            type="usernam" 
            onChange={(e) => setUsername(e.target.value)} 
            value={username}
            placeholder="Usernam" 
        />

        <input 
            type="email" 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            placeholder="Email" 
        />

        <input 
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            placeholder="Password" 
        />

        <button disabled={isLoading}>{isLoading?"LOADING...":"SIGN UP"}</button>
        <OAuth/>
        <span className="m-2">Already have a account?</span>
        <Link style={{textDecoration:"none",fontWeight:"600"}} to='/login' >Log in</Link>
        {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup