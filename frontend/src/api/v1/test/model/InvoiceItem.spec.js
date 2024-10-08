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
    instance = new JewelryApis.InvoiceItem();
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

  describe('InvoiceItem', function() {
    it('should create an instance of InvoiceItem', function() {
      // uncomment below and update the code to test InvoiceItem
      //var instance = new JewelryApis.InvoiceItem();
      //expect(instance).to.be.a(JewelryApis.InvoiceItem);
    });

    it('should have the property invoiceItemId (base name: "invoiceItemId")', function() {
      // uncomment below and update the code to test the property invoiceItemId
      //var instance = new JewelryApis.InvoiceItem();
      //expect(instance).to.be();
    });

    it('should have the property invoiceId (base name: "invoiceId")', function() {
      // uncomment below and update the code to test the property invoiceId
      //var instance = new JewelryApis.InvoiceItem();
      //expect(instance).to.be();
    });

    it('should have the property productId (base name: "productId")', function() {
      // uncomment below and update the code to test the property productId
      //var instance = new JewelryApis.InvoiceItem();
      //expect(instance).to.be();
    });

    it('should have the property componentBuy (base name: "componentBuy")', function() {
      // uncomment below and update the code to test the property componentBuy
      //var instance = new JewelryApis.InvoiceItem();
      //expect(instance).to.be();
    });

    it('should have the property unitMeasure (base name: "unitMeasure")', function() {
      // uncomment below and update the code to test the property unitMeasure
      //var instance = new JewelryApis.InvoiceItem();
      //expect(instance).to.be();
    });

    it('should have the property quantity (base name: "quantity")', function() {
      // uncomment below and update the code to test the property quantity
      //var instance = new JewelryApis.InvoiceItem();
      //expect(instance).to.be();
    });

    it('should have the property unitPrice (base name: "unitPrice")', function() {
      // uncomment below and update the code to test the property unitPrice
      //var instance = new JewelryApis.InvoiceItem();
      //expect(instance).to.be();
    });

    it('should have the property discountPercentage (base name: "discountPercentage")', function() {
      // uncomment below and update the code to test the property discountPercentage
      //var instance = new JewelryApis.InvoiceItem();
      //expect(instance).to.be();
    });

    it('should have the property subTotal (base name: "subTotal")', function() {
      // uncomment below and update the code to test the property subTotal
      //var instance = new JewelryApis.InvoiceItem();
      //expect(instance).to.be();
    });

  });

}));
