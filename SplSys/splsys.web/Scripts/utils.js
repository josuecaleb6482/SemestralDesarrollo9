/// <reference path="sessiontime.js" />
var notificaciones = {};

notificaciones.mensajeAjax = function (datos, titulo, subtitulo, time) {
    if (time === null) time = 7500;
    if (titulo === null) titulo = 'Seguros Operativos';
    if (subtitulo === null) subtitulo = '';

    $(document).Toasts('create', {
        class: (datos.success === true) ? 'bg-success' : 'bg-danger',
        title: titulo,
        subtitle: subtitulo,
        body: datos.message,
        delay: time,
        autohide: (datos.success === true) ? true : false,
        closeButton: true,
        icon: (datos.success === true) ? 'far fa-check-circle' : 'fas fa-times'
    });
};

notificaciones.error = function (mensaje, titulo, subtitulo, time) {
    if (time === null) time = 8500;

    $(document).Toasts('create', {
        class: 'bg-danger',
        title: titulo,
        subtitle: subtitulo,
        body: mensaje,
        autohide: true,
        delay: time,
        icon: 'fas fa-times'
    });
};

notificaciones.exito = function (mensaje, titulo, subtitulo, time) {
    if (time === null) time = 7500;

    $(document).Toasts('create', {
        class: 'bg-success',
        title: titulo,
        subtitle: subtitulo,
        body: mensaje,
        autohide: true,
        delay: time,
        icon: 'far fa-check-circle'
    });
};

notificaciones.advertencia = function (mensaje, titulo, subtitulo, time) {
    if (time === null) time = 7500;

    $(document).Toasts('create', {
        class: 'bg-warning',
        title: titulo,
        subtitle: subtitulo,
        body: mensaje,
        autohide: true,
        delay: time,
        icon: 'fas fa-exclamation-triangle'
    });
};

notificaciones.informacion = function (mensaje, titulo, subtitulo, time) {
    if (time === null) time = 7500;

    $(document).Toasts('create', {
        class: 'bg-info',
        title: titulo,
        subtitle: subtitulo,
        body: mensaje,
        autohide: true,
        delay: time,
        icon: 'fas fa-info-circle'
    });
};

function comboBox(id) {
    $('#' + id).select2({ theme: 'bootstrap4' });
}

function decimalNumber(id, separadorMiles, separadorDecimal, numeroDecimales, simbolo) {


    if (separadorMiles === null) separadorMiles = ",";
    if (separadorDecimal === null) separadorDecimal = ".";
    if (numeroDecimales === null) numeroDecimales = 2;


    //$("#" + id).inputmask(
    //    {
    //        'alias': 'numeric',
    //        'groupSeparator': separadorMiles,
    //        'radixPoint': separadorDecimal,
    //        'digits': numeroDecimales,
    //        'placeholder': "",
    //        'rightAlign': false,
    //        'allowPlus': simbolo,
    //        'allowMinus': simbolo
    //    }
    //);

   $("#" + id).number(true, numeroDecimales, separadorDecimal, separadorMiles);
}

function returnBack() {
    window.history.back(-1);
}

function reloadWindow() {
    window.location.reload();
}

function reloadPartial() {
    var url = window.location.toString();
    $('body').load(url, function (result) {
        $(this).fadeIn(5000);
    });
}

function refrescarTabla(id) {
    $('#' + id).DataTable().ajax.reload();
}

function obtenerURL() {
    var loc = window.location;
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
    return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
}

function obtenerFechaGeneracionArchivo() {
    var date = new Date();
    return date.getFullYear().toString() + pad2(date.getMonth() + 1) + pad2(date.getDate()) + pad2(date.getHours()) + pad2(date.getMinutes()) + pad2(date.getSeconds())
}

function pad2(n) { return n < 10 ? '0' + n : n; }

function number_format(amount, decimals) {

    amount += ''; // por si pasan un numero en vez de un string
    amount = parseFloat(amount.replace(/[^0-9\.]/g, '')); // elimino cualquier cosa que no sea numero o punto

    decimals = decimals || 0; // por si la variable no fue fue pasada

    // si no es un numero o es igual a cero retorno el mismo cero
    if (isNaN(amount) || amount === 0)
        return parseFloat(0).toFixed(decimals);

    // si es mayor o menor que cero retorno el valor formateado como numero
    amount = '' + amount.toFixed(decimals);

    var amount_parts = amount.split('.'),
        regexp = /(\d+)(\d{3})/;

    while (regexp.test(amount_parts[0]))
        amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2');

    return amount_parts.join('.');
}

    function eliminarComa(valor) {

        let count = valor.split(",").length - 1;
        let i = 0;

        while (i != count) {
            valor = valor.replace(",", "");
            i++;
        }

        return valor;
}

    function isEmpty(valor) {
     return (valor == null || valor.length === 0);
}

