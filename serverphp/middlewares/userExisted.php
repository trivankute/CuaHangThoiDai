<?php
    // put this middleware after deserialize
    // middlewares for login, check if user is logged yet, if Yes, not let them log in again
    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    if($refreshToken != false)
    {
        echo json_encode(["status"=>"error", "message"=>"You has logged in, you can not log in or register again."]);
        die();
    }
?>