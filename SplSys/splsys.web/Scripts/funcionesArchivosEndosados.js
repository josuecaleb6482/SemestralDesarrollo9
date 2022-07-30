function borrarArchivoEndosado(id, tbl, ruta) {
    var url = $("#" + ruta).val();
    url = url + "?idArchivo="+id;
    bootbox.confirm({
        message: "¿Está seguro que desea quitar el archivo?",
        backdrop: false,
        centerVertical: true,
        buttons: {
            confirm: {
                label: 'Sí',
                className: 'btn-success'
            },
            cancel: {
                label: 'No',
                className: 'btn-danger'
            }
        },
        callback: function (result) {
            if (result === true) {
                axios.get(url).then(function (res) {
                    notificaciones.mensajeAjax(res.data, "Archivo eliminado");
                    refrescarTabla(tbl);
                })
                    .catch(function (err) {
                        btn.ladda('stop');
                        notificaciones.error(err.message, "Endoso eliminado", null);
                    });
            }
        }
    });
}
