<?php

require 'connector.php';
// TOMAMOS NUESTRO JSON RECIBIDO DESDE LA PETICION DE ANGULAR JS Y LO LEEMOS

$JSON       = file_get_contents("php://input");
$request    = json_decode($JSON);
$huesped    = $request->user;
consultarServicios($huesped);

function consultarServicios($huesped){
    $sql = "select reservaciones_servicios.fecha, reservaciones_servicios.hora from reservaciones_servicios INNER JOIN servicios 
    ON reservaciones_servicios.reservacion = servicios.id 
    AND reservaciones_servicios.huesped = '$huesped'";
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