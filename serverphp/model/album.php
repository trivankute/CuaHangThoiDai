<?php 
class Album {
    private $id;
    private $title;
    private $price;
    private $artistName;
    private $albumType;
    private $albumAvatar;
    private $artistAvatar;
    private $conn;
    private $page;
    private $pageSize = 8;
    public function __construct($conn = null)
    {
        $this->conn = $conn;
    }
    public function setInformation($title, $price, $artistName, $albumType, $albumAvatar ='' , $artistAvatar = '')
    {
        $this->title = $title;
        $this->price = $price;
        $this->artistName = $artistName;
        $this->albumType = $albumType;
        $this->albumAvatar = $albumAvatar;
        $this->artistAvatar = $artistAvatar;
    }
    public function albumsCount() {
        $sql = "SELECT COUNT(*) FROM album";
        $stmt = $this->conn->prepare($sql);
        try {
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return $result['COUNT(*)'];
        }
        catch (PDOException $e) {
            echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
            exit();
        }
    }
    public function getInformation()
    {
        return [
            'title' => $this->title,
            'price' => $this->price,
            'page' => $this->page,
            'artistName' => $this->artistName,
            'albumType' => $this->albumType,
            'albumAvatar' => $this->albumAvatar,
            'artistAvatar' => $this->artistAvatar,
        ];
    }

    public function create() {
        $sql = "SELECT `insert_album`(:title,:price,:page,:artistName,:albumAvatar,:albumType,:artistAvatar) AS `insert_album`";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':price', $this->price);
        $stmt->bindParam(':artistName', $this->artistName);
        $stmt->bindParam(':albumAvatar', $this->albumAvatar);
        $stmt->bindParam(':albumType', $this->albumType);
        $stmt->bindParam(':artistAvatar', $this->artistAvatar);
        $count = $this->albumsCount();
        // pagination 
        if($count ==0 ) {
            $this->page = 1;
        }
        else {
            if($count % $this->pageSize == 0) {
                $this->page = $count / $this->pageSize + 1;
            }
            else {
                $this->page = floor($count / $this->pageSize) + 1;
            }
        }
        $stmt->bindParam(':page', $this->page);
        try {
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            if($result['insert_album'] == 1) {
                return true;
            }
            else {
                return false;
            }
        } catch (PDOException $e) {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>'Create album failed']]);
            exit();
        }
    }
    public function setAvatar($albumAvatar, $artistAvatar)
    {
        $this->albumAvatar = $albumAvatar;
        $this->artistAvatar = $artistAvatar;
        $this->updateAlbumAvatar();
        $this->updateArtistAvatar();
    }
    public function updateArtistAvatar() {
        $sql = "UPDATE artist SET avatar = :artistAvatar WHERE name = :artistName";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':artistAvatar', $this->artistAvatar);
        $stmt->bindParam(':artistName', $this->artistName);
        try {
            if($stmt->execute())
            {
                return true;
            }
            else {
                return false;
            }
        } catch (PDOException $e) {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
            exit();
        }
    }
    public function updateAlbumAvatar() {
        $sql = "UPDATE album SET avatar = :albumAvatar WHERE title = :title AND album_type = :albumType";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':albumAvatar', $this->albumAvatar);
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':albumType', $this->albumType);
        try {
            if($stmt->execute())
            {
                return true;
            }
            else {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>'Cannot update album avatar']]);
                exit();
            }
        } catch (PDOException $e) {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
            exit();
        }
    }
    public function getAllAlbums() {
        $sql = "SELECT * FROM compose";
        $stmt = $this->conn->prepare($sql);
        try {
            $stmt->execute();
            $composes = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $albums = [];
            foreach ($composes as $compose) {
                $album_id = $compose['album_id'];
                $artist_id = $compose['artist_id'];
                $sql = "SELECT * FROM album WHERE album_id = :album_id";
                $stmt = $this->conn->prepare($sql);
                $stmt->bindParam(':album_id', $album_id);
                $stmt->execute();
                $album = $stmt->fetch(PDO::FETCH_ASSOC);
                $sql = "SELECT * FROM artist WHERE artist_id = :artist_id";
                $stmt = $this->conn->prepare($sql);
                $stmt->bindParam(':artist_id', $artist_id);
                $stmt->execute();
                $artist = $stmt->fetch(PDO::FETCH_ASSOC);
                $album['artistName'] = $artist['name'];
                $album['artistAvatar'] = $artist['avatar'];
                array_push($albums, $album);
            }
            return $albums;
        } catch (PDOException $e) {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
            exit();
        }
    }
    public function deleteAlbumById($id) {
        // find album by id 
        $sql = "SELECT `delete_album`(:id) AS `delete_album`";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id);
        try {
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return $result['delete_album'];
            
        } catch (PDOException $e) {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
            exit();
        }
    }
}
?>