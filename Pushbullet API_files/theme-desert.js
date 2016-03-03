define("ace/theme/desert",["require","exports","module","ace/lib/dom"], function(require, exports, module) {

exports.isDark = true;
exports.cssClass = "ace-desert";
exports.cssText = ".ace-desert .ace_gutter {\
background: #232323;\
color: #E2E2E2\
}\
.ace-desert .ace_print-margin {\
width: 1px;\
background: #232323\
}\
.ace-desert {\
background-color: #333;\
color: #eee\
}\
.ace-desert .ace_cursor {\
color: #A7A7A7\
}\
.ace-desert .ace_marker-layer .ace_selection {\
background: rgba(221, 240, 255, 0.20)\
}\
.ace-desert.ace_multiselect .ace_selection.ace_start {\
box-shadow: 0 0 3px 0px #141414;\
}\
.ace-desert .ace_marker-layer .ace_step {\
background: rgb(102, 82, 0)\
}\
.ace-desert .ace_marker-layer .ace_bracket {\
margin: -1px 0 0 -1px;\
border: 1px solid rgba(255, 255, 255, 0.25)\
}\
.ace-desert .ace_marker-layer .ace_active-line {\
background: rgba(255, 255, 255, 0.031)\
}\
.ace-desert .ace_gutter-active-line {\
background-color: rgba(255, 255, 255, 0.031)\
}\
.ace-desert .ace_marker-layer .ace_selected-word {\
border: 1px solid rgba(221, 240, 255, 0.20)\
}\
.ace-desert .ace_invisible {\
color: rgba(255, 255, 255, 0.25)\
}\
.ace-desert .ace_keyword,\
.ace-desert .ace_meta {\
color: #f0e68c;\
font-weight: bold\
}\
.ace-desert .ace_constant,\
.ace-desert .ace_constant.ace_character,\
.ace-desert .ace_constant.ace_character.ace_escape,\
.ace-desert .ace_constant.ace_other,\
.ace-desert .ace_heading,\
.ace-desert .ace_markup.ace_heading,\
.ace-desert .ace_support.ace_constant {\
color: #98fb98\
}\
.ace-desert .ace_invalid.ace_illegal {\
color: #F8F8F8;\
background-color: rgba(86, 45, 86, 0.75)\
}\
.ace-desert .ace_invalid.ace_deprecated {\
text-decoration: underline;\
font-style: italic;\
color: #D2A8A1\
}\
.ace-desert .ace_support {\
color: #eee\
}\
.ace-desert .ace_fold {\
background-color: #AC885B;\
border-color: #F8F8F8\
}\
.ace-desert .ace_support.ace_function {\
color: #eee\
}\
.ace-desert .ace_list,\
.ace-desert .ace_markup.ace_list,\
.ace-desert .ace_storage {\
color: #F9EE98\
}\
.ace-desert .ace_entity.ace_name.ace_function,\
.ace-desert .ace_meta.ace_tag,\
.ace-desert .ace_variable {\
color: #eee\
}\
.ace-desert .ace_operator {\
color: #eee\
}\
.ace-desert .ace_string {\
color: #ffa0a0\
}\
.ace-desert .ace_string.ace_regexp {\
color: #f0e68c;\
font-weight: bold\
}\
.ace-desert .ace_comment {\
color: #87ceeb\
}\
.ace-desert .ace_variable {\
color: #eee\
}\
.ace-desert .ace_xml-pe {\
color: #494949\
}\
.ace-desert .ace_indent-guide {\
background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWMQERFpYLC1tf0PAAgOAnPnhxyiAAAAAElFTkSuQmCC) right repeat-y\
}";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});
