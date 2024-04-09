import { useEffect, useRef, useState } from "react";
import useAuthContext from "../hooks/useAuthContext"
import { useLogout } from "../hooks/useLogout"
import UseUpdateUser from "../hooks/useUpdateUser";
import app from "../firebase";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from 'firebase/storage';

export default function UsreProfil() {
    const {user} =useAuthContext()
    const {logout}=useLogout()
    const [username,setUsername]=useState(user.username)
    const [email,setEmail]=useState(user.email)
    const [password,setPassword]=useState('')
    const {updateUser,error,isLoding} =UseUpdateUser()
    const fileRef=useRef(null)
    const [file, setFile] = useState(undefined);
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});
    console.log(filePerc)
    console.log(formData)
    console.log(fileUploadError)

    const handleLogout = ()=>{
        logout()
    }
    const handleClick = async() => {
        await updateUser(username,email,password)
    }
    const handleDlete = () => {

    }
    useEffect(() => {
        if (file) {
          handleFileUpload(file);
        }
      }, [file]);
    
      const handleFileUpload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setFilePerc(Math.round(progress));
          },
          (error) => {
            setFileUploadError(true);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
              setFormData({ ...formData, avatar: downloadURL })
            );
          }
        );
      };
    return (
        <>
            <div className="p-3 max-w-lg mx-auto">
                <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
                <form onSubmit={e=>e.preventDefault()} className="flex flex-col gap-1">
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} ref={fileRef} hidden accept="image/*"  />
                <img src={formData.avatar || user.avtare} onClick={()=>fileRef.current.click()} className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" alt="profile" />
                <p className='text-sm self-center'>
                    {fileUploadError ? (
                        <span className='text-red-700'>
                        Error Image upload (image must be less than 2 mb)
                        </span>
                    ) : filePerc > 0 && filePerc < 100 ? (
                        <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
                    ) : filePerc === 100 ? (
                        <span className='text-green-700'>Image successfully uploaded!</span>
                    ) : (
                        ''
                    )}
                    </p>
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
