<?php 
    class Music {
        private $conn;

        public function __construct($conn = null) {
            $this->conn = $conn;
        }
        // CREATE TABLE music (
        //     music_id int unsigned auto_increment primary key,
        //     music_link TEXT
        //     );
        public function createMusic($music_link) {
            $sql = "INSERT INTO music (music_link) VALUES (:music_link)";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':music_link', $music_link);
            try {
                $stmt->execute();
                return true;
            }
            catch (PDOException $e) {
                echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
                exit();
            }
        }

        public function getAllMusic() {
            $sql = "SELECT * FROM music";
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

        public function updateMusic($id,$music_link) {
            $sql = "UPDATE music SET music_link = :music_link WHERE music_id = :music_id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':music_link', $music_link);
            $stmt->bindParam(':music_id', $id);
            try {
                $stmt->execute();
                return true;
            }
            catch (PDOException $e) {
                echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
                exit();
            }
        }
        
        public function deleteMusic($id) {
            $sql = "DELETE FROM music WHERE music_id = :music_id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':music_id', $id);
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