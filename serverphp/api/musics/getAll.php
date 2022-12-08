<?php 
    include_once __DIR__ .'/../../global/index.php';

    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if($user_request_method == 'GET') {
        $result = $global_music->getAllMusic();
        if ($result) {
            echo json_encode(['status'=>'success', 'data'=>$result]);
            exit();
        }
        else {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'Get all music failed']]);
            exit();
        }
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>