<?php
    include_once __DIR__ .'/../../global/index.php';
    include_once __DIR__ .'/../../middlewares/requireUser.php';
    include_once __DIR__ .'/../../middlewares/updatePasswordValidation.php';

    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if($user_request_method == 'POST'){
        $result = $global_account->updatePassword($oldPassword, $newPassword);
        if ($result) {
            echo json_encode([
                'status'=>'success',
                'data'=>[
                    'msg'=>'Update password success',
                    'token' => ''
                ]
            ]);
            exit();
        }
        else {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'Update password failed']]);
            exit();
        }
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>