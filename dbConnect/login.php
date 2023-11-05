

<?php
    session_start(); 
    require 'connect.php'; 

    if (isset($_POST['user']) && isset($_POST['pass'])){
        $user=$_POST['user'];  
        $pass=$_POST['pass'];    

        $conn = OpenCon();
        $sql = "SELECT * FROM login WHERE username='$user' AND password = '$pass'";
        $stmt = $conn->prepare("SELECT * FROM login WHERE username = ? AND password = ?");
        $stmt->bind_param("ss", $user, $pass);
        $stmt->execute();
        $stmt->bind_result($username, $password);

        if ($stmt->fetch()) {
            echo "<script>";
            echo "console.log('User Found - Username: $username');";
            echo "</script>";
        } else {
            include '../pages/login.html';
            echo "<script src='../scripts/loginError.js'></script>";
        }
        CloseCon($conn);
    }else{
        include '../pages/login.html';
    }
?>
