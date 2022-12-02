<?php 
    include_once __DIR__ . '/../../global/index.php';
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if($user_request_method == 'GET') {
        $artistCount = $_GET['artistCount'];
        $result = $global_page->getTotalPageArtist($artistCount);
        if($result) {
            echo json_encode(['status'=>'success', 'data'=>['msg'=>'Get total page artist success', 'totalPage'=>$result]]);
            exit();
        }
        else {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'Get total page artist failed']]);
            exit();
        }
        exit();
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>