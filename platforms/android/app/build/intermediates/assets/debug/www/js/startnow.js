$(function() {

	$("#itIsTimeToStart").click(function() {
		
		currentgameid = '';
		currentgameid = $('#hiddenGameid').val();
		
		updatestart = 1;

		url = 'https://platinpanda.com/bsc/lobbyfunctions.php';
		
		$("#plsWait").html('Das Spiel startet gleich. Bitte warten Sie einen Moment!');
		$("#itIsTimeToStart").hide();

		interval = setInterval(function() {
			
			$.post(

				url,

				{ "currentgameid": currentgameid, "updatestart": updatestart },

				function(data) {

					interval = setInterval(function() {
						if(data == 1 && $(".hiddenLat").val() != 1 && $(".hiddenLon").val() != 1) {
							startgame.click();
						}
					}, 1000);

				}, 

				"json"
			
			);
		
		}, 1000);
		
    });

});