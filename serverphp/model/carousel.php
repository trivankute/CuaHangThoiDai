<?php 
    class Carousel {
        private $conn;

        public function __construct($conn = null) {
            $this->conn = $conn;
        }
        // CREATE TABLE carousel (
        //     carousel_id int unsigned auto_increment primary key,
        //     carousel_link TEXT
        //     );
            
        public function createCarousel($carousel_link) {
            // check if > 5
            $sql = "SELECT * FROM carousel";
            $stmt = $this->conn->prepare($sql);
            try {
                $stmt->execute();
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                if (count($result) >= 5) {
                    echo json_encode(['status' => 'error', 'data' => ['msg' => 'Carousel is full']]);
                    exit();
                }
            }
            catch (PDOException $e) {
                echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
                exit();
            }
            // insert
            $sql = "INSERT INTO carousel (carousel_link) VALUES (:carousel_link)";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':carousel_link', $carousel_link);
            try {
                $stmt->execute();
                return true;
            }
            catch (PDOException $e) {
                echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
                exit();
            }
        }

        public function getAllCarousel() {
            $sql = "SELECT * FROM carousel";
            $stmt = $this->conn->prepare($sql);
            try {
                $stmt->execute();
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return $result;
            }
            catch (PDOException $e) {
                echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
                exit();
            }
        }

        public function updateCarousel($id,$carousel_link) {
            $sql = "UPDATE carousel SET carousel_link = :carousel_link WHERE carousel_id = :carousel_id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':carousel_link', $carousel_link);
            $stmt->bindParam(':carousel_id', $id);
            try {
                $stmt->execute();
                return true;
            }
            catch (PDOException $e) {
                echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
                exit();
            }
        }

        public function deleteCarousel($id) {
            $sql = "DELETE FROM carousel WHERE carousel_id = :carousel_id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':carousel_id', $id);
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