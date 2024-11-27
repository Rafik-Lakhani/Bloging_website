import React from 'react'

function Logo({width}) {
  return (
    <div className="flex items-center">
      <h1 
        className="text-3xl font-sans font-extrabold tracking-tight bg-gradient-to-r 
        from-blue-600 to-purple-600 text-transparent bg-clip-text hover:from-blue-500 
        hover:to-purple-500 transition-all duration-300 border-b-2 border-transparent 
        hover:border-purple-500"
        style={{width: width}}
      >
        TheBlog
      </h1>
    </div>
  )
}

export default Logo