<?php 
    require 'connect.php'; 
    include '../pages/admin.html';
    session_start();
    if ($_SESSION['authenticated'] == false){
        header("Location: login.php");
        exit();
    }

    if (isset($_POST['textsms']) && isset($_POST['note'])){
        $testsms = $_POST['textsms'];  
        $note = $_POST['note'];
        
        // Getting the current time in Germany
        $germanyTimeZone = new DateTimeZone('Europe/Berlin');
        $germanyTime = new DateTime('now', $germanyTimeZone);
        $timestamp = $germanyTime->format('Y-m-d H:i:s');

        $conn = OpenCon();
        $stmt = $conn->prepare("INSERT INTO UploadedFiles (TextMessage, Timestamp, Note) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $testsms, $timestamp, $note);

        if ($stmt->execute()) {
            echo "<script src='../scripts/uploadSuccess.js'></script>";
        } else {
            echo "Error: " . $stmt->error;
        }
        CloseCon($conn);
    }
?>
