import axios from "axios";

export function getUsers(
  request,
  path,
  setUsersToMap,
  setUpdatedUser,
  toSearch,
) {
  axios
    .get("https://engagebackend.vercel.app/user/getusers", {
      withCredentials: true,
      params: { users: request, toSearch: toSearch },
    })
    .then((res) => {
      setUpdatedUser(res.data.currentActiveUser);
      let users;
      if (path === "following") {
        users = res.data.currentActiveUser.follows;
      } else if (path === "followers") {
        users = res.data.currentActiveUser.followedBy;
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
