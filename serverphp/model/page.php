<?php 
    include_once __DIR__ .'/../global/index.php';
    class Page {
        private $id;
        private $albumCount = 8;
        private $blogCount = 4;
        private $customerCount = 6;
        private $employeeCount = 6;
        public function __construct($conn = null) {
            $this->conn = $conn;
        }

        public function getAlbumByPageId($id,$albumCount) {
            $this->albumCount = $albumCount;
            $offset = ($id-1) * $this->albumCount;
            $sql = "SELECT * FROM `album` LIMIT $offset, $this->albumCount";
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
                    $sql = "SELECT * FROM write_review WHERE album_id = :id";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindParam(':id', $album['album_id']);
                    $stmt->execute();
                    $reviews = [];
                    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    foreach($result as $review) {
                        $review_id = $review['review_id'];
                        $sql = "SELECT * FROM review WHERE review_id = :review_id";
                        $stmt = $this->conn->prepare($sql);
                        $stmt->bindParam(':review_id', $review_id);
                        $stmt->execute();
                        $review = $stmt->fetch(PDO::FETCH_ASSOC);
                        array_push($reviews, $review);
                    }
                    $album['reviews'] = $reviews;
                    array_push($albums, $album);
                }
                return $albums;
            }
            catch (PDOException $e) {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
                exit();
            }
        }
        
        public function getBlogByPageId($id,$blogCount) {
            $this->blogCount = $blogCount;
            $offset = ($id-1) * $this->blogCount;
            $sql = "SELECT * FROM `blog` LIMIT $offset, $this->blogCount";
            $stmt = $this->conn->prepare($sql);
            try {
                $blogs = [];
                $stmt->execute();
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                foreach($result as $blog) {
                    $sql = "SELECT * FROM write_blog WHERE blog_id = :id";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindParam(':id', $blog['blog_id']);
                    $stmt->execute();
                    $employees = [];
                    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    foreach($result as $employee) {
                        $employee_id = $employee['employee_id'];
                        $sql = "SELECT * FROM account WHERE user_id = :employee_id";
                        $stmt = $this->conn->prepare($sql);
                        $stmt->bindParam(':employee_id', $employee_id);
                        $stmt->execute();
                        $employee = $stmt->fetch(PDO::FETCH_ASSOC);
                        array_push($employees, $employee);
                    }
                    $blog['employee'] = $employees[0];
                    array_push($blogs, $blog);
                }
                return $blogs;
            }
            catch (PDOException $e) {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
                exit();
            }
        }
        public function getCustomerByPageId($id,$customerCount) {
            $this->customerCount = $customerCount;
            $offset = ($id-1) * $this->customerCount;
            $sql = "SELECT * FROM `customer` LIMIT $offset, $this->customerCount";
            $stmt = $this->conn->prepare($sql);
            try {
                $customers = [];
                $stmt->execute();
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                foreach($result as $customer) {
                    $sql = "SELECT * FROM account WHERE user_id = :id";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindParam(':id', $customer['customer_id']);
                    $stmt->execute();
                    $account = $stmt->fetch(PDO::FETCH_ASSOC);
                    $customer['account'] = $account;
                    //omit password
                    unset($customer['account']['password']);
                    array_push($customers, $customer);
                }
                return $customers;
            }
            catch (PDOException $e) {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
                exit();
            }
        }
        public function getEmployeeByPageId($id,$employeeCount) {
            $this->employeeCount = $employeeCount;
            $offset = ($id-1) * $this->employeeCount;
            $sql = "SELECT * FROM `employee` LIMIT $offset, $this->employeeCount";
            $stmt = $this->conn->prepare($sql);
            try {
                $employees = [];
                $stmt->execute();
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                foreach($result as $employee) {
                    $sql = "SELECT * FROM account WHERE user_id = :id";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindParam(':id', $employee['employee_id']);
                    $stmt->execute();
                    $account = $stmt->fetch(PDO::FETCH_ASSOC);
                    $employee['account'] = $account;
                    //omit password
                    unset($employee['account']['password']);
                    array_push($employees, $employee);
                }
                return $employees;
            }
            catch (PDOException $e) {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
                exit();
            }
        }
        public function getTotalPageAlbum() {
            $sql = "SELECT COUNT(*) AS total FROM album";
            $stmt = $this->conn->prepare($sql);
            try {
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                return ceil($result['total'] / $this->albumCount);
            } catch (PDOException $e) {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
                exit();
            }
        }
        public function getTotalPageBlog() {
            $sql = "SELECT COUNT(*) AS total FROM blog";
            $stmt = $this->conn->prepare($sql);
            try {
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                return ceil($result['total'] / $this->blogCount);
            } catch (PDOException $e) {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
                exit();
            }
        }
        public function getTotalPageCustomer() {
            $sql = "SELECT COUNT(*) AS total FROM customer";
            $stmt = $this->conn->prepare($sql);
            try {
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                return ceil($result['total'] / $this->customerCount);
            } catch (PDOException $e) {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
                exit();
            }
        }
        public function getTotalPageEmployee() {
            $sql = "SELECT COUNT(*) AS total FROM employee";
            $stmt = $this->conn->prepare($sql);
            try {
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                return ceil($result['total'] / $this->employeeCount);
            } catch (PDOException $e) {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
                exit();
            }
        }
    }
?>