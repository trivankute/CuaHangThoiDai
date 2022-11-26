<?php
    $body = file_get_contents('php://input');
    $body = json_decode($body);
    $password = $body->password;
    $confirmPassword = $body->confirmPassword;
    if($password !== $confirmPassword)
    {
        echo json_encode(["status"=>"error","data"=>["msg"=>"Passwords do not match"]]);
        exit();
    }

?>