import React from 'react'
import  Container  from '../components/container/Container'
import PorstForm from '../components/postform/PorstForm'
function AddPost() {
  return (
    <div className="min-h-screen bg-gray-900 bg-[radial-gradient(#4B5563_1px,transparent_1px)] [background-size:16px_16px]">
      <div className='py-8'>
        <Container>
          <div className="bg-gray-800/95 backdrop-blur-xl rounded-2xl p-10 border border-gray-700 shadow-[0_8px_40px_rgb(0,0,0,0.2)] hover:shadow-[0_8px_50px_rgb(0,0,0,0.25)] transition-all duration-300">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">
              Add New Post
            </h2>
            <PorstForm />
          </div>
        </Container>
      </div>
    </div>
  )
}

export default AddPost