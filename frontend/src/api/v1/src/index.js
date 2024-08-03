/**
 * Jewelry APIs
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */


import ApiClient from './ApiClient';
import Account from './model/Account';
import AuthenticationRequest from './model/AuthenticationRequest';
import AuthenticationResponse from './model/AuthenticationResponse';
import CreateInvoiceSellPayload from './model/CreateInvoiceSellPayload';
import GemStone from './model/GemStone';
import GemstoneDto from './model/GemstoneDto';
import GoldPriceRateDto from './model/GoldPriceRateDto';
import InputValues from './model/InputValues';
import InsertNewProductRequest from './model/InsertNewProductRequest';
import Invoice from './model/Invoice';
import InvoiceItem from './model/InvoiceItem';
import InvoiceItemPayload from './model/InvoiceItemPayload';
import MetaUpdateRequest from './model/MetaUpdateRequest';
import MetalCreateRequest from './model/MetalCreateRequest';
import MetalPriceCreateDto from './model/MetalPriceCreateDto';
import MetalPriceRate from './model/MetalPriceRate';
import MetalPriceUpdateDto from './model/MetalPriceUpdateDto';
import MetalType from './model/MetalType';
import MetalTypeCreateDto from './model/MetalTypeCreateDto';
import MetalTypeDto from './model/MetalTypeDto';
import MetalTypeUpdateDto from './model/MetalTypeUpdateDto';
import OutputValues from './model/OutputValues';
import Product from './model/Product';
import ProductMaterial from './model/ProductMaterial';
import ProductPrice from './model/ProductPrice';
import ProductPriceDto from './model/ProductPriceDto';
import ProductRequest from './model/ProductRequest';
import ProductRequestUpdate from './model/ProductRequestUpdate';
import RegisterRequest from './model/RegisterRequest';
import SilverPriceRateDto from './model/SilverPriceRateDto';
import AccountApi from './api/AccountApi';
import AuthenticationApi from './api/AuthenticationApi';
import InvoiceApi from './api/InvoiceApi';
import MetalApi from './api/MetalApi';
import ProductApi from './api/ProductApi';
import WarrantyApi from './api/WarrantyApi';


/**
* JS API client generated by OpenAPI Generator.<br>
* The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
* <p>
* An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
* <pre>
* var JewelryApis = require('index'); // See note below*.
* var xxxSvc = new JewelryApis.XxxApi(); // Allocate the API class we're going to use.
* var yyyModel = new JewelryApis.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* <em>*NOTE: For a top-level AMD script, use require(['index'], function(){...})
* and put the application logic within the callback function.</em>
* </p>
* <p>
* A non-AMD browser application (discouraged) might do something like this:
* <pre>
* var xxxSvc = new JewelryApis.XxxApi(); // Allocate the API class we're going to use.
* var yyy = new JewelryApis.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* </p>
* @module index
* @version 1.0.0
*/
export {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient,

    /**
     * The Account model constructor.
     * @property {module:model/Account}
     */
    Account,

    /**
     * The AuthenticationRequest model constructor.
     * @property {module:model/AuthenticationRequest}
     */
    AuthenticationRequest,

    /**
     * The AuthenticationResponse model constructor.
     * @property {module:model/AuthenticationResponse}
     */
    AuthenticationResponse,

    /**
     * The CreateInvoiceSellPayload model constructor.
     * @property {module:model/CreateInvoiceSellPayload}
     */
    CreateInvoiceSellPayload,

    /**
     * The GemStone model constructor.
     * @property {module:model/GemStone}
     */
    GemStone,

    /**
     * The GemstoneDto model constructor.
     * @property {module:model/GemstoneDto}
     */
    GemstoneDto,

    /**
     * The GoldPriceRateDto model constructor.
     * @property {module:model/GoldPriceRateDto}
     */
    GoldPriceRateDto,

    /**
     * The InputValues model constructor.
     * @property {module:model/InputValues}
     */
    InputValues,

    /**
     * The InsertNewProductRequest model constructor.
     * @property {module:model/InsertNewProductRequest}
     */
    InsertNewProductRequest,

    /**
     * The Invoice model constructor.
     * @property {module:model/Invoice}
     */
    Invoice,

    /**
     * The InvoiceItem model constructor.
     * @property {module:model/InvoiceItem}
     */
    InvoiceItem,

    /**
     * The InvoiceItemPayload model constructor.
     * @property {module:model/InvoiceItemPayload}
     */
    InvoiceItemPayload,

    /**
     * The MetaUpdateRequest model constructor.
     * @property {module:model/MetaUpdateRequest}
     */
    MetaUpdateRequest,

    /**
     * The MetalCreateRequest model constructor.
     * @property {module:model/MetalCreateRequest}
     */
    MetalCreateRequest,

    /**
     * The MetalPriceCreateDto model constructor.
     * @property {module:model/MetalPriceCreateDto}
     */
    MetalPriceCreateDto,

    /**
     * The MetalPriceRate model constructor.
     * @property {module:model/MetalPriceRate}
     */
    MetalPriceRate,

    /**
     * The MetalPriceUpdateDto model constructor.
     * @property {module:model/MetalPriceUpdateDto}
     */
    MetalPriceUpdateDto,

    /**
     * The MetalType model constructor.
     * @property {module:model/MetalType}
     */
    MetalType,

    /**
     * The MetalTypeCreateDto model constructor.
     * @property {module:model/MetalTypeCreateDto}
     */
    MetalTypeCreateDto,

    /**
     * The MetalTypeDto model constructor.
     * @property {module:model/MetalTypeDto}
     */
    MetalTypeDto,

    /**
     * The MetalTypeUpdateDto model constructor.
     * @property {module:model/MetalTypeUpdateDto}
     */
    MetalTypeUpdateDto,

    /**
     * The OutputValues model constructor.
     * @property {module:model/OutputValues}
     */
    OutputValues,

    /**
     * The Product model constructor.
     * @property {module:model/Product}
     */
    Product,

    /**
     * The ProductMaterial model constructor.
     * @property {module:model/ProductMaterial}
     */
    ProductMaterial,

    /**
     * The ProductPrice model constructor.
     * @property {module:model/ProductPrice}
     */
    ProductPrice,

    /**
     * The ProductPriceDto model constructor.
     * @property {module:model/ProductPriceDto}
     */
    ProductPriceDto,

    /**
     * The ProductRequest model constructor.
     * @property {module:model/ProductRequest}
     */
    ProductRequest,

    /**
     * The ProductRequestUpdate model constructor.
     * @property {module:model/ProductRequestUpdate}
     */
    ProductRequestUpdate,

    /**
     * The RegisterRequest model constructor.
     * @property {module:model/RegisterRequest}
     */
    RegisterRequest,

    /**
     * The SilverPriceRateDto model constructor.
     * @property {module:model/SilverPriceRateDto}
     */
    SilverPriceRateDto,

    /**
    * The AccountApi service constructor.
    * @property {module:api/AccountApi}
    */
    AccountApi,

    /**
    * The AuthenticationApi service constructor.
    * @property {module:api/AuthenticationApi}
    */
    AuthenticationApi,

    /**
    * The InvoiceApi service constructor.
    * @property {module:api/InvoiceApi}
    */
    InvoiceApi,

    /**
    * The MetalApi service constructor.
    * @property {module:api/MetalApi}
    */
    MetalApi,

    /**
    * The ProductApi service constructor.
    * @property {module:api/ProductApi}
    */
    ProductApi,

    /**
    * The WarrantyApi service constructor.
    * @property {module:api/WarrantyApi}
    */
    WarrantyApi
};
