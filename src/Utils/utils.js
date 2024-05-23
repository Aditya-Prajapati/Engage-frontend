import axios from "axios";

export function getUsers(request, path, setUsersToMap, setUpdatedUser, toSearch){
  axios
    .get("http://localhost:8000/user/getusers", {
      withCredentials: true,
      params: { users: request, toSearch: toSearch },
    })
    .then((res) => {
      setUpdatedUser(res.data.user);
      console.log(res.data.user)
      if (path === "following") {
        setUsersToMap(res.data.user.follows);
      } else if (path === "followers") {
        setUsersToMap(res.data.user.followedBy);
      } else if (path === "search") {
        setUsersToMap(res.data.users);
      } else {
        setUsersToMap(
          res.data.randomUsers.length === 0 ? [] : res.data.randomUsers
        );
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
