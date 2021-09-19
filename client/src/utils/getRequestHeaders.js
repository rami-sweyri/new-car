export const getHeaders = () => {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "x-client":
      typeof process.env.REACT_APP_CLIENT_ID !== "undefined"
        ? process.env.REACT_APP_CLIENT_ID
        : localStorage.getItem("REACT_APP_CLIENT_ID"),

    "x-access-token": localStorage.getItem("token"),
    "accept-language": localStorage.getItem("i18nextLng"),
  };
};
