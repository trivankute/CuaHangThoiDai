<?php 
    class Footer {
        private $conn;

        public function __construct($conn = null) {
            $this->conn = $conn;
        }

        // CREATE TABLE footer (
        //     footer_id int unsigned auto_increment primary key,
        //     index_name VARCHAR(10) CHECK (index_name IN ('phone','email','address')),
        //     information VARCHAR(32)
        //     );
            
        public function createFooter($phone,$email,$address) {
            $sql = "SELECT * FROM footer";
            $stmt = $this->conn->prepare($sql);
            try {
                $stmt->execute();
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                if (count($result) > 0) {
                    echo json_encode(['status' => 'error', 'data' => ['msg' => 'Footer config already exist']]);
                    exit();
                }
            }
            catch (PDOException $e) {
                echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
                exit();
            }
            $sql = "INSERT INTO footer (index_name,information) VALUES (:index_name,:information)";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':index_name', $index_name);
            $stmt->bindParam(':information', $information);
            try {
                $index_name = 'phone';
                $information = $phone;
                $stmt->execute();
                $index_name = 'email';
                $information = $email;
                $stmt->execute();
                $index_name = 'address';
                $information = $address;
                $stmt->execute();
                return true;
            }
            catch (PDOException $e) {
                echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
                exit();
            }
        }

        public function getFooter() {
            $sql = "SELECT * FROM footer";
            $stmt = $this->conn->prepare($sql);
            try {
                $stmt->execute();
                $footer = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $result['phone'] = $footer[0]['information'];
                $result['email'] = $footer[1]['information'];
                $result['address'] = $footer[2]['information'];
                return $result;
            }
            catch (PDOException $e) {
                echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
                exit();
            }
        }

        public function updateFooter($phone,$email,$address) {
            $sql = "UPDATE footer SET information = :information WHERE index_name = :index_name";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':information', $information);
            $stmt->bindParam(':index_name', $index_name);
            try {
                $index_name = 'phone';
                $information = $phone;
                $stmt->execute();
                $index_name = 'email';
                $information = $email;
                $stmt->execute();
                $index_name = 'address';
                $information = $address;
                $stmt->execute();
                return true;
            }
            catch (PDOException $e) {
                echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
                exit();
            }
        }

        public function deleteAllFooter() {
            $sql = "DELETE FROM footer";
            $stmt = $this->conn->prepare($sql);
            try {
                $stmt->execute();
                return true;
            }
            catch (PDOException $e) {
                echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
                exit();
            }
        }
    }
?>