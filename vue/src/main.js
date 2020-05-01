const $ = require("jquery");


function getPageList(){
    $("h1").remove();
    //подключение к серверу
        $.get("api/api.php", (data) => {
            
            //создаем из данных с сервера заголовки h1 на странице
            data.forEach(element => {
                $("body").append("<h1>" + element + "</h1>"); 
                
            });
            
        }, "JSON"); //полученные данные с сервера распознаем в формате JSON

}

getPageList()

//обработчик по нажатию на кнопку
$("button").click(() =>{
    //отправляем данные на сервер из поля value
    $.post("api/createNewPage.php", {
        "name":$("input").val()
    }, (data) =>{
        getPageList() //когда сервер вернул данные создаем html-заголовки заново
        
    })
    //если сервер отправляет ошибку
    .fail(() =>{
        alert("Файл уже существует")
    })

})
