import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Outlet } from "react-router-dom";
import authobj from "./appwrite/auth-service";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "./redux/userSlice";

function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    authobj
      .getcurrentuser()
      .then((userdata) => {
        if (userdata) {
          dispatch(login(userdata));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(true);
      });
  }, []);

  return (
    // here Loading screen
    !loading ? (
      <div className="w-full h-screen bg-gray-900 bg-[radial-gradient(#4B5563_1px,transparent_1px)] [background-size:16px_16px] ">
        <h1 className="text-4xl min-h-screen text-center text-white">
          Loading....
        </h1>
      </div>
    ) : (
      <>
        <div className="min-h-screen w-full flex flex-col content-center items-center justify-between font-sans">
          <div className="flex flex-col  w-full min-h-screen mx-auto justify-between">
            <Header />
            <Outlet />
            <Footer />
          </div>
        </div>
      </>
    )
  );
}

export default App;
