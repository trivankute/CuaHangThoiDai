<?php
    include_once __DIR__ . '/../../global/index.php';
    include_once __DIR__ .'/../../middlewares/requireEmployee.php';

    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if ($user_request_method == 'GET') {
        $id = $_GET['id'];
        $customerCount = $_GET['customerCount'];
        $username = $_GET['name'];
        $result = $global_page->getCustomerByPageIdAndName($id,$customerCount,$username);
        echo json_encode(['status'=>'success', 'data'=>['msg'=>'Get albums by page id success', 'totalPage'=>$result['totalPage'],'customers'=>$result['customers'],]]);
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>