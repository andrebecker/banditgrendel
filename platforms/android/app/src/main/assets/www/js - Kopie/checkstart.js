$(function() {

	interval = setInterval(function() {
	
		checkForStart = '';
		checkForStart = $('#currentgameiddete').html();

		url = 'http://bsc.platinpanda.de/bsc/lobbyfunctions.php';

		$.post(

			url,

			{ "checkForStart": checkForStart },

			function(data) {

				if(data == 1) {
					referToGameLobbyAsDete.click();
				}

			}, 

			"json"
		
		);

	}, 1000);
					
});