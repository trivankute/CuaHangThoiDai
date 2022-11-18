<?php
    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;
    // middlewares from deserializeUser will create accessToken if refreshToken is on date
    if($_COOKIE["accessToken"])
    $accessToken = $_COOKIE["accessToken"];
    else
    $accessToken = false;
    
    if($_COOKIE["refreshToken"])
    $refreshToken = $_COOKIE["refreshToken"];
    else
    $refreshToken = false;

    if(!$accessToken)
    {
        if($refreshToken)
        {
            $refreshTokenDecoded = JWT::decode($refreshToken, new Key($key, 'HS256'));
            // for access token
            $configAccessToken = [
                "data" => ["username" => $refreshTokenDecoded->data->username, "userId" => $refreshTokenDecoded->data->userId]
            ];
            $accessToken = JWT::encode($configAccessToken, $key, 'HS256');

            // // Assume current time + one day
            $expires = time() + $accessTokenTlt;
            $dateTime = new DateTime();
            
            // Set the timestamp
            $dateTime->setTimestamp($expires);
            // Set the timezone using a new DateTimeZone instance
            $dateTime->setTimezone(new DateTimeZone('GMT'));
            // Print the format.
            // This format based on PHP DateTime formats - the 'e' switch adds the time zone at the end.
            $format = 'D, d M Y H:i:s e';
            $expiresText = $dateTime->format($format);
            // Set the raw header with expires text (encode if needed)
            header("Set-Cookie: accessToken=".$accessToken."; expires=$expiresText; path=".$cookiePath."; domain=".$domain."; samesite=None; Secure");

            // setCookie("accessToken", $accessToken, time()+$accessTokenTlt, $cookiePath, $domain);
        }
    }
?>
