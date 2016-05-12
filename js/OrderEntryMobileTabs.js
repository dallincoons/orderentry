/**
 * @auther Dallin Coons on 10/21/2015.
 * Provides functionality for Nav bar
 */

define([], function () {

	return (function () {

		var tabs = $('.oe-tabs');

		tabs.each(function(){
			var tab = $(this),
				tabItems = tab.find('ul.oe-tabs-navigation'),
				tabContentWrapper = tab.children('ul.oe-tabs-content');

		//add click handler to each a tag in tab
		tabItems.on('click', 'a', function(event){
			event.preventDefault();

			//which item was clicked?
			var selectedItem = $(this);

			if( !selectedItem.hasClass('selected') ) {

				var selectedTab = selectedItem.data('content'),
					selectedContent = tabContentWrapper.find('#' + selectedTab),
					slectedContentHeight = selectedContent.innerHeight();

				//remove selected class
				tabItems.find('a.selected').removeClass('selected');
				//add selected class to clicked a tag and parent
				selectedItem.addClass('selected');
				selectedContent.addClass('selected').siblings('li').removeClass('selected');

				//animate tabContentWrapper height when content changes
				tabContentWrapper.animate({
					'height': slectedContentHeight
				}, 200);
			}
		});
		});

	})();
});
 
 
