<?php
    include_once __DIR__ .'/../utils/jwt_functions.php';
    include_once __DIR__ .'/../utils/getAccessToken.php';
    try {
        echo "hello";
    }
    catch (Exception $e) {
        echo json_encode(['status'=>"error", ["data"=>$e->getMessage()]]);
    }
    // get access token from bearer authorization header
    $token = getBearerToken();
    echo json_encode(['token'=>$token]);
    // $jwt = new jwt_functions();
    // // decode access token
    // $decoded = $jwt->decodeToken($accessToken);
    // echo json_encode(['decoded'=>$decoded]);
?>