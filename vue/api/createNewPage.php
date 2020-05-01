<?php
$newFile = "../../". $_POST['name'].".html"; //получаем данные с клиента

if (file_exists($newFile)){
    header("HTTP/1.0 400 Bad Request"); //если файл существует, то отправляем ошибку клиенту

} else {
    fopen($newFile,"w");//если файл не существует, то создаем его
}