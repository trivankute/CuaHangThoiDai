<?php 
    include_once __DIR__ . '/../../global/index.php';
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if($user_request_method == 'GET') {
        $blogCount = $_GET['blogCount'];
        $result = $global_page->getTotalPageBlog($blogCount);
        if($result) {
            echo json_encode(['status'=>'success', 'data'=>['msg'=>'Get total page blog success', 'totalPage'=>$result]]);
            exit();
        }
        else {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'Get total page blog failed']]);
            exit();
        }
        exit();
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>