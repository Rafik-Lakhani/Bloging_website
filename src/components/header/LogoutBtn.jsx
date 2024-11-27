import React from 'react'
import { useDispatch } from 'react-redux'
import authobj from '../../appwrite/auth-service.js'
import {logout} from '../../redux/userSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logouthandel= ()=>{
        authobj.logout().then(()=>{
            dispatch(logout())
        }).catch((error) => {
            console.error('Failed to logout', error)
        })
    }
  return (
    <button 
      className='inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 
      text-white font-medium rounded-lg shadow-md hover:from-red-600 hover:to-red-700 
      transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 
      focus:ring-red-500 focus:ring-opacity-50'
      onClick={logouthandel}
    >
      <svg 
        className="w-5 h-5 mr-2" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
        />
      </svg>
      Logout
    </button>
  )
}

export default LogoutBtn