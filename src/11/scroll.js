//Scroll Action
var scrollSpeed = 1750;
$(function() {
                function filterPath(string) {
                        return string
                        .replace(/^\//,'')
                        .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
                        .replace(/\/$/,'');
                }
                var locationPath = filterPath(location.pathname);
                var scrollElem = scrollableElement('html', 'body');
                $('a[href*=#]').each(function() {
                        var thisPath = filterPath(this.pathname) || locationPath;
                        if (  locationPath == thisPath
                                && (location.hostname == this.hostname || !this.hostname)
                                && this.hash.replace(/#/,'') ) {
                                        var $target = $(this.hash), target = this.hash;
                                        if (target) {
                                                var targetOffset = $target.offset().top;
                                                $(this).click(function(event) {
                                                        event.preventDefault();
                                                        $(scrollElem).animate({scrollTop: targetOffset}, scrollSpeed, function() {
                                                                location.hash = target;
                                                        });
                                                });
                                        }
                        }
                });
                function scrollableElement(els) {
                        for (var i = 0, argLength = arguments.length; i <argLength; i++) {
                                var el = arguments[i],
                                $scrollElement = $(el);
                                if ($scrollElement.scrollTop()> 0) {
                                        return el;
                                } else {
                                        $scrollElement.scrollTop(1);
                                        var isScrollable = $scrollElement.scrollTop()> 0;
                                        $scrollElement.scrollTop(0);
                                        if (isScrollable) {
                                                return el;
                                        }
                                }
                        }
                        return [];
                }
        });
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}