/**
 * @auther Dallin Coons on 11/20/2015.
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
){

	return (function ($) {

		Backbone.$ = $;

		var NavRecentItemView = GridViewBase.extend({

			el : '#recent_items_tab',

			//event handlers
			events: {

				'click' : function(){
				}

			},
			render : function(){



			},
			initialize : function(){
				//code to run when object is created
			}
		});

		return NavRecentItemView;

	})($);
});



 
