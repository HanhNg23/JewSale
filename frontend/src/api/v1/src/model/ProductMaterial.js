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
import GemStone from './GemStone';
import MetalType from './MetalType';

/**
 * The ProductMaterial model module.
 * @module model/ProductMaterial
 * @version 1.0.0
 */
class ProductMaterial {
    /**
     * Constructs a new <code>ProductMaterial</code>.
     * @alias module:model/ProductMaterial
     */
    constructor() { 
        
        ProductMaterial.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>ProductMaterial</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ProductMaterial} obj Optional instance to populate.
     * @return {module:model/ProductMaterial} The populated <code>ProductMaterial</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ProductMaterial();

            if (data.hasOwnProperty('productMaterialId')) {
                obj['productMaterialId'] = ApiClient.convertToType(data['productMaterialId'], 'Number');
            }
            if (data.hasOwnProperty('materialId')) {
                obj['materialId'] = ApiClient.convertToType(data['materialId'], 'Number');
            }
            if (data.hasOwnProperty('productId')) {
                obj['productId'] = ApiClient.convertToType(data['productId'], 'Number');
            }
            if (data.hasOwnProperty('gemStone')) {
                obj['gemStone'] = GemStone.constructFromObject(data['gemStone']);
            }
            if (data.hasOwnProperty('metalType')) {
                obj['metalType'] = MetalType.constructFromObject(data['metalType']);
            }
            if (data.hasOwnProperty('materialWeight')) {
                obj['materialWeight'] = ApiClient.convertToType(data['materialWeight'], 'Number');
            }
            if (data.hasOwnProperty('materialSize')) {
                obj['materialSize'] = ApiClient.convertToType(data['materialSize'], 'Number');
            }
            if (data.hasOwnProperty('metal')) {
                obj['metal'] = ApiClient.convertToType(data['metal'], 'Boolean');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>ProductMaterial</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ProductMaterial</code>.
     */
    static validateJSON(data) {
        // validate the optional field `gemStone`
        if (data['gemStone']) { // data not null
          GemStone.validateJSON(data['gemStone']);
        }
        // validate the optional field `metalType`
        if (data['metalType']) { // data not null
          MetalType.validateJSON(data['metalType']);
        }

        return true;
    }


}



/**
 * @member {Number} productMaterialId
 */
ProductMaterial.prototype['productMaterialId'] = undefined;

/**
 * @member {Number} materialId
 */
ProductMaterial.prototype['materialId'] = undefined;

/**
 * @member {Number} productId
 */
ProductMaterial.prototype['productId'] = undefined;

/**
 * @member {module:model/GemStone} gemStone
 */
ProductMaterial.prototype['gemStone'] = undefined;

/**
 * @member {module:model/MetalType} metalType
 */
ProductMaterial.prototype['metalType'] = undefined;

/**
 * @member {Number} materialWeight
 */
ProductMaterial.prototype['materialWeight'] = undefined;

/**
 * @member {Number} materialSize
 */
ProductMaterial.prototype['materialSize'] = undefined;

/**
 * @member {Boolean} metal
 */
ProductMaterial.prototype['metal'] = undefined;






export default ProductMaterial;

