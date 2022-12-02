<?php
    include_once __DIR__ . '/../../global/index.php';
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if ($user_request_method == 'GET') {
        $id = $_GET['id'];
        $artistCount = $_GET['artistCount'];
        $result = $global_page->getArtistByPageId($id,$artistCount);
        echo json_encode(['status'=>'success', 'data'=>['msg'=>'Get artists by page id success', 'artists'=>$result]]);
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>