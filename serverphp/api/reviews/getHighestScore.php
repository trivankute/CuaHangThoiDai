<?php
    include_once __DIR__ .'/../../global/index.php';

    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if ($user_request_method == "GET") {
        $count = $_GET['count'];
        $result = $global_review->getHighestScore($count);
        if($result) {
            echo json_encode([
                'status'=>'success', 
                'data'=> [
                    'msg'=>'Get reviews success',
                    'reviews' => $result
                ]
            ]);
            exit();
        }
        else {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'Get reviews failed']]);
            exit();
        }
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>