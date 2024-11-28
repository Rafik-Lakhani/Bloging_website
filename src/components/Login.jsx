import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authlogin } from "../redux/userSlice.js";
import Button from "./Button.jsx";
import Input from "./Input.jsx";
import Logo from "./logo/Logo.jsx";
import { useDispatch } from "react-redux";
import authobj from "../appwrite/auth-service.js";
import { useForm } from "react-hook-form";

function LoginComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    console.log(data);
    try {
      const session = await authobj.login(data);
      if (session) {
        const userdata = await authobj.getcurrentuser();
        if (userdata) {
          dispatch(authlogin(userdata));
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex w-full justify-center items-center min-h-screen bg-gray-900 bg-[radial-gradient(#4B5563_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="mx-auto w-full max-w-lg bg-gray-800/95 backdrop-blur-xl rounded-2xl p-10 border border-gray-700 shadow-[0_8px_40px_rgb(0,0,0,0.2)] hover:shadow-[0_8px_50px_rgb(0,0,0,0.25)] transition-all duration-300">
        <div className="mb-2 flex w-full justify-center">
          <span className="w-full text-center mb-4">
            <Logo width={"100%"} />
          </span>
        </div>
        <h2 className="text-center text-3xl font-bold leading-tight text-white">
          Welcome Back
        </h2>
        <p className="text-center text-gray-400 mt-2 font-medium">
          Please sign in to continue
        </p>
        {error && <p className="text-red-400 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-6">
            <Input
              label="Email"
              placeholder="Enter Your Email"
              type="email"
              className="bg-gray-700 text-white focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password"
              placeholder="Enter Your Password"
              type="password"
              className="bg-gray-700 text-white focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              {...register("password", {
                required: true,
              })}
            />
            <Button
              type="submit" 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] font-medium text-lg shadow-md"
            >
              Sign In
            </Button>
            <div className="relative flex py-3 items-center">
              <div className="flex-grow border-t border-gray-700"></div>
              <span className="flex-shrink mx-4 text-gray-500">or</span>
              <div className="flex-grow border-t border-gray-700"></div>
            </div>
            <p className="text-center text-gray-400">
              Don&apos;t have any account?&nbsp;
              <Link
                to="/signup"
                className="font-medium text-purple-400 hover:text-purple-300 transition-all duration-200 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginComponent;
