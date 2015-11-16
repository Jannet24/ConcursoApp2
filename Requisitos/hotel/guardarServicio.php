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
$huesped    = $request->user;
$reser = $request->reservacion;
$fecha      = $request->dia; 
$hora      = $request->hora; 
guardarReservacion($huesped,$reser,$fecha,$hora);
//SELECT * FROM servicios INNER JOIN `reservaciones_servicios` ON reservaciones_servicios.reservacion =servicios.id AND reservaciones_servicios.huesped = 2
function guardarReservacion($huesped,$reser,$fecha,$hora){
    $sqlExiste = "select * from servicios INNER JOIN reservaciones_servicios 
    ON reservaciones_servicios.reservacion = servicios.id 
    AND reservaciones_servicios.huesped = '$huesped' AND reservaciones_servicios.fecha = '$fecha' 
    AND reservaciones_servicios.hora = '$hora'";
    $resultado;
    $sql ="INSERT INTO reservaciones_servicios (id, huesped, reservacion,fecha,hora) VALUES (NULL, '$huesped', '$reser','$fecha','$hora')"; 
    try {
        $db = getConnection();
        $stmt = $db->query($sqlExiste);  
        if($row = $stmt->fetchObject()) {
            $resultado = False;
        }
        else{
            $stmt = $db->query($sql);
            $resultado = True;
        }
        $db = null;
        echo  json_encode($resultado);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }

}

?>