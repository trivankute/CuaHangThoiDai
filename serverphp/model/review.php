<?php 
    class Review {
        private $score;
        private $content;
        private $album_id;
        private $customer_id;
        private $conn;

        public function __construct($conn = null) {
            $this->conn = $conn;
        }

        public function setInformation($score, $content, $album_id, $customer_id) {
            $this->score = $score;
            $this->content = $content;
            $this->album_id = $album_id;
            $this->customer_id = $customer_id;
        }

        public function createReview() {
            $sql = "SELECT `insert_review`(:score,:content,:album_id,:customer_id) AS `insert_review`";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':score', $this->score);
            $stmt->bindParam(':content', $this->content);
            $stmt->bindParam(':album_id', $this->album_id);
            $stmt->bindParam(':customer_id', $this->customer_id);
            try {
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                return $result['insert_review'];
            }
            catch (PDOException $e) {
                echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
                exit();
            }
        }
        
        public function deleteReview($id) {
            $sql = "SELECT `delete_review`(:id) AS `delete_review`";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id);
            try {
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                return $result['delete_review'];
            }
            catch (PDOException $e) {
                echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
                exit();
            }
        }

        public function updateReview($id,$content,$score) {
            $sql = "SELECT `update_review`(:id,:content,:score) AS `update_review`";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':content', $content);
            $stmt->bindParam(':score', $score);
            $stmt->bindParam(':id', $id);
            try {
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                return $result['update_review'];
            }
            catch (PDOException $e) {
                echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
                exit();
            }
        }
        public function getHighestScore($count) {
            $sql = "SELECT * FROM review ORDER BY score DESC LIMIT $count";
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
    }
?>