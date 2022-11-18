<?php
    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;
    // put this middleware after deserialize
    if($refreshToken != false)
    {
        $accessTokenDecoded = JWT::decode($accessToken, new Key($key, 'HS256'));
        $user->load_data_from_cookie($accessTokenDecoded);
    }
    else {
        echo json_encode(["status"=>"error", "message"=>"You must log in first"]);
        die();
    }
?>