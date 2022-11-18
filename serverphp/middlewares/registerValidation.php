<?php
    $password = $_SERVER['POST']['password'];
    $confirmPassword = $_SERVER['POST']['confirmPassword'];
    if($password !== $confirmPassword)
    {
        echo json_encode(["status"=>"error","data"=>["msg"=>"Passwords do not match"]])
    }

?>