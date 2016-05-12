/**
 * @auther Dallin Coons on 11/17/2015.
 * Provides switching of views
 */


define([
	  'underscore'
	, 'backbone'
	, 'OrderEntryMobileConstants'
	, 'mainviews/OrderEntryJobberCustomerView'
	, 'mainviews/OrderEntryCustomerOrderEntryView'
	, 'mainviews/OrderEntrySalesmanCustomerView'
	, 'ServerData'
],function(
	  _
	, Backbone
	, Constants
	, JobberCustomerView
	, CustomerOrderEntryView
	, SalesmanCustomerView
	, ServerData
){

    var OrderEntryMobileRouter = Backbone.Router.extend({

		currentView : null,
		currentRoleType : null,
		customerNumber : null,

		initialize : function(){	//allows for second parameter

			this.currentRoleType = ServerData['roleType'];
			//was second paramater supplied?
			this. customerNumber = (typeof arguments[1] == 'undefined') ? arguments[1] : null;
			//render specified view
		},
		//unloads selected view and renders new view
		switchView : function(roleType){

			var dfd;

			if (this.currentView !== null){

				this.currentView.$el.hide();

			}

			this.getView(roleType).render(this);

		},
		//helper function to retrieve views
		getView : function(roleType){
			var view = null;

			switch(roleType){
			case Constants.CUSTOMERS:

				if (this.customerNumber === null) {
					throw new Error('Missing customer number');
				}
				view = new CustomerOrderEntryView();
				break;
			case Constants.SALESMAN:

				view = new SalesmanCustomerView();
				break;
			case Constants.JOBBER_ID:
				view = new JobberCustomerView();
				break;

			//no default option
			}

			this.currentView = view;
			return view;
		}

    });

    return new OrderEntryMobileRouter();

});
