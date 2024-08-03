# JewelryApis.InvoiceApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createSellInvoice**](InvoiceApi.md#createSellInvoice) | **POST** /invoices/invoice | 
[**deleteInvoice**](InvoiceApi.md#deleteInvoice) | **DELETE** /invoices/{id} | 
[**getAllInvoicesWithPagination**](InvoiceApi.md#getAllInvoicesWithPagination) | **GET** /invoices/ | 
[**getInvoiceIndetails**](InvoiceApi.md#getInvoiceIndetails) | **GET** /invoices/{id} | 



## createSellInvoice

> Object createSellInvoice(createInvoiceSellPayload)



### Example

```javascript
import JewelryApis from 'jewelry_apis';

let apiInstance = new JewelryApis.InvoiceApi();
let createInvoiceSellPayload = new JewelryApis.CreateInvoiceSellPayload(); // CreateInvoiceSellPayload | 
apiInstance.createSellInvoice(createInvoiceSellPayload, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createInvoiceSellPayload** | [**CreateInvoiceSellPayload**](CreateInvoiceSellPayload.md)|  | 

### Return type

**Object**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*


## deleteInvoice

> Object deleteInvoice(id)



### Example

```javascript
import JewelryApis from 'jewelry_apis';

let apiInstance = new JewelryApis.InvoiceApi();
let id = 56; // Number | 
apiInstance.deleteInvoice(id, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 

### Return type

**Object**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getAllInvoicesWithPagination

> Object getAllInvoicesWithPagination(opts)



### Example

```javascript
import JewelryApis from 'jewelry_apis';

let apiInstance = new JewelryApis.InvoiceApi();
let opts = {
  'customerName': "customerName_example", // String | 
  'transactionDateFrom': new Date("2013-10-20T19:20:30+01:00"), // Date | 
  'transactionDateEnd': new Date("2013-10-20T19:20:30+01:00"), // Date | 
  'transactionStatus': ["null"], // [String] | 
  'sortBy': "'Optional[DESC]'", // String | 
  'pageNo': 56, // Number | 
  'pageSize': 56 // Number | 
};
apiInstance.getAllInvoicesWithPagination(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **customerName** | **String**|  | [optional] 
 **transactionDateFrom** | **Date**|  | [optional] 
 **transactionDateEnd** | **Date**|  | [optional] 
 **transactionStatus** | [**[String]**](String.md)|  | [optional] 
 **sortBy** | **String**|  | [optional] [default to &#39;Optional[DESC]&#39;]
 **pageNo** | **Number**|  | [optional] 
 **pageSize** | **Number**|  | [optional] 

### Return type

**Object**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getInvoiceIndetails

> Invoice getInvoiceIndetails(id)



### Example

```javascript
import JewelryApis from 'jewelry_apis';

let apiInstance = new JewelryApis.InvoiceApi();
let id = 56; // Number | 
apiInstance.getInvoiceIndetails(id, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 

### Return type

[**Invoice**](Invoice.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

