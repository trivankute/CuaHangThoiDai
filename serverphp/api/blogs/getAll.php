<?php 
    include_once __DIR__ .'/../../global/index.php';

    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if ($user_request_method == "GET") {
        $result = $global_blog->getAllBlogs();
        if($result) {
            echo json_encode([
                'status'=>'success', 
                'data'=>[ 
                    'msg'=>'Get all blogs success',
                    'blogs' => $result
                ]
            ]);
            exit();
        }
        else {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'Get all blogs failed']]);
            exit();
        }
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>