import React, { useState, useEffect } from 'react'
import PostCard from '../components/PostCard'
import Container from '../components/container/Container'
import PostService from '../appwrite/post-service'

function AllPost() {
  const [allpost, setAllpost] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    PostService.getallpost().then((allpost) => {
      if (allpost) {
        setAllpost(allpost.documents)
        setIsLoading(false)
      }
    })
  }, [])

  return isLoading ? (
    <div className="min-h-screen bg-gray-900 bg-[radial-gradient(#4B5563_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="py-12">
        <h1 className="text-center text-3xl text-white font-semibold animate-pulse">
          Loading Posts...
        </h1>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-gray-900 bg-[radial-gradient(#4B5563_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="w-full py-12">
        <Container>
          <div className="bg-gray-800/95 backdrop-blur-xl rounded-2xl p-10 border border-gray-700 shadow-[0_8px_40px_rgb(0,0,0,0.2)] hover:shadow-[0_8px_50px_rgb(0,0,0,0.25)] transition-all duration-300">
            <h2 className="text-center text-4xl font-bold mb-8 text-white">
              All Posts
            </h2>
            <div className="flex flex-wrap gap-8 items-start justify-center">
              {allpost.map((post) => (
                <div key={post.$id} className="transform hover:scale-105 transition-transform duration-300">
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default AllPost