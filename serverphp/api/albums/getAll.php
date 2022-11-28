<?php 
    include_once __DIR__ .'/../../global/index.php';
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if ($user_request_method == 'GET') {
        $albums = $global_album->getAllAlbums();
        echo json_encode(['status'=>'success', 'data'=>['msg'=>'Get all albums success', 'albums'=>$albums]]);
        exit();
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>