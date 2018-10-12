$(function() {
	
	$('#joinGameNow').click(function() {
		
		checkPW = '';
		checkPW = $('#inputGamePW').val();

		url = 'http://bsc.platinpanda.de/bsc/lobbyfunctions.php';
		
		$.post(

			url,

			{ "checkPW": checkPW },

			function(data) {

				if(data == 1) {
					$("a[href='gamelobby.html?detename=']").attr("href", "gamelobby.html?detename="+$('#detectivename').val()+"&id="+$('#inputGameId').val()+"");
				
					referToMainLobbyAsDete.click();
				} else {
					$('body').append('Das eingegebene Passwort ist falsch!');
				}

			}, 

			"json"
		
		);

	});
	
});