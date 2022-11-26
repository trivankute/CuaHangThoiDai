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

        public function setInformation($email, $username, $password,$role,$avt = 'https://preview.redd.it/jzowkv34ujz81.gif?format=png8&s=8ab0338eb9b1443603e85a5642af20c534f1dd0c')
        {
            $this->email = $email;
            $this->username = $username;
            $this->password = $password;
            $this->role = $role;
            $this->avt = $avt;
        }
        public function getInformation()
        {
            return [
                'email' => $this->email,
                'username' => $this->username,
                'password' => $this->password,
                'avt' => $this->avt,
                'role' => $this->role,
            ];
        }
        public function register()
        {
            //SELECT insert_account('giaphong@a.com','123124','','gia Phong','admin');
            $sql = "SELECT insert_account(:email,:password,:avt,:username,:role)";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':email', $this->email);
            $stmt->bindParam(':username', $this->username);
            // hash password
            $hash = password_hash($this->password, PASSWORD_DEFAULT);
            $stmt->bindParam(':password', $hash);
            $stmt->bindParam(':avt', $this->avt);
            $stmt->bindParam(':role', $this->role);
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
    }
?>