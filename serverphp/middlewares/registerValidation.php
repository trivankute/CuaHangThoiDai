<?php
    // get data from form data
    $email = $_POST['email'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirmPassword'];

    // check username from 2-30 characters
    if(strlen($password) < 6 || strlen($password) > 30) {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Password must be 6-30 characters']]);
        exit();
    }
    // check password from 6-30 characters
    if(strlen($confirmPassword) < 6 || strlen($confirmPassword) > 30) {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Confirm password must be 6-30 characters']]);
        exit();
    }
    // check password and confirm password
    if($password !== $confirmPassword)
    {
        echo json_encode(["status"=>"error","data"=>["msg"=>"Passwords do not match"]]);
        exit();
    }
    // email valid
    if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Invalid email']]);
        exit();
    }
    
?>