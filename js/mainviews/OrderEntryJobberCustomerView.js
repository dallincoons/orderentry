/**
 * @auther Dallin Coons on 10/13/2015.
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

		var JobberCustomerView = Backbone.View.extend({

			//The element this view represents
			el : '#customer_selection',

			//event handlers
			events: {

			},
			render : function(router){

				this.$el.show();

				GridInitializer.CreateCustomerGrid( OrderEntryMobileGridData.getGridData( OrderEntryMobileConstants.JOBBER_CUSTOMERSELECTION ),
				OrderEntryMobileGridData.getGridData( OrderEntryMobileConstants.CUSTOMER_GRID_DATA ),
					router );

			},
			//code to run when object is created
			initialize : function(options){

			}
		});

		return JobberCustomerView;

	})($);
});