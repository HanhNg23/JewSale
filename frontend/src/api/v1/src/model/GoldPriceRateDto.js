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
 * The GoldPriceRateDto model module.
 * @module model/GoldPriceRateDto
 * @version 1.0.0
 */
class GoldPriceRateDto {
    /**
     * Constructs a new <code>GoldPriceRateDto</code>.
     * @alias module:model/GoldPriceRateDto
     */
    constructor() { 
        
        GoldPriceRateDto.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>GoldPriceRateDto</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/GoldPriceRateDto} obj Optional instance to populate.
     * @return {module:model/GoldPriceRateDto} The populated <code>GoldPriceRateDto</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new GoldPriceRateDto();

            if (data.hasOwnProperty('ouncePriceUsd')) {
                obj['ouncePriceUsd'] = ApiClient.convertToType(data['ouncePriceUsd'], 'Number');
            }
            if (data.hasOwnProperty('gmtOuncePriceUsdUpdated')) {
                obj['gmtOuncePriceUsdUpdated'] = ApiClient.convertToType(data['gmtOuncePriceUsdUpdated'], 'String');
            }
            if (data.hasOwnProperty('usdToVnd')) {
                obj['usdToVnd'] = ApiClient.convertToType(data['usdToVnd'], 'Number');
            }
            if (data.hasOwnProperty('gmtVndUpdated')) {
                obj['gmtVndUpdated'] = ApiClient.convertToType(data['gmtVndUpdated'], 'String');
            }
            if (data.hasOwnProperty('ounceInVnd')) {
                obj['ounceInVnd'] = ApiClient.convertToType(data['ounceInVnd'], 'Number');
            }
            if (data.hasOwnProperty('gramToOunceFormula')) {
                obj['gramToOunceFormula'] = ApiClient.convertToType(data['gramToOunceFormula'], 'Number');
            }
            if (data.hasOwnProperty('gramInUsd')) {
                obj['gramInUsd'] = ApiClient.convertToType(data['gramInUsd'], 'Number');
            }
            if (data.hasOwnProperty('gramInVnd')) {
                obj['gramInVnd'] = ApiClient.convertToType(data['gramInVnd'], 'Number');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>GoldPriceRateDto</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>GoldPriceRateDto</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['gmtOuncePriceUsdUpdated'] && !(typeof data['gmtOuncePriceUsdUpdated'] === 'string' || data['gmtOuncePriceUsdUpdated'] instanceof String)) {
            throw new Error("Expected the field `gmtOuncePriceUsdUpdated` to be a primitive type in the JSON string but got " + data['gmtOuncePriceUsdUpdated']);
        }
        // ensure the json data is a string
        if (data['gmtVndUpdated'] && !(typeof data['gmtVndUpdated'] === 'string' || data['gmtVndUpdated'] instanceof String)) {
            throw new Error("Expected the field `gmtVndUpdated` to be a primitive type in the JSON string but got " + data['gmtVndUpdated']);
        }

        return true;
    }


}



/**
 * @member {Number} ouncePriceUsd
 */
GoldPriceRateDto.prototype['ouncePriceUsd'] = undefined;

/**
 * @member {String} gmtOuncePriceUsdUpdated
 */
GoldPriceRateDto.prototype['gmtOuncePriceUsdUpdated'] = undefined;

/**
 * @member {Number} usdToVnd
 */
GoldPriceRateDto.prototype['usdToVnd'] = undefined;

/**
 * @member {String} gmtVndUpdated
 */
GoldPriceRateDto.prototype['gmtVndUpdated'] = undefined;

/**
 * @member {Number} ounceInVnd
 */
GoldPriceRateDto.prototype['ounceInVnd'] = undefined;

/**
 * @member {Number} gramToOunceFormula
 */
GoldPriceRateDto.prototype['gramToOunceFormula'] = undefined;

/**
 * @member {Number} gramInUsd
 */
GoldPriceRateDto.prototype['gramInUsd'] = undefined;

/**
 * @member {Number} gramInVnd
 */
GoldPriceRateDto.prototype['gramInVnd'] = undefined;






export default GoldPriceRateDto;

