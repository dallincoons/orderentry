/**
 * @auther Dallin Coons on 10/21/2015.
 */

define([

], function (

) {

	return (function () {

		function orderQuantityFormatter(cellvalue, options, rowObject){

			var rowid 				= options.rowId;

			var input 				= document.createElement('input');
				input.className		= 'orderQty';
				input.dataset.row   = rowid;
				input.dataset.grid  = this.id;
				input.id      		= 'order_qty' + rowid + this.id;

			var button 				= document.createElement('button');
				button.type 		= 'button';
				button.className += 'btn btn-primary btn-lg sharp add_to_cart';
				button.id			= 'add_to_cart' + rowid + this.id;
				button.dataset.row  = rowid;
				button.dataset.grid = this.id;
				button.dataset.status = 'add';
				button.appendChild( document.createTextNode('Add') );

			return input.outerHTML + button.outerHTML;
		}

		return {
			orderQuantityFormatter : orderQuantityFormatter
		}

	})();
});
 
 
