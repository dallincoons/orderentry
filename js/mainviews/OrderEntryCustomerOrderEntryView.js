/**
 * @auther Dallin Coons on 10/13/2015.
 */

define( [
	'jquery'
	, 'underscore'
	, 'backbone'
	, 'OrderEntryMobileGridInitializer'
	, 'OrderEntryMobileConstants'
	, 'OrderEntryMobileGridData'
	, 'OrderEntryMobileAppModel'
	, 'grids/OrderEntryMobileRecentItemsView'
	, 'grids/OrderEntryMobileAllProductsView'
	, 'OrderEntryMobileAppModel'
	, 'Handlebars'
], function(
	$
	, _
	, Backbone
	, GridInitializer
	, OrderEntryMobileConstants
	, OrderEntryMobileGridData
	, AppModel
	, RecentItemsView
	, AllProductsView
	, MobileAppModel
	, Handlebars ) {

	return (function( $ ) {

		Backbone.$ = $;

		var CustomerOrderEntryView = Backbone.View.extend( {

			//The element this view represents
			el : '#order_entry',

			$customerInfo : $('#customer_info'),


			//event handlers
			events       : {},
			customerCode : null,

			render     : function() {

				var recentItemDfd = $.Deferred(),
					dfd           = $.Deferred(),
					CustomerCode  = MobileAppModel.get( 'CustomerCode' ),
					CustomerName  = MobileAppModel.get( 'CustomerName' ),
					customerInfoTemplate = Handlebars.compile( $( '#customer_info_template' ).html() );

				if(CustomerCode !== null && CustomerName !== null){

					this.$customerInfo.html(customerInfoTemplate(MobileAppModel.attributes));

				}

				//console.log(customerInfoTemplate());


				//show this view
				this.$el.show();

				//when grids are loaded, initiailze views (which attach event handlers)
				$.when( GridInitializer.createRecentItemsGrid( OrderEntryMobileGridData.getGridData( OrderEntryMobileConstants.PreviousItemsGridData ) ) )
					.then( function() {

						//initialize recent items view
						new RecentItemsView()

					} );

				$.when( GridInitializer.CreateNewOrderGrid( OrderEntryMobileGridData.getGridData( OrderEntryMobileConstants.NewOrderGridData ) ) ).then( function() {

					//initialize all products view
					new AllProductsView();

				} );

				$.when( GridInitializer.CreatePastOrdersGrid( OrderEntryMobileGridData.getGridData( OrderEntryMobileConstants.PastOrdersGridData ) ) ).then( function() {

					//nothing to do

				} );

			},
			//code to run when object is created
			initialize : function() {

				this.listenTo( AppModel, 'change:CustomerCode', this.reload );

			}
		} );

		return CustomerOrderEntryView;

	})( $ );
} );
