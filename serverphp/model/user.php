<?php
        use Firebase\JWT\JWT;
        use Firebase\JWT\Key;
    class User {
        private $userId;
        private $email;
        private $username;
        private $password;
        private $role;
        private $conn;

        public function __construct($conn = null)
        {
            $this->conn = $conn;
        }

        public function setInformation($email, $username, $password, $role)
        {
            $this->email = $email;
            $this->username = $username;
            $this->password = $password;
            $this->role = $role;
        }

        public function register()
        {
            $query = "INSERT INTO user (email, username, password) VALUES (:username, :password)"; 
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":username", $this->username);
            $options = [
                'cost' => 12,
            ];
            $stmt->bindParam(":password",password_hash($this->password, PASSWORD_BCRYPT, $options));
            try {
                if($stmt->execute()) 
                {
                echo json_encode(["status"=>"success","message" => "create user successfully"]);
                }
            } catch(exception $e)
            {
                printf("%s\n", $e);
                echo json_encode(["status"=>"error","message" => $e]);   
            }
        }
        public function login($key,$accessTokenTlt,$refreshTokenTlt, $cookiePath, $domain)
        {
            $query = "SELECT password, id FROM user WHERE username=:username";
            // verify password and username
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam("username", $this->username);
            $stmt->execute();
            $rowCount = $stmt->rowCount();
            if($rowCount==0){
                echo json_encode(["status"=>"error", "message"=>"your username or password is not corrrect"]);
            }
            else
            {
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                $this->userId = $row["id"];
                if(password_verify($this->password, $row["password"]))
                {
                    // for access token
                    $configAccessToken = [
                        'data' => ["username" => $this->username, "userId" => $this->userId]
                    ];
                    // for refresh token
                    $configRefreshToken = [
                        'data' => ["username" => $this->username, "userId" => $this->userId]
                    ];
                    echo json_encode(["status"=>"success", "message"=>"Log in successfully"]);
                    $accessToken = JWT::encode($configAccessToken, $key, 'HS256');
                    $refreshToken = JWT::encode($configRefreshToken, $key, 'HS256');

                    // // Assume current time + one day
                    $expires = time() + $accessTokenTlt;
                    $dateTime = new DateTime();
                    // Set the timestamp
                    $dateTime->setTimestamp($expires);
                    // Set the timezone using a new DateTimeZone instance
                    $dateTime->setTimezone(new DateTimeZone('GMT'));
                    // Print the format.
                    // This format based on PHP DateTime formats - the 'e' switch adds the time zone at the end.
                    $format = 'D, d M Y H:i:s e';
                    $expiresText = $dateTime->format($format);
                    // Set the raw header with expires text (encode if needed)
                    header("Set-Cookie: accessToken=".$accessToken."; expires=$expiresText; path=".$cookiePath."; domain=".$domain."; samesite=None; Secure");

                    // // Assume current time + one day
                    $expires = time() + $refreshTokenTlt;
                    $dateTime = new DateTime();
                    // Set the timestamp
                    $dateTime->setTimestamp($expires);
                    // Set the timezone using a new DateTimeZone instance
                    $dateTime->setTimezone(new DateTimeZone('GMT'));
                    // Print the format.
                    // This format based on PHP DateTime formats - the 'e' switch adds the time zone at the end.
                    $format = 'D, d M Y H:i:s e';
                    $expiresText = $dateTime->format($format);
                    // Set the raw header with expires text (encode if needed)
                    header("Set-Cookie: refreshToken=".$refreshToken."; expires=$expiresText; path=".$cookiePath."; domain=".$domain."; samesite=None; Secure", false);

                    // setcookie("accessToken", $accessToken, time()+$accessTokenTlt, $cookiePath, $domain);
                    // setcookie("refreshToken", $refreshToken, time()+$refreshTokenTlt, $cookiePath, $domain);
                }
                else
                    echo json_encode(["status"=>"success", "message"=>"your username or password is not corrrect"]);
            }
        }
        public function load_data_from_cookie($accessTokenDecoded)
        {
            $this->userId = $accessTokenDecoded->data->userId;
            $this->username = $accessTokenDecoded->data->username;
        }
    }
?>