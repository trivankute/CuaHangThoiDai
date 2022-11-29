<?php
    include_once __DIR__ .'/../../global/index.php';
    include_once __DIR__ .'/../../middlewares/requireUser.php';
    include_once __DIR__ .'/../../middlewares/updateAccountValidation.php';
    use Cloudinary\Api\Upload\UploadApi;
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    switch ($user_request_method) {
        case 'POST':
            // get form-data from request body
            // $body = [
            //     'email' => $_POST['email'],
            //     'username' => $_POST['username'],
            //     'password' => $_POST['password'],
            //     'role' => $_POST['role'],
            // ];
            $email = $_POST['email'];
            $username = $_POST['username'];
            $password = $_POST['password'];
            $role = $_POST['role'];
            $user_id = $global_account->getInformation()['id'];
            if($role != $global_account->getInformation()['role']) {
                echo json_encode([
                    'status'=>'error', 
                    'data'=>['msg'=>'Cannot change role when update account']
                ]);
            }
            else {
                //updateAccount($id, $email, $password, $avatar, $username, $role)
                $result = $global_account->updateAccount($user_id, $email, $password, null, $username, $role);
                if($result)
                {
                    $uploader = new UploadApi();
                    $result = (new UploadApi())->upload($_FILES['avatar']["tmp_name"],["folder" => "cuahangthoidai/"]);
                    $global_account->setAvatar($result["secure_url"]);
                    echo json_encode(['status'=>'success', 'data'=>['msg'=>'Update account success']]);
                    exit();
                }
                else {
                    echo json_encode(['status'=>'error', 'data'=>['msg'=>'Update account failed']]);
                    exit();
                }
                break;
            }
        default:
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'Method not allowed']]);
            exit();
            break;
    }

?>