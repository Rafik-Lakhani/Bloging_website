import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PostService from "../appwrite/post-service";
import Button from "../components/Button";
import  Container  from '../components/container/Container'
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [Loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.user.userdata);

    const isAuthor = post && userData ? post.userid === userData.$id : false;


    useEffect(() => {
        if (slug) {
            PostService.getsinglepost(slug).then((post) => {
                if (post) {setPost(post);}
                else navigate("/");
                setLoading(false);
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        PostService.deletepost(post.$id).then((status) => {
            if (status) {
                PostService.deletefile(post.featuredimage);
                navigate("/");
            }
        });
    };

    return Loading ? (
        <div className="min-h-screen bg-gray-900 bg-[radial-gradient(#4B5563_1px,transparent_1px)] [background-size:16px_16px]">
            <h1 className="text-center text-3xl text-white font-semibold py-12 animate-pulse">Loading...</h1>
        </div>
    ) : post ? (
        <div className="min-h-screen bg-gray-900 bg-[radial-gradient(#4B5563_1px,transparent_1px)] [background-size:16px_16px] py-8">
            <Container>
                <div className="bg-gray-800/95 backdrop-blur-xl rounded-2xl p-8 border border-gray-700 shadow-lg">
                    <div className="w-full flex justify-center mb-4 relative rounded-xl p-2">
                        <img
                            src={PostService.getfile(post.featuredimage)}
                            alt={post.title}
                            className="rounded-xl w-1/2 max-w-md object-cover shadow-md"
                        />

                        {isAuthor && (
                            <div className="absolute right-6 top-6">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500" className="mr-3 hover:bg-green-600 transition-colors duration-300">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" onClick={deletePost} className="hover:bg-red-600 transition-colors duration-300">
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="w-full mb-6">
                        <h1 className="text-3xl font-bold text-white">{post.title}</h1>
                    </div>
                    <div className="browser-css text-gray-200">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : (
        <div className="min-h-screen bg-gray-900 bg-[radial-gradient(#4B5563_1px,transparent_1px)] [background-size:16px_16px]">
            <h1 className="text-center text-3xl text-white font-semibold py-12">Something went wrong, please try again</h1>
        </div>
    )
}