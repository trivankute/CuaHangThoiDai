<?php 
    include_once __DIR__ .'/../../global/index.php';
    include_once __DIR__ .'/../../middlewares/requireUser.php';

    $body = json_decode(file_get_contents('php://input'));
    // {
    //     "typeOfTransaction":"{{$randomTransactionType}}",
    //     "typeOfShipping":"Shipping",
    //     "customerId": "2",
    //     "address": "{{$randomStreetAddress}}",
    //     "deliverPartner": "{{$randomWord}}",
    //     "totalPrice": "0",
    //     "products" : [
    //         {
    //             "albumId" : "21",
    //             "quantity" : "2"
    //         },
    //         {
    //             "albumId" : "22",
    //             "quantity" : "2"
    //         },
    //         {
    //             "albumId" : "23",
    //             "quantity" : "2"
    //         }
    //     ]
    // }
    $typeOfTransaction = $body->typeOfTransaction;
    $typeOfShipping = $body->typeOfShipping;
    $customerId = $body->customerId;
    $address = $body->address;
    $deliverPartner = $body->deliverPartner;
    $totalPrice = $body->totalPrice;
    $products = $body->products;
        
?>