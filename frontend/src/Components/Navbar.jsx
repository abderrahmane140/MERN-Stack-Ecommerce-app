import { Link } from 'react-router-dom'
import useAuthContext from '../hooks/useAuthContext'
import { FaUser } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { IoHeartSharp } from "react-icons/io5";
const Navbar = () => {
    const { user } = useAuthContext()
    return (
        <header>
            <nav>
                <div className="container">
                        <div className="logo">
                            <Link to="/">Hello.</Link>
                        </div>
                        <div className="links">
                            <Link to='products'>Products</Link>
                        </div>
                        
                        {user && (
                            <div className='icons'>
                                <Link to="/fav"><IoHeartSharp style={{fontSize:"20px"}} /></Link>
                                <Link to="/AddCard"><LuShoppingCart style={{fontSize:"20px"}} /></Link>
                                <Link to='/user'><FaUser /></Link>
                            </div>
                        )}
                        {!user && (
                            <div className='auth'>
                                <Link className='login' to="/login">Login</Link>
                                <Link className='signup' to="/signup">Signup</Link>
                            </div>
                        )}
                </div>
            </nav>
        </header>
    )
}

export default Navbar