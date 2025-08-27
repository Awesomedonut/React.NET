using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.Text.Json;
using System.Text.Encodings.Web;

namespace MyAbpApp.Web.Extensions
{
    public static class ReactComponentExtensions
    {
        public static IHtmlContent ReactComponent(
            this IHtmlHelper html,
            string elementId,
            string componentName,
            object? props = null,
            object? config = null,
            string? cssClass = null)
        {
            var containerClass = string.IsNullOrEmpty(cssClass) ? "react-component" : $"react-component {cssClass}";
            
            var propsJson = props != null ? JsonSerializer.Serialize(props) : "{}";
            var configJson = config != null ? JsonSerializer.Serialize(config) : "{}";

            var html1 = $@"
                <div id=""{elementId}"" 
                     class=""{containerClass}""
                     data-react-component=""{componentName}""
                     data-react-props='{propsJson}'
                     data-react-config='{configJson}'>
                    <div class=""react-loading"">Loading component...</div>
                </div>";

            return new HtmlString(html1);
        }
        public static IHtmlContent ReactWelcomeWidget(
            this IHtmlHelper html,
            string elementId = "react-welcome",
            string? title = null,
            int refreshInterval = 5000,
            string? cssClass = null)
        {
            var props = new { title = title ?? "Welcome Widget" };
            var config = new { refreshInterval };

            return html.ReactComponent(elementId, "welcome-widget", props, config, cssClass);
        }
        public static IHtmlContent ReactDashboardWidget(
            this IHtmlHelper html,
            string elementId = "react-dashboard",
            string? title = null,
            int refreshInterval = 15000,
            string? cssClass = null)
        {
            var props = new { title = title ?? "Dashboard Overview" };
            var config = new { refreshInterval };

            return html.ReactComponent(elementId, "dashboard", props, config, cssClass);
        }
        public static IHtmlContent ReactUserProfile(
            this IHtmlHelper html,
            string elementId = "react-profile",
            object? userData = null,
            bool editable = false,
            string? cssClass = null)
        {
            var props = new { userData, editable };

            return html.ReactComponent(elementId, "user-profile", props, null, cssClass);
        }
        public static IHtmlContent ReactMultiComponent(
            this IHtmlHelper html,
            string containerId,
            object[] components,
            string? cssClass = null)
        {
            var containerClass = string.IsNullOrEmpty(cssClass) ? "react-multi-component" : $"react-multi-component {cssClass}";
            var componentsJson = JsonSerializer.Serialize(components);

            var html1 = $@"
                <div id=""{containerId}"" 
                     class=""{containerClass}""
                     data-react-multi-components='{componentsJson}'>
                    <div class=""react-loading"">Loading components...</div>
                </div>
                <script>
                    window.addEventListener('DOMContentLoaded', function() {{
                        if (window.ReactComponents && window.ReactComponents.renderMultipleComponents) {{
                            window.ReactComponents.renderMultipleComponents('{containerId}', {componentsJson});
                        }}
                    }});
                </script>";

            return new HtmlString(html1);
        }
    }
}