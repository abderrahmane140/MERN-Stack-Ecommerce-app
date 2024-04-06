import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext"
import { useLogout } from "../hooks/useLogout"
import { TbLogout2 } from "react-icons/tb";
import UseUpdateUser from "../hooks/useUpdateUser";


export default function UsreProfil() {
    const {user} =useAuthContext()
    const {logout}=useLogout()
    const [username,setUsername]=useState(user.username)
    const [email,setEmail]=useState(user.email)
    const [password,setPassword]=useState('')
    const {updateUser,error,isLoding} =UseUpdateUser()
    const handleLogout = ()=>{
        logout()
    }
    const handleClick = async() => {
        await updateUser(username,email,password)
    }
    const handleDlete = () => {

    }
    return (
        <>
            <div className="flex justify-center">
                <img src={user.avtare}  alt="hh" />
            </div>
            <div className="user">
                <form onSubmit={e=>e.preventDefault()}>
                    <input type="text" placeholder="email" value={user.email} onChange={e=>setEmail(e.target.value)} />

                    <input type="text" placeholder="username" value={user.username} onChange={e=>setUsername(e.target.value)} />

                    <input type="text" placeholder="password" onChange={e=>setPassword(e.target.value)}/>

                    <button onClick={handleClick} disabled={isLoding}>{isLoding?"LOADING...":"UPDATE"}</button>

                    <div className="flex justify-between">
                        <span className="mt-4 cursor-pointer" onClick={handleLogout}>logout</span>
                        
                        <span className="mt-4 cursor-pointer" onClick={handleDlete}>Delete</span>
                    </div>

                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </>
    )
}
