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

		var AllProductsView = GridViewBase.extend({

			//The element this view represents
			el: '#newordermobilegrid',

			//event handlers
			events: {

				  'keyup .orderQty' : 'displayAddToCart'
				, 'click .add_to_cart' : 'addToCart'

			},
			initialize : function(options){
				//code to run when object is created
			},
			addToCart : function(e){

				var rowid = $(e.target).attr('data-row'),
					grid = $(e.target).attr('data-grid'),
					$order_qty_input = $('#order_qty' + rowid + grid),
					order_qty = $order_qty_input.val();

				var $grid    = $(this.el),
					quantity = $grid.getCell(rowid, 'quantity');

				if(quantity <= order_qty){

					//populate field with highest available quantity
					$order_qty_input.val(quantity);

				}

				//call parent class
				this.constructor.__super__.addToCart.call(this, e);




			}
		});

		return AllProductsView;

	})($);
});
 
 
