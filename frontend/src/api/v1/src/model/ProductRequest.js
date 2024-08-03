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

import ApiClient from '../ApiClient';
import GemstoneDto from './GemstoneDto';
import MetalTypeDto from './MetalTypeDto';
import ProductPriceDto from './ProductPriceDto';

/**
 * The ProductRequest model module.
 * @module model/ProductRequest
 * @version 1.0.0
 */
class ProductRequest {
    /**
     * Constructs a new <code>ProductRequest</code>.
     * @alias module:model/ProductRequest
     * @param name {String} 
     * @param productType {String} 
     * @param unitMeasure {String} 
     * @param saleStatus {String} 
     * @param metalType {module:model/MetalTypeDto} 
     * @param productPrice {module:model/ProductPriceDto} 
     */
    constructor(name, productType, unitMeasure, saleStatus, metalType, productPrice) { 
        
        ProductRequest.initialize(this, name, productType, unitMeasure, saleStatus, metalType, productPrice);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, name, productType, unitMeasure, saleStatus, metalType, productPrice) { 
        obj['name'] = name;
        obj['productType'] = productType;
        obj['unitMeasure'] = unitMeasure;
        obj['saleStatus'] = saleStatus;
        obj['metalType'] = metalType;
        obj['productPrice'] = productPrice;
    }

    /**
     * Constructs a <code>ProductRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ProductRequest} obj Optional instance to populate.
     * @return {module:model/ProductRequest} The populated <code>ProductRequest</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ProductRequest();

            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String');
            }
            if (data.hasOwnProperty('productType')) {
                obj['productType'] = ApiClient.convertToType(data['productType'], 'String');
            }
            if (data.hasOwnProperty('unitMeasure')) {
                obj['unitMeasure'] = ApiClient.convertToType(data['unitMeasure'], 'String');
            }
            if (data.hasOwnProperty('saleStatus')) {
                obj['saleStatus'] = ApiClient.convertToType(data['saleStatus'], 'String');
            }
            if (data.hasOwnProperty('gemstones')) {
                obj['gemstones'] = ApiClient.convertToType(data['gemstones'], [GemstoneDto]);
            }
            if (data.hasOwnProperty('metalType')) {
                obj['metalType'] = MetalTypeDto.constructFromObject(data['metalType']);
            }
            if (data.hasOwnProperty('productPrice')) {
                obj['productPrice'] = ProductPriceDto.constructFromObject(data['productPrice']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>ProductRequest</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ProductRequest</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of ProductRequest.RequiredProperties) {
            if (!data.hasOwnProperty(property)) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }
        // ensure the json data is a string
        if (data['description'] && !(typeof data['description'] === 'string' || data['description'] instanceof String)) {
            throw new Error("Expected the field `description` to be a primitive type in the JSON string but got " + data['description']);
        }
        // ensure the json data is a string
        if (data['productType'] && !(typeof data['productType'] === 'string' || data['productType'] instanceof String)) {
            throw new Error("Expected the field `productType` to be a primitive type in the JSON string but got " + data['productType']);
        }
        // ensure the json data is a string
        if (data['unitMeasure'] && !(typeof data['unitMeasure'] === 'string' || data['unitMeasure'] instanceof String)) {
            throw new Error("Expected the field `unitMeasure` to be a primitive type in the JSON string but got " + data['unitMeasure']);
        }
        // ensure the json data is a string
        if (data['saleStatus'] && !(typeof data['saleStatus'] === 'string' || data['saleStatus'] instanceof String)) {
            throw new Error("Expected the field `saleStatus` to be a primitive type in the JSON string but got " + data['saleStatus']);
        }
        if (data['gemstones']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['gemstones'])) {
                throw new Error("Expected the field `gemstones` to be an array in the JSON data but got " + data['gemstones']);
            }
            // validate the optional field `gemstones` (array)
            for (const item of data['gemstones']) {
                GemstoneDto.validateJSON(item);
            };
        }
        // validate the optional field `metalType`
        if (data['metalType']) { // data not null
          MetalTypeDto.validateJSON(data['metalType']);
        }
        // validate the optional field `productPrice`
        if (data['productPrice']) { // data not null
          ProductPriceDto.validateJSON(data['productPrice']);
        }

        return true;
    }


}

ProductRequest.RequiredProperties = ["name", "productType", "unitMeasure", "saleStatus", "metalType", "productPrice"];

/**
 * @member {String} name
 */
ProductRequest.prototype['name'] = undefined;

/**
 * @member {String} description
 */
ProductRequest.prototype['description'] = undefined;

/**
 * @member {String} productType
 */
ProductRequest.prototype['productType'] = undefined;

/**
 * @member {String} unitMeasure
 */
ProductRequest.prototype['unitMeasure'] = undefined;

/**
 * @member {String} saleStatus
 */
ProductRequest.prototype['saleStatus'] = undefined;

/**
 * @member {Array.<module:model/GemstoneDto>} gemstones
 */
ProductRequest.prototype['gemstones'] = undefined;

/**
 * @member {module:model/MetalTypeDto} metalType
 */
ProductRequest.prototype['metalType'] = undefined;

/**
 * @member {module:model/ProductPriceDto} productPrice
 */
ProductRequest.prototype['productPrice'] = undefined;






export default ProductRequest;

