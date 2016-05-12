/**
 * @auther Dallin Coons on 10/13/2015.
 */

define([
	  'jquery'
	, 'underscore'
	, 'backbone'
	, 'grids/baseobjects/OrderEntryMobileGridViewBaseObj'
], function (
	  $
	,  _
	, Backbone
	, GridViewBase
) {

	return (function ($) {

		Backbone.$ = $;

		var RecentItemsView = GridViewBase.extend({

			//The element this view represents
			el: '#popularitemsgrid',

			//event handlers
			events: {
				  'keyup .orderQty' : 'displayAddToCart'
				, 'click .add_to_cart' : 'addToCart'
			},
			//code to run when object is created
			initialize : function(options){

				var data = {};

				this.deferred = $.Deferred();

				data.rowNums = this.$el.jqGrid('getGridParam', 'records');

				this.deferred.resolve(data);

			}
		});

		return RecentItemsView;

	})($);
});
 
 
