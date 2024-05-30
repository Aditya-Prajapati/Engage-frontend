import axios from "axios";

export function getUsers(
  request,
  path,
  setUsersToMap,
  setUpdatedUser,
  toSearch,
) {
  axios
    .get("http://localhost:8000/user/getusers", {
      withCredentials: true,
      params: { users: request, toSearch: toSearch },
    })
    .then((res) => {
      setUpdatedUser(res.data.user);
      let users;
      if (path === "following") {
        users = res.data.user.follows;
      } else if (path === "followers") {
        users = res.data.user.followedBy;
      } else if (path === "search") {
        users = res.data.users;
      } else {
        users = res.data.randomUsers.length === 0 ? [] : res.data.randomUsers;
      }
      setUsersToMap(users);
    })
    .catch((err) => {
      console.log(err);
    });
}
