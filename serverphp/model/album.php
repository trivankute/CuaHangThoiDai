<?php 
class Album {
    private $id;
    private $title;
    private $price;
    private $artistName;
    private $albumType;
    private $albumAvatar;
    private $artistAvatar;
    private $quantity;
    private $conn;
    private $page;
    private $pageSize = 8;
    public function __construct($conn = null)
    {
        $this->conn = $conn;
    }
    public function setInformation($title, $price, $quantity, $artistName, $albumType, $albumAvatar ='' , $artistAvatar = '')
    {
        $this->title = $title;
        $this->price = $price;
        $this->artistName = $artistName;
        $this->albumType = $albumType;
        $this->quantity = $quantity;
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
            'quantity' => $this->quantity,
            'artistName' => $this->artistName,
            'albumType' => $this->albumType,
            'albumAvatar' => $this->albumAvatar,
            'artistAvatar' => $this->artistAvatar,
        ];
    }

    public function create() {
        $sql = "SELECT `insert_album`(:title,:price,:artistName,:albumAvatar,:quantity,:albumType,:artistAvatar) AS `insert_album`";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':price', $this->price);
        $stmt->bindParam(':quantity', $this->quantity);
        $stmt->bindParam(':artistName', $this->artistName);
        $stmt->bindParam(':albumAvatar', $this->albumAvatar);
        $stmt->bindParam(':albumType', $this->albumType);
        $stmt->bindParam(':artistAvatar', $this->artistAvatar);
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
            echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
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
    public function setAlbumAvatarForUpdate($title, $albumType, $albumAvatar) {
        $this->title = $title;
        $this->albumType = $albumType;
        $this->albumAvatar = $albumAvatar;
        $this->updateAlbumAvatar();
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
                $sql = "SELECT * FROM write_review WHERE album_id = :album_id";
                $stmt = $this->conn->prepare($sql);
                $stmt->bindParam(':album_id', $album_id);
                $stmt->execute();
                $reviews = [];
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                foreach ($result as $review) {
                    $review_id = $review['review_id'];
                    $sql = "SELECT * FROM review WHERE review_id = :review_id";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindParam(':review_id', $review_id);
                    $stmt->execute();
                    $review = $stmt->fetch(PDO::FETCH_ASSOC);
                    $sql = "SELECT * FROM write_review WHERE review_id = :review_id";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindParam(':review_id', $review_id);
                    $stmt->execute();
                    $write_review = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    // echo json_encode($write_review);
                    $sql = "SELECT * FROM account WHERE user_id = :user_id";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindParam(':user_id', $write_review[0]['customer_id']);
                    $stmt->execute();
                    $user = $stmt->fetch(PDO::FETCH_ASSOC);
                    $review['username'] = $user['username'];
                    $review['avatar'] = $user['avatar'];
                    $review['date'] = $write_review[0]['date'];
                    $review['time'] = $write_review[0]['time'];
                    array_push($reviews, $review);
                }
                $album['reviews'] = $reviews;
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
    public function getAlbumById($id) {
        $sql = "SELECT * FROM album WHERE album_id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id);
        try {
            $stmt->execute();
            $album = $stmt->fetch(PDO::FETCH_ASSOC);
            $sql = "SELECT * FROM compose WHERE album_id = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $album['album_id']);
            $stmt->execute();
            $composes = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $artists = [];
            foreach ($composes as $compose) {
                $sql = "SELECT * FROM artist WHERE artist_id = :artist_id";
                $stmt = $this->conn->prepare($sql);
                $stmt->bindParam(':artist_id', $compose['artist_id']);
                $stmt->execute();
                $artist = $stmt->fetch(PDO::FETCH_ASSOC);
                array_push($artists, $artist);
            }
            $album['artist_id'] =  $artists[0]['artist_id'];
            $album['artistName'] = $artists[0]['name'];
            $album['artistAvatar'] = $artists[0]['avatar'];
            $sql = "SELECT * FROM write_review WHERE album_id = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $album['album_id']);
            $stmt->execute();
            $reviews = [];
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach ($result as $review) {
                $review_id = $review['review_id'];
                $sql = "SELECT * FROM review WHERE review_id = :review_id";
                $stmt = $this->conn->prepare($sql);
                $stmt->bindParam(':review_id', $review_id);
                $stmt->execute();
                $review = $stmt->fetch(PDO::FETCH_ASSOC);
                $sql = "SELECT * FROM write_review WHERE review_id = :review_id";
                $stmt = $this->conn->prepare($sql);
                $stmt->bindParam(':review_id', $review_id);
                $stmt->execute();
                $write_review = $stmt->fetchAll(PDO::FETCH_ASSOC);
                // echo json_encode($write_review);
                $sql = "SELECT * FROM account WHERE user_id = :user_id";
                $stmt = $this->conn->prepare($sql);
                $stmt->bindParam(':user_id', $write_review[0]['customer_id']);
                $stmt->execute();
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                $review['username'] = $user['username'];
                $review['avatar'] = $user['avatar'];
                $review['date'] = $write_review[0]['date'];
                $review['time'] = $write_review[0]['time'];
                array_push($reviews, $review);
            }
            $album['reviews'] = $reviews;
            return $album;
        } catch (PDOException $e) {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
            exit();
        }
    }
    public function getAlbumByType($type) {
        $sql = "SELECT * FROM album WHERE album_type = :type";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':type', $type);
        try {
            $result = [];
            $stmt->execute();
            $albums = $stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach($albums as $album) {
                $sql = "SELECT * FROM compose WHERE album_id = :id";
                $stmt = $this->conn->prepare($sql);
                $stmt->bindParam(':id', $album['album_id']);
                $stmt->execute();
                $compose = $stmt->fetch(PDO::FETCH_ASSOC);
                $sql = "SELECT * FROM artist WHERE artist_id = :artist_id";
                $stmt = $this->conn->prepare($sql);
                $stmt->bindParam(':artist_id', $compose['artist_id']);
                $stmt->execute();
                $artist = $stmt->fetch(PDO::FETCH_ASSOC);
                $album['artist_id'] =  $artist['artist_id'];
                $album['artistName'] = $artist['name'];
                $album['artistAvatar'] = $artist['avatar'];
                $sql = "SELECT * FROM write_review WHERE album_id = :id";
                $stmt = $this->conn->prepare($sql);
                $stmt->bindParam(':id', $album['album_id']);
                $stmt->execute();
                $reviews = [];
                $reviewsQuery = $stmt->fetchAll(PDO::FETCH_ASSOC);
                foreach ($reviewsQuery as $review) {
                    $review_id = $review['review_id'];
                    $sql = "SELECT * FROM review WHERE review_id = :review_id";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindParam(':review_id', $review_id);
                    $stmt->execute();
                    $review = $stmt->fetch(PDO::FETCH_ASSOC);
                    $sql = "SELECT * FROM write_review WHERE review_id = :review_id";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindParam(':review_id', $review_id);
                    $stmt->execute();
                    $write_review = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    // echo json_encode($write_review);
                    $sql = "SELECT * FROM account WHERE user_id = :user_id";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindParam(':user_id', $write_review[0]['customer_id']);
                    $stmt->execute();
                    $user = $stmt->fetch(PDO::FETCH_ASSOC);
                    $review['username'] = $user['username'];
                    $review['avatar'] = $user['avatar'];
                    $review['date'] = $write_review[0]['date'];
                    $review['time'] = $write_review[0]['time'];
                    array_push($reviews, $review);
                }
                $album['reviews'] = $reviews;
                array_push($result, $album);
            }
            return $result;
        }
        catch (PDOException $e) {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
            exit();
        }
    }
    public function getCountByType($type) {
        $sql = "SELECT COUNT(*) FROM album WHERE album_type = :type";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':type', $type);
        try {
            $stmt->execute();
            $count = $stmt->fetch(PDO::FETCH_ASSOC);
            return $count['COUNT(*)'];
        }
        catch (PDOException $e) {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
            exit();
        }
    }
    public function updateAlbumById($albumId, $title, $price, $avatar, $albumType, $quantity) {
        $sql = "SELECT `update_album`(:album_id, :title, :price, :avatar, :album_type, :quantity) AS `update_album`";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':album_id', $albumId);
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':price', $price);
        $stmt->bindParam(':avatar', $avatar);
        $stmt->bindParam(':album_type', $albumType);
        $stmt->bindParam(':quantity', $quantity);
        try {
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return $result['update_album'];
        } catch (PDOException $e) {
            echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
            exit();
        }
    }
}
?>