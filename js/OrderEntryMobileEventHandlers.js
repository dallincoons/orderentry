/**
 * @auther Dallin Coons on 10/12/2015.
 */

define([
	  'EventHandlersUtility'
	, 'OrderEntryMobileGridInitializer'
	, 'OrderEntryMobileConstants'
	, 'OrderEntryMobileGridData'
	, 'OrderEntryMobileConstants'
	, 'mainviews/MainView'
	, 'ServerData'

], function (
	  EventHandlersUtility
	, GridInitializer
	, OrderEntryMobileConstants
	, OrderEntryMobileGridData
	, Constants
	, MainView
	, ServerData
) {

	return (function () {

		EventHandlersUtility.addOnloadEvent(function(){

			new MainView().render( ServerData['roleType'] );

		});

		/*********************************************************************************/
		/*						Custom Event - Submit Order	  	 					     */
		/*********************************************************************************/

		EventHandlersUtility.addMultipleElementsEvent([
			'#contactName',
			'#telephone_num',
			'#email',
			'#ponumber',
			'#delivery_date',
			'#special_instructions',
			'.orderQty'

		], '#submit_order_btn', 'submit:send', function(combined){

			$(combined).attr('disabled', true);

		});

		EventHandlersUtility.addMultipleElementsEvent([
			'#contactName',
			'#telephone_num',
			'#email',
			'#ponumber',
			'#delivery_date',
			'#special_instructions',
			'.orderQty'

		], '#submit_order_btn', 'submit:complete', function(combined){

			$(combined).attr('disabled', false);

		});

		$(Constants.PAST_ORDERS_GRID).on('submit:success', function(){

			$(Constants.PAST_ORDERS_GRID).trigger('reloadGrid');

		});
	})();
});
 
 
