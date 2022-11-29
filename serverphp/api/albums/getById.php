<?php 
    include_once __DIR__ .'/../../global/index.php';
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if ($user_request_method == 'GET') {
        $id = $_GET['id'];
        $album = $global_album->getAlbumById($id);
        echo json_encode(['status'=>'success', 'data'=>['msg'=>'Get album success', 'album'=>$album]]);
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>