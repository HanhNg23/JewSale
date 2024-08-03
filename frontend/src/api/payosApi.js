import axios from "axios";
const orderAxios = axios.create({
  baseURL: process.env.REACT_APP_ORDER_URL, // Cấu hình baseURL từ biến môi trường
  headers: {
    "Content-Type": "application/json",
  },
});
export async function createPaymentLink(formData) {
  try {
    const res = await orderAxios({
      method: "POST",
      url: `http://localhost:8080/payments/create`,
      data: formData,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getListBank() {
  try {
    const res = await orderAxios({
      method: "GET",
      url: `${process.env.REACT_APP_LISTS_BANK_URL}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
}
export async function getOrder(orderId) {
  try {
    const res = await orderAxios({
      method: "GET",
      url: `${process.env.REACT_APP_ORDER_URL}/order/${orderId}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
}
export async function cancelOrder(orderId) {
  try {
    const res = await orderAxios({
      method: "PUT",
      url: `http://localhost:8080/payments/${orderId}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
}
