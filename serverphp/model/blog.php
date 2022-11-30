<?php 
    class Blog {
        private $topic;
        private $headline;
        private $content;
        private $employeeId;
        private $avatar;
        private $conn;

        public function __construct($conn = null) {
            $this->conn = $conn;
        }

        public function setInformation($topic, $headline, $content, $employeeId, $avatar = '') {
            $this->topic = $topic;
            $this->headline = $headline;
            $this->content = $content;
            $this->employeeId = $employeeId;    
            $this->avatar = $avatar;
        }
        public function blogsCount() {
            $sql = "SELECT COUNT(*) FROM blog";
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
        public function create() {
            $sql = "SELECT `insert_blog`(:topic,:headline,:content,:employeeId,:avatar) AS `insert_blog`";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':topic', $this->topic);
            $stmt->bindParam(':headline', $this->headline);
            $stmt->bindParam(':content', $this->content);
            $stmt->bindParam(':employeeId', $this->employeeId);
            $stmt->bindParam(':avatar', $this->avatar);
            try {
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                return $result['insert_blog'];
            }
            catch (PDOException $e) {
                echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
                exit();
            }
        }
        public function setAvatar($avatar) {
            $this->avatar = $avatar;
            $this->updateAvatar();
        }
        public function updateAvatar() {
            $sql = "UPDATE blog SET avatar = :avatar WHERE headline = :headline";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':avatar', $this->avatar);
            $stmt->bindParam(':headline', $this->headline);
            try {
                $stmt->execute();
                return true;
            }
            catch (PDOException $e) {
                echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
                exit();
            }
        }
        public function getBlogById($id) {
            $sql = "SELECT * FROM blog WHERE blog_id = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id);
            try {
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                $sql = "SELECT * FROM write_blog WHERE blog_id = :id";
                $stmt = $this->conn->prepare($sql);
                $stmt->bindParam(':id', $result['blog_id']);
                $stmt->execute();
                $write_blog = $stmt->fetch(PDO::FETCH_ASSOC);
                $sql = "SELECT * FROM account WHERE user_id = :id";
                $stmt = $this->conn->prepare($sql);
                $stmt->bindParam(':id', $write_blog['employee_id']);
                $stmt->execute();
                $employee = $stmt->fetch(PDO::FETCH_ASSOC);
                $result['employee'] = $employee;
                return $result;
            }
            catch (PDOException $e) {
                echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
                exit();
            }
        }
        public function updateBlog($id, $topic, $headline, $content) {
            $sql = "SELECT `update_blog`(:id,:topic,:headline,:content) AS `update_blog`";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id);
            $stmt->bindParam(':topic', $topic);
            $stmt->bindParam(':headline', $headline);
            $stmt->bindParam(':content', $content);
            try {
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                return $result['update_blog'];
            }
            catch (PDOException $e) {
                echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
                exit();
            }
        }
        public function deleteBlog($id) {
            $sql = "SELECT `delete_blog`(:id) AS `delete_blog`";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id);
            try {
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                return $result['delete_blog'];
            }
            catch (PDOException $e) {
                echo json_encode(['status' => 'error', 'data' => ['msg' => $e->getMessage()]]);
                exit();
            }
        }
    }
?>