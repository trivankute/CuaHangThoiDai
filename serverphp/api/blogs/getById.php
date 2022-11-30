<?php
    include_once __DIR__ .'/../../global/index.php';
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if ($user_request_method == 'GET') {
        $id = $_GET['id'];
        $blog = $global_blog->getBlogById($id);
        if($blog) {
            echo json_encode(['status'=>'success', 'data'=>['msg'=>'Get blog success', 'blog'=>$blog]]);
            exit();
        }
        else {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'Get blog failed']]);
            exit();
        }
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>