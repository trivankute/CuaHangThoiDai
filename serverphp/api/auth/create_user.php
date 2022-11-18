<?php
    // cors
    include_once("../../middlewares/cors.php");
    // add global variables
    include_once("../../globalVariables/index.php");
    // check loggin yet, if Yes, not let them create again.
    include_once("../../middlewares/deserializeUser.php");
    include_once("../../middlewares/userExisted.php");
    //////////////////////////////////////////////////////
    $data = json_decode(file_get_contents("php://input"));
    $user->username = $data->username;
    $user->password = $data->password;
    $user->create_user();
?>