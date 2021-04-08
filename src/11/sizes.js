// JavaScript Document
// Deterimine Browser Size
var windX = null;//Set to null
var windY = null;//Set to null
//Repeat function while the values equal null
if(windX == null && windY == null){
	if(document.body && document.body.offsetWidth) {
		windX = document.body.offsetWidth;
		windY = document.body.offsetHeight;
	}
	if(document.compatMode == 'CSS1Compat' && document.documentElement && document.documentElement.offsetWidth){
		windX = document.documentElement.offsetWidth;
		windY = document.documentElement.offsetHeight;
	}
	if(window.innerWidth && window.innerHeight) {
		windX = window.innerWidth;
		windY = window.innerHeight;
	}
};
//
document.getElementById("grid").width = windX + "px";
document.getElementById("grid").height = windY + "px";