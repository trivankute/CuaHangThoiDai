<?php
    include_once __DIR__ .'/../../global/index.php';
    include_once __DIR__ .'/../../middlewares/requireUser.php';
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    switch ($user_request_method) {
        case 'GET':
            $result = $global_account->getInformation();
            // omit password 
            unset($result['password']);
            echo json_encode([
                'status'=>'success',
                'data'=>[
                    'msg'=>'Get account success',
                    'user'=>$result
                ]
            ]);
            break;
        default:
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
            break;
    }

?>