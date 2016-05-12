/**
 * @auther Dallin Coons on 10/13/2015.
 */

define([
	  'jquery'
	, 'underscore'
	, 'backbone'
	, 'shoppingcart/OrderEntryMobileShoppingCartModel'
	, 'shoppingcart/OrderEntryMobileShoppingCartCollection'
	, 'Handlebars'
	, 'shoppingcart/OrderEntryMobileSubmitOrder'
	, 'sweetAlert'
	, 'OrderEntryMobileConstants'
	, 'forms/OrderEntryMobileOrderFormView'
	, 'grids/OrderEntryMobilePastOrdersGridView'

], function (
	  $
	,  _
	, Backbone
	, ShoppingCartModel
	, ShoppingCartCollection
	, Handlebars
	, OrderHandler
	, sweetAlert
	, Constants
	, OrderFormView
	, PastOrdersGridView
) {

	return (function ($) {

		Backbone.$ = $;

		var ShoppingCartView = Backbone.View.extend({

			//The element this view represents
			el: '#shopping-cart',
			$submitBtn : $('#submit_order_btn'),
			$orderForm : new OrderFormView(),

			model: new ShoppingCartModel(),

			//event handlers
			events: {
				  'click .remove_x' : 'removeCartItem'
				, 'keyup .cart_order_qty' : 'displayUpdateQty'
				, 'click #submit_order_btn' : 'submitOrder'
				, 'click .update_quantity' : 'updateQty'
			},

			render : function(){

				//get raw templates
				var templatetr = Handlebars.compile( $('#cart-tr').html() );
				var templatetable = Handlebars.compile( $('#cart-table-template').html() );
				var $cart_table = $('#cart_table');

				//convert table template to jquery object
				var $table = $(templatetable());

				//get all cart items from model
				var rowData = this.model.get('cart_items'),
					$el = this.$el;

				//append rows to table for each item in model
				rowData.each(function(item){

					//check if quantity is above zero
					if(item.attributes.order_qty > 0) {

						//insert data into template
						$table.append(templatetr(item.attributes));

					}

				});

				//hide table if there are no records in collection
				rowData.length < 1 ? $el.hide() : $el.show();

				//insert table into DOM
				$cart_table.html($table);

			},

			initialize : function(){

				//initialize view with empty collection
				this.model.set('cart_items', new ShoppingCartCollection());

				//listen for changes in the model, call render function, and set context for render function
				this.model.on('change:cart_items', this.render, this);
			},

			removeCartItem : function(e){

				var rowid = $(e.target).attr('data-row'),
					grid = $(e.target).attr('data-grid');

				var items = this.model.get('cart_items');

				//remove model from collection that has specified rowid
				items.remove( items.where({rowid : rowid}));

				$('#add_to_cart' + rowid + grid).text('Add').attr('data-status', 'add');
				$('#order_qty' + rowid + grid).val('').trigger('keyup');

				////assign data to the shopping cart view's model
				this.model.set('cart_items', items);
				this.model.trigger('change:cart_items');

			},

			displayUpdateQty : function(e){
				var inputValue = e.target.value,
					rowid = $(e.target).attr('data-row');

				//show button
				$('#' + this.el.id + ' #cartupdate' + rowid).css('visibility', 'visible');

			},

			submitOrder : function(e){

				var errors = this.$orderForm.populateForm();

				//are there errors?
				if(errors){ return; }

				var cart_items = this.model.get('cart_items'),
					order_form = this.$orderForm.model.toJSON(),
					$submitBtn = this.$submitBtn,
					self       = this;

				//is already submitting?
				if(this.model.get('submitting')) return;

				//does cart contain one or more items?
				if(cart_items.length < 1){
					return;
				}

				$submitBtn.addClass('submitting').removeClass('inactive');

				//trigger custom event
				$('#submit_order_btn').trigger('submit:send');

				$.when( OrderHandler.submitOrder(order_form, cart_items.toJSON() )).then(function(data){

					$(Constants.PAST_ORDERS_GRID).trigger('submit:success');

					PastOrdersGridView.reload();

					sweetAlert("Order Submitted", 'Your order number is ' + data);

				}).fail(function(){

					sweetAlert('Something Went Wrong. Please try again.');

				}).always(function(){

					$submitBtn.removeClass('submitting').addClass('inactive');
					//trigger custom event when submit is complete
					$('#submit_order_btn').trigger('submit:complete');

					self.model.set('cart_items', new ShoppingCartCollection());

				});

			},

			updateQty : function(e){

				var rowid = $(e.target).attr('data-row'),
					grid = $(e.target).attr('data-grid'),
					new_qty = $('#cartinput' + rowid).val();

				//get items already stored in model
				var cart_items = this.model.get('cart_items');

				//get item
				var item = cart_items.where({rowid : rowid});

				//update quantity in grid
				$('#order_qty' + rowid + grid).val( new_qty );
				//update item in cart
				item[0].attributes['quantity'] = new_qty;

				if(parseInt(new_qty) === 0){

					$('#cartremove' + rowid).click();

				}

			}

		});

		return new ShoppingCartView();

	})($);
});
 
 
