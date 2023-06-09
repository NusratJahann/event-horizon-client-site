// import { GoogleAuthProvider, getAuth, signInWithPopup, useSignInWithGoogle } from "firebase/auth";
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { getAuth } from "firebase/auth";
import React from "react";
import app from "../../firebase.init";
import Loading from "../Shared/Loading/Loading";
import { Link } from "react-router-dom";

const Login = () => {
  const auth = getAuth(app);
  const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);
  // const googleProvider = new GoogleAuthProvider();
  // const handleGoogleSignIn = () => {
    //   signInWithPopup(auth, googleProvider)
    //   .then((result) => {
      //     const userFromGoogle = result.user;
      //       console.log(userFromGoogle);
      //     })
      //     .catch(error => {
        //       console.log("error", error)
        //     })
        // };
        let signInError;
        if(loading || googleLoading){
          return <Loading/>
        }
        if (error || googleError){
          signInError = <span className="label-text-alt text-red-500">{error?.message || googleError?.message}</span>
        }
        if (googleUser) {
          console.log(googleUser);
        }
        const onSubmit = (data) => {
          console.log(data);
          signInWithEmailAndPassword(data.email, data.password);
        }
  return (
    <div className="hero min-h-screen text-primary py-[3rem]">
      <div className="card w-96 border-[#e9e9e9] border-[0.2px] bg-base-100">
        <div className="card-body">
          <p className="text-3xl font-serif text-center pb-5">Login</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text text-primary">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered border-[#cccccc] w-full"
                {...register("email", {
                  required: {
                    value: true,
                    message: "email is required",
                  },
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Provide a valid email",
                  },
                })}
              />
              <label className="label">
                {errors.email?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text text-primary">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered border-[#cccccc] w-full"
                {...register("password", {
                  required: {
                    value: true,
                    message: "password is required",
                  },
                  minLength: {
                    value: 6,
                    message: "Must be 6 letters or larger",
                  },
                })}
              />
              <label className="label">
                {errors.password?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
                {signInError}
              </label>
            </div>

            <input className="mt-3 btn border-none text-primary bg-accent hover:text-secondary tracking-wider w-full max-w-xs" type="submit" value='Login'/>
            <p className="text-sm mt-2 mb-5">Don't have a account?<Link to="/signup" className="text-accent"> Create now</Link></p>
          <div className="divider">OR</div>
            <input className="btn btn-outline text-primary hover:text-secondary hover:bg-primary tracking-wider w-full max-w-xs" type="submit" value='Login with google'/>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
