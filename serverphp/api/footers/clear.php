<?php 
    include_once __DIR__ .'/../../global/index.php';
    include_once __DIR__ .'/../../middlewares/requireAdmin.php';
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if($user_request_method == 'GET') {
        $result = $global_footer->deleteAllFooter();
        if ($result) {
            echo json_encode(['status'=>'success', 'data'=>['msg'=>'Clear footer config success']]);
            exit();
        }
        else {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'Clear footer config failed']]);
            exit();
        }
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>