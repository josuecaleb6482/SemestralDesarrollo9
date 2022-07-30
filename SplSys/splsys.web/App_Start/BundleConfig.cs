using System.Web;
using System.Web.Optimization;
using GzipBundle;

namespace splsys.web
{
    public class BundleConfig
    {
        // Para obtener más información sobre las uniones, visite https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {

            bundles.Add(new GzipScriptBundle("~/bundles/jqueryLast", new JsMinify()).Include(
                      "~/Content/plugins/jquery/jquery.js",
                       "~/Scripts/jquery-3.4.1.slim"));


            bundles.Add(new GzipScriptBundle("~/bundles/AMDLTD", new JsMinify()).Include(
                         "~/Content/plugins/bootstrap/js/bootstrap.bundle.min.js",
                         "~/Content/plugins/sparklines/sparkline.min.js",
                         "~/Content/plugins/jqvmap/jquery.vmap.min.js",
                         "~/Content/plugins/jqvmap/maps/jquery.vmap.usa.js",
                         "~/Content/plugins/jquery-knob/jquery.knob.js",
                         "~/Content/plugins/moment/moment.min.js",
                         "~/Content/plugins/moment/locales.min.js",
                         "~/Content/plugins/moment/locale/es.js",
                         "~/Content/plugins/daterangepicker/daterangepicker.js",
                         "~/Content/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js",
                         "~/Content/plugins/summernote/summernote-bs4.min.js",
                         "~/Content/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js",
                         "~/Content/plugins/select2/js/select2.full.min.js",
                         "~/Content/plugins/bootstrap4-duallistbox/jquery.bootstrap-duallistbox.min.js",
                         "~/Content/plugins/inputmask/jquery.inputmask.min.js",
                         "~/Content/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js",
                         "~/Content/plugins/bootstrap-switch/js/bootstrap-switch.min.js",
                         "~/Content/plugins/jquery-validation/jquery.validate.js",
                         "~/Scripts/jquery.validate*",
                         "~/Content/plugins/sweetalert2/sweetalert2.min.js",
                         "~/Content/plugins/toastr/toastr.min.js",
                          "~/Content/plugins/bs-custom-file-input/bs-custom-file-input.min.js",
                         "~/Scripts/pollyfiles/es5-shim.min.js",
                         "~/Scripts/pollyfiles/es5-sham.min.js",
                         "~/Scripts/pollyfiles/es6-shim.min.js",
                         "~/Scripts/pollyfiles/es6-sham.min.js",
                         "~/Content/dist/js/adminlte.min.js",
                         "~/Content/plugins/Ladda-jQuery-master/dist/spin.min.js",
                         "~/Content/plugins/Ladda-jQuery-master/dist/ladda.jquery.min.js"
                         , "~/Scripts/utils.js"
                         , "~/Content/plugins/bootbox/bootbox.min.js"
                         , "~/Scripts/numericField/jquery.number.min.js"
                         , "~/Content/plugins/sweetalert2/sweetalert2.all.min.js"
                        ));

            bundles.Add(new GzipScriptBundle("~/bundles/dataTables", new JsMinify()).Include(
                    "~/Content/plugins/datatables/jquery.dataTables.js",
                    "~/Content/plugins/datatables-bs4/js/dataTables.bootstrap4.js",
                    "~/Content/plugins/datatables-responsive/js/dataTables.responsive.js",
                    "~/Content/plugins/datatables-responsive/js/responsive.bootstrap4.js"
            ));



            bundles.Add(new GzipScriptBundle("~/bundles/dataTablesExports", new JsMinify()).Include(
                  "~/Content/plugins/datatables-buttons/js/dataTables.buttons.js",
                  "~/Content/plugins/datatables-buttons/js/buttons.bootstrap4.js",
                  "~/Content/plugins/jszip/jszip.js",
                  "~/Content/plugins/pdfmake/pdfmake.js",
                  "~/Content/plugins/pdfmake/vfs_fonts.js",
                  "~/Content/plugins/datatables-buttons/js/buttons.html5.js",
                  "~/Content/plugins/datatables-buttons/js/buttons.print.js",
                  "~/Content/plugins/datatables-buttons/js/buttons.colVis.js"
            ));

            bundles.Add(new GzipScriptBundle("~/bundles/axio", new JsMinify()).Include(
                       "~/Scripts/axios.js"));

            bundles.Add(new GzipScriptBundle("~/bundles/jquery", new JsMinify()).Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new GzipScriptBundle("~/bundles/custom", new JsMinify()).Include(
                       "~/Scripts/SessionTime.js",
                       "~/Scripts/init.js",
                       "~/Scripts/funcionesArchivosEndosados.js"
                       ));

