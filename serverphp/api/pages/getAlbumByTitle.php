<?php
    include_once __DIR__ . '/../../global/index.php';
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    if ($user_request_method == 'GET') {
        $id = $_GET['id'];
        $albumCount = $_GET['albumCount'];
        $title = $_GET['title'];
        $result = $global_page->getAlbumByPageIdAndTitle($id,$albumCount,$title);
        echo json_encode(['status'=>'success', 'data'=>['msg'=>'Get albums by page id success','totalPage' => $result['totalPage'] ,'albums'=>$result['albums']]]);
    }
    else {
        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
        exit();
    }
?>