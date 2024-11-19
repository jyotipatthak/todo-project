import React from "react";
import { MdWorkOutline } from "react-icons/md";
import { LuListTodo, LuGithub } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/project-page");
    } else {
      navigate("/login");
    }
  };

  return (
    
      <div className="landing-page h-[85vh] flex flex-col items-center justify-between p-6 bg-gray-100">
        {/* Hero Section */}
        <div className="hero flex flex-col items-center text-center py-16">
          <h1 className="text-4xl text-custom-blue font-bold mb-4">
            Focus Forward & Maintain Discipline
          </h1>
          <p className="text-lg mb-6 text-gray-500">
            Organize your work, keep track of tasks, and connect effortlessly.
          </p>
          <button
            onClick={handleGetStarted}
            className="text-lg font-semibold px-6 py-2 shadow hover:bg-blue-950 hover:text-white transition bg-blue-600 rounded-lg text-black"
          >
            Get Started
          </button>
        </div>

        
       

      {/* Footer Section */}
      <div className="text-sm text-center mt-5 text-gray-600 mb-3 md:mb-0">
         Todos-Web-App © {new Date().getFullYear()}. All rights reserved. Helping you organize and track your goals.
      </div>
    </div>

    
  );
}

export default Home;
