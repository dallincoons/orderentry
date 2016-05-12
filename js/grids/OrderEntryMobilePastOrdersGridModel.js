define([
	'underscore'
	, 'backbone'
],function(
	_
	, Backbone
){

	var pastOrdersGridModel = Backbone.Model.extend({

		defaults : {
			initialized : false
		}

	});

	return pastOrdersGridModel;

});