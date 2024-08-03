# JewelryApis.WarrantyApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createWarranty**](WarrantyApi.md#createWarranty) | **POST** /warranties | 



## createWarranty

> OutputValues createWarranty(inputValues)



### Example

```javascript
import JewelryApis from 'jewelry_apis';

let apiInstance = new JewelryApis.WarrantyApi();
let inputValues = new JewelryApis.InputValues(); // InputValues | 
apiInstance.createWarranty(inputValues, (error, data, response) => {
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
 **inputValues** | [**InputValues**](InputValues.md)|  | 

### Return type

[**OutputValues**](OutputValues.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*

