<?php
    include_once __DIR__ .'/../../global/index.php';
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    switch ($user_request_method) {
        case 'POST':
            $body = file_get_contents('php://input');
            $body = json_decode($body);
            $email = $body->email;
            $password = $body->password;
            $token = $global_user->login($email,$password);
            if(!$token) {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>'Invalid credentials']]);
            }
            else {
                echo json_encode(['status'=>'success', 'data'=>['msg'=>'Login success', 'token'=>$token]]);
            }
            break;
        default:
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
            break;
    }

?>