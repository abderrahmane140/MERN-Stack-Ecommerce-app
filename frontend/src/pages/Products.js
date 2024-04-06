import { useEffect, useState } from "react"
import useAuthContext from "../hooks/useAuthContext"
import {Link} from "react-router-dom"

export default function Products() {
    const [data,setData] =useState()
    const {user}= useAuthContext()
    useEffect(()=>{
        const fetchData = async ()=>{
            const response= await fetch('/api/products',{
                headers: {'Authorization':`Bearer ${user.token}`}
            })
            const json =await response.json()

            if(response.ok){
                setData(json)
            }
        }
        if(user){
            fetchData()
        }
    },[user])
    return (
        <div className='container'>
            <div className="row">
                {data && data.map(item=>(
                    <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
                        <Link to={`/productDetail/${item._id}`}>
                        <div className="card" style={{width:"20rem",height:"13rem"}} key={item.id}>
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p>{item.price}</p>
                            </div>
                        </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}