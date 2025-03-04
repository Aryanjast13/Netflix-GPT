import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { removeUser, addUser } from "../utils/userslice";
import { useSelector } from "react-redux";
import { LOGO, PROFILE_PIC } from "../utils/Constants";

const Header = () => {
  const [showAccount, setShowAccount] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email } = user;
        dispatch(addUser({ uid: uid, displayName: displayName, email: email }));
        navigate("/browse");
        // ...
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute px-10 pr-20 z-10 w-full flex justify-between items-center bg-gradient-to-t to-black">
      <img className="w-48" src={LOGO} alt="logo" />
      {user && (
        <div className="flex gap-2">
          <img className="w-12 h-12" src={PROFILE_PIC} alt="" />
          <button onClick={() => setShowAccount(!showAccount)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-12 h-12 text-white cursor-pointer"
              fill="white"
            >
              <path d="M12 16l-4-4h8l-4 4z" />
            </svg>
          </button>
          {showAccount && (
            <div className="text-white font-semibold bg-gray-900 w-40 h-36 py-2 rounded-lg absolute top-20 right-26">
              <p className="m-2 flex gap-1 items-center">
                <img className="h-4 " src="/user.png" alt="" />
                {user.displayName}
              </p>
              <p className="m-2 flex gap-1 items-center">
                <img className="h-3 " src="/help.png" alt="" />
                Help Center
              </p>
              <div className="border-t-1 absolute bottom-1 w-full p-2">
                <button
                  onClick={handleSignOut}
                  className="hover:underline text-sm font-semibold"
                >
                  (sign out of Netflix)
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
