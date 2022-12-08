<?php 
    include_once __DIR__ .'/../../global/index.php';
    include_once __DIR__ .'/../../middlewares/requireAdmin.php';
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if($user_request_method == 'GET') {
        $id = $_GET['id'];
        $result = $global_carousel->deleteCarousel($id);
        if ($result) {
            echo json_encode(['status'=>'success', 'data'=>['msg'=>'Delete carousel success']]);
            exit();
        }
        else {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'Delete carousel failed']]);
            exit();
        }
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>