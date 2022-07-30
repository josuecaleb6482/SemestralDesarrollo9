$(function () {
    $.SessionTime(time);
    //$.widget.bridge('uibutton', $.ui.button);
    bsCustomFileInput.init();
    $("input[data-bootstrap-switch]").each(function () {
        $(this).bootstrapSwitch('state', $(this).prop('checked'));
    });

    var url = window.location.href.replace("#","");

    $('ul.nav-sidebar a').filter(function () {
        return this.href == url;
    }).addClass('active');

   $('ul.nav-treeview a').filter(function () {
        return this.href == url;
    }).parentsUntil(".nav-sidebar > .nav-treeview")
        .css({ 'display': 'block' })
        .addClass('active');
  /*  $('ul.nav-treeview a').filter(function () {
        return this.href == url;
    }).parentsUntil(".nav-sidebar > .nav-treeview")
        .css({ 'display': 'block' })
        .addClass('menu-open').prev('a')
        .addClass('active');*/
});
$(document).on({
    ajaxStart: function () {
        $("body").addClass("loading");
    },
    ajaxStop: function () {
        $("body").removeClass("loading");
    }
});
axios.defaults.headers.common['X-Requested-With'] = "XMLHttpRequest";
axios.interceptors.request.use(function (config) {
    $("body").addClass("loading"); 
    return config;
}, function (error) {
    $("body").removeClass("loading"); 
    return Promise.reject(error);
});
axios.interceptors.response.use(function (response) {
    $("body").removeClass("loading"); 
    return response;
}, function (error) {
   $("body").removeClass("loading"); 
    return Promise.reject(error);
});
axios.defaults.paramsSerializer = function (params){ };