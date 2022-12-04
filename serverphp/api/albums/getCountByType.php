<?php 
    include_once __DIR__ .'/../../global/index.php';

    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if($user_request_method == "GET") {
        $type = $_GET['type'];
        if($type != 'cd' && $type != 'vinyl' && $type != 'cassette') {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'Type must be cd or vinyl, cassette']]);
            exit();
        }
        $result = $global_album->getCountByType($type);
        if($result) {
            echo json_encode([
                'status'=>'success', 
                'data'=>[
                    'msg'=>'Get count by type success',
                    'count' => $result
                ]
            ]);
            exit();
        }
        else {
            echo json_encode(['status'=>'success', 'data'=>['msg'=>'Get count by type success', 'count' => 0]]);
            exit();
        }
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>