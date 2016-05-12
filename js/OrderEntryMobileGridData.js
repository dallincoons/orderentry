define([
	'ServerData'
],function(
	ServerData
){

	return (function(){

		var gridData = {

			  'PreviousItemsGridData' 		: ServerData.PreviousItemsData
			, 'NewOrderGridData' 	  		: ServerData.NewOrderGridData
			, 'PastOrdersGridData'    		: ServerData.PastOrdersGridData
			, 'OrderLineGridData'  	  		: ServerData.OrderLineGridData
			, 'CustomerGridData' 	  		: ServerData.CustomerGridData
			, 'JobberCustomerData'    		: ServerData.JobberCustomerData
			, 'SalesmanCustomerCollection'  : ServerData.SalesmanCustomerCollection

		};

		function getGridData(controlName){

			return gridData[controlName];

		}

		return {

			getGridData : getGridData

		}

	})();

});