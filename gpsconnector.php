<?php
header("Access-Control-Allow-Origin: *");

// save the users answer-rating
if(!empty($_POST['time']) && !empty($_POST['longitude']) && !empty($_POST['latitude']) && !empty($_POST['userid'])) {

	$conf = array(
		'host' => 'rdbms.strato.de',
		'bank' => 'DB3347110',
		'user' => 'U3347110',
		'pass' => 'saidProjekt18',
	);

	/*
	 * db class 
	 */
	require './inc/generalClasses/db.php';

	// connect to db
	$GLOBALS['db'] = new db($conf['host'], $conf['bank'], $conf['user'], $conf['pass'], 'mysql');
	//require_once './index.php';
	
	/*$params0 = array($_POST['userid']);
	$query0 = "SELECT lat, lon FROM bsc_location WHERE bsc_location_playerid = ?;";
	
	$res = $GLOBALS['db'] -> execute($query, $params);
	$earlierLat = '';
	$earlierLon = '';

	// check if insertion was successful
	if($res['rows'] > 0) {
		
		$earlierLat = $return['res']['bsc_location_lat'];
		$earlierLon = $return['res']['bsc_location_lon'];
		  
	}*/
	
	/*if(empty($earlierLon) && empty($earlierLat)) {
	
		$params = array($_POST['userId'], $_POST['questionId'], $_POST['rating']);
		$query = "INSERT INTO et_rating(et_rating_submitter, et_rating_qa_id, et_rating_vote) VALUES(?, ?, ?);";
		
	} else {
	
		$params = array($_POST['rating'], $_POST['userId'], $_POST['questionId']);
		$query = "UPDATE et_rating SET et_rating_vote=? WHERE et_rating_submitter=? AND et_rating_qa_id=?;";
		
	}*/
	
	$time = $_POST['time'];
	
	$params = array($time, $_POST['latitude'], $_POST['longitude'], $_POST['userid']);
	$query = "UPDATE bsc_location SET bsc_location_time=?, bsc_location_lat=?, bsc_location_lon=? WHERE bsc_location_playerid=?;";
	$res = $GLOBALS['db'] -> execute($query, $params);
	
	
	
	
	// get the data from the other players
	$params1 = array($_POST['userid']);
	$query1 = "SELECT bsc_location_lat, bsc_location_lon, bsc_location_playerid FROM bsc_location WHERE NOT bsc_location_playerid=?;";
	$res1 = $GLOBALS['db'] -> all($query1, $params1);

	
	$updateFinished = 'n';

	// check if insertion was successful
	if($res['rows'] > 0) {
		
		$updateFinished = 'y';
		  
	}

    echo json_encode($updateFinished);
    exit;

}



if(!empty($_POST['userid']) && !empty($_POST['nottheactive'])) {

	$conf = array(
		'host' => 'rdbms.strato.de',
		'bank' => 'DB3347110',
		'user' => 'U3347110',
		'pass' => 'saidProjekt18',
	);

	/*
	 * db class 
	 */
	require './inc/generalClasses/db.php';

	// connect to db
	$GLOBALS['db'] = new db($conf['host'], $conf['bank'], $conf['user'], $conf['pass'], 'mysql');
	//require_once './index.php';

	// get the data from the other players
	$params1 = array($_POST['userid']);
	$query1 = "SELECT bsc_location_lat, bsc_location_lon FROM bsc_location WHERE bsc_location_playerid=?;";
	$res1 = $GLOBALS['db'] -> all($query1, $params1);
	
	$latArr = array();
	$lonArr = array();

    for($i=0;$i<$res1['rows'];$i++) {
		
		$latArr[$i] = $res1['result'][$i]['bsc_location_lat'];
		$lonArr[$i] = $res1['result'][$i]['bsc_location_lon'];

	}
		
	$callResultList = array($latArr, $lonArr);
	

    echo json_encode($callResultList);
    exit;

}


if(!empty($_POST['playerCountMatchid'])) {

	$conf = array(
		'host' => 'rdbms.strato.de',
		'bank' => 'DB3347110',
		'user' => 'U3347110',
		'pass' => 'saidProjekt18',
	);

	/*
	 * db class 
	 */
	require './inc/generalClasses/db.php';

	// connect to db
	$GLOBALS['db'] = new db($conf['host'], $conf['bank'], $conf['user'], $conf['pass'], 'mysql');
	//require_once './index.php';

	// get the data from the other players
	$params1 = array($_POST['playerCountMatchid']);
	$query1 = "SELECT COUNT(bsc_player_id) AS playercount FROM bsc_player WHERE bsc_player_matchid = ?;";
	$res1 = $GLOBALS['db'] -> row($query1, $params1);
	
	$playerCount = 0;

	// check if insertion was successful
	if($res1['rows'] > 0) {
		
		$playerCount = $res1['result']['playercount'];
		  
	}
	

    echo json_encode($playerCount);
    exit;

}


if(!empty($_POST['getplayerids'])) {

	$conf = array(
		'host' => 'rdbms.strato.de',
		'bank' => 'DB3347110',
		'user' => 'U3347110',
		'pass' => 'saidProjekt18',
	);

	/*
	 * db class 
	 */
	require './inc/generalClasses/db.php';

	// connect to db
	$GLOBALS['db'] = new db($conf['host'], $conf['bank'], $conf['user'], $conf['pass'], 'mysql');
	//require_once './index.php';

	// get the data from the other players
	$params1 = array($_POST['getplayerids']);
	$query1 = "SELECT bsc_location_lat, bsc_location_lon, bsc_player_id FROM bsc_location LEFT JOIN bsc_player ON bsc_location_playerid = bsc_player_id WHERE bsc_player_matchid = ?;";
	$res1 = $GLOBALS['db'] -> all($query1, $params1);
	
	$latArr = array();
	$lonArr = array();
	$idArr = array();

    for($i=0;$i<$res1['rows'];$i++) {
		
		$latArr[$i] = $res1['result'][$i]['bsc_location_lat'];
		$lonArr[$i] = $res1['result'][$i]['bsc_location_lon'];
		$idArr[$i] = $res1['result'][$i]['bsc_player_id'];

	}
		
	$callResultList = array($latArr, $lonArr, $idArr);
	

    echo json_encode($callResultList);
    exit;

}