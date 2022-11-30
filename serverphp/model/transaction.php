<?php 
class Transaction {
    private $typeOfTransaction;
    private $typeOfShipping;
    private $customerId;
    private $employeeId;
    private $receiverAddress;
    private $deliverPartner;
    private $totalPrice;
    private $receiverName;
    private $receiverPhone;
    private $conn;

    public function __construct($conn = null) {
        $this->conn = $conn;
    }

    public function createShippingTransaction(
        $typeOfTransaction, 
        $typeOfShipping, 
        $customerId,
        $receiverAddress, 
        $deliverPartner, 
        $receiverName, 
        $receiverPhone, 
        $totalPrice, 
        $products,
        $employeeId = null
    ) {
        $sql = "SELECT `insert_transaction`(:typeOfTransaction,:typeOfShipping,:customerId,:receiverName,:receiverPhone,:receiverAddress,:deliverPartner,:employeeId,:totalPrice) as `insert_transaction`";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':typeOfTransaction', $typeOfTransaction);
        $stmt->bindParam(':typeOfShipping', $typeOfShipping);
        $stmt->bindParam(':customerId', $customerId);
        $stmt->bindParam(':receiverName', $receiverName);
        $stmt->bindParam(':receiverPhone', $receiverPhone);
        $stmt->bindParam(':receiverAddress', $receiverAddress);
        $stmt->bindParam(':deliverPartner', $deliverPartner);
        $stmt->bindParam(':totalPrice', $totalPrice);
        $stmt->bindParam(':employeeId', $employeeId);
        try {
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            $transactionId = $result['insert_transaction'];
            if($transactionId != null) {
                foreach($products as $product) {
                    $result = $this->createTransactionDetail($transactionId, $product);
                    if(!$result) {
                        return false;
                    }
                }
            }
            return true;
        }
        catch (PDOException $e) {
            echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
            exit();
        }
    }
    public function createPickupTransaction(
        $typeOfTransaction,
        $typeOfShipping, 
        $customerId,
        $employeeId,
        $totalPrice,
        $products,
        $deliverPartner = null, 
        $receiverName = null, 
        $receiverPhone = null, 
        $address = null
    ) {
        if($customerId == "") {
            $customerId = "15";
        }
        $sql = "SELECT `insert_transaction`(:typeOfTransaction,:typeOfShipping,:customerId,:receiverName,:receiverPhone,:receiverAddress,:deliverPartner,:employeeId,:totalPrice) as `insert_transaction`";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':typeOfTransaction', $typeOfTransaction);
        $stmt->bindParam(':typeOfShipping', $typeOfShipping);
        $stmt->bindParam(':customerId', $customerId);
        $stmt->bindParam(':receiverName', $receiverName);
        $stmt->bindParam(':receiverPhone', $receiverPhone);
        $stmt->bindParam(':receiverAddress', $address);
        $stmt->bindParam(':deliverPartner', $deliverPartner);
        $stmt->bindParam(':totalPrice', $totalPrice);
        $stmt->bindParam(':employeeId', $employeeId);
        try {
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            $transactionId = $result['insert_transaction'];
            if($transactionId != null) {
                foreach($products as $product) {
                    $result = $this->createTransactionDetail($transactionId, $product);
                    if(!$result) {
                        return false;
                    }
                }
            }
            return true;
        }
        catch (PDOException $e) {
            echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
            exit();
        }
    }
    public function createTransactionDetail($transactionId,$product) {
        $sql = "SELECT `insert_transaction_items`(:transactionId, :albumId, :quantity) AS `insert_transaction_items`";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':transactionId', $transactionId);
        $stmt->bindParam(':albumId', $product->albumId);
        $stmt->bindParam(':quantity', $product->quantity);
        try {
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return $result['insert_transaction_items'];
        }
        catch (PDOException $e) {
            echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
            exit();
        }
    }
    public function updateShippingTransactionStateByCustomer($customerId,$transaction_id,$state) {
        // check if transaction is belong to customer
        $sql = "SELECT * FROM transaction WHERE customer_id = :customerId AND transaction_id = :transaction_id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':customerId', $customerId);
        $stmt->bindParam(':transaction_id', $transaction_id);
        try {
            $stmt->execute();
            $transaction = $stmt->fetch(PDO::FETCH_ASSOC);
            if(!$transaction) {
                echo json_encode(['status' => 'error', 'data' => ['msg' => 'Transaction not found']]);
                exit();
            }
        }
        catch(PDOException $e) {
            echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
            exit();
        }
        $sql = "SELECT `update_shipping`(:id,:state) AS `update_shipping`";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $transaction_id);
        $stmt->bindParam(':state', $state);
        try {
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return $result['update_shipping'];
        }
        catch (PDOException $e) {
            echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
            exit();
        }
    }
    public function updateShippingTransactionStateByEmployee($id,$state) {
        $sql = "SELECT `update_shipping`(:id,:state) AS `update_shipping`";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':state', $state);
        try {
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return $result['update_shipping'];
        }
        catch (PDOException $e) {
            echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
            exit();
        }
    }
}
?>