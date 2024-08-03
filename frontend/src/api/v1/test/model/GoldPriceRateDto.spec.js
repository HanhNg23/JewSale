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
    instance = new JewelryApis.GoldPriceRateDto();
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

  describe('GoldPriceRateDto', function() {
    it('should create an instance of GoldPriceRateDto', function() {
      // uncomment below and update the code to test GoldPriceRateDto
      //var instance = new JewelryApis.GoldPriceRateDto();
      //expect(instance).to.be.a(JewelryApis.GoldPriceRateDto);
    });

    it('should have the property ouncePriceUsd (base name: "ouncePriceUsd")', function() {
      // uncomment below and update the code to test the property ouncePriceUsd
      //var instance = new JewelryApis.GoldPriceRateDto();
      //expect(instance).to.be();
    });

    it('should have the property gmtOuncePriceUsdUpdated (base name: "gmtOuncePriceUsdUpdated")', function() {
      // uncomment below and update the code to test the property gmtOuncePriceUsdUpdated
      //var instance = new JewelryApis.GoldPriceRateDto();
      //expect(instance).to.be();
    });

    it('should have the property usdToVnd (base name: "usdToVnd")', function() {
      // uncomment below and update the code to test the property usdToVnd
      //var instance = new JewelryApis.GoldPriceRateDto();
      //expect(instance).to.be();
    });

    it('should have the property gmtVndUpdated (base name: "gmtVndUpdated")', function() {
      // uncomment below and update the code to test the property gmtVndUpdated
      //var instance = new JewelryApis.GoldPriceRateDto();
      //expect(instance).to.be();
    });

    it('should have the property ounceInVnd (base name: "ounceInVnd")', function() {
      // uncomment below and update the code to test the property ounceInVnd
      //var instance = new JewelryApis.GoldPriceRateDto();
      //expect(instance).to.be();
    });

    it('should have the property gramToOunceFormula (base name: "gramToOunceFormula")', function() {
      // uncomment below and update the code to test the property gramToOunceFormula
      //var instance = new JewelryApis.GoldPriceRateDto();
      //expect(instance).to.be();
    });

    it('should have the property gramInUsd (base name: "gramInUsd")', function() {
      // uncomment below and update the code to test the property gramInUsd
      //var instance = new JewelryApis.GoldPriceRateDto();
      //expect(instance).to.be();
    });

    it('should have the property gramInVnd (base name: "gramInVnd")', function() {
      // uncomment below and update the code to test the property gramInVnd
      //var instance = new JewelryApis.GoldPriceRateDto();
      //expect(instance).to.be();
    });

  });

}));
