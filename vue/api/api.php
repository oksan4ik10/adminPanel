<?php
$htmlFiles = glob("../../*.html"); //выбор всех файлов html из корневой папки сайта 
                                  //в массив

$response=[]; 

foreach($htmlFiles as $file){
    array_push($response, basename($file)); //убираем пути к файлу и 
                                //сохраняем только имена файлов в массиве
}

echo json_encode ($response); //передаем данные клиенту в JSON-формате