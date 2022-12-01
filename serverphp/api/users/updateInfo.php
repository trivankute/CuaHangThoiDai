<?php 
    include_once __DIR__ .'/../../global/index.php';
    include_once __DIR__ .'/../../middlewares/requireUser.php';
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if ($user_request_method == 'POST') {
        $user_id = $global_account->getInformation()['id'];
        $body = json_decode(file_get_contents('php://input'));
        $gender = $body->gender;
        $phone = $body->phone;
        $address = $body->address;
        $bdate = $body->bdate;
        $username = $body->username;
        $global_user->setInformation($user_id, $gender, $phone, $address, $bdate);
        $result = $global_user->updateInformation();
        $result1 = $global_account->updateUsername($username);
        if ($result && $result1) {
            echo json_encode(['status'=>'success', 'data'=>['msg'=>'Update user information success']]);
            exit();
        }
        else {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'Update user information failed']]);
            exit();
        }
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>