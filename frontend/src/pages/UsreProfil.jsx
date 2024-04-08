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
            <div className="p-3 max-w-lg mx-auto">
                <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
                <form onSubmit={e=>e.preventDefault()} className="flex flex-col gap-1">
                <img src={user.avtare} className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" alt="profile" />
                    <input type="text" placeholder="email" className="border p-2 rounded-lg" id="email" onChange={e=>setEmail(e.target.value)} />

                    <input type="text" placeholder="username"  className="border p-2 rounded-lg" id="username"  onChange={e=>setUsername(e.target.value)} />

                    <input type="text" placeholder="password" className="border p-2 rounded-lg" id="password" onChange={e=>setPassword(e.target.value)}/>

                    <button className="bg-slate-700 text-white rounded-lg p-2 upercase hover:opacity-95 disabled:opacity-80" onClick={handleClick} disabled={isLoding}>{isLoding?"LOADING...":"UPDATE"}</button>

                    <div className="flex justify-between mt-3">
                        <span className="text-red-700 font-medium cursor-pointer" onClick={handleLogout}>Sign out</span>
                        
                        <span className="text-red-700 font-medium cursor-pointer" onClick={handleDlete}>Delete</span>
                    </div>

                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </>
    )
}
