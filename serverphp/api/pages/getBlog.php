<?php
    include_once __DIR__ . '/../../global/index.php';
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if ($user_request_method == 'GET') {
        $id = $_GET['id'];
        $blogCount = $_GET['blogCount'];
        $result = $global_page->getBlogByPageId($id,$blogCount);
        echo json_encode(['status'=>'success', 'data'=>['msg'=>'Get albums by page id success', 'albums'=>$result]]);
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>