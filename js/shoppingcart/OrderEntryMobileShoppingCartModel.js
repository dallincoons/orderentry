define([
	  'underscore'
	, 'backbone'
],function(
	  _
	, Backbone
){

	var shoppingCartModel = Backbone.Model.extend({

		defaults : {
			  'cart_items' : []
			, submitting : false
		}
	});

	return shoppingCartModel;

});