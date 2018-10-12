$(function() {
	
	playeridviagps = 0;
	playeridviagps = $("#gameplayerid").val();
	
	playerrole = 0;
	playerrole = $("#gameplayerrole").val();
	
	gamematchid = 0;
	gamematchid = $("#gamematchid").val();
	
	var startP2 = 0;
				var changeableMarkerP2 = 0;
				
				var winner = 0;
				
					map = new OpenLayers.Map("mapdiv");
					map.addLayer(new OpenLayers.Layer.OSM());
										
					var latitude = 51.993669;
					latitude = $(".hiddenLat").val();
					var longitude = 9.837611;
					longitude = $(".hiddenLon").val();
					
					if(latitude == 1 && longitude == 1) {
						minusOneSec = navigator.geolocation.getCurrentPosition(
							function(position){ // Position konnte bestimmt werden
								latitude = position.coords.latitude; 
								longitude = position.coords.longitude;
	
								/*************************
								**************************
								* for testing purposes, **
								* set lat + 0.1, *********
								* otherwise I have *******
								* a catch*****************
								**************************
								*************************/
								//latitude += 0.1000000;
							}, 
							function(){ // Positionsbestimmung gescheitert
							},{enableHighAccuracy: true}
						);
					}
					
					var lonLat = new OpenLayers.LonLat( longitude, latitude )
						.transform(
						new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
						map.getProjectionObject() // to Spherical Mercator Projection
					);
												  
					var zoom=18;

					var markers = new OpenLayers.Layer.Markers( "Markers" );
					map.addLayer(markers);
								
					var changeableMarker = new OpenLayers.Marker(lonLat);
					markers.addMarker(changeableMarker);
										
					map.setCenter (lonLat, zoom);
					$("#time").html( $("#gametime").val() );
					
					var latitudeP2 = 0;
					var longitudeP2 = 0;

					

					//showSecondPlayer();		

					
					// get number of players
					var numberofplayers = 1;
					numberofplayers = checkPlayerCount();
					
					function checkPlayerCount() {
						playerCountMatchid = 1;
						playerCountMatchid = $("#gamematchid").val();
						
						url = 'http://bsc.platinpanda.de/bsc/gpsconnector.php';

						$.post(

							url,

							{ "playerCountMatchid": playerCountMatchid },

							function(data) {

								numberofplayers = data;

							}, 

							"json"
						);

					}

					// show other players
					var startP3 = new Array();
					var changeableMarkerP3 = new Array();
					var latitudeP3 = new Array();
					var longitudeP3 = new Array();
					for(i=0; i< numberofplayers; i++) {
						startP3[i] = 0;
						changeableMarkerP3[i] = 0;
						latitudeP3[i] = 0;
						longitudeP3[i] = 0;
					}
					var lonLatP3 = new OpenLayers.LonLat( longitudeP3[0], longitudeP3[0] )
					.transform(
						new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
						map.getProjectionObject() // to Spherical Mercator Projection
					);
					
												
					$('#upleft').click(function() {
						latitude += 0.00005;	
						longitude -= 0.00005;	
						redrawMap(longitude, latitude, playeridviagps, 1);	
					});
					$('#left').click(function() {
						longitude -= 0.00005;	
						redrawMap(longitude, latitude, playeridviagps, 1);	
					});
					$('#downleft').click(function() {
						latitude -= 0.00005;	
						longitude -= 0.00005;	
						redrawMap(longitude, latitude, playeridviagps, 1);	
					});
					$('#up').click(function() {
						latitude += 0.00005;	
						redrawMap(longitude, latitude, playeridviagps, 1);						
					});
					$('#down').click(function() {
						latitude -= 0.00005;	
						redrawMap(longitude, latitude, playeridviagps, 1);	
					});
					$('#upright').click(function() {
						latitude += 0.00005;	
						longitude += 0.00005;	
						redrawMap(longitude, latitude, playeridviagps, 1);	
					});
					$('#right').click(function() {
						longitude += 0.00005;	
						redrawMap(longitude, latitude, playeridviagps, 1);	
					});
					$('#downright').click(function() {
						latitude -= 0.00005;	
						longitude += 0.00005;	
						redrawMap(longitude, latitude, playeridviagps, 1);	
					});
					
					function redrawMap(longitude, latitude, playerid, playerrole) {
					
						if(playerrole == 1) {
							markers.removeMarker(changeableMarker);
							lonLat = new OpenLayers.LonLat( longitude, latitude )
							.transform(
								new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
								map.getProjectionObject() // to Spherical Mercator Projection
							);
											  
							zoom=18;

							//markers = new OpenLayers.Layer.Markers( "Markers" );
							map.addLayer(markers);
							
							changeableMarker = new OpenLayers.Marker(lonLat);
							markers.addMarker(changeableMarker);
							
							url = 'http://bsc.platinpanda.de/bsc/gpsconnector.php';
							userid = playerid;
							
							var dt = new Date();
							var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
					
							$.post(

									url,

									{ "time": time, "longitude": longitude, "latitude": latitude, "userid": userid },

									function(data) {
	   
											/*latitudeP2 = data[0];
											longitudeP2 = data[1];*/

									}, 

							"json"
							);
							map.setCenter (lonLat, zoom);
							
							// check whether the bandit was caught
							checkGameEnd();
							
							if(winner < 1) {
								//showSecondPlayer();
								redrawMapOthers();
							}
						
						} else {
							markers.removeMarker(changeableMarkerP2);
							
							// back up the values
							buLat2 = latitudeP2;
							buLon2 = longitudeP2;
							
							// set the new values
							latitudeP2 = latitude;
							longitudeP2 = longitude;
							
							if(latitudeP2 != 0 && longitudeP2 != 0) {
								
								lonLatP2 = new OpenLayers.LonLat( longitudeP2, latitudeP2 )
								.transform(
									new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
									map.getProjectionObject() // to Spherical Mercator Projection
								);
								changeableMarkerP2 = new OpenLayers.Marker(lonLatP2);
								markers.addMarker(changeableMarkerP2);
								
								url = 'http://bsc.platinpanda.de/bsc/gpsconnector.php';
								userid = playeridviagps;
								
								var dt2 = new Date();
								var time2 = dt2.getHours() + ":" + dt2.getMinutes() + ":" + dt2.getSeconds();
						
								$.post(

										url,

										{ "time": time2, "longitude": longitudeP2, "latitude": latitudeP2, "userid": userid },

										function(data) {

										}, 

								"json"
								);
							}
							
							// restore the backedup values
							latitudeP2 = buLat2;
							longitudeP2 = buLon2;
							
							// check whether the bandit was caught
							checkGameEnd();
						}
						
					}
					
					var size = new OpenLayers.Size(21,25);
																	var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
																	var icon = new OpenLayers.Icon('img/marker.png', size, offset);
					var bucm3 = 0;
					function redrawMapOthers() {

								url = 'http://bsc.platinpanda.de/bsc/gpsconnector.php';
								
									// get playerids
									$.post(

										url,

										{ "getplayerids": gamematchid },

										function(data) {
											idArr = new Array();
											for(j=0; j<data[2].length; j++) {

												latitudeP3[j] = parseFloat(data[0][j]);
												longitudeP3[j] = parseFloat(data[1][j]);
												idArr[j] = parseFloat(data[2][j]);

												if(idArr[j] != playeridviagps) {
													if(startP2 != 0) {
														markers.removeMarker(changeableMarkerP3[j]);
													}
													lonLatP3[j] = new OpenLayers.LonLat( longitudeP3[j], latitudeP3[j] )
													.transform(
														new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
														map.getProjectionObject() // to Spherical Mercator Projection
													);
												
													icon = new OpenLayers.Icon('img/yellow.png', size, offset);

													changeableMarkerP3[j] = new OpenLayers.Marker(lonLatP3[j],icon);
													markers.addMarker(changeableMarkerP3[j]);
													
													// check whether the bandit was caught
													checkGameEnd();
												} else {
													if(startP2 == 0) {

														if(changeableMarkerP3[j]) {
															bucm3 = changeableMarkerP3[j];
														}
														lonLatP3[j] = new OpenLayers.LonLat( longitudeP3[j], latitudeP3[j] )
															.transform(
																new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
																map.getProjectionObject() // to Spherical Mercator Projection
															);
															changeableMarkerP3[j] = new OpenLayers.Marker(lonLatP3[j]);
															markers.removeMarker(changeableMarkerP3[j]);
															markers.addMarker(changeableMarkerP3[j]);
															if(bucm3 != 0) {
																markers.removeMarker(bucm3);
															}
													} else {
														markers.removeMarker(changeableMarkerP3[j]);
														url = 'http://bsc.platinpanda.de/bsc/gpsconnector.php';
														userid = playeridviagps;
														
														var dt = new Date();
														var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
														
														nottheactive = 1;
												
														$.post(

																url,

																{ "userid": userid, "nottheactive": nottheactive },

																function(data) {
								   
																	if(playerrole != 1) {
																		latitudeP2 = parseFloat(data[0]);
																		longitudeP2 = parseFloat(data[1]);
																	}
																}, 

														"json"
														);
														markers.removeMarker(changeableMarkerP3[j]);
														
														minusOneSec = navigator.geolocation.getCurrentPosition(
															function(position){ // Position konnte bestimmt werden
																latitudeP3[j] = position.coords.latitude;
																longitudeP3[j] = position.coords.longitude;
																//var accuracy = position.coords.accuracy+'m';
																//redrawMap(longitudeP3[j], latitudeP3[j], playeridviagps, playerrole);
																//markers.removeMarker(changeableMarkerP3[j]);

																
																if(latitudeP3[j] != 0 && longitudeP3[j] != 0) {
																	if(changeableMarkerP3[j]) {
																		bucm3 = changeableMarkerP3[j];
																	}
																	lonLatP3[j] = new OpenLayers.LonLat( longitudeP3[j], latitudeP3[j] )
																	.transform(
																		new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
																		map.getProjectionObject() // to Spherical Mercator Projection
																	);
																	
																	icon = new OpenLayers.Icon('img/marker.png', size, offset);
																	changeableMarkerP3[j] = new OpenLayers.Marker(lonLatP3[j],icon);
																	markers.removeMarker(changeableMarkerP3[j]);
																	if(playerrole != 1) {
																		markers.addMarker(changeableMarkerP3[j]);
																	}
																	
																	url = 'http://bsc.platinpanda.de/bsc/gpsconnector.php';
																	userid = playeridviagps;
																	
																	var dt2 = new Date();
																	var time2 = dt2.getHours() + ":" + dt2.getMinutes() + ":" + dt2.getSeconds();
															
																	$.post(

																			url,

																			{ "time": time2, "longitude": longitudeP3[j], "latitude": latitudeP3[j], "userid": userid },

																			function(data) {
																				
																			}, 

																	"json"
																	);
																	
																}
																if(bucm3 != 0) {
																	markers.removeMarker(bucm3);
																}
																// restore the backedup values
																latitudeP3[j] = latitudeP2;
																longitudeP3[j] = longitudeP2;
																
																// check whether the bandit was caught
																checkGameEnd();
																
																
																/*
																*
																IRGENDWO HOER ZIEHT ER MARKER NACH
																*
																*/
																
															}, 
															function(){ // Positionsbestimmung gescheitert
															},{enableHighAccuracy: true}
														);
														markers.removeMarker(changeableMarkerP3[j]);
													}
												}
												
											}
											startP2 = 1;
										}, 

									"json"
									);

					}
					
					interval = setInterval(function() {
						if(winner == 0) {

							//for(i=0; i<numberofplayers; i++) {
							//	showSecondPlayer();
						//	}
						
						if(numberofplayers > 1) {
							redrawMapOthers();
						}
							
							/*if(playeridviagps != 1) {
								updateViaGPS();
							}*/
						}
					}, 1000);
					
					/*function showSecondPlayer() {
						if(startP2 == 0) {
							/*minusOneSec = navigator.geolocation.getCurrentPosition(
								function(position){ // Position konnte bestimmt werden
									latitudeP2 = position.coords.latitude; 
									longitudeP2 = position.coords.longitude;
									//var accuracy = position.coords.accuracy+'m';
									redrawMap(longitude, latitude);	
								}, 
								function(){ // Positionsbestimmung gescheitert
								},{enableHighAccuracy: true}
							);
							lonLatP2 = new OpenLayers.LonLat( longitudeP2, latitudeP2 )
								.transform(
									new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
									map.getProjectionObject() // to Spherical Mercator Projection
								);
								changeableMarkerP2 = new OpenLayers.Marker(lonLatP2);
								markers.addMarker(changeableMarkerP2);
								markers.removeMarker(changeableMarkerP2);
							startP2 = 1;
						} else {
							
							url = 'http://bsc.platinpanda.de/bsc/gpsconnector.php';
							userid = playeridviagps;
							
							var dt = new Date();
							var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
							
							nottheactive = 1;
					
							$.post(

									url,

									{ "userid": userid, "nottheactive": nottheactive },

									function(data) {
	   
											latitudeP2 = parseFloat(data[0]);
											longitudeP2 = parseFloat(data[1]);

									}, 

							"json"
							);
							markers.removeMarker(changeableMarkerP2);
							redrawMap(longitudeP2, latitudeP2, playeridviagps, 2);
						}
					}*/
					
					function checkGameEnd() {
						latDiff = 1;
						latDiff = Math.abs(latitude - latitudeP2);
						
						lonDiff = 1;
						lonDiff = Math.abs(longitude - longitudeP2);

						if(latDiff < 0.000001 && lonDiff < 0.000001) {
							alert('Die Detektive siegen!');
							winner = 1;
							history.go(-3);
							navigator.app.backHistory();
						}
						
						remainingTime = document.querySelector('#time').innerHTML;

						if(remainingTime == '00:00') {
							alert('Der Bandit gewinnt!');
							winner = 1;
							history.go(-3);
							navigator.app.backHistory();
						}
						
						return winner;
					}
					
					
					
					var firstSec = 0;
					
					function updateViaGPS() {
					
						markers.removeMarker(changeableMarkerP2);
					
						minusOneSec = navigator.geolocation.getCurrentPosition(
							function(position){ // Position konnte bestimmt werden
								latitudeP2 = position.coords.latitude;
								longitudeP2 = position.coords.longitude;
								//var accuracy = position.coords.accuracy+'m';
								redrawMap(longitudeP2, latitudeP2, playeridviagps, 2);
							}, 
							function(){ // Positionsbestimmung gescheitert
							},{enableHighAccuracy: true}
						);

					}
				
				});
				
				/*$.ajax({
    url:
        'https://www.overpass-api.de/api/interpreter?data=' + 
        '[out:json][timeout:60];' + 
        'area["boundary"~"administrative"]["name"~"Berlin"];' + 
        'node(area)["amenity"~"school"];' + 
        'out;',
    dataType: 'json',
    type: 'GET',
    async: true,
    crossDomain: true
}).done(function() {
    console.log( "second success" );
}).fail(function(error) {
    console.log(error);
    console.log( "error" );
}).always(function() {
    console.log( "complete" );
});*/
