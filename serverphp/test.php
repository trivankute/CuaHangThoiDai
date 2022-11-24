<?php
include_once "./utils/jwt_functions.php";
$jwt = new jwt_functions();
$decode = $jwt->decodeToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NjkyNjQ3OTgsImV4cCI6MTY2OTI2NDgxOCwiZGF0YSI6eyJkYXRhIjp7InVzZXJuYW1lIjoiYWRtaW4ifX19.HSB0x4ffcAQN_LW7t6A1o-3MtJ4YACzCKCwsAQrfMS6f-fsifIrKaoSIUfx08SjU_WzVx9l3wk9AgG0ztQCWRP_lf8KEIWND7dcb13q_GkimRpGJmhYKadpXUDdhC1nomThSayorj2bPNlyFhioQSbyLsFhSLP7A0H6a6TdoK3M");
print_r ($decode);
?>