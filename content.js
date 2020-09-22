// content.js
      var current = window.location.href.split('/');
      var dataset_name = current[current.length - 1];
      
      var protocol = window.location.protocol;
      var host = window.location.host;

	  var package_show = protocol + '//' + host + '/api/action/package_show?id=' + dataset_name
	  var package_revision_list = protocol + '//' + host + '/api/action/package_revision_list?id=' + dataset_name
	  var content = $(".primary").eq(0);

	  content.prepend(
	  		'<div style="border: 2px solid #999; margin-top: 10px; padding: 10px; background-color: #eee;"><strong>CKAN browser extension</strong><br />'
	  		+ 'API: <a href="' + package_show + '" target="_blank">Package Show</a> &nbsp; | &nbsp; '
	  		+ 'API: <a href="' + package_revision_list + '" target="_blank">Package Revision List</a> &nbsp; | &nbsp; '
	  		+ '<a id="hide-show-optional-fields">Hide/show optional fields</a>'
	  		+ '</div>'
	  );

	  var optional_fields_hidden = false;
	  var spans = $( "span.control-required" );

	  $('#hide-show-optional-fields').on('click', function() {

		  $('.form-group').each(function(index) {
			  var required = $(this).find( spans );
	
			  if (required.length > 0) {
			  }
			  else {
				  // Add a check here for the Title field
				  label = $(this).find('label');
				  if (label.attr('for') == 'field-title') {
					  //alert('found the title field');
				  }
				  else {
					  var repeating_field = $(this).closest('.repeating-field');

					  if (optional_fields_hidden !== true) {
						  $(this).hide();
						  if (repeating_field.length > 0) {
							  $(repeating_field).hide();
						  }
					  }
					  else {
						  $(this).show();
						  if (repeating_field.length > 0) {
							  $(repeating_field).show();
						  }
					  }
				  }
			  }
		  });
		  
		  optional_fields_hidden = !optional_fields_hidden;

		  return false;
	  });

/*
	This function is called if you click the extension button in the browser menu tab.
	*/
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {

      var current = window.location.href.split('/');
      var dataset_name = current[current.length - 1];
      
      var protocol = window.location.protocol;
      var host = window.location.host;

	  var package_show = protocol + '//' + host + '/api/action/package_show?id=' + dataset_name

      chrome.runtime.sendMessage({"message": "open_new_tab", "url": package_show});
    }
  }
);
