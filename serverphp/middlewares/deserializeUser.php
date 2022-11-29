<?php
    include_once __DIR__ .'/../utils/jwt_functions.php';
    include_once __DIR__ .'/../utils/getToken.php';
    include_once __DIR__ .'/../global/index.php';
    // get access token from bearer authorization header
    $token = getBearerToken();
    if(!$token) {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Unauthorized']]);
        exit();
    }
    $jwt = new jwt_functions();
    // decode access token
    $decoded = $jwt->decodeToken($token);
    // if token is valid
    if($decoded) {
        // stored decoded data in res.locals
        $global_user->setInformation(
            $decoded->data->email,
            $decoded->data->username,
            null,
            $decoded->data->role,
            $decoded->data->avatar,
            $decoded->data->user_id
        );
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Invalid token']]);
        exit();
    }
?>