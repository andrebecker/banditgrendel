$(function() {
	
	$('#hostGameNow').click(function() {
		hostgamePW = '';
		hostgamePW = $('#inputGamePW').val();
		
		hostname = '';
		hostname = $('#banditHostname').val();
		
		hosttime = '';
		hosttime = $('#gametime').val();
		
		url = 'http://bsc.platinpanda.de/bsc/lobbyfunctions.php';
		
		$.post(

			url,

			{ "hostgamePW": hostgamePW, "hosttime": hosttime },

			function(data) {
		   
				$('#hiddenPlayerID').val(data);
				console.log($('#hiddenPlayerID').val());
				//$('#banditHostForm').submit();
				//$("a[href='banditmenu.html?id=']").attr("href", "banditmenu.html?id="+$('#hiddenPlayerID').val()+"&pw="+hostgamePW+"");
				$("a[href='banditmenu.html?id=']").attr("href", "banditmenu.html?id="+$('#hiddenPlayerID').val()+"&name="+hostname+"&pw="+hostgamePW+"&gametime="+hosttime+"");
			
				referToMainLobby.click();

			}, 

			"json"
		
		);
		
	});
	
});