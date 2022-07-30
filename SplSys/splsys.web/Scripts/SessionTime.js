jQuery.SessionTime = function (time) {
    var call = function () {
        $.ajax(
            {
                url: urlSession,
                type: "GET"
            }).done(function (data) {
                if (data.mensaje === "FAIL") {
                    clearInterval(interval);
                    notificaciones.error("Su sesión ha vencido", "error sesión terminada", null,null);
                    sessionLogOut();
                }
            }).fail(function (jqXHR, textStatus) {
                clearInterval(interval);
                notificaciones.error("Su sesión ha vencido", "error de conexión", null,null);
                sessionLogOut();
            });
    };
   var interval = setInterval(call, time);
};

function sessionLogOut() {
    window.location.href = urlInit;
}


   