<?php
    include_once __DIR__ .'/../global/index.php';

    $info = $global_user->getInformation();
    if($info['role'] == 'employee' || $info['role'] == 'admin') {
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Unauthorized']]);
        exit();
    }
?>