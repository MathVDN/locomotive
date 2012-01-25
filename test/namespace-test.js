var vows = require('vows');
var assert = require('assert');
var util = require('util');
var Namespace = require('locomotive/namespace');


vows.describe('Namespace').addBatch({
  
  'default namespace': {
    topic: function() {
      return new Namespace();
    },
    
    'should have empty name property': function (ns) {
      assert.equal(ns.path, '');
    },
    'should have empty module property': function (ns) {
      assert.equal(ns.module, '');
    },
    'should not have parent property': function (ns) {
      assert.isNull(ns.parent);
    },
    'should qualify controllers': function (ns) {
      assert.equal(ns.qmodule('PhotosController'), 'PhotosController');
    },
    'should qualify paths': function (ns) {
      assert.equal(ns.qpath('photos'), '/photos');
      assert.equal(ns.qpath('/photos'), '/photos');
    },
  },
  
  'namespace constructed with name': {
    topic: function() {
      return new Namespace('foo');
    },
    
    'should have name property': function (ns) {
      assert.equal(ns.path, 'foo');
    },
    'should have module property': function (ns) {
      assert.equal(ns.module, 'Foo');
    },
    'should not have parent property': function (ns) {
      assert.isNull(ns.parent);
    },
    'should qualify controllers': function (ns) {
      assert.equal(ns.qmodule('PhotosController'), 'Foo::PhotosController');
    },
    'should qualify paths': function (ns) {
      assert.equal(ns.qpath('photos'), '/foo/photos');
      assert.equal(ns.qpath('/photos'), '/foo/photos');
    },
  },
  
  'namespace constructed with name and module option': {
    topic: function() {
      return new Namespace('foo', { module: 'Bar' });
    },
    
    'should have name property': function (ns) {
      assert.equal(ns.path, 'foo');
    },
    'should have module property': function (ns) {
      assert.equal(ns.module, 'Bar');
    },
    'should not have parent property': function (ns) {
      assert.isNull(ns.parent);
    },
    'should qualify controllers': function (ns) {
      assert.equal(ns.qmodule('PhotosController'), 'Bar::PhotosController');
    },
    'should qualify paths': function (ns) {
      assert.equal(ns.qpath('photos'), '/foo/photos');
      assert.equal(ns.qpath('/photos'), '/foo/photos');
    },
  },
  
  'namespace constructed with name and null module option': {
    topic: function() {
      return new Namespace('foo', { module: null });
    },
    
    'should have name property': function (ns) {
      assert.equal(ns.path, 'foo');
    },
    'should have module property': function (ns) {
      assert.equal(ns.module, '');
    },
    'should not have parent property': function (ns) {
      assert.isNull(ns.parent);
    },
    'should qualify controllers': function (ns) {
      assert.equal(ns.qmodule('PhotosController'), 'PhotosController');
    },
    'should qualify paths': function (ns) {
      assert.equal(ns.qpath('photos'), '/foo/photos');
      assert.equal(ns.qpath('/photos'), '/foo/photos');
    },
  },
  
  'namespace with parent': {
    topic: function() {
      var admin = new Namespace('net');
      return new Namespace('http', {}, admin);
    },
    
    'should have empty name property': function (ns) {
      assert.equal(ns.path, 'http');
    },
    'should have empty module property': function (ns) {
      assert.equal(ns.module, 'Http');
    },
    'should have parent property': function (ns) {
      assert.isObject(ns.parent);
    },
    'should qualify controllers': function (ns) {
      assert.equal(ns.qmodule('ProxiesController'), 'Net::Http::ProxiesController');
    },
    'should qualify paths': function (ns) {
      assert.equal(ns.qpath('proxies'), '/net/http/proxies');
      assert.equal(ns.qpath('/proxies'), '/net/http/proxies');
    },
  },

}).export(module);
