import { useState } from "react"
import useLogin from "../hooks/useLogin"
import {Link} from "react-router-dom"
import OAuth from "../Components/OAuth"
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login,error,isLoading} = useLogin()
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        await login(email,password)
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
        <h3>Log In</h3>
        
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
        <button disabled={isLoading}>{isLoading?"LOADING...":"LOG IN"}</button>
        <OAuth/>
        <span className="m-2">Don't have an account?</span>
        <Link style={{textDecoration:"none",fontWeight:"600"}} to='/signup' >Sign up</Link>
        {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Login