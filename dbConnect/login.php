<?php
    session_start(); // Start the session

    $_SESSION['authenticated'] = false;
    require 'connect.php'; 

    if (isset($_POST['user']) && isset($_POST['pass'])){
        $user = $_POST['user'];  
        $pass = $_POST['pass'];    

        $conn = OpenCon();
        $stmt = $conn->prepare("SELECT * FROM login WHERE username = ? AND password = ?");
        $stmt->bind_param("ss", $user, $pass);
        $stmt->execute();
        $stmt->bind_result($username, $password);

        if ($stmt->fetch()) {
            echo "<script>";
            echo "console.log('User Found - Username: $username');";
            echo "</script>";
            $_SESSION['authenticated'] = true;
            header("Location: admin.php");
            exit();
        } else {
            include '../pages/login.html';
            echo "<script src='../scripts/loginError.js'></script>";
        }
        CloseCon($conn);
    } else {
        include '../pages/login.html';
    }
?>