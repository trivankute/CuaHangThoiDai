<?php 
    include_once __DIR__ . '/../../global/index.php';
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if($user_request_method == 'GET') {
        $albumCount = $_GET['albumCount'];
        $result = $global_page->getTotalPageAlbum($albumCount);
        if($result) {
            echo json_encode(['status'=>'success', 'data'=>['msg'=>'Get total page album success', 'totalPage'=>$result]]);
            exit();
        }
        else {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'Get total page album failed']]);
            exit();
        }
        exit();
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>