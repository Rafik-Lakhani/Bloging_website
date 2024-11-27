import React from "react";
import { useEffect, useState } from "react";
import Container from "../components/container/Container";
import PorstForm from "../components/postform/PorstForm";
import PostService from "../appwrite/post-service";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();
  const navigater = useNavigate();

  useEffect(() => {
    if (slug) {
      PostService.getsinglepost(slug).then((post) => {
        if (post) {
          setPost(post);
          setIsLoading(false);
        } else {
          navigater("/");
        }
      });
    } else {
      navigater("/");
    }
  }, [slug, navigater]);

  return isLoading ? (
    <div className="min-h-screen bg-gray-900">
      <div className="py-12">
        <h1 className="text-center text-3xl text-white font-semibold animate-pulse">
          Loading Post...
        </h1>
      </div>
    </div>
  ) : post ? (
    <div className="min-h-screen bg-gray-900">
      <div className="py-12">
        <Container>
          <div className="bg-gray-800/95 backdrop-blur-xl rounded-2xl p-10 border border-gray-700 shadow-[0_8px_40px_rgb(0,0,0,0.2)] hover:shadow-[0_8px_50px_rgb(0,0,0,0.25)] transition-all duration-300">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">
              Edit Post
            </h2>
            <PorstForm post={post} />
          </div>
        </Container>
      </div>
    </div>
  ) : null;
}

export default EditPost;
