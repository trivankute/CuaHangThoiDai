<?php 
    include_once __DIR__ .'/../../global/index.php';
    include_once __DIR__ .'/../../middlewares/requireAdmin.php';
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if($user_request_method == 'POST') {
        $body = json_decode(file_get_contents('php://input'));
        $id = $_GET['id'];
        $carouselLink = $body->carouselLink;
        $result = $global_carousel->updateCarousel($id,$carouselLink);
        if ($result) {
            echo json_encode(['status'=>'success', 'data'=>['msg'=>'Update carousel success']]);
            exit();
        }
        else {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'Update carousel failed']]);
            exit();
        }
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>