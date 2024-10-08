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

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', process.cwd()+'/src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require(process.cwd()+'/src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.JewelryApis);
  }
}(this, function(expect, JewelryApis) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new JewelryApis.ProductRequest();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('ProductRequest', function() {
    it('should create an instance of ProductRequest', function() {
      // uncomment below and update the code to test ProductRequest
      //var instance = new JewelryApis.ProductRequest();
      //expect(instance).to.be.a(JewelryApis.ProductRequest);
    });

    it('should have the property name (base name: "name")', function() {
      // uncomment below and update the code to test the property name
      //var instance = new JewelryApis.ProductRequest();
      //expect(instance).to.be();
    });

    it('should have the property description (base name: "description")', function() {
      // uncomment below and update the code to test the property description
      //var instance = new JewelryApis.ProductRequest();
      //expect(instance).to.be();
    });

    it('should have the property productType (base name: "productType")', function() {
      // uncomment below and update the code to test the property productType
      //var instance = new JewelryApis.ProductRequest();
      //expect(instance).to.be();
    });

    it('should have the property unitMeasure (base name: "unitMeasure")', function() {
      // uncomment below and update the code to test the property unitMeasure
      //var instance = new JewelryApis.ProductRequest();
      //expect(instance).to.be();
    });

    it('should have the property saleStatus (base name: "saleStatus")', function() {
      // uncomment below and update the code to test the property saleStatus
      //var instance = new JewelryApis.ProductRequest();
      //expect(instance).to.be();
    });

    it('should have the property imageUrls (base name: "imageUrls")', function() {
      // uncomment below and update the code to test the property imageUrls
      //var instance = new JewelryApis.ProductRequest();
      //expect(instance).to.be();
    });

    it('should have the property gemstones (base name: "gemstones")', function() {
      // uncomment below and update the code to test the property gemstones
      //var instance = new JewelryApis.ProductRequest();
      //expect(instance).to.be();
    });

    it('should have the property metalType (base name: "metalType")', function() {
      // uncomment below and update the code to test the property metalType
      //var instance = new JewelryApis.ProductRequest();
      //expect(instance).to.be();
    });

    it('should have the property productPrice (base name: "productPrice")', function() {
      // uncomment below and update the code to test the property productPrice
      //var instance = new JewelryApis.ProductRequest();
      //expect(instance).to.be();
    });

  });

}));
