
"use client";

import { useState } from "react";
// import { LogoutUser } from "@/actions/actions";

const LoginButton = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <>
      <button
        // onClick={() => LogoutUser()}
        className="bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md transition duration-300"
      >
        Logout
      </button>

      
    </>
  );
};

export default LoginButton;
