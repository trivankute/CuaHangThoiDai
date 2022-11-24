<?php
///////////////////////////////////////////////////////
    // database link and defaults
    include_once __DIR__ . "/../config/db.php";
    // require_once("./config/default.php");
///////////////////////////////////////////////////////
    // composer
    // require_once("./vendor/autoload.php");
///////////////////////////////////////////////////////
    // models
    include_once __DIR__ . "/../model/account.php";
    // cors
    include_once __DIR__ . "/../middlewares/cors.php";
///////////////////////////////////////////////////////
// for composer ** must import in each file 
    // use Firebase\JWT\JWT;
    // use Firebase\JWT\Key;
// for dbs
    $global_db = new db();
    $global_conn = $global_db->connect();
// for model
    $global_user = new Account($global_conn);
    // $question = new Question($conn);
// for Tokens
    // $accessToken = false;
    // $refreshToken = false;
    $token;
?>