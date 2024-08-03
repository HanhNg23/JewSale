import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { formatDateToDDMMYYYY } from "utils";

const styles = StyleSheet.create({
  invoiceNoContainer: {
    flexDirection: "row",
    marginTop: 36,
    justifyContent: "flex-end",
  },
  invoiceDateContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  invoiceDate: {
    fontSize: 12,
    // fontStyle: "bold",
  },
});

const InvoiceNo = ({ invoice }) => (
  <Fragment>
    <View style={styles.invoiceNoContainer}>
      <Text style={styles.label}>Mã hóa đơn:{"   "}</Text>
      <Text style={styles.invoiceDate}>{invoice.invoiceId}</Text>
    </View>
    <View style={styles.invoiceDateContainer}>
      <Text>Ngày giao dịch:{"   "}</Text>
      <Text>{formatDateToDDMMYYYY(new Date(invoice.transactionDate))}</Text>
    </View>
    <View style={styles.invoiceDateContainer}>
      <Text>Nhân viên:{"   "}</Text>
      <Text>{invoice.transactionClerk.fullname}</Text>
    </View>
  </Fragment>
);

export default InvoiceNo;
