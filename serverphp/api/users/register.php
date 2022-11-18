<?php
    require_once ("../../index.php");
    $user_request_method = $_SERVER['REQUEST_METHOD'];
    switch ($user_request_method) {
        case 'POST':
            
            $global_user->setInformation(
                $_SERVER['POST']['email'],
                $_SERVER['POST']['username'],
                $_SERVER['POST']['password'],
                $_SERVER['POST']['role']
            );
            
            // code...
            break;
        default:
            // code...
            break;
    }

?>