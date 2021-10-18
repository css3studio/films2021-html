/*
Theme Name: npo-pan
Author: css3studio
Version:1.0
*/
var device_status = "";
var $ = jQuery;
$(window).resize(function() {
	var dw = viewport().width;
	if(dw <= 768 && device_status == "pc"){	//PC에서 모바일로 변경시
		$("body").removeClass('pc');
		$("body").addClass('mobile');
		init_mobile();
		device_status = "mobile";
	}else if(dw > 768 && device_status == "mobile"){	//모바일에서 PC로 변경시
		$("body").removeClass('mobile');
		$("body").addClass('pc');
		init_pc();
		device_status = "pc";
	}
});

/* 메뉴고정 */
$(window).scroll(function(e){

	if ($(window).scrollTop() > 100) {
		$("body.pc").addClass("scrolling");
	} else {
		$("body.pc").removeClass("scrolling");
	}
});

$(document).ready(function() {

	var dw = viewport().width;
	if(dw <= 768){	//모바일
		$("body").removeClass('pc');
		$("body").addClass('mobile');
		init_mobile();
		device_status = "mobile";
	}else{	//PC
		$("body").removeClass('mobile');
		$("body").addClass('pc');
		init_pc();
		device_status = "pc";
	}

    //슬라이더 스틸컷
	$('.slider-stillcut .slider').on('init', function(event, slick) { //생성완료 후 보여줌
		 $('.slider-stillcut .slider').css('visibility','visible');
	});
    $('.slider-stillcut .slider').slick({
    	dots: true,
    });

    //슬라이더 멀티 4개
	$('.slider-multiple01 .slider').slick({
		slidesToShow: 4,
		slidesToScroll: 4,
		dots: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			}
		]
   	});
    //슬라이더 멀티 3개
	$('.slider-multiple02 .slider').slick({
		slidesToShow: 3,
		slidesToScroll: 3,
		dots: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
   	});
    //구독하기
    $(".newsletter-area form").on('submit', function(event) {
        var input = $("input",$(this));
        if(input.val().trim() == ""){
            alert("이메일 주소를 입력해 주세요");
            input.focus();
            event.preventDefault();
        }
        else
		    event.preventDefault();
    });
	//인트로 영상 제어
    if(getCookie("no_more_intro") != 'true' && $('.popup-player').length > 0){
        $('.popup-player').slideDown();
        setTimeout(function(){
            $('.popup-player a.toggle').click();
            $(".popup-player video")[0].play();
        },10);
    }
    $('.popup-player a.toggle').on("click",function(event) {
        if($(this).hasClass('mute')){
            $(this).removeClass('mute')
            $(".popup-player video").prop('muted', true)
        }else{
            $(this).addClass('mute')
            $(".popup-player video").prop('muted', false)
        }
    });
    $('.popup-player .close-area .skip').on("click",function(event) {
        $(".popup-player video")[0].pause();
        $('.popup-player').slideUp();
    });
    $('.popup-player .close-area .no-more').on("click",function(event) {
        $(".popup-player video")[0].pause();
        $('.popup-player').slideUp();
        //쿠키 저장
        setCookie("no_more_intro", 'true', 30);
    });

    //역대영화제 탭메뉴
    $('.menu-tab01 ul > li > a').on("click",function(event){
        $(".menu-tab01 ul > li").removeClass("current");
        $(this).parent().addClass("current");
        var target = $(this).attr('href');
        $('.tab-data-area > div').hide();
        $('.tab-data-area > div' + target).show();
		event.preventDefault();
    });
    //이미지 가로-세로 비율 - jquery
    $('img').each(function() {
        var img = new Image();
        img.src = $(this).attr('src');
        var this_img = $(this);
        img.onload = function() {
            var fillClass = (img.height > img.width)
                    ? 'fillheight' : 'fillwidth';
            this_img.addClass(fillClass);
        };
    });

});


//PC버젼 초기화
var is_mouse_on_sub = false;
function init_pc(){
	$("body.mobile header .menu-mobile li.menu a").off();
    $("body.mobile .menu-main > li.expanded > a").off();

	//서브메뉴 마우스 오버시 부모메뉴 active
    $('header ul.menu-main > li > ul').on("mouseenter",function() {
        $(this).parent().addClass('active');
    });
    $('header ul.menu-main > li > ul').on("mouseleave",function() {
        $(this).parent().removeClass('active');
    });

	//헤더 LNB 메뉴(PC)
	$("ul.menu-main > li > a").on("mouseenter",function(){
		//if($('.cf01').css('display') == "block")	return false;
		setTimeout(function(){
			if(is_mouse_on_sub)	$('header').addClass('open-menu');
	  	},300);
	});
	$("header .nav-area").on("mouseleave",function(){
		setTimeout(function(){
			if(!is_mouse_on_sub)	$('header').removeClass('open-menu');
	  	},300);
	});
	$("header nav").on("mouseenter",function(){
	  	is_mouse_on_sub = true;
	});
	$("header nav").on("mouseleave",function(){
		is_mouse_on_sub = false;
	});


}
//모바일 버젼 초기화
function init_mobile(){
	$('header ul.menu-main > li > ul').off();
	$("ul.menu-main > li > a").off();
	$("header .nav-area").off();
	$("header nav").off();

	//헤더 LNB 메뉴(mobile)
	$("body.mobile header .menu-mobile li.menu a").on("click",function(event){
		if($("header").hasClass('open-mobile-menu')){
			$("header").removeClass('open-mobile-menu');
		}else{
			$("header").addClass('open-mobile-menu');
		}
		event.preventDefault();
	});
	$("body.mobile .menu-main > li.expanded > a").on("click",function(event){
		if($(this).parent().hasClass('current')){
			$(this).parent().removeClass('current');
		}else{
			$(this).parent().addClass('current');
		}
		event.preventDefault();
	});

    //슬라이더 멀티 4개
    if($('.container02 .list-thumb01 .slick-list').length < 1){
        $('.container02:not(.classic-list) .list-thumb01').slick({
            dots: true,
            slidesToShow: 1,
            slidesToScroll: 1
        });
    }


}

function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}

function numberPad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

//쿠키
function setCookie(cookieName, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var cookieValue =
    escape(value) + (exdays == null ? "" : "; expires=" + exdate.toGMTString());
    document.cookie = cookieName + "=" + cookieValue;
}
function deleteCookie(cookieName) {
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
}
function getCookie(cookieName) {
    cookieName = cookieName + "=";
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cookieName);
    var cookieValue = "";
    if (start != -1) {
    start += cookieName.length;
    var end = cookieData.indexOf(";", start);
    if (end == -1) end = cookieData.length;
    cookieValue = cookieData.substring(start, end);
    }
    return unescape(cookieValue);
}


