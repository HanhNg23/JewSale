import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    backgroundColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    textAlign: "center",
    // fontStyle: "bold",
    flexGrow: 1,
  },
  description: {
    width: "40%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  qty: {
    width: "10%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  rate: {
    width: "25%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
  amount: {
    width: "25%",
  },
});

const InvoiceTableHeader = () => (
  <View style={styles.container}>
    <Text style={styles.description}>Trang sức</Text>
    <Text style={styles.qty}>Số lượng</Text>
    <Text style={styles.rate}>Đơn giá</Text>
    <Text style={styles.amount}>Tổng</Text>
  </View>
);

export default InvoiceTableHeader;
