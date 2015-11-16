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
$id = $request->user;
detalleEvento($id);

function detalleEvento($id){

    $sql ="select * from reservaciones_eventos INNER JOIN eventos ON reservaciones_eventos.evento = eventos.id and reservaciones_eventos.huesped = '$id'"; 
          $result = array();

    try {
        $db = getConnection();
        $stmt = $db->query($sql);  
        while($row = $stmt->fetchObject()){
          $result[] = $row;
        }
    
        $db = null;

        echo  json_encode($result);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
}

?>
