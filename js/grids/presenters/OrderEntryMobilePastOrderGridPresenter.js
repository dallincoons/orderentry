/**
 * @auther Dallin Coons on 11/13/2015.
 */

define([
	  'jquery'
	, 'underscore'
	, 'backbone'
	, 'OrderEntryMobileGridInitializer'
	, 'OrderEntryMobileConstants'
	, 'grids/OrderEntryMobileLineOrdersGridView'
], function (
	  $
	,  _
	, Backbone
	, GridInitializer
	, Constants
	, MobileLineOrdersGridView
) {

	return (function($) {

		Backbone.$ = $;

		function ModelPresenter(options) {
			if (options == null) {
				options = {};
			}
			this.model = options.model;

			this.showOrderLine = function(e){

				var rowid = e.currentTarget.id,
					orderNumber = $(Constants.PAST_ORDERS_GRID).getCell(rowid, 'order_number');

				GridInitializer.CreateOrderLinesGrid(orderNumber);

			}
		}

		return ModelPresenter;

	})($);

});
 
 
