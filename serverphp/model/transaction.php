<?php 
class Transaction {
    private $typeOfTransaction;
    private $typeOfShipping;
    private $customerId;
    private $employeeId;
    private $address;
    private $deliverPartner;
    private $totalPrice;
    private $conn;

    public function __construct($conn = null) {
        $this->conn = $conn;
    }

    public function createTransaction($typeOfTransaction, $typeOfShipping, $customerId, $address, $deliverPartner, $employeeId , $totalPrice, $product) {
        $sql = "SELECT `insert_transaction`(:typeOfTransaction, :typeOfShipping, :customerId, :address, :deliverPartner, :employeeId, :totalPrice) as `insert_transaction`";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':typeOfTransaction', $this->typeOfTransaction);
        $stmt->bindParam(':typeOfShipping', $this->typeOfShipping);
        $stmt->bindParam(':customerId', $this->customerId);
        $stmt->bindParam(':employeeId', $this->employeeId);
        $stmt->bindParam(':address', $this->address);
        $stmt->bindParam(':deliverPartner', $this->deliverPartner);
        $stmt->bindParam(':totalPrice', $this->totalPrice);
        try {
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($result) {
                return $result['insert_transaction'];
            }
            else {
                return false;
            }
        }
        catch (PDOException $e) {
            echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
            exit();
        }
    }
}
?>