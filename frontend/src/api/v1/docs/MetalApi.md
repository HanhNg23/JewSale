# JewelryApis.MetalApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**deleteMetal**](MetalApi.md#deleteMetal) | **DELETE** /metals/{metal-type-id} | 
[**getAllMetalTypes**](MetalApi.md#getAllMetalTypes) | **GET** /metals/all | 
[**getAllMetalTypesOnMonitor**](MetalApi.md#getAllMetalTypesOnMonitor) | **GET** /metals/all/on-monitor | 
[**getMetalGoldPriceRate**](MetalApi.md#getMetalGoldPriceRate) | **GET** /metals/gold-price-rate | 
[**getMetalSilverPriceRate**](MetalApi.md#getMetalSilverPriceRate) | **GET** /metals/silver-price-rate | 
[**getMetalTypeInDetails**](MetalApi.md#getMetalTypeInDetails) | **GET** /metals/{metal-type-name} | 
[**insertNewMetal**](MetalApi.md#insertNewMetal) | **POST** /metals/metal | 
[**updateMetal**](MetalApi.md#updateMetal) | **PUT** /metals/{metal-type-id} | 



## deleteMetal

> Object deleteMetal(metalTypeId)



### Example

```javascript
import JewelryApis from 'jewelry_apis';

let apiInstance = new JewelryApis.MetalApi();
let metalTypeId = 56; // Number | 
apiInstance.deleteMetal(metalTypeId, (error, data, response) => {
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
 **metalTypeId** | **Number**|  | 

### Return type

**Object**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getAllMetalTypes

> Object getAllMetalTypes()



### Example

```javascript
import JewelryApis from 'jewelry_apis';

let apiInstance = new JewelryApis.MetalApi();
apiInstance.getAllMetalTypes((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

**Object**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getAllMetalTypesOnMonitor

> Object getAllMetalTypesOnMonitor()



### Example

```javascript
import JewelryApis from 'jewelry_apis';

let apiInstance = new JewelryApis.MetalApi();
apiInstance.getAllMetalTypesOnMonitor((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

**Object**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getMetalGoldPriceRate

> GoldPriceRateDto getMetalGoldPriceRate()



### Example

```javascript
import JewelryApis from 'jewelry_apis';

let apiInstance = new JewelryApis.MetalApi();
apiInstance.getMetalGoldPriceRate((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**GoldPriceRateDto**](GoldPriceRateDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getMetalSilverPriceRate

> SilverPriceRateDto getMetalSilverPriceRate()



### Example

```javascript
import JewelryApis from 'jewelry_apis';

let apiInstance = new JewelryApis.MetalApi();
apiInstance.getMetalSilverPriceRate((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**SilverPriceRateDto**](SilverPriceRateDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getMetalTypeInDetails

> MetalType getMetalTypeInDetails(metalTypeName)



### Example

```javascript
import JewelryApis from 'jewelry_apis';

let apiInstance = new JewelryApis.MetalApi();
let metalTypeName = "metalTypeName_example"; // String | 
apiInstance.getMetalTypeInDetails(metalTypeName, (error, data, response) => {
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
 **metalTypeName** | **String**|  | 

### Return type

[**MetalType**](MetalType.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## insertNewMetal

> Object insertNewMetal(metalCreateRequest)



### Example

```javascript
import JewelryApis from 'jewelry_apis';

let apiInstance = new JewelryApis.MetalApi();
let metalCreateRequest = new JewelryApis.MetalCreateRequest(); // MetalCreateRequest | 
apiInstance.insertNewMetal(metalCreateRequest, (error, data, response) => {
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
 **metalCreateRequest** | [**MetalCreateRequest**](MetalCreateRequest.md)|  | 

### Return type

**Object**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*


## updateMetal

> Object updateMetal(metalTypeId, metaUpdateRequest)



### Example

```javascript
import JewelryApis from 'jewelry_apis';

let apiInstance = new JewelryApis.MetalApi();
let metalTypeId = 56; // Number | 
let metaUpdateRequest = new JewelryApis.MetaUpdateRequest(); // MetaUpdateRequest | 
apiInstance.updateMetal(metalTypeId, metaUpdateRequest, (error, data, response) => {
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
 **metalTypeId** | **Number**|  | 
 **metaUpdateRequest** | [**MetaUpdateRequest**](MetaUpdateRequest.md)|  | 

### Return type

**Object**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*

