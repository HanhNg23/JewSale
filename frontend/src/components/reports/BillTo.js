import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 36,
  },
  billTo: {
    marginTop: 20,
    paddingBottom: 3,
    fontFamily: "Roboto",
  },
});

const BillTo = ({ invoice }) => (
  <View style={styles.headerContainer}>
    <Text>{`Người mua:        ${invoice.customerName}`}</Text>
    <Text>{`Số điện thoại:    ${invoice.customerPhone}`}</Text>
  </View>
);

export default BillTo;
