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
        $global_user->setInformation($user_id, $gender, $phone, $address, $bdate);
        $global_user->updateInformation();
        echo json_encode(['status' => 'success', 'data' => ['msg' => 'Update information successfully']]);
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>