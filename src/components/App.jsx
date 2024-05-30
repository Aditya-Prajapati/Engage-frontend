import React, { useState, useEffect, useContext } from "react";
import {
  Routes,
  Route,
  Navigate,
  useParams,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import Home from "../Pages/Home";
import Explore from "../Pages/Explore";
import Profile from "../Pages/Profile";
import NotFound from "../Pages/NotFound";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import TweetPage from "../Pages/TweetPage";
import FollowPage from "../Pages/FollowPage";
import { UserContext } from "../Context/UserContext";

export default function App() {
  const [user, setUser] = useState(null);
  const [signedUpMsg, setSignedUpMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentActiveAccountIdx, setCurrentActiveAccountIdx] = useState(0);
  const location = useLocation();

  const { DarkMode } = useContext(UserContext);

  useEffect(() => {
    if (DarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [DarkMode]);

  useEffect(() => {
    let tempUser = user;
    setUser(null);
    const getUser = async () => {
      try {
        // "http://localhost:8000/auth/login/success",
        const response = await axios.get(
          "http://localhost:8000/user/getuser",
          { withCredentials: true }
        );

        if (response.status === 200) {
          setUser(response.data.user);
        } else {
          throw new Error("Login failed.");
        }
      } catch (error) {
        console.log(error);
        setUser(user && tempUser);
      } finally {
        setSignedUpMsg("");
        setIsLoading(false);
      }
    };

    getUser();
  }, []);

  if (isLoading) { 
    // if (location.pathname == `/u/:currentActiveAccountIdx/profile`){
    //     return <Profile />;
    // }
    // else
    if (location.pathname == `/u/:currentActiveAccountIdx/explore`) {
      return <Explore />;
    } else {
      return <Home />;
    }
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Login
              signedUpMsg={signedUpMsg}
              setUser={setUser}
              currentActiveAccountIdx={currentActiveAccountIdx}
              setCurrentActiveAccountIdx={setCurrentActiveAccountIdx}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Signup
              setSignedUpMsg={setSignedUpMsg}
              currentActiveAccountIdx={currentActiveAccountIdx}
              setCurrentActiveAccountIdx={setCurrentActiveAccountIdx}
            />
          }
        />
        <Route
          exact
          path={`/u/:currentActiveAccountIdx/home`}
          element={
            user ? (
              <Home
                user={user}
                currentActiveAccountIdx={currentActiveAccountIdx}
                setCurrentActiveAccountIdx={setCurrentActiveAccountIdx}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path={`/u/:currentActiveAccountIdx/:username/:tweetId/:isComment`}
          element={
            user ? (
              <TweetPage
                user={user}
                currentActiveAccountIdx={currentActiveAccountIdx}
                setCurrentActiveAccountIdx={setCurrentActiveAccountIdx}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path={`/u/:currentActiveAccountIdx/explore`}
          element={
            user ? (
              <Explore
                user={user}
                currentActiveAccountIdx={currentActiveAccountIdx}
                setCurrentActiveAccountIdx={setCurrentActiveAccountIdx}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          exact
          path={`/u/:currentActiveAccountIdx/profile`}
          element={
            user ? (
              <Profile
                user={user}
                setUser={setUser}
                currentActiveAccountIdx={currentActiveAccountIdx}
                setCurrentActiveAccountIdx={setCurrentActiveAccountIdx}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path={`/u/:currentActiveAccountIdx/profile/:username/:path`}
          element={
            user ? (
              <FollowPage
                user={user}
                currentActiveAccountIdx={currentActiveAccountIdx}
                setCurrentActiveAccountIdx={setCurrentActiveAccountIdx}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
