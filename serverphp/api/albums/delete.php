<?php 
    include_once __DIR__ .'/../../global/index.php';
    include_once __DIR__ . '/../../middlewares/requireEmployee.php';
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if ($user_request_method == "DELETE") {
        // get album id via /api/albums/delete.php?id=1
        $id = $_GET['id'];
        $result = $global_album->deleteAlbumById($id);
        if($result) {
            echo json_encode(['status'=>'success', 'data'=>['msg'=>'Delete album success']]);
            exit();
        }
        else {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'Delete album failed']]);
            exit();
        }
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>