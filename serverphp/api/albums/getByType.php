<?php 
    include_once __DIR__ .'/../../global/index.php';

    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if($user_request_method == "GET") {
        $type = $_GET['type'];
        $result = $global_album->getAlbumByType($type);
        if($result) {
            echo json_encode([
                'status'=>'success', 
                'data'=>[
                    'msg'=>'Get albums by type success',
                    'albums' => $result
                ]
            ]);
            exit();
        }
        else {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'Get albums by type failed']]);
            exit();
        }
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>