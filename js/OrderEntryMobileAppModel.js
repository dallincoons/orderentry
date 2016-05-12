/**
 * @auther Dallin Coons on 11/20/2015.
 */

define([
	  'underscore'
	, 'backbone'
],function(
	  _
	, Backbone
){

	var AppModel = Backbone.Model.extend({

		defaults : {
			CustomerCode : null,
			CustomerName : null
		}
	});

	return new AppModel();

});
 
 
