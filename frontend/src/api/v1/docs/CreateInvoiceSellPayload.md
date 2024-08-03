# JewelryApis.CreateInvoiceSellPayload

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**transactionType** | **String** | Type of the transaction: bán ra, mua vào | 
**customerName** | **String** |  | [optional] 
**customerPhone** | **String** |  | [optional] 
**invoiceItems** | [**[InvoiceItemPayload]**](InvoiceItemPayload.md) | List of items in the invoice | 
**paymentMethod** | **String** | Method of payment | 



## Enum: TransactionTypeEnum


* `SELL` (value: `"SELL"`)

* `PURCHASE` (value: `"PURCHASE"`)





## Enum: PaymentMethodEnum


* `CASH` (value: `"CASH"`)

* `EWALLET_VNPAY` (value: `"EWALLET_VNPAY"`)




