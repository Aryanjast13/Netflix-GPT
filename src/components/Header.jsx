import React, { useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { removeUser, addUser } from "../utils/userslice";
import { useSelector } from "react-redux";
import { LOGO, PROFILE_PIC } from "../utils/Constants";

const Header = () => {
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
    <div className="absolute px-10 z-10 w-full flex justify-between items-center">
      <img className="w-48" src={LOGO} alt="logo" />
      {user && (
        <div className="flex gap-2">
          <img className="w-12 h-12" src={PROFILE_PIC} alt="" />
          <button onClick={handleSignOut}>(sign out)</button>
        </div>
      )}
    </div>
  );
};

export default Header;
