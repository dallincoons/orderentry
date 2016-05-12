/**
 * @auther Dallin Coons on 10/23/2015.
 */

define([
	  'jquery'
	, 'underscore'
	, 'backbone'
	, 'shoppingcart/OrderEntryMobileShoppingCartModel'
], function (
	  $
	,  _
	, Backbone
	, ShoppingCartModel
) {

	return (function ($) {

		var ShoppingCartCollection = Backbone.Collection.extend({

			model : ShoppingCartModel

		});

		return ShoppingCartCollection;

	})($);
});
 
 
