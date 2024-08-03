# JewelryApis.Invoice

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**invoiceId** | **Number** |  | [optional] 
**transactionDate** | **Date** |  | [optional] 
**transactionType** | **String** |  | [optional] 
**customerName** | **String** |  | [optional] 
**customerPhone** | **String** |  | [optional] 
**transactionClerk** | [**Account**](Account.md) |  | [optional] 
**transactionClerkId** | **Number** |  | [optional] 
**totalAmount** | **Number** |  | [optional] 
**taxPercent** | **Number** |  | [optional] 
**totalDiscount** | **Number** |  | [optional] 
**totalVoucherDiscount** | **Number** |  | [optional] 
**netAmount** | **Number** |  | [optional] 
**paymentDetailsId** | **Number** |  | [optional] 
**updatedAt** | **Date** |  | [optional] 
**status** | **String** |  | [optional] 
**invoiceItems** | [**[InvoiceItem]**](InvoiceItem.md) |  | [optional] 
**paymentMethod** | **String** |  | [optional] 



## Enum: TransactionTypeEnum


* `SELL` (value: `"SELL"`)

* `PURCHASE` (value: `"PURCHASE"`)





## Enum: StatusEnum


* `PENDING_PAYMENT` (value: `"PENDING_PAYMENT"`)

* `PAID` (value: `"PAID"`)

* `CANCELLED` (value: `"CANCELLED"`)





## Enum: PaymentMethodEnum


* `CASH` (value: `"CASH"`)

* `EWALLET_VNPAY` (value: `"EWALLET_VNPAY"`)




