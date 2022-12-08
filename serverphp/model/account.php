<?php
    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;
    include_once __DIR__ . '/../utils/jwt_functions.php';
    class Account {
        private $id;
        private $email;
        private $username;
        private $password;
        private $avt = 'https://preview.redd.it/jzowkv34ujz81.gif?format=png8&s=8ab0338eb9b1443603e85a5642af20c534f1dd0c';
        private $role;
        private $conn;

        public function __construct($conn = null)
        {
            $this->conn = $conn;
        }

        public function setInformation($email, $username, $password=null,$role,$avt = 'https://preview.redd.it/jzowkv34ujz81.gif?format=png8&s=8ab0338eb9b1443603e85a5642af20c534f1dd0c',$id = 0)
        {
            $this->email = $email;
            $this->username = $username;
            $this->password = $password;
            $this->role = $role;
            $this->avt = $avt;
            $this->id = $id;
        }
        public function getInformation()
        {
            return [
                'id' => $this->id,
                'email' => $this->email,
                'username' => $this->username,
                'password' => $this->password,
                'avt' => $this->avt,
                'role' => $this->role,
            ];
        }
        public function register()
        {
            // check if email exist 
            $sql = "SELECT email FROM account WHERE email = :email";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':email', $this->email);
            try {
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                if ($result) {
                    echo json_encode(['status' => 'error', 'data' => ['msg' => 'Email already exist']]);
                    exit();
                }
            }
            catch (PDOException $e) {
                echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
                exit();
            }
            $insertSql = "SELECT insert_account(:email,:password,:avt,:username,:role)";
            $stmt = $this->conn->prepare($insertSql);
            $stmt->bindParam(':email', $this->email);
            $stmt->bindParam(':username', $this->username);
            // hash password
            $hash = password_hash($this->password, PASSWORD_DEFAULT);
            $stmt->bindParam(':password', $hash);
            $stmt->bindParam(':avt', $this->avt);
            $stmt->bindParam(':role', $this->role);
            try {
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                if ($result) {
                    return true;
                }
                else {
                    echo json_encode(['status' => 'error', 'data' => ['msg' => 'Register failed']]);
                    exit();
                }
            }
            catch (PDOException $e) {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
                exit();
            }
        }
        public function login($email, $password)
        {
            // find user by email
            $sql = "SELECT * FROM account WHERE email = :email";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':email', $email);
            try {
                $stmt->execute();
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                if($user)
                {
                    // check password
                    if(password_verify($password, $user['password']))
                    {
                        // create token
                        $jwt = new jwt_functions();
                        //exclude password from token
                        unset($user['password']);
                        $token = $jwt->createToken($user);
                        return $token;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }
            catch (PDOException $e) {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
                exit();
            }
        }
        public function setAvatar($avt) {
            $this->avt = $avt;
            $this->updateAvatar();
        }
        public function updateAvatar() {
            $sql = "UPDATE account SET avatar = :avt WHERE email = :email";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':avt', $this->avt);
            $stmt->bindParam(':email', $this->email);
            try {
                $stmt->execute();
                return true;
            } catch (PDOException $e) {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
                exit();
            }
        }
        public function deleteAccount($id) {
            $sql = "SELECT `delete_account`(:id) as `delete_account`";
            $deleteQuery = $this->conn->prepare($sql);
            $deleteQuery->bindParam(':id', $id);
            try {
                $sql = "SELECT * FROM write_review WHERE customer_id = :id";
                $stmt = $this->conn->prepare($sql);
                $stmt->bindParam(':id', $id);
                $stmt->execute();
                $writeReviews = $stmt->fetchAll(PDO::FETCH_ASSOC);
                foreach($writeReviews as $writeReview) {
                    $sql = "DELETE FROM review WHERE review_id = :id";
                    $stmt = $this->conn->prepare($sql);
                    $stmt->bindParam(':id', $writeReview['review_id']);
                    $stmt->execute();
                }
                $deleteQuery->execute();
                $result = $deleteQuery->fetch(PDO::FETCH_ASSOC);
                return $result['delete_account'];
            } catch (PDOException $e) {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
                exit();
            }
        }
        public function updateAccount($id, $email, $password, $avatar, $username, $role) {
            $this->email = $email;
            // hash password
            $hash = password_hash($password, PASSWORD_DEFAULT);
            $sql = "SELECT `update_account`(:id, :email, :password, :avatar, :username, :role) as `update_account`";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':password', $hash);
            $stmt->bindParam(':avatar', $avatar);
            $stmt->bindParam(':username', $username);
            $stmt->bindParam(':role', $role);
            try {
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                return $result['update_account'];
            } catch (PDOException $e) {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
                exit();
            }
        }
        public function updateCustomerState($id, $state) {
            $sql = "SELECT `update_customer`(:id, :state) as `update_customer`";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':state', $state);
            try {
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                return $result['update_customer'];
            } catch (PDOException $e) {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
                exit();
            }
        }
        public function updateEmployeeState($id, $state) {
            $sql = "SELECT `update_employee`(:id, :state) as `update_employee`";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':state', $state);
            try {
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                return $result['update_employee'];
            } catch (PDOException $e) {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
                exit();
            }
        }
        public function updatePassword($oldPassword, $newPassword) {
            $sql = "SELECT * FROM account WHERE user_id = :user_id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':user_id', $this->id);
            try {
                $stmt->execute();
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                if($user)
                {
                    // check password
                    if(password_verify($oldPassword, $user['password']))
                    {
                        // hash password
                        $hash = password_hash($newPassword, PASSWORD_DEFAULT);
                        $sql = "UPDATE account SET password = :password WHERE user_id = :user_id";
                        $stmt = $this->conn->prepare($sql);
                        $stmt->bindParam(':password', $hash);
                        $stmt->bindParam(':user_id', $this->id);
                        try {
                            $stmt->execute();
                            return true;
                        } catch (PDOException $e) {
                            echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
                            exit();
                        }
                    }
                    else {
                        echo json_encode(['status'=>'error', 'data'=>['msg'=>'Old password is incorrect']]);
                        exit();
                    }
                }
                else {
                    echo json_encode(['status'=>'error', 'data'=>['msg'=>'User not found']]);
                    exit();
                }
            }
            catch (PDOException $e) {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
                exit();
            }
        }
        public function updateUsername($username) {
            $this->username = $username;
            $sql = "UPDATE account SET username = :username WHERE user_id = :user_id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':username', $this->username);
            $stmt->bindParam(':user_id', $this->id);
            try {
                $stmt->execute();
                return true;
            } catch (PDOException $e) {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
                exit();
            }
        }
        public function getState() {
            if($this->role == 'admin') {
                return 'admin';
            }
            else if($this->role == 'employee') {
                $sql = "SELECT state FROM employee WHERE employee_id = :user_id";
                $stmt = $this->conn->prepare($sql);
                $stmt->bindParam(':user_id', $this->id);
                try {
                    $stmt->execute();
                    $result = $stmt->fetch(PDO::FETCH_ASSOC);
                    return $result['state'];
                } catch (PDOException $e) {
                    echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
                    exit();
                }
            }
            else if($this->role == 'customer') {
                $sql = "SELECT state FROM customer WHERE customer_id = :user_id";
                $stmt = $this->conn->prepare($sql);
                $stmt->bindParam(':user_id', $this->id);
                try {
                    $stmt->execute();
                    $result = $stmt->fetch(PDO::FETCH_ASSOC);
                    return $result['state'];
                } catch (PDOException $e) {
                    echo json_encode(['status'=>'error', 'data'=>['msg'=>$e->getMessage()]]);
                    exit();
                }
            }
            else {
                echo json_encode(['status'=>'error', 'data'=>['msg'=>'User not found']]);
                exit();
            }
        }
    }
?>