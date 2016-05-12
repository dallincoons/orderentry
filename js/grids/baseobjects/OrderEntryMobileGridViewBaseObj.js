/**
 * @auther Dallin Coons on 10/13/2015.
 */

define([
	  'jquery'
	, 'underscore'
	, 'backbone'
	, 'shoppingcart/OrderEntryMobileShoppingCartView'
	, 'grids/OrderEntryMobileItemsGridCollection'
	, 'grids/OrderEntryMobileItemsGridModel'

], function (
	  $
	,  _
	, Backbone
	, ShoppingCartView
	, ItemsGridCollection
	, ItemsGridModel
) {

	return (function ($) {

		Backbone.$ = $;

		var GridViewBase = Backbone.View.extend({

			GridItems : new ItemsGridCollection(),

			parent : this,

			render : function(grid){
				var items = this.GridItems,
					value,
					btn;

				_.each(items.where({grid : grid}), function(item){

					//get value of input and cache button
					value = item.get('value');
					btn = $('#' + item.get('grid') + ' #' + item.get('status') + item.get('rowid') + item.get('grid'));

					//is input empty or zero?
					if(value !== '' &&  value != '0') {

						btn.css('visibility', 'visible');

					}else{

						btn.css('visibility', 'hidden');

					}

					items.remove(item);

				});
			},
			displayAddToCart : function(e){

				var item = {};

				var inputValue = e.target.value,
					rowid = $(e.target).attr('data-row'),
					grid = $(e.target).attr('data-grid');

				var status = $('#add_to_cart' + rowid + grid).attr('data-status');

				//assign a value to the button
				this.GridItems.add(new ItemsGridModel({
					grid : grid,
					rowid : rowid,
					status : 'add_to_cart',
					value : inputValue
				}));

				this.render(grid);

			},
			addToCart : function(e){

				var rowid = $(e.target).attr('data-row'),
					grid = $(e.target).attr('data-grid'),
					$order_qty_input = $('#order_qty' + rowid + grid);

				var $grid = $(this.el);

				var rowData            = $grid.jqGrid('getRowData', rowid);
				rowData.order_qty      = $order_qty_input.val();
				rowData.rowid          = rowid;
				rowData.warehouse_code = $grid.getCell(rowid, 'warehouse_code');
				rowData.grid           = $(e.target).attr('data-grid');

				//get items already stored in model
				var cart_items = ShoppingCartView.model.get('cart_items');

				var item_count = cart_items.where({rowid : rowid}).length;

				//has item already been added?
				if(item_count == 0){

					cart_items.push(rowData);
					$(e.target).text('Update').attr('data-status', 'update');

				}else if(item_count == 1){
					//update quantity

					var new_qty = $order_qty_input.val();

					var item = cart_items.where({rowid : rowid});

					item[0].attributes['order_qty'] = new_qty;

				}else{

					throw new Error("More than one product of the same type not allowed");

				}


				////assign data to the shopping cart view's model
				ShoppingCartView.model.set('cart_items', cart_items);
				ShoppingCartView.model.trigger('change:cart_items');
			}

		});

		return GridViewBase;

	})($);
});
 
 
