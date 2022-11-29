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
    include_once __DIR__ . "/../model/album.php";
    include_once __DIR__ . "/../model/page.php";
    // cors
    include_once __DIR__ . "/../middlewares/cors.php";
///////////////////////////////////////////////////////
// for composer ** must import in each file 
    // use Firebase\JWT\JWT;
    // use Firebase\JWT\Key;
    use Cloudinary\Configuration\Configuration;
// for dbs
    $global_db = new db();
    $global_conn = $global_db->connect();
// for model
    $global_user = new Account($global_conn);
    $global_album = new Album($global_conn);
    $global_page = new Page($global_conn);
    // $question = new Question($conn);
// for Tokens
    // $accessToken = false;
    // $refreshToken = false;
    $config = Configuration::instance();
    $config->cloud->cloudName = 'dotr7u5kq';
    $config->cloud->apiKey = '134487557496353';
    $config->cloud->apiSecret = 'zMIHrTp6nE36mC6J6bcRDXcKg8o';
    $config->url->secure = true;
    $token;
?>