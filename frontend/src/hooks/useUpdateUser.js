import { useState } from "react"

export default function UseUpdateUser() {
    const [isLoding,setIsLoding] =useState(false)
    const [error,setError] =useState(false)
    const updateUser =async (username,email,password) => {
        setIsLoding(true)
        setError(null)

        const response = await fetch("/api/user",{
            method:"PUT",
            headers : {"Content-Type":"application/json"},
            body:JSON.stringify({username,email,password})
        })
        const json=await response.json()

        if (!response.ok) {
            setIsLoding(false)
            setError(json.error)
        }
    }
    return {updateUser,error,isLoding}
}
