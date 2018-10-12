$(function() {

	$("#itIsTimeToStart").click(function() {
		
		currentgameid = '';
		currentgameid = $('#hiddenGameid').val();
		
		updatestart = 1;

		url = 'http://bsc.platinpanda.de/bsc/lobbyfunctions.php';

		$.post(

			url,

			{ "currentgameid": currentgameid, "updatestart": updatestart },

			function(data) {

				if(data == 1) {
					 startgame.click();
				}

			}, 

			"json"
		
		);
		
    });

});