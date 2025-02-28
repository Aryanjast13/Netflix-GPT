import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/auth";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userslice";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  const Name = useRef(null);
  const Email = useRef(null);
  const Password = useRef(null);

  const handleButtonClick = () => {
    //validate funtion
    const message = checkValidData(
      Email.current.value,
      Password.current.value,
      Name?.current?.value
    );
    setErrorMessage(message);
    if (message) return;

    if (!isSignIn) {
      createUserWithEmailAndPassword(
        auth,
        Email.current.value,
        Password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: Name.current.value,
          })
            .then(() => {
              // Profile updated!
              const { uid, displayName, email } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, displayName: displayName, email: email })
              );

              // ...
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
              // ...
            });

          //console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        Email.current.value,
        Password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          // ...
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="relative">
      <Header />
      <div className=" h-screen overflow-hidden ">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/0cf2c109-3af1-4a9d-87d7-aecfac5fe881/web/IN-en-20250217-TRIFECTA-perspective_c3376e06-9aff-4657-aafb-91256a597b7c_large.jpg"
          alt="background"
        />
        <div className="absolute top-0 bg-black h-screen w-screen opacity-55"></div>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute z-10 right-0 left-0 top-40 mx-auto px-14 py-12 bg-black opacity-75 w-[23vw] text-white rounded-lg "
      >
        <h1 className="text-4xl font-bold  mb-6 ">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            ref={Name}
            type="text"
            placeholder="User Name"
            className="my-4 p-4 w-full bg-transparent outline-1 rounded-md focus:border-3"
          />
        )}
        <input
          ref={Email}
          type="text"
          placeholder="Email"
          className="my-4 p-4 w-full bg-transparent outline-1 rounded-md focus:border-3"
        />
        <input
          ref={Password}
          type="password"
          placeholder="Password"
          className="my-4 p-4 w-full bg-transparent outline-1 rounded-md focus:border-3"
        />
        <p className="text-red-700 font-medium">{errorMessage}</p>
        <button
          className="bg-red-600 py-4 mt-8 w-full font-medium rounded-md cursor-pointer hover:bg-red-700 "
          onClick={handleButtonClick}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="my-6 cursor-pointer select-none">
          {isSignIn ? "New to Netflix? " : "Already have account? "}
          <span
            className="font-bold hover:underline"
            onClick={toggleSignInForm}
          >
            {isSignIn ? "Sign up now" : "Sign in now"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
