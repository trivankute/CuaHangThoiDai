<?php
    // cors
    include_once("../../middlewares/cors.php");
    // add global variables
    include_once("../../globalVariables/index.php");
    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;
    // middlewares
    include_once("../../middlewares/deserializeUser.php");
    // so if refreshToken is expired, deserialize will do nothing
    // so only need to check refreshToken.
    if($refreshToken != false)
    {
        $accessTokenDecoded = JWT::decode($accessToken, new Key($key, 'HS256'));
        echo json_encode(["status"=>"success", "res"=>$accessTokenDecoded]);
    }
    else {
        echo json_encode(["status"=>"error", "message"=>"You need to log in again"]);
    }
?>