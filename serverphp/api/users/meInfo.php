<?php
    include_once __DIR__ .'/../../global/index.php';
    include_once __DIR__ .'/../../middlewares/requireUser.php';
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if($user_request_method == 'GET'){
        $id = $global_account->getInformation()['id'];
        $result = $global_user->getUserInformationById($id);
        $state = $global_account->getState();
        $result['state'] = $state;
        echo json_encode(['status'=>'success', 'data'=>['msg'=>'Get user information success', 'user'=>$result]]);
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>