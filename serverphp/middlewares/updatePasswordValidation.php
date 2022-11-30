<?php
    // get data from form data
    $body = json_decode(file_get_contents('php://input'));
    $oldPassword = $body->oldPassword;
    $newPassword = $body->newPassword;
    $confirmNewPassword = $body->confirmNewPassword;
    if(strlen($oldPassword) < 6 || strlen($oldPassword) > 30) {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Old password must be 6-30 characters']]);
        exit();
    }
    if(strlen($newPassword) < 6 || strlen($newPassword) > 30) {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'New password must be 6-30 characters']]);
        exit();
    }
    if(strlen($confirmNewPassword) < 6 || strlen($confirmNewPassword) > 30) {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Confirm new password must be 6-30 characters']]);
        exit();
    }
    if($newPassword !== $confirmNewPassword)
    {
        echo json_encode(["status"=>"error","data"=>["msg"=>"Passwords do not match"]]);
        exit();
    }
?>