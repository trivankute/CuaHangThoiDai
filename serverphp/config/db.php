<?php
class db{
    private $servername = "localhost";
    private $username = "root";
    private $password = "";
    private $db_name = "quiz";

    public function connect(){
        $this->conn = null;
        try {
          $this->conn = new PDO("mysql:host=".$this->servername.";dbname=" .$this->db_name."", $this->username, $this->password);
          // set the PDO error mode to exception
          $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
          printf("%s\n", "Connected successfully") ;
          return $this->conn;
        } catch(PDOException $e) {
          printf("%s\n", "Connection failed: " . $e->getMessage()) ;
        }
    }
}
?>

