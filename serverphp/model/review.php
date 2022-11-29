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
    }
?>