# JewelryApis.AccountApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createAccount**](AccountApi.md#createAccount) | **POST** /accounts | 
[**deleteAccount**](AccountApi.md#deleteAccount) | **DELETE** /accounts/{id} | 
[**searchUser**](AccountApi.md#searchUser) | **GET** /accounts | 
[**updateAccount**](AccountApi.md#updateAccount) | **PUT** /accounts/{id} | 



## createAccount

> OutputValues createAccount(inputValues)



### Example

```javascript
import JewelryApis from 'jewelry_apis';

let apiInstance = new JewelryApis.AccountApi();
let inputValues = new JewelryApis.InputValues(); // InputValues | 
apiInstance.createAccount(inputValues, (error, data, response) => {
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


## deleteAccount

> OutputValues deleteAccount(id)



### Example

```javascript
import JewelryApis from 'jewelry_apis';

let apiInstance = new JewelryApis.AccountApi();
let id = 56; // Number | 
apiInstance.deleteAccount(id, (error, data, response) => {
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

[**OutputValues**](OutputValues.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## searchUser

> OutputValues searchUser(opts)



### Example

```javascript
import JewelryApis from 'jewelry_apis';

let apiInstance = new JewelryApis.AccountApi();
let opts = {
  'username': "username_example", // String | 
  'accountId': 56, // Number | 
  'sortBy': "sortBy_example", // String | 
  'sortOrder': "sortOrder_example" // String | 
};
apiInstance.searchUser(opts, (error, data, response) => {
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
 **username** | **String**|  | [optional] 
 **accountId** | **Number**|  | [optional] 
 **sortBy** | **String**|  | [optional] 
 **sortOrder** | **String**|  | [optional] 

### Return type

[**OutputValues**](OutputValues.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## updateAccount

> OutputValues updateAccount(id, inputValues)



### Example

```javascript
import JewelryApis from 'jewelry_apis';

let apiInstance = new JewelryApis.AccountApi();
let id = 56; // Number | 
let inputValues = new JewelryApis.InputValues(); // InputValues | 
apiInstance.updateAccount(id, inputValues, (error, data, response) => {
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
 **inputValues** | [**InputValues**](InputValues.md)|  | 

### Return type

[**OutputValues**](OutputValues.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*

