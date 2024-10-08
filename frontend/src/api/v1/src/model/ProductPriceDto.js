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

/**
 * The ProductPriceDto model module.
 * @module model/ProductPriceDto
 * @version 1.0.0
 */
class ProductPriceDto {
    /**
     * Constructs a new <code>ProductPriceDto</code>.
     * @alias module:model/ProductPriceDto
     */
    constructor() { 
        
        ProductPriceDto.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>ProductPriceDto</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ProductPriceDto} obj Optional instance to populate.
     * @return {module:model/ProductPriceDto} The populated <code>ProductPriceDto</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ProductPriceDto();

            if (data.hasOwnProperty('productPriceId')) {
                obj['productPriceId'] = ApiClient.convertToType(data['productPriceId'], 'Number');
            }
            if (data.hasOwnProperty('totalMetalCost')) {
                obj['totalMetalCost'] = ApiClient.convertToType(data['totalMetalCost'], 'Number');
            }
            if (data.hasOwnProperty('totalGemstoneCost')) {
                obj['totalGemstoneCost'] = ApiClient.convertToType(data['totalGemstoneCost'], 'Number');
            }
            if (data.hasOwnProperty('laborCost')) {
                obj['laborCost'] = ApiClient.convertToType(data['laborCost'], 'Number');
            }
            if (data.hasOwnProperty('markupPercentage')) {
                obj['markupPercentage'] = ApiClient.convertToType(data['markupPercentage'], 'Number');
            }
            if (data.hasOwnProperty('salePrice')) {
                obj['salePrice'] = ApiClient.convertToType(data['salePrice'], 'Number');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>ProductPriceDto</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ProductPriceDto</code>.
     */
    static validateJSON(data) {

        return true;
    }


}



/**
 * @member {Number} productPriceId
 */
ProductPriceDto.prototype['productPriceId'] = undefined;

/**
 * @member {Number} totalMetalCost
 */
ProductPriceDto.prototype['totalMetalCost'] = undefined;

/**
 * @member {Number} totalGemstoneCost
 */
ProductPriceDto.prototype['totalGemstoneCost'] = undefined;

/**
 * @member {Number} laborCost
 */
ProductPriceDto.prototype['laborCost'] = undefined;

/**
 * @member {Number} markupPercentage
 */
ProductPriceDto.prototype['markupPercentage'] = undefined;

/**
 * @member {Number} salePrice
 */
ProductPriceDto.prototype['salePrice'] = undefined;






export default ProductPriceDto;

