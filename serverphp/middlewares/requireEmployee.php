<?php
    include_once __DIR__ .'/../global/index.php';
    include_once __DIR__ .'/deserializeUser.php';

    $info = $global_account->getInformation();
    if($info['role'] == 'employee' || $info['role'] == 'admin') {
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Unauthorized']]);
        exit();
    }
?>