import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './Components/Navbar';
import useAuthContext from './hooks/useAuthContext';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import UsreProfil from './pages/UsreProfil';
import Footer from './Components/Footer';
import Favorites from './pages/Favorites';
import AddToCard from './pages/AddToCard';


function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={user ? <Home />:<Navigate to="/login" /> } 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" /> } 
            />
            <Route 
              path="/signup" 
              element={!user ?<Signup /> : <Navigate to="/" />} 
            />
            <Route
            path='/products'
            element={user ?<Products />:<Navigate to="/login" />}/>

            <Route path='/productDetail/:id' element={<ProductDetail />}/>

            <Route path="/user" element={user?<UsreProfil/>:<Navigate to="/login"/>} />
            
            <Route path="/fav" element={user?<Favorites/>:<Navigate to="/login"/>} />

            <Route path="/AddCard" element={user?<AddToCard/>:<Navigate to="/login"/>} />
          </Routes>
          
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;