import React from 'react'
import { Link } from 'react-router-dom'
import PostService from '../appwrite/post-service.js'
import parse from "html-react-parser";

function PostCard({post}) {
  return (
    <div className="bg-gray-800/95 w-[250px] h-[300px] backdrop-blur-xl rounded-xl border border-gray-700 shadow-lg overflow-hidden hover:scale-[1.02] transition-transform duration-300">
      <Link to={`/post/${post.$id}`}>
        <div className="relative">
          <img 
            src={PostService.getfile(post.featuredimage)} 
            className="w-full h-48 object-cover"
            alt={post.title} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold text-white mb-2 line-clamp-2">{post.title}</h2>
          <p className="text-gray-400 text-sm line-clamp-3">{parse(post.content)}</p>
        </div>
      </Link>
    </div>
  )
}

export default PostCard