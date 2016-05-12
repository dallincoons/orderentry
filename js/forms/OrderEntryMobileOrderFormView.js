/**
 * @auther Dallin Coons on 10/13/2015.
 */

define([
	'jquery'
	, 'underscore'
	, 'backbone'
	, 'forms/OrderEntryMobileFormModel'
], function (
	$
	,  _
	, Backbone
	, FormModel
) {

	return (function ($) {

		Backbone.$ = $;


		var orderFormView = Backbone.View.extend({

			//The element this view represents
			el: '#order-entry-form',
			model : new FormModel(),

			//event handlers
			events: {
				  'focus #contactName' : 'removeError'
				, 'focus #telephoneNum' : 'removeError'
				, 'focus #email' : 'removeError'
				, 'focus #ponumber' : 'removeError'
				, 'focus #deliveryDate' : 'removeError'
			},
			//code to run when object is created
			initialize : function(options){



			},
			/**
			 * serializes form and attempts to insert data into model
			 * model validates and returns any errors
			 * called by submit order routine in OrderEntryMobileShoppingCartView
			 * @returns {boolean}
			 */
			populateForm : function(){
				var formJSON = JSON.parse(JSON.stringify(this.$el.serializeArray())),
					fromObj = {},
					errors = false,
					self = this;

				//construct object with data to send to model
				_.forEach(formJSON, function(field){

					fromObj[field.name] = field.value;

				});

				//attempt to set value in model - validate is set to true
			 	self.model.set(fromObj, {validate : true});

				if( (self.model.validationError !== null) && (self.model.validationError.length)){

					self.showErrors(self.model.validationError);

					errors = true;

				}

				return errors;

			},
			showErrors : function(errors){

				_.forEach(errors, function(error){

					//add class of error to each input with an error
					$('#' + error.name).addClass('error');

				});
			},
			removeError : function(e){

				$(e.target).removeClass('error');

			}
		});

		return orderFormView;

	})($);
});



