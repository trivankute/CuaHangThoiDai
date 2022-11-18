<?php
///////////////////////////////////////////////////////
    // database link and defaults
    include_once("../../config/db.php");
    include_once("../../config/default.php");
///////////////////////////////////////////////////////
    // composer
    include_once("../../vendor/autoload.php");
///////////////////////////////////////////////////////
    // models
    include_once("../../model/user.php");
    include_once("../../model/question.php");
///////////////////////////////////////////////////////
// for composer ** must import in each file 
    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;
// for dbs
    $db = new db();
    $conn = $db->connect();
// for model
    $user = new User($conn);
    $question = new Question($conn);
// for Tokens
    $accessToken = false;
    $refreshToken = false;

?>