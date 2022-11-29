<?php
    // get data from form data
    $email = $_POST['email'];
    $password = $_POST['password'];
    $role = $_POST['role'];
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
    // check if role in (customer, employee, admin)
    if($role != 'customer' && $role != 'employee' && $role != 'admin') {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Invalid role']]);
        exit();
    }
?>