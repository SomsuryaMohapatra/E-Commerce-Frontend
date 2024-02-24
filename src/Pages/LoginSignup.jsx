import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/LoginSignup.css";

const LoginSignup = () => {
  let navigate = useNavigate();
  //usestate for changing the login & signup state
  const [state, setState] = useState("Login");
  const [registerUserData, setRegisterUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginUserData, setLoginUserData] = useState({
    email: "",
    password: "",
  });

  const changeSignUpHandler = (e) => {
    setRegisterUserData({
      ...registerUserData,
      [e.target.name]: e.target.value,
    });
  };
  const changeLoginHandler = (e) => {
    setLoginUserData({
      ...loginUserData,
      [e.target.name]: e.target.value,
    });
  };

  //user login function
  const userLogin = async () => {
    let loginResponseData;

    await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginUserData),
    })
      .then((res) => res.json())
      .then((resData) => {
        loginResponseData = resData;
      });

    if (loginResponseData.success) {
      localStorage.setItem("token", loginResponseData.token);
      navigate("/");
    } else {
      alert(loginResponseData.error);
    }
  };

  //user sign up function
  const userSignup = async () => {
    let signUpResponseData;
    await fetch("http://localhost:4000/api/signup", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerUserData),
    })
      .then((res) => res.json())
      .then((resData) => {
        signUpResponseData = resData;
      });

    if (signUpResponseData.success) {
      localStorage.setItem("token", signUpResponseData.token);
      navigate("/");
    } else {
      alert(signUpResponseData.error);
    }
  };
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? (
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your Name"
              onChange={state === "Sign Up" ? changeSignUpHandler : ""}
              value={state === "Sign Up" ? registerUserData.name : ""}
            />
          ) : (
            <></>
          )}
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            onChange={
              state === "Sign Up" ? changeSignUpHandler : changeLoginHandler
            }
            value={
              state === "Sign Up" ? registerUserData.email : loginUserData.email
            }
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={
              state === "Sign Up" ? changeSignUpHandler : changeLoginHandler
            }
            value={
              state === "Sign Up"
                ? registerUserData.password
                : loginUserData.password
            }
          />
        </div>
        <button
          onClick={() => {
            {
              state === "Login" ? userLogin() : userSignup();
            }
          }}
        >
          Continue
        </button>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
            >
              Login Here
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Don't have an account?{" "}
            <span
              onClick={() => {
                setState("Sign Up");
              }}
            >
              Sign Up Here
            </span>
          </p>
        )}
        {state === "Sign Up" ? (
          <div className="loginsignup-agree">
            <input type="checkbox" name="" id="" />
            <p>By continuing, i agree to the terms of use & privacy policy</p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
