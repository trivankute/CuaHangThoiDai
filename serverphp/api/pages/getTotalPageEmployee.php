<?php 
    include_once __DIR__ . '/../../global/index.php';
    include_once __DIR__ .'/../../middlewares/requireEmployee.php';

    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if($user_request_method == 'GET') {
        $employeeCount = $_GET['employeeCount'];
        $result = $global_page->getTotalPageEmployee($employeeCount);
        if($result) {
            echo json_encode(['status'=>'success', 'data'=>['msg'=>'Get total page employee success', 'totalPage'=>$result]]);
            exit();
        }
        else {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'Get total page employee failed']]);
            exit();
        }
        exit();
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>