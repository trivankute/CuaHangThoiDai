<?php
    $body = file_get_contents('php://input');
    $body = json_decode($body);
    $email = $body->email;
    $password = $body->password;
    // check username from 2-30 characters
    if(strlen($password) < 6 || strlen($password) > 30) {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Password must be 6-30 characters']]);
        exit();
    }
    // email valid
    if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Invalid email']]);
        exit();
    }
?>