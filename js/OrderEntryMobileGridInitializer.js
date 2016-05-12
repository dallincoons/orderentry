/**
 * @auther Dallin Coons on 10/12/2015.
 * Defines methods for initalizing jqgrids
 */

define( [
	'ServerData'
	, 'OrderEntryMobileFormatters'
	, 'FormatterUtility'
	, 'globalsamd'
	, 'utilitiesamd'
	, 'OrderEntryMobileConstants'
	, 'jquery'
	, 'OrderEntryMobileGridData'
	, 'OrderEntryMobileAppModel'
	, 'GridUtility'
	, 'jqgrid'

], function(
	ServerData
	, Formatters
	, FormatterUtility
	, Globals
	, utilities
	, Constants
	, $
	, OrderEntryMobileGridData
	, MobileAppModel
	, GridUtility
	, jqgrid ) {

	return (function() {

		var formatters = [],
			dfd        = $.Deferred();

		formatters[ 'orderQuantityFormatter' ] = Formatters.orderQuantityFormatter;
		formatters[ 'formatUSDate' ]           = FormatterUtility.formatUSDate;

		//site path for plugin
		var gridSitePath = ServerData.sitepath;

		function createRecentItemsGrid( gridData ) {

			var customerCode  = MobileAppModel.get( 'CustomerCode' ),
				appclientinfo = '',
				appsearch     = Globals.SEARCH_SORT_RESET,
				appsort       = Globals.SEARCH_SORT_RESET,
				gridId        = '#popularitemsgrid';

			this.unloadGrid( gridId, '#popularitemsgrid_container' );

			//use cusotmer code if it exists
			if( customerCode !== null ) {

				appclientinfo += 'CustomerNumber';
				appclientinfo += '=';
				appclientinfo += customerCode;

			}

			//use customer formatters in schema
			var schema = utilities.JsonObjectAdjust( JSON.parse( gridData.gridSchema ), formatters );

			var sid        = document.getElementById( Globals.PARM_APP_SID ).value;
			var serverRoot = document.getElementById( Globals.PARM_APP_SERVER_ROOT ).value;
			var httpUrl    = gridSitePath + '/OrderEntryMobileGridHttpData.php';

			var $grid = $( gridId );

			$grid.jqGrid( {
				url : httpUrl,

				datatype : "xml",

				xmlReader : {
					root        : "rows",
					row         : "row",
					page        : "rows>page",
					total       : "rows>total",
					records     : "rows>records",
					repeatitems : true,
					cell        : "cell",
					id          : "[id]",
					userdata    : "userdata",
					subgrid     : {
						root        : "rows",
						row         : "row",
						repeatitems : true,
						cell        : "cell"
					}
				},

				mtype : "POST",

				postData : {
					appserverroot : serverRoot, appsid : sid, appdisplayrows : gridData.gridDisplayRows, appfetchrows : gridData.gridFetchRows,
					appgridname   : gridData.gridname, appdatawrapper : Globals.USE_XML, appclientpaging : Globals.STRUE, appclientinfo : appclientinfo, appsearch : appsearch, appsort : appsort
				},

				colNames : JSON.parse( gridData.gridHeader ),

				colModel : schema,

				pager : "#popularitemspager",

				pgbuttons : true,						// Enable page control buttons

				rowNum : gridData.gridDisplayRows,				// Number of rows to show in grid

				rowList : [],							// Disable page size drop down!

				width : $( '#popularitemsgrid_container' ).width(),

				height : 450,						// Grid height

				rowheight : 200,

				altRows : true,

				altclass : 'altrows',

				viewrecords : true,

				gridview : true,

				loadonce : true,							// Client side paging if false then server side paging is perform (NOTE: for server side paging, jqgrid automatically posts parameters called page and rows!)

				autoencode : true,

				loadtext : "Loading data please wait...",

				subGrid : false,

				ignoreCase : true,

				sortable : true,

				ondblClickRow : function( rowid ) {

				},

				onSelectRow  : function( rowId ) {

				},
				//call function when grid has loaded
				loadComplete : function() {

					$( window ).bind( 'resize', function() {

						var width = $( '#popularitemsgrid_container' ).width();
						$( '#popularitemsgrid' ).setGridWidth( width );

						$( '#newordermobilegrid' ).setGridWidth( width );
					} );

					dfd.resolve();
				},

				onPaging : function( pgButton ) {
					// if user has entered page number
					if( "user" == pgButton ) {
						// find out the requested and last page
						newpage = parseInt( $( this.p.pager ).find( 'input:text' ).val() );
						last    = parseInt( $( this ).getGridParam( "lastpage" ) );
						current = parseInt( $( this ).getGridParam( "page" ) );

						if( newpage > last ) {
							alert( "Selection out of range" );
							$( this.p.pager ).find( 'input:text' ).val( current );
							return 'stop';
						}
					}
				}
			} );

			return dfd;
		}

		function CreateNewOrderGrid( gridData ) {

			var customerCode  = MobileAppModel.get( 'CustomerCode' ),
				appclientinfo = '',
				appsearch     = Globals.SEARCH_SORT_RESET,
				appsort       = Globals.SEARCH_SORT_RESET,
				gridId        = '#newordermobilegrid';

			this.unloadGrid( gridId, '#newordergrid_container' );

			//use cusotmer code if it exists
			if( customerCode !== null ) {

				appclientinfo += 'CustomerNumber';
				appclientinfo += '=';
				appclientinfo += customerCode;

				//clear cache and get new data
				appsearch = Globals.SEARCH_SORT_RESET;
				appsort   = Globals.SEARCH_SORT_RESET;

			}

			//use customer formatters in schema
			var schema = utilities.JsonObjectAdjust( JSON.parse( gridData.gridSchema ), formatters );

			var sid        = document.getElementById( Globals.PARM_APP_SID ).value;
			var serverRoot = document.getElementById( Globals.PARM_APP_SERVER_ROOT ).value;
			var httpUrl    = gridSitePath + '/OrderEntryMobileGridHttpData.php';

			var $priceQuoteGrid = $( gridId );
			var $gridParent     = $( '#order_entry' );

			$priceQuoteGrid.jqGrid( {
				url : httpUrl,

				datatype : "xml",

				xmlReader : {
					root        : "rows",
					row         : "row",
					page        : "rows>page",
					total       : "rows>total",
					records     : "rows>records",
					repeatitems : true,
					cell        : "cell",
					id          : "[id]",
					userdata    : "userdata",
					subgrid     : {
						root        : "rows",
						row         : "row",
						repeatitems : true,
						cell        : "cell"
					}
				},

				mtype : "POST",

				postData : {
					appserverroot : serverRoot,
					appsid : sid,
					//appdisplayrows : gridData.gridDisplayRows,
					appdisplayrows : 20,
					//appfetchrows : gridData.gridFetchRows,
					appfetchrows : 500,
					appgridname   : gridData.gridname,
					appdatawrapper : Globals.USE_XML,
					appclientpaging : Globals.SFALSE,
					appclientinfo : appclientinfo,
					appsearch : appsearch,
					appsort : appsort
				},

				colNames : JSON.parse( gridData.gridHeader ),

				colModel : schema,

				pager : "#newordermobilespager",

				pgbuttons : true,						// Enable page control buttons

				width : $( '#newordergrid_container' ).width(),

				height : 450,						// Grid height

				rowheight : 200,

				altRows : true,

				altclass : 'altrows',

				viewrecords : true,

				gridview : true,

				loadonce : false,							// Client side paging if false then server side paging is perform (NOTE: for server side paging, jqgrid automatically posts parameters called page and rows!)

				autoencode : true,

				loadtext : "Loading data please wait...",

				subGrid : false,

				ignoreCase : true,

				sortable : true,

				ondblClickRow : function( rowid ) {

				},

				onSelectRow  : function( rowId ) {

				},
				//call function when grid has loaded
				loadComplete : function() {

					$( window ).bind( 'resize', function() {

						var width = $( '#newordergrid_container' ).width();
						$( '#newordermobilegrid' ).setGridWidth( width );
					} );

				},

				onPaging : function( pgButton ) {
					// if user has entered page number
					if( "user" == pgButton ) {
						// find out the requested and last page
						newpage = parseInt( $( this.p.pager ).find( 'input:text' ).val() );
						last    = parseInt( $( this ).getGridParam( "lastpage" ) );
						current = parseInt( $( this ).getGridParam( "page" ) );

						if( newpage > last ) {
							alert( "Selection out of range" );
							$( this.p.pager ).find( 'input:text' ).val( current );
							return 'stop';
						}
					}
				}
			} );

			//filter toolbar disabled
			$priceQuoteGrid.jqGrid( 'filterToolbar', {
				stringResult  : true,
				searchOnEnter : true,
				defaultSearch : "cn",
				beforeSearch  : function() {

					var myVar   = $priceQuoteGrid.jqGrid( 'getGridParam', 'postData' ).filters;
					var jsonObj = $.parseJSON( myVar );

					var gridFetchRows = 500;

					var search = GridUtility.formatterFilter( jsonObj );
					var sort   = Globals.BLANK;

					// jqgrid requires postData reset/set to null
					$( this ).setGridParam( { postData : null } );

					$( this ).jqGrid( 'setGridParam',
						{
							url      : httpUrl,
							postData : {
								appserverroot   : Globals.serverRoot,
								appsid          : Globals.appsid,
								appdisplayrows  : 40,
								appfetchrows    : 500,
								appgridname     : gridData.gridname,
								appdatawrapper  : Globals.USE_XML,
								appclientpaging : Globals.SFALSE,
								appclientinfo   : "",
								appsearch       : search,
								appsort         : sort
							}
						} ).trigger( "reloadGrid" );
				}//end before search
			} );//end filtertooblar
		}

		function CreatePastOrdersGrid( gridData ) {

			var customerCode  = MobileAppModel.get( 'CustomerCode' ),
				appclientinfo = '',
				appsearch     = Globals.SEARCH_SORT_RESET,
				appsort       = Globals.SEARCH_SORT_RESET,
				gridId        = '#pastordergridmobilegrid',
				dfd           = $.Deferred();

			this.unloadGrid( gridId, '#pastordergrid_container' );

			//use cusotmer code if it exists
			if( customerCode !== null ) {

				appclientinfo += 'CustomerNumber';
				appclientinfo += '=';
				appclientinfo += customerCode;

			}

			////use customer formatters in schema
			var schema = utilities.JsonObjectAdjust( JSON.parse( gridData.gridSchema ), formatters );

			var sid        = document.getElementById( Globals.PARM_APP_SID ).value;
			var serverRoot = document.getElementById( Globals.PARM_APP_SERVER_ROOT ).value;
			var httpUrl    = gridSitePath + '/OrderEntryMobileGridHttpData.php';

			var $priceQuoteGrid = $( gridId );
			var $gridParent     = $( '#order_entry' );

			$priceQuoteGrid.jqGrid( {
				url : httpUrl,

				datatype : "xml",

				xmlReader : {
					root        : "rows",
					row         : "row",
					page        : "rows>page",
					total       : "rows>total",
					records     : "rows>records",
					repeatitems : true,
					cell        : "cell",
					id          : "[id]",
					userdata    : "userdata",
					subgrid     : {
						root        : "rows",
						row         : "row",
						repeatitems : true,
						cell        : "cell"
					}
				},

				mtype : "POST",

				//styleUI : "Bootstrap",

				postData : {
					appserverroot : serverRoot, appsid : sid, appdisplayrows : gridData.gridDisplayRows, appfetchrows : gridData.gridFetchRows,
					appgridname   : gridData.gridname, appdatawrapper : USE_XML, appclientpaging : STRUE, appclientinfo : appclientinfo, appsearch : appsearch, appsort : appsort
				},

				colNames : JSON.parse( gridData.gridHeader ),

				colModel : schema,

				pager : "#pastordergridmobilegridpager",

				pgbuttons : true,						// Enable page control buttons

				rowNum : gridData.gridDisplayRows,				// Number of rows to show in grid

				rowList : [],							// Disable page size drop down!

				width : $( '#pastordergrid_container' ).width(),

				height : 450,						// Grid height

				rowheight : 200,

				altRows : true,

				altclass : 'altrows',

				viewrecords : true,

				gridview : true,

				loadonce : false,							// Client side paging if false then server side paging is perform (NOTE: for server side paging, jqgrid automatically posts parameters called page and rows!)

				autoencode : true,

				loadtext : "Loading data please wait...",

				subGrid : false,

				ignoreCase : true,

				sortable : true,

				ondblClickRow : function( rowid ) {

				},

				onSelectRow  : function( rowId ) {

				},
				//call function when grid has loaded
				loadComplete : function() {

					dfd.resolve();

				},

				onPaging : function( pgButton ) {
					// if user has entered page number
					if( "user" == pgButton ) {
						// find out the requested and last page
						newpage = parseInt( $( this.p.pager ).find( 'input:text' ).val() );
						last    = parseInt( $( this ).getGridParam( "lastpage" ) );
						current = parseInt( $( this ).getGridParam( "page" ) );

						if( newpage > last ) {
							alert( "Selection out of range" );
							$( this.p.pager ).find( 'input:text' ).val( current );
							return 'stop';
						}
					}
				}
			} );

			return dfd;
		}

		function CreateOrderLinesGrid( orderNumber, gridData ) {

			////use customer formatters in schema
			var schema = utilities.JsonObjectAdjust( JSON.parse( gridData.gridSchema ), formatters );

			var sid        = document.getElementById( Globals.PARM_APP_SID ).value;
			var serverRoot = document.getElementById( Globals.PARM_APP_SERVER_ROOT ).value;
			var httpUrl    = gridSitePath + '/OrderEntryMobileGridHttpData.php';

			var $grid       = $( "#orderlinegridmobilegrid" );
			var $gridParent = $( '#order_entry' );

			var appclientinfo = 'OrderNumber';
			appclientinfo += '=';
			appclientinfo += orderNumber;

			var appsearch = Globals.SEARCH_SORT_RESET;
			var appsort   = Globals.SEARCH_SORT_RESET;

			$grid.jqGrid( {
				url : httpUrl,

				datatype : "xml",

				xmlReader : {
					root        : "rows",
					row         : "row",
					page        : "rows>page",
					total       : "rows>total",
					records     : "rows>records",
					repeatitems : true,
					cell        : "cell",
					id          : "[id]",
					userdata    : "userdata",
					subgrid     : {
						root        : "rows",
						row         : "row",
						repeatitems : true,
						cell        : "cell"
					}
				},

				mtype : "POST",

				postData : {
					appserverroot : serverRoot, appsid : sid, appdisplayrows : gridData.gridDisplayRows, appfetchrows : gridData.gridFetchRows,
					appgridname   : gridData.gridname, appdatawrapper : USE_XML, appclientpaging : STRUE, appclientinfo : appclientinfo, appsearch : appsearch, appsort : appsort
				},

				colNames : JSON.parse( gridData.gridHeader ),

				colModel : schema,

				pager : "#orderlinegridmobilegridpager",

				pgbuttons : true,						// Enable page control buttons

				rowNum : gridData.gridDisplayRows,				// Number of rows to show in grid

				rowList : [],							// Disable page size drop down!

				width : $( '#orderlinegrid_container' ).width(),

				height : 450,						// Grid height

				rowheight : 200,

				altRows : true,

				viewrecords : true,

				gridview : true,

				loadonce : true,							// Client side paging if false then server side paging is perform (NOTE: for server side paging, jqgrid automatically posts parameters called page and rows!)

				autoencode : true,

				loadtext : "Loading data please wait...",

				subGrid : false,

				ignoreCase : true,

				sortable : true,

				ondblClickRow : function( rowid ) {

				},

				onSelectRow  : function( rowId ) {

				},
				//call function when grid has loaded
				loadComplete : function() {

				},

				onPaging : function( pgButton ) {
					// if user has entered page number
					if( "user" == pgButton ) {
						// find out the requested and last page
						newpage = parseInt( $( this.p.pager ).find( 'input:text' ).val() );
						last    = parseInt( $( this ).getGridParam( "lastpage" ) );
						current = parseInt( $( this ).getGridParam( "page" ) );

						if( newpage > last ) {
							alert( "Selection out of range" );
							$( this.p.pager ).find( 'input:text' ).val( current );
							return 'stop';
						}
					}
				}
			} );
		}

		function CreateCustomerGrid( jsonData, gridData, AppRouter ) {

			//use customer formatters in schema
			var schema = utilities.JsonObjectAdjust( JSON.parse( gridData.gridSchema ), formatters ),
				$grid  = $( "#oe-customerselection" );

			var httpUrl    = gridSitePath + '/OrderEntryMobileGridHttpData.php';

			$grid.jqGrid( {

				url       : httpUrl,
				datatype  : "xml",
				xmlReader : {
					root        : "rows",
					row         : "row",
					page        : "rows>page",
					total       : "rows>total",
					records     : "rows>records",
					repeatitems : true,
					cell        : "cell",
					id          : "[id]",
					userdata    : "userdata",
					subgrid     : {
						root        : "rows",
						row         : "row",
						repeatitems : true,
						cell        : "cell"
					}
				},

				mtype : "POST",

				postData : {

					appserverroot   : Globals.serverRoot,
					appsid          : Globals.appsid,
					appdisplayrows  : 40,
					appfetchrows    : 500,
					appgridname     : Constants.JOBBER,
					appdatawrapper  : Globals.USE_XML,
					appclientpaging : Globals.SFALSE,
					appclientinfo   : "",
					appsearch       : Globals.SEARCH_SORT_CLEAR,
					appsort         : Globals.SEARCH_SORT_CLEAR
				},

				colNames : JSON.parse( gridData.gridHeader ),

				colModel : schema,

				pager : "oe-customerselectionpager",

				pgbuttons : true,						// Enable page control buttons

				width : $( '#oe-customerselection_container' ).width(),

				height : null,						// Grid height

				rowheight : null,

				altRows : true,

				viewrecords : true,

				gridview : true,

				loadonce : false,	// Client side paging if false then server side paging is perform (NOTE: for server
				// side paging, jqgrid automatically posts parameters called page and rows!)

				autoencode : true,

				loadtext : "Loading data please wait...",

				subGrid : false,

				ignoreCase : true,

				sortable : true,

				ondblClickRow : function( rowid ) {

				},

				onSelectRow  : function( rowid ) {

					//store customer code
					var customerCode = $grid.getCell( rowid, 'customer_code' );
					var customerName = $grid.getCell( rowid, 'customer_name' );

					MobileAppModel.set( 'CustomerCode', customerCode );
					MobileAppModel.set( 'CustomerName', customerName );

					AppRouter.switchView( Constants.CUSTOMERS );

				},
				//call function when grid has loaded
				loadComplete : function() {

					$( window ).bind( 'resize', function() {

						var width = $( '#oe-customerselection_container' ).width();
						$grid.setGridWidth( width );
					} );

				},
				onPaging : function( pgButton ) {
					// if user has entered page number
					if( "user" == pgButton ) {
						// find out the requested and last page
						newpage = parseInt( $( this.p.pager ).find( 'input:text' ).val() );
						last    = parseInt( $( this ).getGridParam( "lastpage" ) );
						current = parseInt( $( this ).getGridParam( "page" ) );

						if( newpage > last ) {
							alert( "Selection out of range" );
							$( this.p.pager ).find( 'input:text' ).val( current );
							return 'stop';
						}
					}
				}
			} );

			var self = this;

			//filter toolbar disabled
			$grid.jqGrid( 'filterToolbar', {
				stringResult  : true,
				searchOnEnter : true,
				defaultSearch : "cn",
				beforeSearch  : function() {

					var myVar   = $grid.jqGrid( 'getGridParam', 'postData' ).filters;
					var jsonObj = $.parseJSON( myVar );

					var gridFetchRows = 500;

					var search = GridUtility.formatterFilter( jsonObj );
					var sort   = Globals.BLANK;

					// jqgrid requires postData reset/set to null
					$( this ).setGridParam( { postData : null } );

					$( this ).jqGrid( 'setGridParam',
						{
							url      : httpUrl,
							postData : {
								appserverroot   : Globals.serverRoot,
								appsid          : Globals.appsid,
								appdisplayrows  : 40,
								appfetchrows    : 500,
								appgridname     : Constants.JOBBER,
								appdatawrapper  : Globals.USE_XML,
								appclientpaging : Globals.SFALSE,
								appclientinfo   : "",
								appsearch       : search,
								appsort         : sort
							}
						} ).trigger( "reloadGrid" );
				}//end before search
			} );//end filtertooblar
		}

		function unloadGrid( gridId, containerId ) {

			var $grid = $( gridId );

			$grid.setGridParam( { postData : null } );

			$grid.jqGrid( 'clearGridData' );

			//unload grid hack - can't get new jqrid unloadgrid api to work
			var table = document.createElement( 'table' ),
				tr    = document.createElement( 'tr' ),
				td    = document.createElement( 'td' );

			tr.appendChild( td );
			table.appendChild( tr );
			table.id  = gridId.substring( 1 );

			$( containerId ).html( table );

		}

		return {

			createRecentItemsGrid : createRecentItemsGrid,
			CreateNewOrderGrid    : CreateNewOrderGrid,
			CreatePastOrdersGrid  : CreatePastOrdersGrid,
			CreateOrderLinesGrid  : CreateOrderLinesGrid,
			CreateCustomerGrid    : CreateCustomerGrid,
			unloadGrid            : unloadGrid

		}
	})();
} );
 
 
