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
 * The InvoiceItemPayload model module.
 * @module model/InvoiceItemPayload
 * @version 1.0.0
 */
class InvoiceItemPayload {
    /**
     * Constructs a new <code>InvoiceItemPayload</code>.
     * Payload for an individual invoice item
     * @alias module:model/InvoiceItemPayload
     * @param productId {Number} ID of the product
     * @param unitMeasure {String} Unit measure of the product
     */
    constructor(productId, unitMeasure) { 
        
        InvoiceItemPayload.initialize(this, productId, unitMeasure);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, productId, unitMeasure) { 
        obj['productId'] = productId;
        obj['unitMeasure'] = unitMeasure;
    }

    /**
     * Constructs a <code>InvoiceItemPayload</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/InvoiceItemPayload} obj Optional instance to populate.
     * @return {module:model/InvoiceItemPayload} The populated <code>InvoiceItemPayload</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new InvoiceItemPayload();

            if (data.hasOwnProperty('productId')) {
                obj['productId'] = ApiClient.convertToType(data['productId'], 'Number');
            }
            if (data.hasOwnProperty('unitMeasure')) {
                obj['unitMeasure'] = ApiClient.convertToType(data['unitMeasure'], 'String');
            }
            if (data.hasOwnProperty('quantity')) {
                obj['quantity'] = ApiClient.convertToType(data['quantity'], 'Number');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>InvoiceItemPayload</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>InvoiceItemPayload</code>.
     */
    static validateJSON(data) {
        // check to make sure all required properties are present in the JSON string
        for (const property of InvoiceItemPayload.RequiredProperties) {
            if (!data.hasOwnProperty(property)) {
                throw new Error("The required field `" + property + "` is not found in the JSON data: " + JSON.stringify(data));
            }
        }
        // ensure the json data is a string
        if (data['unitMeasure'] && !(typeof data['unitMeasure'] === 'string' || data['unitMeasure'] instanceof String)) {
            throw new Error("Expected the field `unitMeasure` to be a primitive type in the JSON string but got " + data['unitMeasure']);
        }

        return true;
    }


}

InvoiceItemPayload.RequiredProperties = ["productId", "unitMeasure"];

/**
 * ID of the product
 * @member {Number} productId
 */
InvoiceItemPayload.prototype['productId'] = undefined;

/**
 * Unit measure of the product
 * @member {String} unitMeasure
 */
InvoiceItemPayload.prototype['unitMeasure'] = undefined;

/**
 * Quantity of the product
 * @member {Number} quantity
 */
InvoiceItemPayload.prototype['quantity'] = undefined;






export default InvoiceItemPayload;

