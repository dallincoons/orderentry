define([
	'underscore'
	, 'backbone'
],function(
	_
	, Backbone
){

	var orderFormModel = Backbone.Model.extend({

		defaults : {

			  contactName : ''
			, telephoneNum : ''
			, email : ''
			, ponumber : ''
			, deliveryDate : ''
			, specialInstructions : ''

		},

		validate : function(attr){

			var errors = [];

			if(!attr.contactName){
				errors.push({name : 'contactName', message : 'No contact name'});
			}

			if(!attr.telephoneNum){
				errors.push({name : 'telephoneNum', message : 'No telephone number'});
			}

			if(!attr.email){
				errors.push({name : 'email', message : 'No email'});
			}

			if(!attr.ponumber){
				errors.push({name : 'ponumber', message : 'No PO Number'});
			}

			if(!attr.deliveryDate){
				errors.push({name : 'deliveryDate', message : 'No delivery date'});
			}

			//if there are errors return error array
			return errors.length > 0 ? errors : false;
		},
		showErrors : function(errors){


		}

	});



	return orderFormModel;

});