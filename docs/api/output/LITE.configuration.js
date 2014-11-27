Ext.data.JsonP.LITE_configuration({"tagname":"class","name":"LITE.configuration","autodetected":{},"files":[{"filename":"plugin.js","href":"plugin.html#LITE-configuration"}],"members":[{"name":"debug","tagname":"property","owner":"LITE.configuration","id":"property-debug","meta":{}},{"name":"includes","tagname":"property","owner":"LITE.configuration","id":"property-includes","meta":{}},{"name":"isTracking","tagname":"property","owner":"LITE.configuration","id":"property-isTracking","meta":{}},{"name":"jQueryPath","tagname":"property","owner":"LITE.configuration","id":"property-jQueryPath","meta":{}},{"name":"tooltipTemplate","tagname":"property","owner":"LITE.configuration","id":"property-tooltipTemplate","meta":{}},{"name":"tooltips","tagname":"property","owner":"LITE.configuration","id":"property-tooltips","meta":{}},{"name":"userStyles","tagname":"property","owner":"LITE.configuration","id":"property-userStyles","meta":{}}],"alternateClassNames":[],"aliases":{},"id":"class-LITE.configuration","short_doc":"The configuration object for the LITE.lite and the LITE.LITEPlugin objects\nThis object is usually created in the CKEd...","component":false,"superclasses":[],"subclasses":[],"mixedInto":[],"mixins":[],"parentMixins":[],"requires":[],"uses":[],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/plugin.html#LITE-configuration' target='_blank'>plugin.js</a></div></pre><div class='doc-contents'><p>The configuration object for the <a href=\"#!/api/LITE.lite\" rel=\"LITE.lite\" class=\"docClass\">LITE.lite</a> and the <a href=\"#!/api/LITE.LITEPlugin\" rel=\"LITE.LITEPlugin\" class=\"docClass\">LITE.LITEPlugin</a> objects\nThis object is usually created in the CKEditor configuration file. It can also be created/modified\nin the callback for CKEditor's <strong>configLoaded</strong> event</p>\n\n<p><p>In the config file, create this object with code such as:\n<pre>CKEDITOR.editorConfig = function( config ) {\n// ... your own configuration\n    var lite = config.lite = (config.lite || {});\n// now assign values to properties: lite.xxx = yyy;\n</pre>\nAnd here's an example for configuring lite in the <strong>configLoaded</strong> event:\n<pre>       function onConfigLoaded(e) {\n        var conf = e.editor.config;\n        var lt = conf.lite = (conf.lite || {});\n        lt.isTracking = false;\n    }\n </pre></p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-debug' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LITE.configuration'>LITE.configuration</span><br/><a href='source/plugin.html#LITE-configuration-property-debug' target='_blank' class='view-source'>view source</a></div><a href='#!/api/LITE.configuration-property-debug' class='name expandable'>debug</a> : Object<span class=\"signature\"></span></div><div class='description'><div class='short'><p>set debug.log to true for LITE to print error messages in the browser console</p>\n</div><div class='long'><p>set debug.log to true for LITE to print error messages in the browser console</p>\n</div></div></div><div id='property-includes' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LITE.configuration'>LITE.configuration</span><br/><a href='source/plugin.html#LITE-configuration-property-includes' target='_blank' class='view-source'>view source</a></div><a href='#!/api/LITE.configuration-property-includes' class='name expandable'>includes</a> : Array<span class=\"signature\"></span></div><div class='description'><div class='short'>sets the javascript include files to be included in LITE instead of the default. ...</div><div class='long'><p>sets the javascript include files to be included in LITE instead of the default. Use only for debugging or extending the plugin</p>\n</div></div></div><div id='property-isTracking' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LITE.configuration'>LITE.configuration</span><br/><a href='source/plugin.html#LITE-configuration-property-isTracking' target='_blank' class='view-source'>view source</a></div><a href='#!/api/LITE.configuration-property-isTracking' class='name expandable'>isTracking</a> : Boolean<span class=\"signature\"></span></div><div class='description'><div class='short'>\n</div><div class='long'>\n</div></div></div><div id='property-jQueryPath' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LITE.configuration'>LITE.configuration</span><br/><a href='source/plugin.html#LITE-configuration-property-jQueryPath' target='_blank' class='view-source'>view source</a></div><a href='#!/api/LITE.configuration-property-jQueryPath' class='name expandable'>jQueryPath</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'><p>the path (relative to the LITE plugin.js file) to jQuery\n@default js/jquery.min.js</p>\n</div><div class='long'><p>the path (relative to the LITE plugin.js file) to jQuery\n@default js/jquery.min.js</p>\n</div></div></div><div id='property-tooltipTemplate' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LITE.configuration'>LITE.configuration</span><br/><a href='source/plugin.html#LITE-configuration-property-tooltipTemplate' target='_blank' class='view-source'>view source</a></div><a href='#!/api/LITE.configuration-property-tooltipTemplate' class='name expandable'>tooltipTemplate</a> : String<span class=\"signature\"></span></div><div class='description'><div class='short'>A format string used to create the content of tooltips shown over change spans\n@default \"%a by %u %t\"\n\nformats\n\n\n(use...</div><div class='long'><p>A format string used to create the content of tooltips shown over change spans\n@default \"%a by %u %t\"</p>\n\n<h3>formats</h3>\n\n\n<p>(use uppercase to apply the format to the last modification date of the change span rather than the first)</p>\n\n<ul>\n<li><strong>%a</strong>  The action, \"added\" or \"deleted\" (not internationalized yet)\n<li><strong>%t</strong>  Timestamp of the first edit action in this change span (e.g. \"now\", \"3 minutes ago\", \"August 15 1972\")\n<li><strong>%u</strong>  the name of the user who made the change\n<li><strong>%dd</strong>  double digit date of change, e.g. 02\n<li><strong>%d</strong>  date of change, e.g. 2\n<li><strong>%mm</strong>  double digit month of change, e.g. 09\n<li><strong>%m</strong>  month of change, e.g. 9\n<li><strong>%yy</strong>    double digit year of change, e.g. 11\n<li><strong>%y</strong>    full month of change, e.g. 2011\n<li><strong>%nn</strong>    double digit minutes of change, e.g. 09\n<li><strong>%n</strong>    minutes of change, e.g. 9\n<li><strong>%hh</strong>    double digit hour of change, e.g. 05\n<li><strong>%h</strong>  hour of change, e.g. 5\n</li></li></li></li></li></li></li></li></li></li></li></li></li></ul>\n\n</div></div></div><div id='property-tooltips' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LITE.configuration'>LITE.configuration</span><br/><a href='source/plugin.html#LITE-configuration-property-tooltips' target='_blank' class='view-source'>view source</a></div><a href='#!/api/LITE.configuration-property-tooltips' class='name expandable'>tooltips</a> : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>Configures the tooltips shown by LITE\n\nOmit the classPath member in order to get tooltips in standard html title elem...</div><div class='long'><p>Configures the tooltips shown by LITE</p>\n\n<div><strong>Omit the classPath member in order to get tooltips in standard html title elements</strong></div>\n\n\n<p>These are the default values used by LITE:</p>\n\n<pre>   lite.tooltips = {\n        show: true, // set to false to prevent tooltips\n        path: \"js/opentip-adapter.js\", // change to point to your own implementation\n        classPath: \"OpentipAdapter\", // the full name of tooltip class construtor\n        cssPath: \"css/opentip.css\", // the stylesheet file of the tooltips\n        delay: 500 // the delay in milliseconds between hovering over a change node and the appearance of a tooltip\n    };\n</pre>\n\n</div></div></div><div id='property-userStyles' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='LITE.configuration'>LITE.configuration</span><br/><a href='source/plugin.html#LITE-configuration-property-userStyles' target='_blank' class='view-source'>view source</a></div><a href='#!/api/LITE.configuration-property-userStyles' class='name expandable'>userStyles</a> : Object<span class=\"signature\"></span></div><div class='description'><div class='short'>A map of user id=>user style index\nNormally LITE will assign a style number for each user id it encounters in the mar...</div><div class='long'><p>A map of user id=>user style index\nNormally LITE will assign a style number for each user id it encounters in the markup. If you want to maintain consistent\nstyle per users (e.g. Melixon is always colored green, Thierry in chartreuse), assign a value to this property, e.g.</p>\n\n<pre> \n    lite.userStyles = {\n        15: 1,\n        18:2,\n        21:3\n    };\n</pre>\n\n</div></div></div></div></div></div></div>","meta":{}});