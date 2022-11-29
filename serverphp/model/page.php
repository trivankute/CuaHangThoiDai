<?php 
    include_once __DIR__ .'/../global/index.php';
    class Page {
        private $id;

        public function __construct($conn = null) {
            $this->conn = $conn;
        }

        public function getAlbumByPageId($id) {
            $sql = "SELECT * FROM album WHERE page = $id";
            $stmt = $this->conn->prepare($sql);
            try {
                $albums = [];
                $stmt->execute();
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                foreach($result as $album) {
                    $sql = "SELECT * FROM compose WHERE album_id = :id";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindParam(':id', $album['album_id']);
                    $stmt->execute();
                    $composes = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    $artists = [];
                    foreach($composes as $compose) {
                        $sql = "SELECT * FROM artist WHERE artist_id = :id";
                        $stmt = $this->conn->prepare($sql);
                        $stmt->bindParam(':id', $compose['artist_id']);
                        $stmt->execute();
                        $artist = $stmt->fetch(PDO::FETCH_ASSOC);
                        array_push($artists, $artist);
                    }
                    $album['artist_id'] = $artists[0]['artist_id'];
                    $album['artistName'] = $artists[0]['name'];
                    $album['artistAvatar'] = $artists[0]['avatar'];
                    array_push($albums, $album);
                }
                return $albums;
            }
            catch (PDOException $e) {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
                exit();
            }
        }
    }
?>