            bundles.Add(new GzipScriptBundle("~/bundles/jqueryval", new JsMinify()).Include(
                        "~/Scripts/jquery.validate*"));

            // Utilice la versión de desarrollo de Modernizr para desarrollar y obtener información. De este modo, estará
            // para la producción, use la herramienta de compilación disponible en https://modernizr.com para selelccionar solo las pruebas que necesite.
            bundles.Add(new GzipScriptBundle("~/bundles/modernizr", new JsMinify()).Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new GzipScriptBundle("~/bundles/bootstrap", new JsMinify()).Include(
                      "~/Scripts/bootstrap.js"));


            bundles.Add(new GzipStyleBundle("~/Content/css", new CssMinify()).Include(
                      "~/Content/bootstrap.css",
                       "~/Content/plugins/sweetalert2/sweetalert2.min.css",
                      "~/Content/site.css"));

            //if (System.Web.Configuration.WebConfigurationManager.AppSettings["ENVIROMENT"].ToString() == "D")
            //{
                bundles.Add(new GzipStyleBundle("~/css1", new CssMinify()).Include(
                     "~/fontawesome-free/css/all.css"
                     ));
            //}
            //else if (System.Web.Configuration.WebConfigurationManager.AppSettings["ENVIROMENT"].ToString() == "E")
            //{
                //bundles.Add(new GzipStyleBundle("~/css1", new CssMinify()).Include(
                  //   "~/fontawesome-free/css/all.min.css"
                   //  ));
            //}
            bundles.Add(new GzipStyleBundle("~/css2", new CssMinify()).Include(
                     "~/Content/ionicons.min.css"
                     ));

            bundles.Add(new GzipStyleBundle("~/css3", new CssMinify()).Include(
                      "~/Content/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css"
                      ));

            bundles.Add(new GzipStyleBundle("~/css4", new CssMinify()).Include(
                    "~/Content/plugins/icheck-bootstrap/icheck-bootstrap.min.css"
                    ));
            bundles.Add(new GzipStyleBundle("~/css5", new CssMinify()).Include(
                    "~/Content/plugins/jqvmap/jqvmap.min.css"
                    ));
            bundles.Add(new GzipStyleBundle("~/css6", new CssMinify()).Include(
                    "~/Content/dist/css/adminlte.min.css"
                    ));

            bundles.Add(new GzipStyleBundle("~/css7", new CssMinify()).Include(
                    "~/Content/custom.css"
                    ));
            bundles.Add(new GzipStyleBundle("~/css8", new CssMinify()).Include(
                    "~/Content/plugins/overlayScrollbars/css/OverlayScrollbars.min.css"
                    ));

            bundles.Add(new GzipStyleBundle("~/css9", new CssMinify()).Include(
                  "~/Content/plugins/daterangepicker/daterangepicker.css"
                  ));

            bundles.Add(new GzipStyleBundle("~/css10", new CssMinify()).Include(
                    "~/Content/plugins/summernote/summernote-bs4.min.css"
                    ));

            bundles.Add(new GzipStyleBundle("~/css12", new CssMinify()).Include(
                    "~/Content/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css"
                    ));

            bundles.Add(new GzipStyleBundle("~/css13", new CssMinify()).Include(
                    "~/Content/plugins/datatables-responsive/css/responsive.bootstrap4.min.css"
                    ));

            bundles.Add(new GzipStyleBundle("~/css14", new CssMinify()).Include(
                    "~/Content/plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css"
                    ));

            bundles.Add(new GzipStyleBundle("~/css15", new CssMinify()).Include(
                    "~/Content/plugins/toastr/toastr.min.css"
                    ));

            bundles.Add(new GzipStyleBundle("~/css16", new CssMinify()).Include(
                    "~/Content/plugins/summernote/summernote-bs4.min.css"
                    ));

            bundles.Add(new GzipStyleBundle("~/css17", new CssMinify()).Include(
                    "~/Content/plugins/icheck-bootstrap/icheck-bootstrap.min.css"
                    ));


            bundles.Add(new GzipStyleBundle("~/css19", new CssMinify()).Include(
                    "~/Content/plugins/select2/css/select2.min.css"
                    ));

            bundles.Add(new GzipStyleBundle("~/css20", new CssMinify()).Include(
                    "~/Content/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css"
                    ));

            bundles.Add(new GzipStyleBundle("~/css21", new CssMinify()).Include(
                   "~/Content/plugins/bootstrap4-duallistbox/bootstrap-duallistbox.min.css",
                    "~/Content/plugins/Ladda-jQuery-master/ladda.min.css",
                     "~/Content/plugins/Ladda-jQuery-master/ladda-themeless.min.css",
                     "~/Content/plugins/datatables/exports/css/buttons.dataTables"
                   ));


            BundleTable.EnableOptimizations = true;
        }
    }
}
