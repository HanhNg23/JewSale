export const formatCarat = (value) => `${value} ct`;
export const parseCarat = (value) => value.replace(" ct", "");
export const formatCurrencyVND = (amount) => {
  if (!amount)
    return Number(0).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};
export const parseCurrencyVND = (currencyString) => {
  console.log(currencyString);
  if (!currencyString) return 0;

  // Loại bỏ các ký tự không phải là số và dấu phẩy
  const sanitizedString = currencyString
    .replace(/[^\d,-]/g, "")
    .replace(",", "");

  // Chuyển đổi chuỗi thành số
  const amount = Number(sanitizedString);

  return isNaN(amount) ? 0 : amount;
};
export const formatDateToDDMMYYYY = (date) => {
  const day = date.getDate().toString().padStart(2, "0"); // Lấy ngày và đảm bảo có 2 chữ số
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Lấy tháng và đảm bảo có 2 chữ số (lưu ý tháng bắt đầu từ 0)
  const year = date.getFullYear().toString();

  return `${day}-${month}-${year}`;
};
export const formatDateToDDMMYYWithTime = (date) => {
  const day = date.getDate().toString().padStart(2, "0"); // Lấy ngày và đảm bảo có 2 chữ số
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Lấy tháng và đảm bảo có 2 chữ số (lưu ý tháng bắt đầu từ 0)
  const year = date.getFullYear().toString().slice(2); // Lấy 2 chữ số cuối cùng của năm
  const hours = date.getHours() % 12 || 12; // Lấy giờ (đổi sang 12 giờ)
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Lấy phút và đảm bảo có 2 chữ số
  const period = date.getHours() < 12 ? "AM" : "PM"; // Xác định buổi (AM hoặc PM)

  return `${day}-${month}-${year} ${hours}:${minutes} ${period}`;
};
