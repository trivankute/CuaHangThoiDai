<?php 
    include_once __DIR__ .'/../../global/index.php';
    include_once __DIR__ .'/../../middlewares/requireUser.php';
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if($user_request_method == 'POST') {
        $body = json_decode(file_get_contents('php://input'));
        $content = $body->content;
        $score = $body->score;
        $album_id = $_GET['albumId'];
        $user_id = $global_user->getInformation()['id'];
        $global_review->setInformation($score, $content, $album_id, $user_id);
        $result = $global_review->createReview(); 
        if ($result) {
            echo json_encode(['status'=>'success', 'data'=>['msg'=>'Create review success']]);
            exit();
        }
        else {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'Create review failed']]);
            exit();
        }
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>