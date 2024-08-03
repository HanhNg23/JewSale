# JewelryApis.AuthenticationApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**authenticate**](AuthenticationApi.md#authenticate) | **POST** /api/v1/auth/authenticate | 
[**logout**](AuthenticationApi.md#logout) | **POST** /api/v1/auth/logout | 
[**refreshToken**](AuthenticationApi.md#refreshToken) | **POST** /api/v1/auth/refresh-token | 
[**register**](AuthenticationApi.md#register) | **POST** /api/v1/auth/register | 



## authenticate

> AuthenticationResponse authenticate(authenticationRequest)



### Example

```javascript
import JewelryApis from 'jewelry_apis';

let apiInstance = new JewelryApis.AuthenticationApi();
let authenticationRequest = new JewelryApis.AuthenticationRequest(); // AuthenticationRequest | 
apiInstance.authenticate(authenticationRequest, (error, data, response) => {
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
 **authenticationRequest** | [**AuthenticationRequest**](AuthenticationRequest.md)|  | 

### Return type

[**AuthenticationResponse**](AuthenticationResponse.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*


## logout

> logout()



### Example

```javascript
import JewelryApis from 'jewelry_apis';

let apiInstance = new JewelryApis.AuthenticationApi();
apiInstance.logout((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## refreshToken

> refreshToken()



### Example

```javascript
import JewelryApis from 'jewelry_apis';

let apiInstance = new JewelryApis.AuthenticationApi();
apiInstance.refreshToken((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## register

> String register(registerRequest)



### Example

```javascript
import JewelryApis from 'jewelry_apis';

let apiInstance = new JewelryApis.AuthenticationApi();
let registerRequest = new JewelryApis.RegisterRequest(); // RegisterRequest | 
apiInstance.register(registerRequest, (error, data, response) => {
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
 **registerRequest** | [**RegisterRequest**](RegisterRequest.md)|  | 

### Return type

**String**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*

