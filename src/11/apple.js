//apple.js
window.onload = function(){
	
	//Loading and SeeMoreInfo
	$("#close").css({"display":"none"});
	$("#blocker").css({"display":"none"});
	setTimeout(function(){$("#loading").fadeOut(1000);},500);
	
	//Sizes
	var W = $(window).width();
	var H = $(window).height();
	var D = $(document).height();
	
	//Element Sizing
	$("#grid").css({"height":(H+(D/40)+1)+"px"});
	
	//Starting Positions
	clink(0);
	var deg = Math.floor(Math.random()*(100-80+1)+80); //(max - min + 1)) + min
	var dir = (Math.floor(Math.random()*2) == 1) ? "+" : "-"; //pick direction
	var appleStart = H/4;
	$("#apple").css({"top":appleStart});
	//Randomize Paralax X values
	$("#para1").css({"top":300+"px"});
	$("#para2").css({"top":600+"px"});
	$("#para3").css({"top":900+"px"});
	$("#para4").css({"top":1200+"px"});
	$("#para1").css({"margin-left":Math.floor(Math.random()*85) +"%"});
	$("#para2").css({"margin-left":Math.floor(Math.random()*85) +"%"});
	$("#para3").css({"margin-left":Math.floor(Math.random()*85) +"%"});
	$("#para4").css({"margin-left":Math.floor(Math.random()*85) +"%"});
	

	//Slide To
	$(document).ready(function(){
		//Slide to Top
		$("#button-last").click(function(){
			$("body,html").animate({scrollTop: 0}, 1500); paraMove(1800); clink(0);
			return false; });
		//Slide to 2
		var slideTop2 = $("#slide2").offset().top;
		$("#button1").click(function(){
			$("html, body").animate({scrollTop:slideTop2},1000); paraMove(1300); clink(1);
			return false; });
		//Slide to 3
		var slideTop3 = $("#slide3").offset().top;
		$("#button2").click(function(){
			$("html,body").animate({scrollTop:slideTop3},1000); paraMove(1300); clink(2);
			return false; });
		//Slide to 4
		var slideTop4 = $("#slide4").offset().top;
		$("#button3").click(function(){
			$("html,body").animate({scrollTop:slideTop4},1000); paraMove(1300); clink(3);
			return false; });
		//Slide to 5
		var slideTop5 = $("#slide5").offset().top;
		$("#button4").click(function(){
			$("html,body").animate({scrollTop:slideTop5},1000); paraMove(1300); clink(4);
			return false; });
		//Slide to Isaac
		var slideTop6 = $("#isaac").offset().top;
		$("#button5").click(function(){
			$("html,body").animate({scrollTop:slideTop6},1000); paraMove(1300); clink(5)
			return false; });
			
		//
		//
		//	
		$("#a").click(function(){
			$("body,html").animate({scrollTop: 0}, 1000); paraMove(1300); clink(0);
			return false; });
		//Slide to 2
		var slideTop2 = $("#slide2").offset().top;
		$("#b").click(function(){
			$("html, body").animate({scrollTop:slideTop2},1000); paraMove(1300); clink(1);
			return false; });
		//Slide to 3
		var slideTop3 = $("#slide3").offset().top;
		$("#c").click(function(){
			$("html,body").animate({scrollTop:slideTop3},1000); paraMove(1300); clink(2);
			return false; });
		//Slide to 4
		var slideTop4 = $("#slide4").offset().top;
		$("#d").click(function(){
			$("html,body").animate({scrollTop:slideTop4},1000); paraMove(1300); clink(3);
			return false; });
		//Slide to 5
		var slideTop5 = $("#slide5").offset().top;
		$("#e").click(function(){
			$("html,body").animate({scrollTop:slideTop5},1000); paraMove(1300); clink(4);
			return false; });
		//Slide to Isaac
		var slideTop6 = $("#isaac").offset().top;
		$("#f").click(function(){
			$("html,body").animate({scrollTop:slideTop6},1000); paraMove(1300); clink(5);
			return false; });
	});
	
	//On Scroll
	$(document).scroll(function(){
		
		//Scroll
		var scrollY = $(document).scrollTop();//window.pageYOffset;
		
		//Rotation
		var appleRotation = "rotate(" +dir +(scrollY*deg)/D +"deg)";
		$("#apple").css({"transform":appleRotation});
		
		//Displacement
		var appleTop = appleStart + ((H-480)*scrollY)/D +"px";
		$("#apple").css({"top":appleTop});
		
		//Parallax
		parallaxRate = (scrollY/8);
		//$("#para1").animate({"top":300-parallaxRate+"px"},1300);
		$("#para1").css({"top":300-parallaxRate+"px"});
		$("#para2").css({"top":600-parallaxRate+"px"});
		$("#para3").css({"top":900-parallaxRate+"px"});
		$("#para4").css({"top":1200-parallaxRate+"px"});
		gridRate = 0 - (scrollY/40) +"px";
		$("#grid").css({"top":gridRate});
		
		//When Scroll = 0
		if(scrollY <= 0){ 
			deg = Math.floor(Math.random()*(230-80+1)+80); 
			dir = (dir == "+") ? "-" : "+";
		}
	});
};
function paraMove(time){
	$("#para1").animate({"marginLeft":Math.floor(Math.random()*85)+"%"},time);
	$("#para2").animate({"marginLeft":Math.floor(Math.random()*85)+"%"},time);
	$("#para3").animate({"marginLeft":Math.floor(Math.random()*85)+"%"},time);
	$("#para4").animate({"marginLeft":Math.floor(Math.random()*85)+"%"},time);	
};

function clink(v){
	$("#a").css({"color":"#E6E6E6"});
	$("#b").css({"color":"#E6E6E6"});
	$("#c").css({"color":"#E6E6E6"});
	$("#d").css({"color":"#E6E6E6"});
	$("#e").css({"color":"#E6E6E6"});
	$("#f").css({"color":"#E6E6E6"});
	if(v==0) $("#a").css({"color":"#00a2ff"});
	else if (v==1) $("#b").css({"color":"#00a2ff"});
	else if (v==2) $("#c").css({"color":"#00a2ff"});
	else if (v==3) $("#d").css({"color":"#00a2ff"});
	else if (v==4) $("#e").css({"color":"#00a2ff"});
	else if (v==5) $("#f").css({"color":"#00a2ff"});
}

//Arrow Keys To Scroll
/*$(document).ready(function(){
var slideTop = $("#slide1").offset().top;
$("#apple").click(function(){
$("html,body").animate({scrollTop:slideTop},900);
return false; });
});*/