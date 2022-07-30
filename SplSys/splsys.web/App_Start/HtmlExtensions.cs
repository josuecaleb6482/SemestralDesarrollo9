using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web.UI;

namespace Tu_Crecimiento.AppStart
{
    public static class HtmlExtensions
    {
        public static MvcHtmlString PMTextBoxFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper,
            Expression<Func<TModel, TProperty>> expression,
            object additionalViewData,
            string inputGroup = null)
        {
            var metada = ModelMetadata.FromLambdaExpression(expression, htmlHelper.ViewData);

            string atributos = "";
            if (additionalViewData != null)
            {
                PropertyInfo[] propiedades = additionalViewData.GetType().GetProperties();
                foreach (var propieadad in propiedades)
                {
                    string temp = propieadad.GetValue(additionalViewData, null).ToString();
                    temp = temp.Replace('{', ' ');
                    temp = temp.Replace('}', ' ');
                    atributos = atributos + temp;
                }

            }

            var htmlInput = "<input id=\"{0}\" type=\"text\" class=\"form-control\" name=\"{0}\" value=\"{1}\" " + atributos + "/>";
            htmlInput = string.Format(htmlInput, metada.PropertyName, metada.SimpleDisplayText);

            return MvcHtmlString.Create(htmlInput);
        }

        public static MvcHtmlString PMTextBox<TModel>(this HtmlHelper<TModel> htmlHelper, string name,
            string value = "", string placeholder = "", string size = "")
        {
            string htmlInput = "";
            if (String.IsNullOrEmpty(size))
            {
                htmlInput = "<input id=\"{0}\" type=\"text\" class=\"form-control\" name=\"{0}\" value=\"{1}\" placeholder=\"{2}\" />";
                htmlInput = string.Format(htmlInput, name, value, placeholder);
            }
            else
            {
                htmlInput = "<input id=\"{0}\" type=\"text\" class=\"form-control\" name=\"{0}\" value=\"{1}\" placeholder=\"{2}\" maxlength=\"{3}\" />";
                htmlInput = string.Format(htmlInput, name, value, placeholder, size);
            }
            
       
            return MvcHtmlString.Create(htmlInput);
        }


        public static MvcHtmlString PMTextTareaBox<TModel>(this HtmlHelper<TModel> htmlHelper, string name,
            string value = "", string placeholder = "", string size = "", string cols="5", string rows = "3")
        {
            string htmlInput = "";
            if (String.IsNullOrEmpty(size))
            {
                htmlInput = "<textarea id=\"{0}\" type=\"text\" class=\"form-control\" name=\"{0}\" value=\"{1}\" placeholder=\"{2}\" cols=\"{3}\" rows=\"{4}\"></textarea>";
                htmlInput = string.Format(htmlInput, name, value, placeholder, cols, rows);
            }
            else
            {
                htmlInput = "<textarea  id=\"{0}\" type=\"text\" class=\"form-control\" name=\"{0}\" value=\"{1}\" placeholder=\"{2}\" maxlength=\"{3}\" cols=\"{4}\" rows=\"{5}\"></textarea>";
                htmlInput = string.Format(htmlInput, name, value, placeholder, size, cols,rows);
            }


            return MvcHtmlString.Create(htmlInput);
        }


