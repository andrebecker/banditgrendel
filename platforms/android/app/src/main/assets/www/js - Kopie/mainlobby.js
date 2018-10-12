$(function() {
	
	currentgameid = 1;
	currentgameid = $(".currentgameid").text();
	
	banditname = 1;
	banditname = $(".banditname").text();
	
	gamePlayerRole = 1;
	gamePlayerRole = $(".gamePlayerRole").val();
	
	url = 'http://bsc.platinpanda.de/bsc/lobbyfunctions.php';
	
	checkForTime = currentgameid;
	
	$.post(

		url,

		{ "checkForTime": checkForTime },

		function(data) {

			$('#chosenTime').val(data);
			gameid = $("#hiddenGameid").val();
			$("a[href='game.html?gametime=']").attr("href", "game.html?id=0&gamePlayerRole="+gamePlayerRole+"&gametime="+$('#chosenTime').val()+"&hiddenGameid="+gameid+"");

		}, 

		"json"
		
	);

	$.post(

		url,

		{ "currentgameid": currentgameid, "banditname": banditname, "gamePlayerRole": gamePlayerRole },

		function(data) {

			$.each(data, function(key, value) {
				var newString = value.split(',');

				//For example
			//	oldstring = $(".playerlist").html();
			//	$(".playerlist").html(oldstring + '<br>' + newString[1]);
				
				var is_last_item = (key == (data.length - 1));
				if(is_last_item == true) {
				/*	tester = $("#referToGameLobbyAsDete").attr("href");
					tester = tester.replace("0", newString[0]); // value = 9:61

					$("#referToGameLobbyAsDete").attr("href", tester);*/
					
					
					
					
					if($("#referToGameLobbyAsDete").attr("href")) {
						tester = $("#referToGameLobbyAsDete").attr("href");
						tester = tester.replace("0", newString[0]); // value = 9:61
						$("#referToGameLobbyAsDete").attr("href", tester);
					}
					
					if($("#hiddenBanditId").val() == 1) {
						$("#hiddenBanditId").val(newString[0]);
					}
					
				}
				
			})

		}, 

		"json"
		
	);
	
});