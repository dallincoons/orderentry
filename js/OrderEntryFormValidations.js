/**
 * @auther Dallin Coons on 2/9/2016.
 */

define( [
	'OrderEntryMobileConstants'
], function(
	Constants ) {

	return (function() {

		$( Constants.PHONE_NUMBER_INPUT ).keydown( function( e ) {

			if( e.keyCode === 189 || e.keyCode === 109 ) {

				$( e.target ).addClass('error' );

				return false;
			}

		} );

	})();
} );
 
 
