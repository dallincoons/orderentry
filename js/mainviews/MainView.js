/**
 * @auther Dallin Coons on 11/20/2015.
 */

define([
	  'underscore'
	, 'backbone'
	, 'routing/OrderEntryMobileRouter'
	, 'nav/OrderEntryMobileNavView'
    , 'datetimepicker'
    , 'OrderEntryMobileConstants'
], function (
	  _
	, Backbone
	, MobileRouter
	, NavView
	, datetimepicker
	, Constants
){


    return Backbone.View.extend({

            //The element this view represents
            el: '#main-content',

            //event handlers
            events: {

                'click #backtocustomerlink' : 'backToCustomerSelection'

            },
            initialize : function(){
                //code to run when object is created

            },
            render : function(roleType){

                var dfd;

                this.roleType = roleType;

                dfd = MobileRouter.switchView( roleType );

                new NavView();

                //initialize date picker
                $('#deliveryDate').datetimepicker({
                    format: 'MM/DD/YYYY'
                });

            },
            backToCustomerSelection : function(){

                MobileRouter.switchView( this.roleType );

            }
    });

 });
 
 
