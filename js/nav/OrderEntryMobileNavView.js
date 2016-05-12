/**
 * @auther Dallin Coons on 10/13/2015.
 */

define([
	'jquery'
	, 'underscore'
	, 'backbone'
	, 'grids/baseobjects/OrderEntryMobileGridViewBaseObj'
	, 'nav/NavItems/NavRecentItemView'
], function (
	  $
	,  _
	, Backbone
	, GridViewBase
	, NavRecentItemView
) {

	return (function ($) {

		Backbone.$ = $;

		var OrderEntryMobileNavView = GridViewBase.extend({

			el : '#oe-tabs-navigation',

			currentView : 'recentitems',

			views : {

				'recentitems' : [
						'#order-entry-form',
						'#submit_order_btn',
						'div#popularitemsgrid_container',
						'#cart_table'
				],
				'allproducts' :  [
						'div#newordergrid_container',
						'#order-entry-form',
						'#submit_order_btn',
						'#cart_table'
				],
				'pastorders' : [
						'div#pastordergrid_container',
						'#orderlinegrid_container'
				]
			},

			//event handlers
			events: {

				'click #recent_items_t' : 'switchView',
				'click #all_items_tab' : 'switchView',
				'click #past_items_tab' : 'switchView'

			},
			render : function(){

			},
			initialize : function(data){


			},
			switchView : function(e){

				var viewName = $(e.target).attr('data-content'),
					prevViewGroup = this.views[this.currentView],
					newViewGroup = this.views[viewName];

				//hide all elements in previous view that don't exist in new view
				_.each(_.difference(prevViewGroup, newViewGroup), function(id){

					$(id).hide();

				});

				//show all elements in new view that don't exist in previous view
				_.each(_.difference(newViewGroup, prevViewGroup), function(id){

					$(id).show();

				});


				this.currentView = viewName;



			}
		});

		return OrderEntryMobileNavView;

	})($);
});
 
 
