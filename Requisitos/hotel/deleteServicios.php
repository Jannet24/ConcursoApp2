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

$reservacion    = $request->reservacion; 
//$contrasena = $request->contrasena;

deleteEventos($reservacion);

function deleteEventos($reservacion ){
    $sql="delete from reservaciones_servicios where id = '$reservacion'";
    try {
        $db = getConnection();
        $stmt = $db->query($sql);  
        $db = null;
        echo  json_encode("Registro eliminado");
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
}
?>