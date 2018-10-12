$(function() {
	$("#closebutton").click(function() {
        if (navigator.app) {
			navigator.app.exitApp();
		} else if (navigator.device) {
			navigator.device.exitApp();
		} else {
			window.close();
		}
    });
	
	$(".backbutton").click(function() {
        history.go(-1);
		navigator.app.backHistory();
    });
});