        public static MvcHtmlString PMComboBoxFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper,
            Expression<Func<TModel, TProperty>> expression,
           Dictionary<string, string> data, string placeholder = null)
        {
            var metada = ModelMetadata.FromLambdaExpression(expression, htmlHelper.ViewData);
            var htmlInput = "<select id=\"{0}\" class=\"form-control\" name=\"{0}\" placeholder=\"{1}\">[options]</select>";
            htmlInput = string.Format(htmlInput, metada.PropertyName, placeholder);

            var options = new StringBuilder();
            options.Append(string.Format("<option value=\"{0}\">{1}</option>", String.Empty, "Seleccionar"));
            foreach (var d in data)
            {
                var selected = "";
                if (d.Key == metada.SimpleDisplayText)
                    selected = "selected";

                options.Append(string.Format("<option value=\"{0}\" {1}>{2}</option>", d.Key, selected, d.Value));
            }

            htmlInput = htmlInput.Replace("[options]", options.ToString());

            var scriptHtml = "<script>$(document).ready(function(){ comboBox('" + metada.PropertyName + "'); })</script>";

            return MvcHtmlString.Create(htmlInput + scriptHtml);
        }


        public static MvcHtmlString PMComboBox<TModel>(this HtmlHelper<TModel> htmlHelper,
            string name, Dictionary<string, string> data, string placeholder = null,
            string selectedValue = null)
        {
            var htmlInput = "<select id=\"{0}\" class=\"form-control\" name=\"{0}\" placeholder=\"{1}\">[options]</select>";
            htmlInput = string.Format(htmlInput, name, placeholder);

            var options = new StringBuilder();
            options.Append(string.Format("<option value=\"{0}\">{1}</option>", String.Empty, "Seleccionar"));
            foreach (var d in data)
            {
                var selected = "";
                if (d.Key == selectedValue)
                    selected = "selected";

                options.Append(string.Format("<option value=\"{0}\" {1}>{2}</option>", d.Key, selected, d.Value));
            }

            htmlInput = htmlInput.Replace("[options]", options.ToString());

            var scriptHtml = "<script>$(document).ready(function(){ comboBox('" + name + "'); })</script>";

            return MvcHtmlString.Create(htmlInput + scriptHtml);
        }


        public static MvcHtmlString PMPasswordFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper,
           Expression<Func<TModel, TProperty>> expression, object additionalViewData, string inputGroup = null)
        {
            var metada = ModelMetadata.FromLambdaExpression(expression, htmlHelper.ViewData);
            string atributos = "";
            if (additionalViewData != null)
            {
                PropertyInfo[] propiedades = additionalViewData.GetType().GetProperties();
                foreach (var propieadad in propiedades)
                {
                    string temp = propieadad.GetValue(additionalViewData, null).ToString();
                    temp = temp.Replace('{', ' ');
                    temp = temp.Replace('}', ' ');
                    atributos = atributos + temp;
                }

            }
            var htmlInput = "<input autocomplete=\"off\"  id=\"{0}\" type=\"password\" class=\"form-control\" name=\"{0}\" value=\"{1}\" " + atributos + "/>"; ;
            htmlInput = string.Format(htmlInput, metada.PropertyName, metada.SimpleDisplayText);

            return MvcHtmlString.Create(htmlInput);
        }

        public static MvcHtmlString PMPassword<TModel>(this HtmlHelper<TModel> htmlHelper, string name,
            string value = "", string placeholder = "")
        {
            var htmlInput = "<input autocomplete=\"off\" id=\"{0}\" type=\"password\" class=\"form-control\" name=\"{0}\" value=\"{1}\" placeholder=\"{2}\" />";
            htmlInput = string.Format(htmlInput, name, value, placeholder);
            return MvcHtmlString.Create(htmlInput);
        }


        public static MvcHtmlString PMDateFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper,
          Expression<Func<TModel, TProperty>> expression, object additionalViewData, string format = "L")
        {
            var metada = ModelMetadata.FromLambdaExpression(expression, htmlHelper.ViewData);
            string atributos = "";
            if (additionalViewData != null)
            {
                PropertyInfo[] propiedades = additionalViewData.GetType().GetProperties();
                foreach (var propieadad in propiedades)
                {
                    string temp = propieadad.GetValue(additionalViewData, null).ToString();
                    temp = temp.Replace('{', ' ');
                    temp = temp.Replace('}', ' ');
                    atributos = atributos + temp;
                }

            }

            var htmlInput = "<div class=\"input-group date col-3\" name=\"{0}\" data-target-input=\"nearest\">" +
                        "<input type=\"text\" class=\"form-control datetimepicker-input\" id=\"input_{0}\" name=\"input_{0}\"  data-target=\"#{0}\" value=\"{1}\" " + atributos + "/>" +
            "<div class=\"input-group-append\" data-target=\"#{0}\" data-toggle=\"datetimepicker\">" +
                        "<div class=\"input-group-text\"><i class=\"fa fa-calendar\"></i></div>" +
                        "</div>" +
                        "</div>";

            htmlInput = string.Format(htmlInput, metada.PropertyName, metada.SimpleDisplayText);

            var scriptHtml = "<script>$(document).ready(function(){ $('#" + metada.PropertyName + "').datetimepicker({format:'" + format + "'});" + "$('#" + metada.PropertyName + "').inputmask('mm/dd/yyyy', { 'placeholder': 'mm/dd/yyyy' });" + "});</script>";


            return MvcHtmlString.Create(htmlInput + scriptHtml);
        }

        public static MvcHtmlString PMDate<TModel>(this HtmlHelper<TModel> htmlHelper, string name,
            string value = "", string placeholder = "", string format = "L")
        {
            //QUITAMOS EL col-3
            //var htmlInput = "<div class=\"input-group date col-3\" id=\"{0}\" name=\"{0}\" data-target-input=\"nearest\">" +
            var htmlInput = "<div class=\"input-group date\" id=\"{0}\" name=\"{0}\" data-target-input=\"nearest\">" +
                       "<input type=\"text\" class=\"form-control  datetimepicker-input\" data-target=\"#{0}\" id=\"input_{0}\" name=\"input_{0}\" value=\"{1}\" placeholder=\"{2}\"/>" +
                       "<div class=\"input-group-append\" data-target=\"#{0}\" data-toggle=\"datetimepicker\">" +
                       "<div class=\"input-group-text\"><i class=\"fa fa-calendar\"></i></div>" +
                       "</div>" +
                       "</div>";
            htmlInput = string.Format(htmlInput, name, value, placeholder);

            var scriptHtml = "<script>$(document).ready(function(){$('#" + name + "').datetimepicker({format:'" + format + "'});" + "$('#" + name + "').inputmask('mm/dd/yyyy', { 'placeholder': 'mm/dd/yyyy' });" + "});</script>";


            return MvcHtmlString.Create(htmlInput + scriptHtml);
        }

        public static MvcHtmlString PMDateRangeFor<TModel, TProperty>(this HtmlHelper<TModel> htmlHelper,
         Expression<Func<TModel, TProperty>> expression, object additionalViewData, string format = "L")
        {
            var metada = ModelMetadata.FromLambdaExpression(expression, htmlHelper.ViewData);
            string atributos = "";
            if (additionalViewData != null)
            {
                PropertyInfo[] propiedades = additionalViewData.GetType().GetProperties();
                foreach (var propieadad in propiedades)
                {
                    string temp = propieadad.GetValue(additionalViewData, null).ToString();
                    temp = temp.Replace('{', ' ');
                    temp = temp.Replace('}', ' ');
                    atributos = atributos + temp;
                }

            }
            var htmlInput = "<div class=\"input-group col-3\"> " +
            "        <div class=\"input-group-prepend\"> " +
            "          <span class=\"input-group-text\"> " +
            "            <i class=\"far fa-calendar-alt\"></i> " +
            "          </span> " +
            "        </div> " +
            "        <input  type=\"text\" class=\"form-control float-right\" id=\"{0}\" name=\"{0}\" value=\"{1}\" " + atributos + "/>" +
            "      </div>";


            htmlInput = string.Format(htmlInput, metada.PropertyName, metada.SimpleDisplayText);

            var scriptHtml = "<script>$(document).ready(function(){ $('#" + metada.PropertyName + "').daterangepicker({'linkedCalendars': false, locale: {cancelLabel: 'Limpiar', applyLabel:'Aceptar'}});";
            scriptHtml = scriptHtml + " $('#" + metada.PropertyName + "').on('cancel.daterangepicker', function(ev, picker) { " + " $('#" + metada.PropertyName + "').val('');" +
            "}); });</script>";

            return MvcHtmlString.Create(htmlInput + scriptHtml);
        }

        public static MvcHtmlString PMDateRange<TModel>(this HtmlHelper<TModel> htmlHelper, string name,
            string value = "", string placeholder = "", string format = "L")
        {
            //SE QUITÓ EL col-3 DEL DIV PRINCIPAL
            var htmlInput = "<div class=\"input-group\"> " +
           "        <div class=\"input-group-prepend\"> " +
           "          <span class=\"input-group-text\"> " +
           "            <i class=\"far fa-calendar-alt\"></i> " +
           "          </span> " +
           "        </div> " +
           "        <input  type=\"text\" class=\"form-control float-right\" id=\"{0}\" name=\"{0}\" value=\"{1}\" placeholder=\"{2}\"/>" +
           "      </div>";
            htmlInput = string.Format(htmlInput, name, value, placeholder);

            var scriptHtml = "<script>$(document).ready(function(){ $('#" + name + "').daterangepicker({'linkedCalendars': false, locale: {cancelLabel: 'Limpiar', applyLabel:'Aceptar'}});";
            scriptHtml = scriptHtml + " $('#" + name + "').on('cancel.daterangepicker', function(ev, picker) { " + " $('#" + name + "').val('');" +
            "}); });</script>";


            return MvcHtmlString.Create(htmlInput + scriptHtml);
        }


        public static MvcHtmlString PMDecimalFor<TModel, TProperty>(
               this HtmlHelper<TModel> htmlHelper,
               Expression<Func<TModel, TProperty>> expression,
               object additionalViewData,
               string separadorMiles = ",",
               string separadorDecimal = ".",
               string numeroDecimales = "2",
               string inputGroup = null,
               bool simbolo = false,
               long longitud = 18)
        {
            var metada = ModelMetadata.FromLambdaExpression(expression, htmlHelper.ViewData);

            separadorMiles = String.IsNullOrEmpty(separadorMiles) ? "," : separadorMiles;
            separadorDecimal = String.IsNullOrEmpty(separadorDecimal) ? "." : separadorDecimal;

            if (numeroDecimales == "0")
            {
                separadorMiles = "";
            }
            else
            {
                numeroDecimales = String.IsNullOrEmpty(numeroDecimales) ? "2" : numeroDecimales;
            }
           

            string atributos = "";
            if (additionalViewData != null)
            {
                PropertyInfo[] propiedades = additionalViewData.GetType().GetProperties();
                foreach (var propieadad in propiedades)
                {
                    string temp = propieadad.GetValue(additionalViewData, null).ToString();
                    temp = temp.Replace('{', ' ');
                    temp = temp.Replace('}', ' ');
                    atributos = atributos + temp;
                }

            }

            var htmlInput = "<input id=\"{0}\" type=\"text\" class=\"form-control\" name=\"{0}\" placeholder=\"\"  value=\"{1}\" maxlength=\"{2}\" " + atributos + "/>";
            htmlInput = string.Format(htmlInput, metada.PropertyName, metada.SimpleDisplayText, longitud);

           
            var scriptHtml = "<script>$(document).ready(function(){ decimalNumber('" + metada.PropertyName + "','" + separadorMiles + "'" + ",'" + separadorDecimal + "','" + numeroDecimales + "','" + simbolo + "');});</script>";

          

            return MvcHtmlString.Create(htmlInput + scriptHtml);
        }



        public static MvcHtmlString PMDecimal<TModel>(this HtmlHelper<TModel> htmlHelper, string name,
           string value = "", string placeholder = "",
            string separadorMiles = ",",
               string separadorDecimal = ".",
               string numeroDecimales = "2",
               string inputGroup = null,
               bool simbolo = false, 
               long longitud=18)
        {

            separadorMiles = String.IsNullOrEmpty(separadorMiles) ? "," : separadorMiles;
            separadorDecimal = String.IsNullOrEmpty(separadorDecimal) ? "." : separadorDecimal;
            if (numeroDecimales == "0")
            {
                separadorMiles = "";
            }
            else
            {
                numeroDecimales = String.IsNullOrEmpty(numeroDecimales) ? "2" : numeroDecimales;
            }

            var htmlInput = "<input id=\"{0}\" type=\"text\" class=\"form-control\" name=\"{0}\" value=\"{1}\" placeholder=\"{2}\" maxlength=\"{3}\" />";
            htmlInput = string.Format(htmlInput, name, value, placeholder, longitud);

            var scriptHtml = "<script>$(document).ready(function(){ decimalNumber('" + name + "','" + separadorMiles + "'" + ",'" + separadorDecimal + "','" + numeroDecimales + "','" + simbolo + "');});</script>";

            return MvcHtmlString.Create(htmlInput + scriptHtml);
        }

    }
}