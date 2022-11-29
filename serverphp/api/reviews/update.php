<?php 
    include_once __DIR__ .'/../../global/index.php';
    include_once __DIR__ .'/../../middlewares/requireEmployee.php';
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if ($user_request_method == "POST") {
        $id = $_GET['id'];
        $body = json_decode(file_get_contents('php://input'));
        $content = $body->content;
        $score = $body->score;
        $result = $global_review->updateReview($id, $score, $content);
        if($result) {
            echo json_encode(['status'=>'success', 'data'=>['msg'=>'Update review success']]);
            exit();
        }
        else {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'Update review failed']]);
            exit();
        }
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>