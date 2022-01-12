export const authHeader = () => {
  let token = localStorage.getItem("user");

  if (token !== null && token !== "") {
    return { Authorization: token };
  } else {
    return {};
  }
};
