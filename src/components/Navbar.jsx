import React from 'react'

const Navbar = () => {
  return (
    <div>
 <nav className="flex items-center">
        <div className="border-b-2 border-r-2 border-white w-[50%] py-6 px-4">
          Logo
        </div>
        <div className="border-b-2 border-r-2 border-white w-[20%]  py-6 px-4">
          <h1>Login to Stark Portal</h1>
        </div>
        <div className="border-b-2 border-r-2 border-white w-[20%]  py-6 px-4">
          <h1>Login to Stark Research</h1>
        </div>
        <h1 className="border-b-2 border-white w-[10%] py-6 pl-4">Menu</h1>
      </nav>
    </div>
  )
}

export default Navbar