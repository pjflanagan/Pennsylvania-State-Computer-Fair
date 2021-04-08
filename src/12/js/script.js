// JavaScript Document
window.onload = function(){
	var y = 0; //current scroll position
	var SLIDES = $(".slide").length;
	var currentSlide = 0;	
	var W = $(window).width(), H = $(window).height(), D = $(document).height();
	var LINK_WIDTH = 150;
	var twoSet = true;
	
	/*loading();*/
	cssSetup();
	
	//css editing for if it didn't work in the other document
	function cssSetup(){
		//background
		$(".background").css({ height:H });
		//header
		$("#header").css({ width:W });
		$("#header table").css({ marginLeft:W/2-LINK_WIDTH/2 });
		makeHeader();
		//page content
		$("content.page").css({ 
			height:H-200//,"font-size":H*0.015
		});
		//footer content
		$("content.footer").css({ marginTop:H-400, width:W-400 });
		$("content.footer#compare").css({ marginTop:H-400, width:W-100 });
		$("content.footer#compare table td.compare-body").css({ width:W/2-50 });
		//two side content
		$("#background-prosCons").css({ width:W+600, marginLeft:-300 });
		$("content ul.two").css({ left:W/2, top:H/2 });
		$("content .two-sidebar-left").css({ height:H/2-75, paddingTop:H/2+75 });
		$("content .two-sidebar-right").css({ height:H/2-75, paddingTop:H/2+75, left:W-100 });
		$('.two-infobar-right').css({ height:H-200 , marginLeft:W });
		$('.two-infobar-left').css({ height:H-200 });
	}
	
	function makeHeader(){
		var str;
		for(var i = 0; i<SLIDES; i++){
			//create the header link
			str = '<td class="button" data-slide="' + i +'"><a>';
			str += $('.slide[data-slide="' + i +'"]').attr("title").toUpperCase();
			str += '</a></td>';
			//add the header link to the title
			$("#tr").append(str);
			//remove the title attribute from slides to avoid the hover alt-text
			str += $('.slide[data-slide="' + i +'"]').removeAttr("title");
		}
		//add the final slide that scrolls to top
		str = '<td class="button" data-slide="0"><a href="pages/bib.pdf" target="_blank">';
		str += "BIBLIOGRAPHY"
		str += '</a></td>';
		//add the final td to make the width fixed
		str += '<td id="last"></td>'; /*$("header td#last").css({width:10000-(LINK_WIDTH*SLIDES)});*/
		$("#tr").append(str);
	}
	
	//scoll to slide command
	function scrollTo(slide){
		//if scrolling to the end
		/*if(currentSlide==SLIDES-1)
			scrollTo(0);*/
		
		//top offset of next slide
		var loc = $('.slide[data-slide="' + slide + '"]').offset().top;
		//calculate the amount of time to scroll for
		var time = Math.abs(500*(slide-currentSlide));
		//animate
		/*if(time<800*SLIDES/4)
			$("body,html").animate({scrollTop: loc},time,"easeOutExpo");
		else */
		$("body,html").animate({scrollTop: loc},time);
	}
	
	//moves the header to center the current slide
	function updateLinks(){
		//LINK_WIDTH * SLIDES    D
		//___________________ = ___
		//        ratio          y
		var left = (W/2) - (LINK_WIDTH/2) - LINK_WIDTH*SLIDES*y/D;
		//Half the page - half the link width - ratio
		$("#header table").css({
			marginLeft:left+6
		});
	}
	
	//sets the current slide
	function setCurrentSlide(){
		currentSlide = Math.floor(y/H);
	}
	
	//when to scroll the document
	$(document).ready(function(){
		
		//Find links with class button
		var button = $(".button");
		//when a button is clicked
		button.click(function(){
			//get new slide number
			var slide = $(this).attr("data-slide");
			scrollTo(slide);
			/*animate();*/	
		});
		
		//when an arrow key is pressed
		$(document).keydown(function(e){
			//if left or up keys are pressed
    		if ((e.keyCode == 37 || e.keyCode == 38) && currentSlide!=0) {
       			scrollTo(currentSlide-1);
      			return false;
    		}
			//if the right or down keys are pressed
			else if ((e.keyCode == 39 || e.keyCode == 40) && currentSlide!=SLIDES-1) { 
       			scrollTo(currentSlide+1);
      			return false;
    		}
			//avoid scrolling when the space bar is pressed
			else if (e.keyCode == 32) {
				scrollTo(currentSlide+1);
				//e.preventDefault();
				return false;	
			}
			/*else
				return false;*/
		});
		
		//override mousewheel functions to be scrollTo()
		/*$(document).bind("mousewheel", function(e) {
			//e.preventDefault();
			//e.stopPropagation();
			//if(e.originalEvent.wheelDelta<-100)alert(e.originalEvent.wheelDelta);
			//return false;
			if(e.originalEvent.wheelDelta > 100) {
				scrollTo(currentSlide-1);
				return false;
			}
			else if(e.originalEvent.wheelDelta<-100){
				scrollTo(currentSlide+1);
				return false;
			}
			return true;
    	});*/
		
		//other random events
		
		//sliding pages
		//get all elements with class slide
		var side = $(".side");
		side.click(function(){
			//get the slide of the element
			var slide = $(this).attr("data-slide");
			//-1 for right || +1 for left || 0 for middle
			var dir = $(this).attr("side");
			var bdir, udir;
			//if it is going to the right
			if(dir=="right"){ bdir=0; udir=-200; 
				//slide the right in
				$('.two-infobar-right[data-slide="' + slide +'"]').animate({ "margin-left":W-300 },300);
				//slide the left out
				$('.two-infobar-left[data-slide="' + slide +'"]').animate({ "margin-left":-300 },300);
				//fade the right side out and left side in
				$('.two-sidebar-left').animate( { opacity:1 },300);
				$('.two-sidebar-right').animate( { opacity:0 },300);
				//the background is not set
				twoSet = false;
			}
			//if it is going to the left
			else if(dir=="left"){ bdir=600; udir=200; 
				//slide the right out
				$('.two-infobar-right[data-slide="' + slide +'"]').animate({ "margin-left":W },300);
				//slide the left in
				$('.two-infobar-left[data-slide="' + slide +'"]').animate({ "margin-left":0 },300);
				//fade the left side out and right side in
				$('.two-sidebar-left').animate( { opacity:0 },300);
				$('.two-sidebar-right').animate( { opacity:1 },300);
				//the background is not set
				twoSet = false;
			}
			//if it is in the middle
			else { bdir = 300; udir=0 
				//slide the right out
				$('.two-infobar-right[data-slide="' + slide +'"]').animate({ "margin-left":W },300);
				//slide the left out
				$('.two-infobar-left[data-slide="' + slide +'"]').animate({ "margin-left":-300 },300);
				//fade both side bars in
				$('.two-sidebar-left').animate( { opacity:1 },300);
				$('.two-sidebar-right').animate( { opacity:1 },300);
				//the background is reset
				twoSet = true;
			}
			//udir is bdir-300
			//move the background over and blur/unblur it // "-webkit-filter": "blur("+blur+"px)"
			$('.background[data-slide="' + slide +'"]').animate({ "left":-300+bdir },300/*,"easeOutExpo"*/);
			//move the center title over8
			$('ul.two[data-slide="' + slide +'"]').animate({ "margin-left":-350+udir },300/*,"easeOutExpo"*/);
		});
				
	});
	
	
	
	//what to do when a scroll happens
	$(document).scroll(function(){
		y = $(document).scrollTop();
		setCurrentSlide();
		
		//SLIDE 0
		$("#title").css({ opacity : 1-(2*y/H) });
		$("#scroll").css({
			"-webkit-animation": "none",
			"animation": "none",
			opacity : 1-(2*y/H) 
		});
		//put the seal into place
		placeSeal();
		//pause the video if it is past slide 0
		if(currentSlide>=1) document.getElementById("bgvid").pause();
		else document.getElementById("bgvid").play();
		
		//TWO SIDE SLIDES
		//if it is not already set then set it back
		if(!twoSet)
			$( 'span.two[side="middle"]' ).trigger( "click" );
			
		//LAST SLIDE
		/*
		if(currentSlide == SLIDES-1 ){
			//('.background').css({ opacity: 1-(y-currentSlide*H)/H });
			//all background besides the first and last
			//last shouldnt exist anyway
			//for(var i = 1; i<SLIDES-1; i++){
			//	$('.background[data-slide="' + i +'"]').css({ opacity:1-(y-currentSlide*H)/H });
			//}
		}*/
		//ALL SLIDES
		fixBackground();
		if(y>=0)updateLinks();
	});
	
	//fixes the current slide's background in place
	function fixBackground(){
		//for all slides past the current one (speed purposes)
		for(var i = currentSlide-1; i<SLIDES; i++){
			//get the distance from the top of the window
			var dTop = H*i, wTop = dTop-y;
			//if it has not reached the top of the window
			if(wTop>0){
				//set the top to be equal to the distance scrolled
				//this mimics scrolling
				$('.background[data-slide="' + i +'"]').css({ "top":wTop });
				//for all the classes make sure it doesnt have .background-fixed
				//this is for scrolling back up
				$('.background[data-slide="' + i +'"]').removeClass("background-fixed");
			}
			//if its the last slide make it scroll up normally
			/*else if(currentSlide==SLIDES){
				$('.background[data-slide="' + currentSlide + '"]').addClass("background-fixed");
				var place = 2 * (y - currentSlide*H);
				$('.background[data-slide="' + i +'"]').css({ "top":0-place });	
			}*/
			//if it reaches the top of the screen
			else {
				//if it reaches the top of the screen give it .background-fixed
				$('.background[data-slide="' + currentSlide + '"]').addClass("background-fixed");
				//Make sure the the background is exactly on the top then
				//make it scroll slower than the other slide
				var place = .1 * (y - currentSlide*H);
				$('.background[data-slide="' + i +'"]').css({ "top":0-place });
			}
		}
	}
	
	function placeSeal(){
		//if the page is scrolled at all
		if(y>=2){
			//move the seal to the header
			$("#seal").addClass("seal-header");
			$("#seal").css({"position":"fixed"});
			//animate the header showing up
			$("#header").animate({
				top:0,
				"display":"inline"
			},300);
		}
		//at the top of the page/reset
		else if(y<2) {	
			//if the page is moved back put the seal back
			$("#seal").removeClass("seal-header");
			$("#seal").css({"position":"absolute"});
			//move the header back up
			$("#header").animate({"top":-175},300);
		}
	}
	

}