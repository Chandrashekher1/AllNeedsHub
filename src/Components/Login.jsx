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
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current?.value,
          password.current?.value
        );
        const user = userCredential.user;

        await updateProfile(user, {
          displayName: name.current?.value,
        });

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
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email.current?.value,
          password.current?.value
        );
        const user = userCredential.user;

        dispatch(
          addUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          })
        );

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

  if (!onlineStatus) {
    return (
      <h1 className="text-center mt-20 text-lg text-red-600 font-semibold">
        Looks like you're offline! Please check your internet connection.
      </h1>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h3 className="text-center font-bold text-2xl mb-6">
          {signUp ? "Sign Up" : "Sign In"}
        </h3>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {signUp && (
            <div>
              <label htmlFor="name" className="font-semibold block">
                Full Name:
              </label>
              <input
                type="text"
                id="name"
                ref={name}
                placeholder="Enter your name"
                className="w-full border border-gray-400 rounded-md px-3 py-2 mt-1"
                required
              />
            </div>
          )}

          <div>
            <label htmlFor="mobile" className="font-semibold block">
              Mobile No:
            </label>
            <input
              type="text"
              id="mobile"
              ref={phone}
              placeholder="Mobile Number"
              className="w-full border border-gray-400 rounded-md px-3 py-2 mt-1"
              maxLength={10}
              inputMode="numeric"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="font-semibold block">
              Email:
            </label>
            <input
              type="email"
              id="email"
              ref={email}
              placeholder="Email"
              className="w-full border border-gray-400 rounded-md px-3 py-2 mt-1"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="font-semibold block">
              Password:
            </label>
            <input
              type="password"
              id="password"
              ref={password}
              placeholder="Password"
              className="w-full border border-gray-400 rounded-md px-3 py-2 mt-1"
              required
            />
          </div>

          {message && <p className="text-red-600 font-medium">{message}</p>}

          <button
            type="submit"
            className="w-full bg-red-700 text-white font-bold py-2 rounded-md hover:bg-red-600"
          >
            Continue
          </button>
        </form>

        <button
          className="flex items-center justify-center border border-gray-300 mt-4 w-full p-2 rounded-md bg-white hover:bg-gray-50"
          onClick={handleSignInGoogle}
        >
          <img
            className="w-6 h-6 mr-2"
            src="https://img.freepik.com/premium-vector/google-logo-icon-set-google-icon-searching-icons-vector_981536-453.jpg"
            alt="Google"
          />
          Sign In with Google
        </button>

        {!signUp && (
          <h2 className="text-red-600 text-sm mt-2 underline cursor-pointer text-center">
            Forgot Password?
          </h2>
        )}

        <div className="text-center mt-4">
          <span className="text-gray-700 text-sm">OR</span>
        </div>

        <button
          className="w-full text-blue-600 font-semibold mt-2 underline"
          onClick={toggleSignUp}
        >
          {signUp ? "Already have an account? Sign In" : "Create an Account"}
        </button>
      </div>
    </div>
  );
};

export default Login;
