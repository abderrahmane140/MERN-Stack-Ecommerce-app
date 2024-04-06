import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import App from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAuthContext from '../hooks/useAuthContext';


export default function OAuth() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {dispatch} =useAuthContext()

    const handleGoogleClick = async () => {
        try {
            setLoading(true);

            const provider = new GoogleAuthProvider();
            const auth = getAuth(App);

            const result = await signInWithPopup(auth, provider);

            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            });
            const data = await res.json();

            if (res.ok) {

                localStorage.setItem('user',JSON.stringify(data))

                //update the auth context
                dispatch({type: "LOGIN" , payload: data})
                navigate('/');
            } else {
                const errorData = await res.json();
                console.error('Error during Google authentication:', errorData.error);
            }
        } catch (error) {
            console.error('Could not sign in with Google:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleGoogleClick}
            type='button'
            className={`bg-red-700 text-white p-2 rounded-lg uppercase hover:opacity-95 ${loading ? 'cursor-not-allowed' : ''}`}
            disabled={loading}
        >
            {loading ? 'Signing in...' : 'Continue with Google'}
        </button>
    );
}
