import axios from "axios";

export const registerAuth = async (formData) => {
  try {
    let result = await axios.post(
    //   "http://localhost:3000/api/auth/register",
      "https://blog-platform-m3q1.onrender.com/api/auth/register",
      formData
    );
    console.log(result);
    console.log(result.data.message);
    return result.data;
  } catch (err) {
    console.log(err);
    if (err.response && err.response.data) {
      return { error: err.response.data.message };
    } else {
      return { error: "Network error" };
    }
  }
};

export const loginAuth = async (formData) => {
  try {
    let result = await axios.post(
    //   "http://localhost:3000/api/auth/login",
      "https://blog-platform-m3q1.onrender.com/api/auth/login",
      formData
    );
    console.log(result);
    console.log(result.data.message);
    return result.data;
  } catch (err) {
    console.log(err);
    if (err.response && err.response.data) {
      return { error: err.response.data.message };
    } else {
      return { error: "Network error" };
    }
  }
};
