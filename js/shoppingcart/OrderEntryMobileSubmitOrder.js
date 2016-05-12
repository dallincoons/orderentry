/**
 * @auther Dallin Coons on 10/28/2015.
 */

define([
	  'ServerData'
	, 'globalsamd'
], function (
	  ServerData
	, Globals
) {

	//site path for plugin
	var gridSitePath = ServerData.sitepath;

	var url = gridSitePath + '/OrderEntryMobileSubmitOrder.php',
		appsid = document.getElementById(Globals.PARM_APP_SID).value,
		serverRoot = document.getElementById(Globals.PARM_APP_SERVER_ROOT).value;

	return (function () {

		function submitOrder(cartForm, cartData){

			var deferredObj = new $.Deferred();

			$.ajax({

				type: "POST",
				data: { appserverroot : serverRoot,
						appsid : appsid,
						cartForm : cartForm,
						cartData : cartData
					  },
				url: url,
				success: function(data){

					deferredObj.resolve(data);

				}
			});

			return deferredObj;

		}

		return {

			submitOrder : submitOrder

		}

	})();
});
 
 
