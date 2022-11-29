<?php
    class Artist {
        private $artist_id;

        public function __construct($conn = null) {
            $this->conn = $conn;
        }

        public function deleteArtist($artist_id) {
            $sql = "SELECT `delete_artist`(:artist_id) AS `delete_artist`";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':artist_id', $artist_id);
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