import { useState } from "react"
import useAuthContext from "./useAuthContext"

export default function useLogin() {
    const [isLoding,setIsLoding] =useState(false)
    const [error,setError] =useState(false)
    const {dispatch} =useAuthContext()


    const login = async (email, password) => {
        setIsLoding(true)
        setError(null)

        const response = await fetch('/api/user/login' ,{
            method:"POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({email,password})
        })
        const json =await response.json()
        if (!response.ok) {
            setIsLoding(false)
            setError(json.error)
        }
        if (response.ok) {
            //save the user to lacol storage
            localStorage.setItem('user',JSON.stringify(json))

            //update the auth context
            dispatch({type: "LOGIN" , payload: json})

            setIsLoding(false)
        }
    }
    return { login, isLoding, error}
}
