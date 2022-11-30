<?php 
class User {
    private $user_id;
    private $gender;
    private $phone;
    private $address;
    private $bdate;
    private $conn;

    public function __construct($conn = null)
    {
        $this->conn = $conn;
    }

    public function setInformation($user_id, $gender, $phone, $address, $bdate)
    {
        $this->user_id = $user_id;
        $this->gender = $gender;
        $this->phone = $phone;
        $this->address = $address;
        $this->bdate = $bdate;
    }

    public function updateInformation() {
        $sql = "SELECT `update_user`(:user_id,:gender,:phone,:address,:bdate)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':user_id', $this->user_id);
        $stmt->bindParam(':gender',$this->gender);
        $stmt->bindParam(':phone',$this->phone);
        $stmt->bindParam(':address',$this->address);
        $stmt->bindParam(':bdate',$this->bdate);
        try {
            $stmt->execute();
            return true;
        } catch (PDOException $e) {
            echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
            exit();
        }
    }
    public function getUserInformationById($id) {
        $sql = "SELECT * FROM user WHERE user_id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id);
        try {
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            $sql = "SELECT * FROM account WHERE user_id = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $account = $stmt->fetch(PDO::FETCH_ASSOC);
            $result['account'] = $account;
            // omit password
            unset($result['account']['password']);
            return $result;
        } catch (PDOException $e) {
            echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
            exit();
        }
    }
}
?>