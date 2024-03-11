import React from 'react'
import Navbar from '../components/Navbar'

const AdminLayout = ({children}) => {
  return (
    <>  
    <Navbar></Navbar>
    <div className='container mx-auto w-full h-full pt-[75px] px-4'>{children}</div> 
    </>
  )
}

export default AdminLayout