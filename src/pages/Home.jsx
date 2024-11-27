import React, { useEffect, useState } from "react";
import PostService from "../appwrite/post-service";
import Container from "../components/container/Container";
import PostCard from "../components/PostCard";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isLogin = useSelector((state) => state.user.status);

  if (isLogin) {
    useEffect(() => {
      PostService.getallpost().then((post) => {
        if (post) {
          setPosts(post.documents);
          setIsLoading(false);
        }
      });
    }, []);
  }else{
    return (
      <div className="min-h-screen bg-gray-900 bg-[radial-gradient(#4B5563_1px,transparent_1px)] [background-size:16px_16px]">
        <h1 className="text-center text-3xl text-white font-semibold py-12">
          Please Login To See All Posts
        </h1>
      </div>
    )
  }
  return isLoading ? (
    <div className="min-h-screen bg-gray-900 bg-[radial-gradient(#4B5563_1px,transparent_1px)] [background-size:16px_16px]">
      <h1 className="text-center text-3xl text-white font-semibold py-12 animate-pulse">
        Loading All The Posts...
      </h1>
    </div>
  ) : posts.length == 0 ? (
    <div className="min-h-screen bg-gray-900 bg-[radial-gradient(#4B5563_1px,transparent_1px)] [background-size:16px_16px]">
      <h1 className="text-center text-3xl text-white font-semibold py-12">
        Not Post Found
      </h1>
    </div>
  ) : (
    <div className="min-h-screen bg-gray-900 bg-[radial-gradient(#4B5563_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="w-full py-12">
        <Container>
          <div className="bg-gray-800/95 backdrop-blur-xl rounded-2xl p-10 border border-gray-700 shadow-[0_8px_40px_rgb(0,0,0,0.2)] hover:shadow-[0_8px_50px_rgb(0,0,0,0.25)] transition-all duration-300">
            <h2 className="text-center text-4xl font-bold text-white mb-8 border-b-2 border-gray-700 pb-4">
              All Posts
            </h2>
            <div className="flex flex-wrap gap-8 items-start justify-center">
              {posts.map((post) => (
                <div key={post.$id} className="transform hover:scale-105 transition-transform duration-300">
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Home;
