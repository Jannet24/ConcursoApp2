<?php
//header('Access-Control-Allow-Origin: *');
//header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");  
/*****************************/
/***DESARROLLO HIDROCALIDO****/
/*****************************/
require 'connector.php';
// TOMAMOS NUESTRO JSON RECIBIDO DESDE LA PETICION DE ANGULAR JS Y LO LEEMOS

$JSON       = file_get_contents("php://input");
$request    = json_decode($JSON);
$id = $request->id;
detalleEvento($id);

function detalleEvento($id){

    $sql ="SELECT * FROM eventos where id ='$id'"; 
    try {
        $db = getConnection();
        $stmt = $db->query($sql);  
        $evento = $stmt->fetchObject();
        $db = null;
        echo  json_encode($evento);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
}

?>
