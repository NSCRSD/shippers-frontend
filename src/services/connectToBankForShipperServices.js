import Api from "../api";

export const shipperConnectBanks = async (body) => {
  const token = localStorage.getItem('token')
  try {
    const response = await Api({
      method: "post",
      url: "/shipper/connect-bank",
      data: body,
      headers: {
        Authorization: `Bearer ${token}` ,
     }
    });
    return { data: response?.data, status: response?.status };
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message || error?.response?.data?.message || error.message,
    };
  }
};