(function(){var d={};var c=40;var e=38;var a=27;var b=13;tinymce.create("tinymce.plugins.AutoCompletePlugin",{init:function(k,j){d={list:n(),visible:false,cancelEnter:false,delimiter:k.getParam("autocomplete_delimiters","160,32").split(","),options:k.getParam("autocomplete_options","").split(","),trigger:k.getParam("autocomplete_trigger","@"),enclosing:k.getParam("autocomplete_end_option","")};function m(x,A){if((!d.visible&&A.keyCode!=a&&A.keyCode!=b)||(A.keyCode!=c&&A.keyCode!=e&&A.keyCode!=b&&A.keyCode!=a)){var y=w(x);var z=[];if(y.length>0){var B=y.replace(d.trigger,"");z=i(B);if(z.length>0){p(z,B,x);q()}}if(y.length==0||z.length==0){v()}}}function r(x,y){if(y.keyCode==b&&d.cancelEnter){d.cancelEnter=false;return tinymce.dom.Event.cancel(y)}}function l(x,y){if(d.visible){if(y.keyCode==c){q();return tinymce.dom.Event.cancel(y)}if(y.keyCode==e){g();return tinymce.dom.Event.cancel(y)}if(y.keyCode==b){u(x,w(x));d.cancelEnter=true;return}if(y.keyCode==a){v();return tinymce.dom.Event.cancel(y)}}}function h(x,y){v()}function p(D,G,F){var z="";var A=new RegExp("("+G+")");for(var C in D){z+="<li data-value='"+D[C]+"'>"+D[C].replace(A,"<mark>$1</mark>")+"</li>"}jQuery(d.list).html(z);var x=jQuery(F.getContainer()).position();var H=jQuery(F.getContainer()).find(".mceToolbar").first();var y=jQuery(F.selection.getNode()).position();var E=0;var B=0;if(F.selection.getRng().getClientRects().length>0){E=F.selection.getRng().getClientRects()[0].top+F.selection.getRng().getClientRects()[0].height;B=F.selection.getRng().getClientRects()[0].left}else{E=parseInt(jQuery(F.selection.getNode()).css("font-size"))*1.3+y.top;B=y.left}jQuery(d.list).css("margin-top",x.top+H.innerHeight()+E);jQuery(d.list).css("margin-left",x.left+B);jQuery(d.list).css("display","block");d.visible=true;t(F)}function t(x){jQuery(d.list).find("li").hover(function(){jQuery(d.list).find("[data-selected=true]").attr("data-selected","false");jQuery(this).attr("data-selected","true")});jQuery(d.list).find("li").click(function(){u(x,w(x))})}function n(){var x=document.createElement("ul");jQuery(x).addClass("auto-list");document.body.appendChild(x);return x}function v(){jQuery(d.list).css("display","none");d.visible=false}function q(){var x=jQuery(d.list).find("[data-selected=true]");if(x.size()==0||x.next().size()==0){jQuery(d.list).find("li:first-child").attr("data-selected","true")}else{x.next().attr("data-selected","true")}x.attr("data-selected","false")}function g(){var x=jQuery(d.list).find("[data-selected=true]");if(x.size()==0||x.prev().size()==0){jQuery(d.list).find("li:last-child").attr("data-selected","true")}else{x.prev().attr("data-selected","true")}x.attr("data-selected","false")}function u(y,z){var D=jQuery(d.list).find("[data-selected=true]").attr("data-value");if(D==null){D=jQuery(d.list).find("li:first-child").attr("data-value")}var B=s(y.selection.getSel().anchorNode,"");var A=y.selection.getSel().anchorNode.textContent;var x=y.selection.getRng();x.setStart(x.startContainer,x.startOffset-z.length);y.selection.setRng(x);var E="";if(d.delimiter.length>0){E=String.fromCharCode(d.delimiter[0])}y.selection.setContent(d.trigger+D+E);if(d.enclosing.length>0&&!f(B,A)){var C=y.selection.getBookmark();y.selection.setContent(E+d.trigger+d.enclosing);y.selection.moveToBookmark(C)}v()}function f(y,x){var A=d.trigger+d.enclosing;y=y.substr(x.length);var z=new RegExp(d.trigger+".{"+d.enclosing.length+"}","g").exec(y);if(z!=null&&z.length>0&&z[0]==A){return true}return false}function s(x,y){y+=x.textContent;if(x.nextSibling!=null){return s(x.nextSibling,y)}return y}function i(z){var x=d.options;var A=[];for(var y in x){if(z.length==0||o(z,x[y])){A.push(x[y])}}return A}function o(y,x){return(x.match("^"+y)==y)}function w(y){var B=y.selection.getSel().focusNode==null?"":y.selection.getSel().focusNode.nodeValue;var z=y.selection.getSel().focusOffset;if(B==null||B.length==0){return""}var x=0;for(var A=0;A<z;A++){if(d.delimiter.indexOf(B.charCodeAt(A).toString())!=-1){x=A+1}}var C=B.substr(x,z-x);if(C.length>0&&C.charAt(0).toString()==d.trigger){return C}return""}k.onKeyUp.addToTop(m);k.onKeyDown.addToTop(l);k.onKeyPress.addToTop(r);k.onClick.add(h)},getInfo:function(){return{longname:"AutoComplete",author:"Mijura Pty Ltd",authorurl:"http://mijura.com",infourl:"http://blog.mijura.com",version:tinymce.majorVersion+"."+tinymce.minorVersion}}});tinymce.PluginManager.add("autocomplete",tinymce.plugins.AutoCompletePlugin)})();