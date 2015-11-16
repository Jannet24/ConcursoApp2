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

consultarEventos();

function consultarEventos(){
    $sql ="SELECT * FROM eventos"; 
    $resultado = array();
    try {
        $db = getConnection();
        $stmt = $db->query($sql);  
        while($row = $stmt->fetchObject()) {
            $resultado[] = $row;
        }
        $db = null;
        echo  json_encode($resultado);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }

}

?>