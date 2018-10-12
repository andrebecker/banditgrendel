$(function() {
	$("#closebutton").click(function() {
        navigator.app.exitApp();
    });
	
	$(".backbutton").click(function() {
        history.go(-1);
		navigator.app.backHistory();
    });
});