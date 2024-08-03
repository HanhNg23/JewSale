import React, { Fragment } from "react";
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
    // fontStyle: 'bold',
  },
  description: {
    width: "40%",
    textAlign: "left",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8,
  },
  qty: {
    width: "10%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },
  rate: {
    width: "25%",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    textAlign: "right",
    paddingRight: 8,
  },
  amount: {
    width: "25%",
    textAlign: "right",
    paddingRight: 8,
  },
});

const InvoiceTableRow = ({ items }) => {
  const rows = items.map((item) => (
    <View style={styles.row} key={item.invoiceId.toString()}>
      <Text style={styles.description}>{item.productName}</Text>
      <Text style={styles.qty}>{item.quantity}</Text>
      <Text style={styles.rate}>{formatCurrencyVND(item.unitPrice)}</Text>
      <Text style={styles.amount}>
        {formatCurrencyVND(item.quantity * item.unitPrice)}
      </Text>
    </View>
  ));
  return <Fragment>{rows}</Fragment>;
};

export default InvoiceTableRow;
