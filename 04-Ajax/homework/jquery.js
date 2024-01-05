let url = "http://localhost:5000/amigos/";


$("#boton").click(function(){
    $("#lista").text("")
    $("#amigo").text("")
    $("#success").text("");

    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: function(datos){
            for(let amigo of datos){
                $("#lista").append($(`<li>${amigo.name}</li>`))
            }
            $("h2").text("");
            $("img").attr("src", "")
        },
        error : function(xhr, status, error){
            console.error('Error en la solicitud GET');
            console.error('Estado:', status);
            console.error('Error:', error);
        }
    })
})

$("#search").click(function(){
    $("#success").text("");
    $.ajax({
        method: "GET",
        url: url + $("#input").val(),
        dataType: "json",
        success: function(datos){
            $("#amigo").text(datos.name);
            $("#input").val("")
        },
        error: function(x, status, error){
            $("#amigo").text("No existe ese amigo");
            $("#input").val("")
        }
    })
})

$("#delete").click(function(){
    $("#amigo").text("")
    $.ajax({
        method: "DELETE",
        url: url + $("#inputDelete").val(),
        dataType: "json",
        success: function(resp){
            $("#success").text("Eliminado con exito de tu lista");
            $("#inputDelete").val("")
        },
        error: function(x, status, error){
            $("#success").text("Error al eliminar, intente de nuevo");
            $("#inputDelete").val("")
        }
    })
})

