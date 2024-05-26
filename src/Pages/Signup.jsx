import React, { useState, useEffect , useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LoginButton from "./LoginButton";
import "./LoginStyle.css";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DarkModeButton from "../components/DarkModeButton/DarkModeButton";
import { UserContext } from "../Context/UserContext";
export default function Signup(props) {
    
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pswrd, setPswrd] = useState("");
    const [confirmPswrd, setConfirmPswrd] = useState("");
    const [signUpMsg, setSignupMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const {DarkMode , setDarkMode} = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name == "" || email == "" || pswrd == ""){
            setSignupMsg("Invalid credentials")
            return;
        }
        else if (pswrd !== confirmPswrd){
            setSignupMsg("Passwords aren't matching");
            return;
        }
 
        await axios
            .post(
                "http://localhost:8000/auth/signup",
                { name: name, username: email, password: pswrd },
                { withCredentials: true },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((res) => {
                props.setSignedUpMsg("Successfully signed up, please login.");
                navigate("/");
            })
            .catch((err) => {

                if (err.response.status === 403){
                    setSignupMsg(err.response.data.message);
                }
                else if (err.response.status === 500){
                    setSignupMsg("Internal server error, please try again.")
                }
                else {
                    setSignupMsg("Invalid credentials");
                }
            })
    }

    return (
      <div
        className={`d-flex align-items-center justify-content-center ${
          DarkMode ? " darkMode darkMode-noBorder" : ""
        }`}
        id="SignupContainer"
      >
        <div className="card align-items-center" id="Login">
          <div className="TwitterIcon d-flex justify-content-center">
            <TwitterIcon style={{ fontSize: "2rem", color: "#1DA1F2" }} />
          </div>

          <h3 className="HeadingText">
            New to <span style={{ color: "#1DA1F2" }}> Twitter Clone </span>?
          </h3>
          <LoginButton
            link="http://localhost:8000/auth/google"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                preserveAspectRatio="xMidYMid"
                viewBox="0 0 256 262"
                id="google"
              >
                <path
                  fill="#4285F4"
                  d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                ></path>
                <path
                  fill="#34A853"
                  d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                ></path>
                <path
                  fill="#EB4335"
                  d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                ></path>
              </svg>
            }
            text={"Sign up with Google"}
          />
          {/* <LoginButton 
                    link="/notfound" 
                    icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="3.481 .893 493.038 548.124" id="apple">
                        <path fill="#61bb46" stroke="#61bb46" stroke-miterlimit="2.613" stroke-width="2.985" d="M25.824 200.612c.166-.273.342-.542.519-.806 28.447-43.799 73.32-69.433 115.518-69.433 42.969 0 69.979 23.554 105.497 23.554 34.463 0 55.454-23.589 105.132-23.589 37.535 0 77.329 20.44 105.675 55.781-7.837 4.292-14.907 9.165-21.227 14.521l-411.114-.028z" transform="matrix(.98693 0 0 .99106 3.5 .907)"></path>
                        <path fill="#61bb46" stroke="#61bb46" stroke-miterlimit="2.613" stroke-width="2.985" d="M314.808 90.875c18.033-23.158 31.748-55.859 26.777-89.291-29.481 2.021-63.964 20.79-84.105 45.225-18.276 22.197-33.364 55.117-27.49 87.095 32.187 1 65.482-18.219 84.818-43.029z" transform="matrix(.98693 0 0 .99106 3.5 .907)"></path>
                        <path fill="#fdb827" d="M27.539 199.085c-12.09 19.022-20.456 46.286-22.677 70.198l392.242-.01c4.241-26.16 18.344-51.156 40.695-70.158l-410.26-.03h.023-.023z"></path>
                        <path fill="#f5821f" stroke="#f5821f" stroke-miterlimit="2.613" stroke-width="2.985" d="M4.989 340.999c-3.862-24.644-4.487-48.403-2.061-70.201l394.341-.01c-3.856 23.638-.619 48.237 9.136 70.225l-401.416-.014z" transform="matrix(.98693 0 0 .99106 3.5 .907)"></path>
                        <path fill="#e03a3e" stroke="#e03a3e" stroke-miterlimit="2.613" stroke-width="2.985" d="M24.261 411.193c-9.312-23.584-15.688-47.271-19.272-70.195l401.416.015c12.427 28.018 35.425 51.821 67.808 64.053-.962 2.139-1.89 4.185-2.782 6.157l-447.17-.03z" transform="matrix(.98693 0 0 .99106 3.5 .907)"></path>
                        <path fill="#963d97" stroke="#963d97" stroke-miterlimit="2.613" stroke-width="2.985" d="M471.43 411.222c-11.118 24.443-17.563 37.129-32.949 60.547a605.045 605.045 0 0 1-6.436 9.609l-370.528.034a850.124 850.124 0 0 1-3.521-5.288c-13.853-21.099-25.068-42.974-33.735-64.932l447.169.03z" transform="matrix(.98693 0 0 .99106 3.5 .907)"></path>
                        <path fill="#009ddc" stroke="#009ddc" stroke-miterlimit="2.613" stroke-width="2.985" d="M432.045 481.379c-22.667 33.203-53.096 69.741-90.021 70.087-36.03.327-45.273-23.447-94.155-23.179-48.882.273-59.087 23.594-95.117 23.257-38.52-.356-68.433-36.24-91.235-70.132l370.528-.033z" transform="matrix(.98693 0 0 .99106 3.5 .907)"></path>
                    </svg>
                    }
                    text={"Sign up with Apple"} 
                /> */}

          <hr className="Or-line" />

          <form
            onSubmit={handleSubmit}
            className="d-flex flex-column align-items-center w-100"
          >
            <input
              name="name"
              onChange={(e) => {
                setSignupMsg(false);
                setName(e.target.value);
              }}
              className="LoginInput contact center-placeholder "
              type="text"
              placeholder="Name"
              autoComplete="on"
            />

            <input
              name="email"
              onChange={(e) => {
                setSignupMsg(false);
                setEmail(e.target.value);
              }}
              className="LoginInput contact center-placeholder "
              type="email"
              placeholder="Email"
              autoComplete="on"
            />

            <div className="passwordContainer">
              <input
                name="password"
                onChange={(e) => {
                  setSignupMsg(false);
                  setPswrd(e.target.value);
                }}
                className="LoginInput contact center-placeholder "
                type={showPassword ? "text" : "password"}
                placeholder="Password "
                autoComplete="on"
              />
              <a
                onClick={() => {
                  setShowPassword(true);
                }}
              >
                {showPassword ? (
                  <VisibilityIcon fontSize="small" />
                ) : (
                  <VisibilityOffIcon fontSize="small" />
                )}
              </a>
            </div>

            <div className="passwordContainer">
              <input
                name="confirmPswrd"
                onChange={(e) => {
                  setSignupMsg(false);
                  setConfirmPswrd(e.target.value);
                }}
                className="LoginInput contact center-placeholder "
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                autoComplete="on"
              />
              <a
                onClick={() => {
                  setShowPassword(showPassword ? false : true);
                }}
              >
                {showPassword ? (
                  <VisibilityIcon fontSize="small" />
                ) : (
                  <VisibilityOffIcon fontSize="small" />
                )}
              </a>
            </div>

            <p style={{ color: "red", margin: "4px 0", height: "10px" }}>
              {" "}
              {signUpMsg}{" "}
            </p>

            <LoginButton
              text={"Submit"}
              style={{
                fontWeight: "bold",
                backgroundColor: "black",
                color: "white",
              }}
              className="submit"
              type="submit"
            />
          </form>

          <div className="NotAccount d-flex">
            <p>Already have an account? &nbsp; </p>
            <Link to="/"> Signin </Link>
          </div>
        </div>
        <DarkModeButton />
      </div>
    );
}
