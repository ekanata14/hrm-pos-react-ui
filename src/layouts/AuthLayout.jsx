import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className="flex items-center justify-center h-full flex-col">
      {children}
    </div>
  )
}

export default AuthLayout