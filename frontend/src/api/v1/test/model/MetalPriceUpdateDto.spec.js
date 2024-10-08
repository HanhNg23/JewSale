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
    instance = new JewelryApis.MetalPriceUpdateDto();
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

  describe('MetalPriceUpdateDto', function() {
    it('should create an instance of MetalPriceUpdateDto', function() {
      // uncomment below and update the code to test MetalPriceUpdateDto
      //var instance = new JewelryApis.MetalPriceUpdateDto();
      //expect(instance).to.be.a(JewelryApis.MetalPriceUpdateDto);
    });

    it('should have the property profitSell (base name: "profitSell")', function() {
      // uncomment below and update the code to test the property profitSell
      //var instance = new JewelryApis.MetalPriceUpdateDto();
      //expect(instance).to.be();
    });

    it('should have the property profitBuy (base name: "profitBuy")', function() {
      // uncomment below and update the code to test the property profitBuy
      //var instance = new JewelryApis.MetalPriceUpdateDto();
      //expect(instance).to.be();
    });

    it('should have the property metalPriceSpot (base name: "metalPriceSpot")', function() {
      // uncomment below and update the code to test the property metalPriceSpot
      //var instance = new JewelryApis.MetalPriceUpdateDto();
      //expect(instance).to.be();
    });

  });

}));
