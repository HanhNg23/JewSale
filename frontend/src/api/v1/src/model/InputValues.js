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
 * The InputValues model module.
 * @module model/InputValues
 * @version 1.0.0
 */
class InputValues {
    /**
     * Constructs a new <code>InputValues</code>.
     * @alias module:model/InputValues
     */
    constructor() { 
        
        InputValues.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>InputValues</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/InputValues} obj Optional instance to populate.
     * @return {module:model/InputValues} The populated <code>InputValues</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new InputValues();

            if (data.hasOwnProperty('username')) {
                obj['username'] = ApiClient.convertToType(data['username'], 'String');
            }
            if (data.hasOwnProperty('password')) {
                obj['password'] = ApiClient.convertToType(data['password'], 'String');
            }
            if (data.hasOwnProperty('role')) {
                obj['role'] = ApiClient.convertToType(data['role'], 'String');
            }
            if (data.hasOwnProperty('fullname')) {
                obj['fullname'] = ApiClient.convertToType(data['fullname'], 'String');
            }
            if (data.hasOwnProperty('phonenumber')) {
                obj['phonenumber'] = ApiClient.convertToType(data['phonenumber'], 'String');
            }
            if (data.hasOwnProperty('email')) {
                obj['email'] = ApiClient.convertToType(data['email'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>InputValues</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>InputValues</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['username'] && !(typeof data['username'] === 'string' || data['username'] instanceof String)) {
            throw new Error("Expected the field `username` to be a primitive type in the JSON string but got " + data['username']);
        }
        // ensure the json data is a string
        if (data['password'] && !(typeof data['password'] === 'string' || data['password'] instanceof String)) {
            throw new Error("Expected the field `password` to be a primitive type in the JSON string but got " + data['password']);
        }
        // ensure the json data is a string
        if (data['role'] && !(typeof data['role'] === 'string' || data['role'] instanceof String)) {
            throw new Error("Expected the field `role` to be a primitive type in the JSON string but got " + data['role']);
        }
        // ensure the json data is a string
        if (data['fullname'] && !(typeof data['fullname'] === 'string' || data['fullname'] instanceof String)) {
            throw new Error("Expected the field `fullname` to be a primitive type in the JSON string but got " + data['fullname']);
        }
        // ensure the json data is a string
        if (data['phonenumber'] && !(typeof data['phonenumber'] === 'string' || data['phonenumber'] instanceof String)) {
            throw new Error("Expected the field `phonenumber` to be a primitive type in the JSON string but got " + data['phonenumber']);
        }
        // ensure the json data is a string
        if (data['email'] && !(typeof data['email'] === 'string' || data['email'] instanceof String)) {
            throw new Error("Expected the field `email` to be a primitive type in the JSON string but got " + data['email']);
        }

        return true;
    }


}



/**
 * @member {String} username
 */
InputValues.prototype['username'] = undefined;

/**
 * @member {String} password
 */
InputValues.prototype['password'] = undefined;

/**
 * @member {module:model/InputValues.RoleEnum} role
 */
InputValues.prototype['role'] = undefined;

/**
 * @member {String} fullname
 */
InputValues.prototype['fullname'] = undefined;

/**
 * @member {String} phonenumber
 */
InputValues.prototype['phonenumber'] = undefined;

/**
 * @member {String} email
 */
InputValues.prototype['email'] = undefined;





/**
 * Allowed values for the <code>role</code> property.
 * @enum {String}
 * @readonly
 */
InputValues['RoleEnum'] = {

    /**
     * value: "ADMIN"
     * @const
     */
    "ADMIN": "ADMIN",

    /**
     * value: "MANAGER"
     * @const
     */
    "MANAGER": "MANAGER",

    /**
     * value: "STAFF"
     * @const
     */
    "STAFF": "STAFF",

    /**
     * value: "CUSTOMER"
     * @const
     */
    "CUSTOMER": "CUSTOMER"
};



export default InputValues;

