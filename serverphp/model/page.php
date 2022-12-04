<?php 
    include_once __DIR__ .'/../global/index.php';
    class Page {
        private $id;
        private $albumCount = 8;
        private $blogCount = 4;
        private $customerCount = 6;
        private $employeeCount = 6;
        private $transactionCount = 10;
        private $artistCount = 6;
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
                    $compose = $stmt->fetch(PDO::FETCH_ASSOC);
                    $artist_id = $compose['artist_id'];
                    $sql = "SELECT * FROM artist WHERE artist_id = :id";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindParam(':id', $artist_id);
                    $stmt->execute();
                    $artist = $stmt->fetch(PDO::FETCH_ASSOC);
                    $album['artist_id'] = $artist['artist_id'];
                    $album['artistName'] = $artist['name'];
                    $album['artistAvatar'] = $artist['avatar'];
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
        public function getAlbumByPageIdAndType($id,$albumCount,$type) {
            $this->albumCount = $albumCount;
            $offset = ($id-1) * $this->albumCount;
            $sql = "SELECT * FROM `album` WHERE album_type = :type LIMIT $offset, $this->albumCount";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':type', $type);
            try {
                $albums = [];
                $stmt->execute();
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                foreach($result as $album) {
                    $sql = "SELECT * FROM compose WHERE album_id = :id";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindParam(':id', $album['album_id']);
                    $stmt->execute();
                    $compose = $stmt->fetch(PDO::FETCH_ASSOC);
                    $artist_id = $compose['artist_id'];
                    $sql = "SELECT * FROM artist WHERE artist_id = :id";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindParam(':id', $artist_id);
                    $stmt->execute();
                    $artist = $stmt->fetch(PDO::FETCH_ASSOC);
                    $album['artist_id'] = $artist['artist_id'];
                    $album['artistName'] = $artist['name'];
                    $album['artistAvatar'] = $artist['avatar'];
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
                // total page 
                $sql = "SELECT COUNT(*) FROM `album` WHERE album_type = :type";
                $stmt = $this->conn->prepare($sql);
                $stmt->bindParam(':type', $type);
                $stmt->execute();
                $total = $stmt->fetchColumn();
                $totalPage = ceil($total/$this->albumCount);
                return ['albums'=>$albums, 'totalPage'=>$totalPage];
            }
            catch (PDOException $e) {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
                exit();
            }
        }
        public function getAlbumByPageIdAndArtist($id,$albumCount,$artistId) {
            $this->albumCount = $albumCount;
            $offset = ($id-1) * $this->albumCount;
            $sql = "SELECT * FROM `album` WHERE album_id IN (SELECT album_id FROM compose WHERE artist_id = :artist_id) LIMIT $offset, $this->albumCount";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':artist_id', $artistId);
            try {
                $albums = [];
                $stmt->execute();
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                foreach($result as $album) {
                    $sql = "SELECT * FROM compose WHERE album_id = :id";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindParam(':id', $album['album_id']);
                    $stmt->execute();
                    $compose = $stmt->fetch(PDO::FETCH_ASSOC);
                    $artist_id = $compose['artist_id'];
                    $sql = "SELECT * FROM artist WHERE artist_id = :id";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindParam(':id', $artist_id);
                    $stmt->execute();
                    $artist = $stmt->fetch(PDO::FETCH_ASSOC);
                    $album['artist_id'] = $artist['artist_id'];
                    $album['artistName'] = $artist['name'];
                    $album['artistAvatar'] = $artist['avatar'];
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
                // total page
                $sql = "SELECT COUNT(*) FROM `album` WHERE album_id IN (SELECT album_id FROM compose WHERE artist_id = :artist_id)";
                $stmt = $this->conn->prepare($sql);
                $stmt->bindParam(':artist_id', $artistId);
                $stmt->execute();
                $total = $stmt->fetchColumn();
                $totalPage = ceil($total/$this->albumCount);
                return ['albums'=>$albums, 'totalPage'=>$totalPage];
            }
            catch (PDOException $e) {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
                exit();
            }
        }
        public function getAlbumByPageIdAndTitle($id,$albumCount,$title) {
            $this->albumCount = $albumCount;
            $offset = ($id-1) * $this->albumCount;
            $sql = "SELECT * FROM `album` WHERE title LIKE :title LIMIT $offset, $this->albumCount";
            $stmt = $this->conn->prepare($sql);
            $title = "%$title%";
            $stmt->bindParam(':title', $title);
            try {
                $albums = [];
                $stmt->execute();
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                foreach($result as $album) {
                    $sql = "SELECT * FROM compose WHERE album_id = :id";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindParam(':id', $album['album_id']);
                    $stmt->execute();
                    $compose = $stmt->fetch(PDO::FETCH_ASSOC);
                    $artist_id = $compose['artist_id'];
                    $sql = "SELECT * FROM artist WHERE artist_id = :id";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindParam(':id', $artist_id);
                    $stmt->execute();
                    $artist = $stmt->fetch(PDO::FETCH_ASSOC);
                    $album['artist_id'] = $artist['artist_id'];
                    $album['artistName'] = $artist['name'];
                    $album['artistAvatar'] = $artist['avatar'];
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
                // total page
                $sql = "SELECT COUNT(*) FROM `album` WHERE title LIKE :title";
                $stmt = $this->conn->prepare($sql);
                $title = "%$title%";
                $stmt->bindParam(':title', $title);
                $stmt->execute();
                $total = $stmt->fetchColumn();
                $totalPage = ceil($total/$this->albumCount);
                return ['albums'=>$albums, 'totalPage'=>$totalPage];
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
                    $write_blog = $stmt->fetch(PDO::FETCH_ASSOC);
                    $employeeId = $write_blog['employee_id'];
                    $sql = "SELECT * FROM account WHERE user_id = :id";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindParam(':id', $employeeId);
                    $stmt->execute();
                    $employee = $stmt->fetch(PDO::FETCH_ASSOC);
                    $blog['date'] = $write_blog['date'];
                    $blog['time'] = $write_blog['time'];
                    $blog['employeeName'] = $employee['username'];
                    $blog['employeeAvatar'] = $employee['avatar'];
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
            $sql = "SELECT * FROM account WHERE role = 'customer' LIMIT $offset, $this->customerCount";
            $stmt = $this->conn->prepare($sql);
            try {
                $customers = [];
                $stmt->execute();
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                foreach($result as $customer) {
                    $sql = "SELECT * FROM customer WHERE customer_id = :id";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindParam(':id', $customer['user_id']);
                    $stmt->execute();
                    $stateQuery = $stmt->fetch(PDO::FETCH_ASSOC);
                    $customer['state'] = $stateQuery['state'];
                    unset($customer['password']);
                    $sql = "SELECT * FROM user WHERE user_id = :id";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindParam(':id', $customer['user_id']);
                    $stmt->execute();
                    $info = $stmt->fetch(PDO::FETCH_ASSOC);
                    $customer['information'] = $info;
                    // unset
                    unset($customer['information']['user_id']);
                    array_push($customers, $customer);
                }
                return $customers;
            }
            catch (PDOException $e) {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
                exit();
            }
        }
        public function getCustomerByPageIdAndName($id,$customerCount,$username) {
            $this->customerCount = $customerCount;
            $offset = ($id-1) * $this->customerCount;
            $sql = "SELECT * FROM account WHERE username LIKE :username AND role = :role LIMIT $offset, $this->customerCount";
            $stmt = $this->conn->prepare($sql);
            $username = "%$username%";
            $role = "customer";
            $stmt->bindParam(':username', $username);
            $stmt->bindParam(':role', $role);
            try {
                $result = [];
                $stmt->execute();
                $customers = $stmt->fetchAll(PDO::FETCH_ASSOC);
                foreach($customers as $customer) {
                    $sql = "SELECT * FROM customer WHERE customer_id = :id";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindParam(':id', $customer['user_id']);
                    $stmt->execute();
                    $stateQuery = $stmt->fetch(PDO::FETCH_ASSOC);
                    $customer['state'] = $stateQuery['state'];
                    unset($customer['password']);
                    $sql = "SELECT * FROM user WHERE user_id = :id";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindParam(':id', $customer['user_id']);
                    $stmt->execute();
                    $user = $stmt->fetch(PDO::FETCH_ASSOC);
                    $customer['information'] = $user;
                    unset($customer['information']['user_id']);
                    array_push($result, $customer);
                }
                // total page
                $sql = "SELECT COUNT(*) FROM `account` WHERE username LIKE :username AND role = :role";
                $stmt = $this->conn->prepare($sql);
                $username = "%$username%";
                $stmt->bindParam(':username', $username);
                $stmt->bindParam(':role', $role);
                $stmt->execute();
                $total = $stmt->fetchColumn();
                $totalPage = ceil($total/$this->customerCount);
                return ['customers'=>$result, 'totalPage'=>$totalPage];
            }
            catch (PDOException $e) {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
                exit();
            }
        }
        public function getEmployeeByPageId($id,$employeeCount) {
            $this->employeeCount = $employeeCount;
            $offset = ($id-1) * $this->employeeCount;
            $sql = "SELECT * FROM account WHERE role = 'employee' LIMIT $offset, $this->employeeCount";
            $stmt = $this->conn->prepare($sql);
            try {
                $employees = [];
                $stmt->execute();
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                foreach($result as $employee) {
                    $sql = "SELECT * FROM employee WHERE employee_id = :id";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindParam(':id', $employee['user_id']);
                    $stmt->execute();
                    $stateQuery = $stmt->fetch(PDO::FETCH_ASSOC);
                    $employee['state'] = $stateQuery['state'];
                    unset($employee['password']);
                    $sql = "SELECT * FROM user WHERE user_id = :id";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindParam(':id', $employee['user_id']);
                    $stmt->execute();
                    $info = $stmt->fetch(PDO::FETCH_ASSOC);
                    $employee['information'] = $info;
                    // unset
                    unset($employee['information']['user_id']);
                    array_push($employees, $employee);
                }
                return $employees;
            }
            catch (PDOException $e) {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
                exit();
            }
            catch (PDOException $e) {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
                exit();
            }
        }
        public function getEmployeeByPageIdAndName($id,$employeeCount,$username) {
            $this->employeeCount = $employeeCount;
            $offset = ($id-1) * $this->employeeCount;
            $sql = "SELECT * FROM account WHERE username LIKE :username AND role = :role LIMIT $offset, $this->employeeCount";
            $stmt = $this->conn->prepare($sql);
            $username = "%$username%";
            $role = "employee";
            $stmt->bindParam(':username', $username);
            $stmt->bindParam(':role', $role);
            try {
                $result = [];
                $stmt->execute();
                $employees = $stmt->fetchAll(PDO::FETCH_ASSOC);
                foreach($employees as $employee) {
                    $sql = "SELECT * FROM employee WHERE employee_id = :id";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindParam(':id', $employee['user_id']);
                    $stmt->execute();
                    $stateQuery = $stmt->fetch(PDO::FETCH_ASSOC);
                    $employee['state'] = $stateQuery['state'];
                    unset($employee['password']);
                    $sql = "SELECT * FROM user WHERE user_id = :id";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindParam(':id', $employee['user_id']);
                    $stmt->execute();
                    $user = $stmt->fetch(PDO::FETCH_ASSOC);
                    $employee['information'] = $user;
                    unset($employee['information']['user_id']);
                    array_push($result, $employee);
                }
                // total page
                $sql = "SELECT COUNT(*) FROM `account` WHERE username LIKE :username AND role = :role";
                $stmt = $this->conn->prepare($sql);
                $username = "%$username%";
                $stmt->bindParam(':username', $username);
                $stmt->bindParam(':role', $role);
                $stmt->execute();
                $total = $stmt->fetchColumn();
                $totalPage = ceil($total/$this->employeeCount);
                return ['employees'=>$result, 'totalPage'=>$totalPage];
            }
            catch (PDOException $e) {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
                exit();
            }
        }
        public function getTransactionByPageId($id,$transactionCount) {
            $this->transactionCount = $transactionCount;
            $offset = ($id-1) * $this->transactionCount;
            $sql = "SELECT * FROM `transaction` LIMIT $offset, $this->transactionCount";
            $stmt = $this->conn->prepare($sql);
            try {
                $transactions = [];
                $stmt->execute();
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                foreach($result as $transaction) {
                    if($transaction['type_of_shipping'] === 'shipping' || $transaction['type_of_shipping'] === 'Shipping' ) {
                        $sql = "SELECT * FROM shipping WHERE transaction_id = :id";
                        $stmt = $this->conn->prepare($sql);
                        $stmt->bindParam(':id', $transaction['transaction_id']);
                        $stmt->execute();
                        $shipping = $stmt->fetch(PDO::FETCH_ASSOC);
                        $transaction['shipping'] = $shipping;
                        unset($transaction['shipping']['transaction_id']);
                    }
                    else if($transaction['type_of_shipping'] === 'pick_up' || $transaction['type_of_shipping'] === 'Pick_up' ) {
                        $sql = "SELECT * FROM pick_up_at_store WHERE transaction_id = :id";
                        $stmt = $this->conn->prepare($sql);
                        $stmt->bindParam(':id', $transaction['transaction_id']);
                        $stmt->execute();
                        $pickup = $stmt->fetch(PDO::FETCH_ASSOC);
                        $sql = "SELECT * FROM account WHERE user_id = :id";
                        $stmt = $this->conn->prepare($sql);
                        $stmt->bindParam(':id', $pickup['employee_id']);
                        $stmt->execute();
                        $employee = $stmt->fetch(PDO::FETCH_ASSOC);
                        $transaction['employee'] = $employee;
                        unset($transaction['employee']['password']);
                    }
                    $sql = "SELECT * FROM account WHERE user_id = :id";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindParam(':id', $transaction['customer_id']);
                    $stmt->execute();
                    $account = $stmt->fetch(PDO::FETCH_ASSOC);
                    if($account['role'] === 'admin') {
                        $transaction['customer'] = false;
                    }
                    else {
                        $transaction['customer'] = $account;
                        unset($transaction['customer']['password']);
                    }
                    array_push($transactions, $transaction);
                }
                return $transactions;
            }
            catch (PDOException $e) {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
                exit();
            }
        }
        public function getTransactionByUserId($id,$userId,$transactionCount) {
            $this->transactionCount = $transactionCount;
            $offset = ($id-1) * $this->transactionCount;
            $sql = "SELECT * FROM `transaction` WHERE customer_id = :id LIMIT $offset, $this->transactionCount";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $userId);
            try {
                $transactions = [];
                $stmt->execute();
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                foreach($result as $transaction) {
                    if($transaction['type_of_shipping'] === 'shipping' || $transaction['type_of_shipping'] === 'Shipping' ) {
                        $sql = "SELECT * FROM shipping WHERE transaction_id = :id";
                        $stmt = $this->conn->prepare($sql);
                        $stmt->bindParam(':id', $transaction['transaction_id']);
                        $stmt->execute();
                        $shipping = $stmt->fetch(PDO::FETCH_ASSOC);
                        $transaction['shipping'] = $shipping;
                        unset($transaction['shipping']['transaction_id']);
                    }
                    else if($transaction['type_of_shipping'] === 'pick_up' || $transaction['type_of_shipping'] === 'Pick_up' ) {
                        $sql = "SELECT * FROM pick_up_at_store WHERE transaction_id = :id";
                        $stmt = $this->conn->prepare($sql);
                        $stmt->bindParam(':id', $transaction['transaction_id']);
                        $stmt->execute();
                        $pickup = $stmt->fetch(PDO::FETCH_ASSOC);
                        $sql = "SELECT * FROM account WHERE user_id = :id";
                        $stmt = $this->conn->prepare($sql);
                        $stmt->bindParam(':id', $pickup['employee_id']);
                        $stmt->execute();
                        $employee = $stmt->fetch(PDO::FETCH_ASSOC);
                        $transaction['employee'] = $employee;
                        unset($transaction['employee']['password']);
                    }
                    $sql = "SELECT * FROM account WHERE user_id = :id";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindParam(':id', $transaction['customer_id']);
                    $stmt->execute();
                    $account = $stmt->fetch(PDO::FETCH_ASSOC);
                    if($account['role'] === 'admin') {
                        $transaction['customer'] = false;
                    }
                    else {
                        $transaction['customer'] = $account;
                        unset($transaction['customer']['password']);
                    }
                    array_push($transactions, $transaction);
                }
                //total page
                $sql = "SELECT COUNT(*) FROM `transaction` WHERE customer_id = :id";
                $stmt = $this->conn->prepare($sql);
                $stmt->bindParam(':id', $userId);
                $stmt->execute();
                $total = $stmt->fetch(PDO::FETCH_ASSOC);
                $totalPage = ceil($total['COUNT(*)'] / $this->transactionCount);
                return ['transactions'=>$transactions, 'totalPage'=>$totalPage];
            }
            catch (PDOException $e) {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
                exit();
            }
        }
        public function getArtistByPageId($id, $artistCount) {
            $this->artistCount = $artistCount;
            $offset = ($id-1) * $this->artistCount;
            $sql = "SELECT * FROM `artist` LIMIT $offset, $this->artistCount";
            $stmt = $this->conn->prepare($sql);
            try {
                $stmt->execute();
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                return $result;
            }
            catch (PDOException $e) {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
                exit();
            }
        }
        public function getTotalPageAlbum($albumCount) {
            $this->albumCount = $albumCount;
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
        public function getTotalPageBlog($blogCount) {
            $this->blogCount = $blogCount;
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
        public function getTotalPageCustomer($customerCount) {
            $this->customerCount = $customerCount;
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
        public function getTotalPageEmployee($employeeCount) {
            $this->employeeCount = $employeeCount;
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
        public function getTotalPageTransaction($transactionCount) {
            $this->transactionCount = $transactionCount;
            $sql = "SELECT COUNT(*) AS total FROM transaction";
            $stmt = $this->conn->prepare($sql);
            try {
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                return ceil($result['total'] / $this->transactionCount);
            } catch (PDOException $e) {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
                exit();
            }
        }
        public function getTotalPageArtist($artistCount) {
            $this->artistCount = $artistCount;
            $sql = "SELECT COUNT(*) AS total FROM artist";
            $stmt = $this->conn->prepare($sql);
            try {
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                return ceil($result['total'] / $this->artistCount);
            } catch (PDOException $e) {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
                exit();
            }
        }
    }
?>