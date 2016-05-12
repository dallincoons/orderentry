/**
 * @auther Dallin Coons on 10/13/2015.
 */

define([
	  'jquery'
	, 'underscore'
	, 'backbone'
	, 'grids/baseobjects/OrderEntryMobileGridViewBaseObj'
	, 'grids/OrderEntryMobilePastOrdersGridModel'
	, 'OrderEntryMobileGridInitializer'
	, 'OrderEntryMobileConstants'
	, 'OrderEntryMobileGridData'

], function (
	  $
	,  _
	, Backbone
	, GridViewBase
	, PastOrdersGridModel
	, GridInitializer
	, Constants
	, MobileGridData
) {

	return (function ($) {

		Backbone.$ = $;

		var PastOrdersView = Backbone.View.extend({

			//The element this view represents
			el: '#pastordergrid_container',
			model : new PastOrdersGridModel(),

			//event handlers
			events: {
				'click tr' : 'showOrderLine'
			},
			//code to run when object is created
			initialize : function(options){

			},
			reload : function(){

				var self = this;

				GridInitializer.unloadGrid(Constants.PAST_ORDERS_GRID, Constants.PAST_ORDER_CONTAINER);

				//when the grid has been fully loaded reattach event handlers
				$.when( this.render() ).then(

					self.delegateEvents()

				);

			},
			render : function(){

				return GridInitializer.CreatePastOrdersGrid(MobileGridData.getGridData(Constants.PastOrdersGridData));

			},
			showOrderLine : function(e){

				var rowid = e.currentTarget.id,
					orderNumber = $(Constants.PAST_ORDERS_GRID).getCell(rowid, 'order_number');

				if(!this.model.get('initialized')){

					this.model.set('initialized', true);

				}else{

					GridInitializer.unloadGrid(Constants.ORDER_LINE_GRID, Constants.ORDER_LINE_CONTAINER);

				}

				GridInitializer.CreateOrderLinesGrid(orderNumber, MobileGridData.getGridData('OrderLineGridData'));

			}
		});

		return new PastOrdersView();

	})($);
});
 
 
