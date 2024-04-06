import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import useAuthContext from "../hooks/useAuthContext"
export default function ProductDetail() {
    const {id} =useParams()
    const {user}=useAuthContext()
    const [data,setData]=useState({})
    useEffect(()=>{
        const fetchData = async () =>{
            const response = await fetch(`/api/products/${id}`,{
                headers:{"Authorization":`Bearer ${user.token}`}
            })
            const json= await response.json()

            if(response.ok){
                setData(json)
            }
        }
        if(user){
            fetchData()
        }
    },[user,id])
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-6 col-sm-12">
                    
                </div>
                <div className="col-lg-6 col-sm-12">
                    <h3>{data.title}</h3>
                    <p>{data.description}</p>
                    <p>{data.price}</p>
                    <button>add to card</button>
                </div>
            </div>
        </div>
    )
}
