<?php
    include_once __DIR__ .'/../global/index.php';
    include_once __DIR__ .'/deserializeUser.php';

    $info = $global_user->getInformation();
    if($info['role'] == 'admin') {
        //next();
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Unauthorized']]);
        exit();
    }
?>