/**
 * @auther Dallin Coons on 10/12/2015.
 */

var require = {
	paths : {
		  'EventHandlersUtility' : "/RxApps/modules/javascripts/shares/utilities/EventHandlerUtility"
		, 'jquery' : ['//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min']
		, 'jqgridlocale' : '/RxApps/vendors/jqGrid/jqGrid5.1/js/lang/grid.locale-en'
		, 'jqgrid' : '/RxApps/vendors/jqGrid/jqGrid5.1/js/jquery.jqGrid.src'
		, 'grid.base' : '/RxApps/vendors/jqGrid/jqGrid5.1/src/grid.base'
		, 'jqModal' : '/RxApps/vendors/jqGrid/jqGrid5.1/src/jqModal'
		, 'grid.grouping' : '/RxApps/vendors/jqGrid/jqGrid5.1/src/grid.grouping'
		, 'jqDnR' : '/RxApps/vendors/jqGrid/jqGrid5.1/src/jqDnR'
		, 'grid.common' : '/RxApps/vendors/jqGrid/jqGrid5.1/src/grid.common'
		, 'globalsamd' : "/RxApps/modules/javascripts/globalsamd"
		, 'utilitiesamd' : "/RxApps/modules/javascripts/utilitiesamd"
		, 'underscore' : "/RxApps/vendors/underscore"
		, 'Handlebars' : "/RxApps/vendors/handlebars/handlebars-v4.0.2"
		, 'FormatterUtility' : '/RxApps/modules/javascripts/shares/utilities/FormatterUtility'
		, 'PhpUtility' : '/RxApps/modules/javascripts/shares/utilities/PhpUtility'
		, 'datetimepicker' : "/RxApps/vendors/bootstrap/js/plugins/datetimepicker/js/bootstrap-datetimepicker.min"
		, 'collapse' : "/RxApps/vendors/bootstrap/js/collapse"
		, 'transition' : "/RxApps/vendors/bootstrap/js/transition"
		, 'moment' : '/RxApps/vendors/moment'
		, 'sweetAlert' : "/RxApps/vendors/sweetalert.min"
		, 'backbone.babysitter' : "/RxApps/vendors/backbone/backbone.babysitter"
		, 'backbone.wreqr' : "/RxApps/vendors/backbone/backbone.wreqr"
		, 'backbone' : "/RxApps/vendors/backbone/backbone"
		, 'marionette' : '/RxApps/vendors/marionette/backbone.marionette'
		, 'GridUtility'         : '/RxApps/modules/javascripts/shares/utilities/GridUtility'

	},
	shim : {
		jqgrid: {
			deps: ['jqgridlocale', 'jquery', 'grid.base', 'jqModal', 'jqDnR', 'grid.common', 'backbone']
		},
		jqgridlocale : {

		},
		datetimepicker : {
			deps: ['jquery', 'collapse', 'transition'],
			exports: "datetimepicker"
		},
		jquerymobile : {
			deps: ['jquery']
		},
		bootstrapselect : {
			deps: ['jquery']
		},
		jqgridmobile : {
			deps: ['jqgridmobilelocale', 'jquery']
		},
		Handlebars : {
			exports: "Handlebars"
		},
		'backbone.wreqr' : {
			deps : ["backbone", 'jquery']
		},
		'backbone.babysitter' : {
			deps : ["backbone", 'jquery']
		},
		'/RxApps/vendors/jqGrid/jqGrid5.1/src/grid.base' : {
			exports : 'grid.base'
		},
		'/RxApps/vendors/jqGrid/jqGrid5.1/src/grid.grouping' : {
			exports : 'grid.grouping'
		},
		'/RxApps/vendors/jqGrid/jqGrid5.1/src/grid.common' : {
			exports : 'grid.common'
		}
	}
};
 
 
