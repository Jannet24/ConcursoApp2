<?php

require 'connector.php';
// TOMAMOS NUESTRO JSON RECIBIDO DESDE LA PETICION DE ANGULAR JS Y LO LEEMOS

$JSON       = file_get_contents("php://input");
$request    = json_decode($JSON);

consultarServicios();

function consultarServicios(){
    $sql ="SELECT * FROM servicios"; 
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