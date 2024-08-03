import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { formatCurrencyVND } from "utils";

const borderColor = "#90e5fc";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontSize: 12,
    // fontStyle: 'bold',
  },
  description: {
    width: "75%",
    textAlign: "right",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingRight: 8,
  },
  total: {
    width: "25%",
    textAlign: "right",
    paddingRight: 8,
  },
});

const InvoiceTableFooter = ({ items }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.description}>TỔNG</Text>
      <Text style={styles.total}>{formatCurrencyVND(items)}</Text>
    </View>
  );
};

export default InvoiceTableFooter;
