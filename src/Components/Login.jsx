import React, { useRef, useState } from "react";
import useOnlineStatus from "../Hooks/useOnlineStatus";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkValidateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const phone = useRef();
  const password = useRef();
  const email = useRef();
  const name = useRef();

  const toggleSignUp = () => setSignUp(!signUp);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationMessage = checkValidateData(
      email.current?.value,
      phone.current?.value,
      password.current?.value
    );
    setMessage(validationMessage);

    if (validationMessage) return;

    try {
      if (signUp) {
        // Sign-Up logic
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current?.value,
          password.current?.value
        );
        const user = userCredential.user;

        // Update profile
        await updateProfile(user, {
          displayName: name.current?.value,
        });

        // Use the `user` object directly instead of `auth.currentUser`
        dispatch(
          addUser({
            uid: user.uid,
            email: user.email,
            displayName: name.current?.value,
            phoneNumber: phone.current?.value,
          })
        );

        navigate("/");
      } else {
        // Sign-In logic
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email.current?.value,
          password.current?.value
        );
        const user = userCredential.user;

        dispatch(addUser({ uid: user.uid, email: user.email, displayName: user.displayName }));

        navigate("/profile/");
      }
    } catch (error) {
      setMessage(error.message || "An error occurred. Please try again.");
    }
  };

  const handleSignInGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      dispatch(
        addUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "User",
        })
      );

      navigate("/");
    } catch (error) {
      setMessage(error.message || "Failed to sign in with Google.");
    }
  };

  const onlineStatus = useOnlineStatus();

  return !onlineStatus ? (
    <h1>Looks like you're offline! Please check your internet connection.</h1>
  ) : (
    <div className="mx-4 border bg-gray-100">
      <h3 className="text-center font-bold text-3xl">{signUp ? "Sign Up" : "Sign In"}</h3>

      <form className="flex flex-col my-6" onSubmit={handleSubmit}>
        {signUp && (
          <>
            <label htmlFor="name" className="mx-4 font-semibold">
              Full Name:
            </label>
            <input
              type="text"
              id="name"
              ref={name}
              placeholder="Enter your name"
              className="border border-black rounded-sm mx-4 my-2 p-2 outline-none"
              required
            />
          </>
        )}

        <label htmlFor="mobile" className="mx-4 font-semibold">
          Mobile No:
        </label>
        <input
          type="text"
          id="mobile"
          ref={phone}
          placeholder="Mobile Number"
          className="border border-black rounded-sm mx-4 my-2 p-2 outline-none"
          maxLength={10}
          inputMode="numeric"
          required
        />

        <label htmlFor="email" className="mx-4 font-semibold">
          Email:
        </label>
        <input
          type="email"
          id="email"
          ref={email}
          placeholder="Email"
          className="border border-black rounded-sm mx-4 my-2 p-2 outline-none"
          required
        />

        <label htmlFor="password" className="mx-4 font-semibold">
          Password:
        </label>
        <input
          type="password"
          id="password"
          ref={password}
          placeholder="Password"
          className="border border-black rounded-sm mx-4 my-2 p-2 outline-none"
          required
        />

        <p className="mx-4 my-2 text-red-600 font-semibold">{message}</p>
        <button className="bg-red-700 rounded-lg p-2 mx-8 my-4 font-bold text-white">
          Continue
        </button>
      </form>

      <button
        className="flex border p-2 bg-white font-semibold mx-16"
        onClick={handleSignInGoogle}
      >
        <img
          className="w-6 h-6 mt-1 mx-2"
          src="https://img.freepik.com/premium-vector/google-logo-icon-set-google-icon-searching-icons-vector_981536-453.jpg"
          alt="Google"
        />
        Sign In With Google
      </button>

      {!signUp && (
        <h2 className="text-red-600 mx-2 my-2 font-semibold underline">Forgot Password</h2>
      )}
      <h1 className="text-center font-semibold text-2xl">OR</h1>

      <button className="text-lg mx-2 my-2 underline" onClick={toggleSignUp}>
        {signUp ? "Sign In" : "Create An Account"}
      </button>
    </div>
  );
};

export default Login;
