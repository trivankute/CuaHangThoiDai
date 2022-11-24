<?php
    include_once __DIR__ .'/../../global/index.php';
    include_once __DIR__ .'/../../middlewares/registerValidation.php';
    include_once __DIR__ .'/../../middlewares/deserializeUser.php';
    include_once __DIR__ .'/../../middlewares/requireAdmin.php';
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    switch ($user_request_method) {
        case 'POST':    
            $body = file_get_contents('php://input');
            $body = json_decode($body);
            if($body->role != "employee") {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>'Invalid role']]);
                exit();
            }
            else {
                $global_user->setInformation(
                    $body->email,
                    $body->username,
                    $body->password,
                    $body->role
                );
                if($global_user->register())
                {
                    echo json_encode(['status'=>'success', 'data'=>['msg'=>'Register success']]);
                    exit();
                }
                else {
                    echo json_encode(['status'=>'error', 'data'=>['msg'=>'Register failed']]);
                    exit();
                }
                break;
            }
        default:
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
            break;
    }
?>