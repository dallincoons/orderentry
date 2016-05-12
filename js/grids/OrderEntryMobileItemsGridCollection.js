/**
 * @auther Dallin Coons on 11/09/2015.
 */

define([
	  'jquery'
	, 'underscore'
	, 'backbone'
], function (
	  $
	,  _
	, Backbone
) {

	return (function ($) {

		var ShoppingCartCollection = Backbone.Collection.extend({

			//model : ItemsGridModel

		});

		return ShoppingCartCollection;

	})($);
});
 
 
