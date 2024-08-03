# JewelryApis.ProductApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**deleteProduct**](ProductApi.md#deleteProduct) | **DELETE** /products/{id} | 
[**getAllFilterOptions**](ProductApi.md#getAllFilterOptions) | **GET** /products/filter-options | 
[**getAllProductsWithSearchSortFilter**](ProductApi.md#getAllProductsWithSearchSortFilter) | **GET** /products/all | 
[**getProductDetails**](ProductApi.md#getProductDetails) | **GET** /products/{id} | 
[**insertNewProduct**](ProductApi.md#insertNewProduct) | **POST** /products/product | 
[**updateProduct**](ProductApi.md#updateProduct) | **PUT** /products/{id} | 



## deleteProduct

> Object deleteProduct(id)



### Example

```javascript
import JewelryApis from 'jewelry_apis';

let apiInstance = new JewelryApis.ProductApi();
let id = 56; // Number | 
apiInstance.deleteProduct(id, (error, data, response) => {
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


## getAllFilterOptions

> Object getAllFilterOptions()



### Example

```javascript
import JewelryApis from 'jewelry_apis';

let apiInstance = new JewelryApis.ProductApi();
apiInstance.getAllFilterOptions((error, data, response) => {
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


## getAllProductsWithSearchSortFilter

> [Product] getAllProductsWithSearchSortFilter(opts)



### Example

```javascript
import JewelryApis from 'jewelry_apis';

let apiInstance = new JewelryApis.ProductApi();
let opts = {
  'searchKeyword': "searchKeyword_example", // String | 
  'productType': ["null"], // [String] | 
  'metalGroup': ["null"], // [String] | 
  'metalTypes': ["null"], // [String] | 
  'gemstoneType': ["null"], // [String] | 
  'saleStatus': ["null"], // [String] | 
  'sortBy': "sortBy_example", // String | 
  'pageNo': 56, // Number | 
  'pageSize': 56 // Number | 
};
apiInstance.getAllProductsWithSearchSortFilter(opts, (error, data, response) => {
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
 **searchKeyword** | **String**|  | [optional] 
 **productType** | [**[String]**](String.md)|  | [optional] 
 **metalGroup** | [**[String]**](String.md)|  | [optional] 
 **metalTypes** | [**[String]**](String.md)|  | [optional] 
 **gemstoneType** | [**[String]**](String.md)|  | [optional] 
 **saleStatus** | [**[String]**](String.md)|  | [optional] 
 **sortBy** | **String**|  | [optional] 
 **pageNo** | **Number**|  | [optional] 
 **pageSize** | **Number**|  | [optional] 

### Return type

[**[Product]**](Product.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getProductDetails

> Product getProductDetails(id)



### Example

```javascript
import JewelryApis from 'jewelry_apis';

let apiInstance = new JewelryApis.ProductApi();
let id = 56; // Number | 
apiInstance.getProductDetails(id, (error, data, response) => {
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

[**Product**](Product.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## insertNewProduct

> Object insertNewProduct(opts)



### Example

```javascript
import JewelryApis from 'jewelry_apis';

let apiInstance = new JewelryApis.ProductApi();
let opts = {
  'insertNewProductRequest': new JewelryApis.InsertNewProductRequest() // InsertNewProductRequest | 
};
apiInstance.insertNewProduct(opts, (error, data, response) => {
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
 **insertNewProductRequest** | [**InsertNewProductRequest**](InsertNewProductRequest.md)|  | [optional] 

### Return type

**Object**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json, multipart/form-data
- **Accept**: */*


## updateProduct

> Object updateProduct(id, productRequestUpdate)



### Example

```javascript
import JewelryApis from 'jewelry_apis';

let apiInstance = new JewelryApis.ProductApi();
let id = 56; // Number | 
let productRequestUpdate = new JewelryApis.ProductRequestUpdate(); // ProductRequestUpdate | 
apiInstance.updateProduct(id, productRequestUpdate, (error, data, response) => {
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
 **productRequestUpdate** | [**ProductRequestUpdate**](ProductRequestUpdate.md)|  | 

### Return type

**Object**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*

