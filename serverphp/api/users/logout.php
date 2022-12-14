<?php
    include_once __DIR__ .'/../../global/index.php';
    include_once __DIR__ .'/../../middlewares/deserializeUser.php';
    include_once __DIR__ .'/../../middlewares/requireUser.php';
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    switch ($user_request_method) {
        case 'GET':
            echo json_encode([
                'status'=>'success',
                'data'=>[
                    'msg'=>'Logout success',
                    'token' => ''
                ]
            ]);
            break;
        default:
            // code...
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
            break;
    }

?>