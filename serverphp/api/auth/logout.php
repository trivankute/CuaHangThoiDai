<?php
    // cors
    include_once("../../middlewares/cors.php");
    // add global variables
    include_once("../../globalVariables/index.php");
    // middlewares
    include_once("../../middlewares/deserializeUser.php");
    include_once("../../middlewares/requireUserAndLoadData.php");
    $accessToken = false;
    $refreshToken = false;
    $expires = time() - 36000;
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
    header("Set-Cookie: accessToken=false; expires=$expiresText; path=".$cookiePath."; domain=".$domain."; samesite=None; Secure");
    header("Set-Cookie: refreshToken=false; expires=$expiresText; path=".$cookiePath."; domain=".$domain."; samesite=None; Secure", false);

    // setcookie('accessToken', null, -1, $cookiePath); 
    // setcookie('refreshToken', null, -1, $cookiePath); 
    echo json_encode(["status"=>"success", "message"=>"log out successfully"]);
?>