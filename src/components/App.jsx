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
    const getUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/auth/login/success",
          { withCredentials: true },
        );

        if (response.status === 200) {
          setUser(response.data.user);
        } else {
          throw new Error("Login failed.");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setSignedUpMsg("");
        setIsLoading(false);
      }
    };

    getUser();
  }, []);

  if (isLoading) {
    // if (location.pathname == "/profile"){
    //     return <Profile />;
    // }
    // else
    if (location.pathname == "/explore") {
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
          element={<Login signedUpMsg={signedUpMsg} setUser={setUser} />}
        />
        <Route
          path="/signup"
          element={<Signup setSignedUpMsg={setSignedUpMsg} />}
        />
        <Route
          exact
          path="/home"
          element={user ? <Home user={user} /> : <Navigate to="/" replace />}
        />
        <Route
          path=":username/:tweetId/:isComment"
          element={
            user ? <TweetPage user={user} /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/explore"
          element={user ? <Explore user={user} /> : <Navigate to="/" replace />}
        />
        <Route
          exact
          path="/profile"
          element={
            user ? (
              <Profile user={user} setUser={setUser} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/profile/:username/:path"
          element={
            user ? <FollowPage user={user} /> : <Navigate to="/" replace />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
