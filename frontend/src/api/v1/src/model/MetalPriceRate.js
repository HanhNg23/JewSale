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
 * The MetalPriceRate model module.
 * @module model/MetalPriceRate
 * @version 1.0.0
 */
class MetalPriceRate {
    /**
     * Constructs a new <code>MetalPriceRate</code>.
     * @alias module:model/MetalPriceRate
     */
    constructor() { 
        
        MetalPriceRate.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>MetalPriceRate</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/MetalPriceRate} obj Optional instance to populate.
     * @return {module:model/MetalPriceRate} The populated <code>MetalPriceRate</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new MetalPriceRate();

            if (data.hasOwnProperty('metalPriceRateId')) {
                obj['metalPriceRateId'] = ApiClient.convertToType(data['metalPriceRateId'], 'Number');
            }
            if (data.hasOwnProperty('metalTypeId')) {
                obj['metalTypeId'] = ApiClient.convertToType(data['metalTypeId'], 'Number');
            }
            if (data.hasOwnProperty('profitSell')) {
                obj['profitSell'] = ApiClient.convertToType(data['profitSell'], 'Number');
            }
            if (data.hasOwnProperty('profitBuy')) {
                obj['profitBuy'] = ApiClient.convertToType(data['profitBuy'], 'Number');
            }
            if (data.hasOwnProperty('exchangeRate')) {
                obj['exchangeRate'] = ApiClient.convertToType(data['exchangeRate'], 'Number');
            }
            if (data.hasOwnProperty('internationalPrice')) {
                obj['internationalPrice'] = ApiClient.convertToType(data['internationalPrice'], 'Number');
            }
            if (data.hasOwnProperty('metalPriceSpot')) {
                obj['metalPriceSpot'] = ApiClient.convertToType(data['metalPriceSpot'], 'Number');
            }
            if (data.hasOwnProperty('sellingPrice')) {
                obj['sellingPrice'] = ApiClient.convertToType(data['sellingPrice'], 'Number');
            }
            if (data.hasOwnProperty('buyingPrice')) {
                obj['buyingPrice'] = ApiClient.convertToType(data['buyingPrice'], 'Number');
            }
            if (data.hasOwnProperty('effectiveDate')) {
                obj['effectiveDate'] = ApiClient.convertToType(data['effectiveDate'], 'Date');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>MetalPriceRate</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>MetalPriceRate</code>.
     */
    static validateJSON(data) {

        return true;
    }


}



/**
 * @member {Number} metalPriceRateId
 */
MetalPriceRate.prototype['metalPriceRateId'] = undefined;

/**
 * @member {Number} metalTypeId
 */
MetalPriceRate.prototype['metalTypeId'] = undefined;

/**
 * @member {Number} profitSell
 */
MetalPriceRate.prototype['profitSell'] = undefined;

/**
 * @member {Number} profitBuy
 */
MetalPriceRate.prototype['profitBuy'] = undefined;

/**
 * @member {Number} exchangeRate
 */
MetalPriceRate.prototype['exchangeRate'] = undefined;

/**
 * @member {Number} internationalPrice
 */
MetalPriceRate.prototype['internationalPrice'] = undefined;

/**
 * @member {Number} metalPriceSpot
 */
MetalPriceRate.prototype['metalPriceSpot'] = undefined;

/**
 * @member {Number} sellingPrice
 */
MetalPriceRate.prototype['sellingPrice'] = undefined;

/**
 * @member {Number} buyingPrice
 */
MetalPriceRate.prototype['buyingPrice'] = undefined;

/**
 * @member {Date} effectiveDate
 */
MetalPriceRate.prototype['effectiveDate'] = undefined;






export default MetalPriceRate;

