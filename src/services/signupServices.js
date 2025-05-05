import Api from "../api";

export const signup = async (body) => {
  try {
    const response = await Api({
      method: "post",
      url: "/auth/signup",
      data: body,
      headers: {
        "Content-Type": "application/json",
      }
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.message || error.message,
      status: error?.response?.status || 500,
    };
  }
};