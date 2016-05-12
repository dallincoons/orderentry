/**
 * @auther Dallin Coons on 11/20/2015.
 */

define([
	'jquery'
	, 'underscore'
	, 'backbone'
	, 'OrderEntryMobileGridInitializer'
	, 'OrderEntryMobileConstants'
	, 'OrderEntryMobileGridData'

], function (
	  $
	,  _
	, Backbone
	, GridInitializer
	, OrderEntryMobileConstants
	, OrderEntryMobileGridData
) {


	return (function ($) {

		Backbone.$ = $;

		var RecentItemsView = Backbone.View.extend({

			//The element this view represents
			el: '#customer_selection',

			//event handlers
			events: {

			},
			render : function(router){

				this.$el.show();

				GridInitializer.CreateCustomerGrid( OrderEntryMobileGridData.getGridData( OrderEntryMobileConstants.SALESMAN_CUSTOMERSELECTION ),
					OrderEntryMobileGridData.getGridData( OrderEntryMobileConstants.CUSTOMER_GRID_DATA ),
					router);

			},
			//code to run when object is created
			initialize : function(options){

			}
		});

		return RecentItemsView;

	})($);
});

