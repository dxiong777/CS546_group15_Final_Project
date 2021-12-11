(function($) {
	// AJAX calls

	var mySearchForm = $('#search-form'),
		searchInput = $('#search-bar');
	var newContent = $('#new-content');

	mySearchForm.submit(function(event) {
		event.preventDefault();

		console.log('start ajax request');
		var search = searchInput.val();

		if (search) {
			var useJson = false;
			if (useJson) {
				var requestConfig = {
					method: 'POST',
					url: '/productSearch/search',
					contentType: 'application/json',
					data: JSON.stringify({
						search: search
					})
				};

				$.ajax(requestConfig).then(function(responseMessage) {
					console.log(responseMessage);
					newContent.html(responseMessage);
				});
			} else {
				var requestConfig = {
					method: 'POST',
					url: '/productSearch/search.html',
					contentType: 'application/json',
					data: JSON.stringify({
						search: search
					})
				};

				$.ajax(requestConfig).then(function(responseMessage) {
					console.log(responseMessage);
					newContent.html(responseMessage);
				});
			}
		}
	});
})(window.jQuery);
