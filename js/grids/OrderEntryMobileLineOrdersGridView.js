/**
 * @auther Dallin Coons on 11/13/2015.
 */

define([
	'jquery'
	, 'underscore'
	, 'backbone'
	, 'grids/baseobjects/OrderEntryMobileGridViewBaseObj'
	, 'grids/presenters/OrderEntryMobilePastOrderGridPresenter'

], function (
	$
	,  _
	, Backbone
	, GridViewBase
	, PastOrderPresenter
) {

	return (function ($) {

		Backbone.$ = $;

		var PastOrdersView = GridViewBase.extend({

			//The element this view represents
			el: '#orderlinegridmobilegrid',

			//event handlers
			events: {

			},
			render : function(){


			},
			//code to run when object is created
			initialize : function(options){

			}
		});

		return PastOrdersView;

	})($);
});
 
 
