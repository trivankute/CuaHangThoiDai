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
            return $transactionId;
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
            $sql = "SELECT * FROM account WHERE role = 'admin'";
            $stmt = $this->conn->prepare($sql);
            try {
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                $customerId = $result['user_id'];
            }
            catch (PDOException $e) {
                echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
                exit();
            }
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
                        $this->deleteTransaction($transactionId);
                        return false;
                    }
                }
            }
            return $transactionId;
        }
        catch (PDOException $e) {
            echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
            exit();
        }
    }
    public function createTransactionDetail($transactionId,$product) {
        $transactionSql = "SELECT `insert_transaction_items`(:transactionId, :albumId, :quantity) AS `insert_transaction_items`";
        $transactionStmt = $this->conn->prepare($transactionSql);
        $transactionStmt->bindParam(':transactionId', $transactionId);
        $transactionStmt->bindParam(':albumId', $product->albumId);
        $transactionStmt->bindParam(':quantity', $product->quantity);
        try {
            // Check if quantity is available
            $albumSql = "SELECT `quanity` FROM `album` WHERE `album_id` = :albumId";
            $albumStmt = $this->conn->prepare($albumSql);
            $albumStmt->bindParam(':albumId', $product->albumId);
            $albumStmt->execute();
            $albumResult = $albumStmt->fetch(PDO::FETCH_ASSOC);
            if($albumResult['quanity'] < $product->quantity) {
                return false;
            }
            // minus quantity in album
            $sql = "UPDATE `album` SET `quanity` = `quanity` - :quantity WHERE `album_id` = :albumId";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':quantity', $product->quantity);
            $stmt->bindParam(':albumId', $product->albumId);
            $stmt->execute();
            // insert transaction detail
            $transactionStmt->execute();
            $transactionResult = $transactionStmt->fetch(PDO::FETCH_ASSOC);
            return $transactionResult['insert_transaction_items'];
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
    public function deleteTransaction($id) {
        $sql = "DELETE FROM `transaction` WHERE `transaction_id` = :id";
        $deleteSqlStmt = $this->conn->prepare($sql);
        $deleteSqlStmt->bindParam(':id', $id);
        try {
            // reset quantity in album
            $sql = "SELECT `album_id`, `quanity` FROM `transaction_items` WHERE `transaction_id` = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $transactionItems = $stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach($transactionItems as $transactionItem) {
                $sql = "UPDATE `album` SET `quanity` = `quanity` + :quantity WHERE `album_id` = :albumId";
                $stmt = $this->conn->prepare($sql);
                $stmt->bindParam(':quantity', $transactionItem['quanity']);
                $stmt->bindParam(':albumId', $transactionItem['album_id']);
                $stmt->execute();
            }
            // delete transaction detail
            $sql = "DELETE FROM `transaction_items` WHERE `transaction_id` = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            // delete transaction
            $deleteSqlStmt->execute();
            return true;
        }
        catch (PDOException $e) {
            echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
            exit();
        }
    }
    public function updateDeliverPartner($id,$deliverPartner) {
        $sql = "SELECT * FROM shipping WHERE transaction_id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id);
        try {
            $stmt->execute();
            $shipping = $stmt->fetch(PDO::FETCH_ASSOC);
            if(!$shipping) {
                echo json_encode(['status' => 'error', 'data' => ['msg' => 'Shipping not found']]);
                exit();
            }
        }
        catch(PDOException $e) {
            echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
            exit();
        }
        $sql = "UPDATE `shipping` SET `deliver_partner` = :deliverPartner WHERE `transaction_id` = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':deliverPartner', $deliverPartner);
        try {
            $stmt->execute();
            return true;
        }
        catch (PDOException $e) {
            echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
            exit();
        }
    }
    public function getTransactionById($id) {
        $sql = "SELECT * FROM `transaction` WHERE `transaction_id` = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id);
        try {
            $stmt->execute();
            $transaction = $stmt->fetch(PDO::FETCH_ASSOC);
            if(!$transaction) {
                echo json_encode(['status' => 'error', 'data' => ['msg' => 'Transaction not found']]);
                exit();
            }
            else {
                if($transaction['type_of_shipping'] == 'shipping' || $transaction['type_of_shipping'] == 'Shipping') {
                    $sql = "SELECT * FROM `shipping` WHERE `transaction_id` = :id";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindParam(':id', $id);
                    $stmt->execute();
                    $shipping = $stmt->fetch(PDO::FETCH_ASSOC);
                    $transaction['shipping'] = $shipping;
                }
                else if ($transaction['type_of_shipping'] == 'pick_up') {
                    $sql = "SELECT * FROM `pick_up_at_store` WHERE `transaction_id` = :id";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindParam(':id', $id);
                    $stmt->execute();
                    $pickup = $stmt->fetch(PDO::FETCH_ASSOC);
                    $sql = "SELECT * FROM account WHERE user_id = :id";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindParam(':id', $pickup['employee_id']);
                    $stmt->execute();
                    $employee = $stmt->fetch(PDO::FETCH_ASSOC);
                    $transaction['employee'] = $employee;
                    unset($transaction['employee']['password']);
                }
                $sql = "SELECT * FROM account WHERE user_id = :id";
                $stmt = $this->conn->prepare($sql);
                $stmt->bindParam(':id', $transaction['customer_id']);
                $stmt->execute();
                $account = $stmt->fetch(PDO::FETCH_ASSOC);
                if($account['role'] === 'admin') {
                    $transaction['customer'] = false;
                }
                else {
                    $transaction['customer'] = $account;
                    unset($transaction['customer']['password']);
                }
                $sql = "SELECT * FROM `transaction_items` WHERE `transaction_id` = :id";
                $stmt = $this->conn->prepare($sql);
                $stmt->bindParam(':id', $id);
                $stmt->execute();
                $transactionItems = $stmt->fetchAll(PDO::FETCH_ASSOC);
                // omit transaction id in transaction items
                foreach($transactionItems as &$transactionItem) {
                    unset($transactionItem['transaction_id']);
                }
                $transaction['transaction_items'] = $transactionItems;
                return $transaction;
            }
        }
        catch (PDOException $e) {
            echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
            exit();
        }
    }
}
?>