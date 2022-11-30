<?php
    include_once __DIR__ . '/../../global/index.php';
    include_once __DIR__ .'/../../middlewares/requireEmployee.php';
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if ($user_request_method == 'GET') {
        $id = $_GET['id'];
        $employeeCount = $_GET['employeeCount'];
        $result = $global_page->getEmployeeByPageId($id,$employeeCount);
        echo json_encode(['status'=>'success', 'data'=>['msg'=>'Get albums by page id success', 'employees'=>$result]]);
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>