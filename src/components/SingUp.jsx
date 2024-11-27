import React, { useState } from "react";
import authobj from "../appwrite/auth-service";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../redux/userSlice";
import Button from "./Button.jsx";
import Input from "./Input.jsx";
import Logo from "./logo/Logo.jsx";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function SingUpComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const singup = async (data) => {
    console.log(data);
    setError("");
    try {
      const response = await authobj.createAccount(data);
      if (response) {
        const userdata = await authobj.getcurrentuser();
        if (userdata) {
          dispatch(login(userdata));
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  return (
    <div className="flex w-full justify-center items-center min-h-screen bg-gray-900 bg-[radial-gradient(#4B5563_1px,transparent_1px)] [background-size:16px_16px] py-8">
      <div className="mx-auto w-full max-w-lg bg-gray-800 rounded-2xl p-10 border border-gray-700 shadow-lg">
        <div className="mb-2 flex w-full justify-center">
          <span className="w-full text-center mb-4">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-3xl font-bold leading-tight text-white">
          Create Your Account
        </h2>
        <p className="text-center text-gray-300 mt-2 font-medium">
          Join us to get started
        </p>
        {error && <p className="text-red-400 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(singup)} className="mt-8">
          <div className="space-y-6">
            <Input
              label="Name"
              placeholder="Enter Your Name"
              type="text"
              className="focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              {...register("name", { required: true })}
            />
            <Input
              label="Email"
              placeholder="Enter Your Email"
              type="email"
              className="focus:ring-2 focus:ring-purple-500 transition-all duration-300"
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
              className="focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              {...register("password", { required: true })}
            />
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] font-medium text-lg shadow-md"
            >
              Sign Up
            </Button>
          </div>
        </form>
        <div className="relative flex py-3 items-center">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="flex-shrink mx-4 text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>
        <p className="text-center text-gray-300">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-white hover:text-gray-400 transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SingUpComponent;
