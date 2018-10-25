
$(function(){
	
	//喜欢切换
	$('.main_all').on('click','.main_list_follow',function(){
		$(this).toggleClass('main_list_followOn');  //toggleClass() 对设置或移除被选元素的一个或多个类进行切换。
	})
	
	//删除这条文章
	$('.main_all').on('click','.Js_del',function(){
			$(this).parents('.main_list').fadeOut(300,function(){
				$(this).remove();
			});
	});
	
	//点击回应
	$('.main_all').on('click','.Js_apply',function(){
		$(this).parents('.main_list').find('.main_list_talk').slideToggle();
	})
	
	//评论
	$('.main_all').on('click','.main_list_text input',function(){
		
		var text=$(this).siblings('textarea').val();
		var html='';
		html+='<li>';
		html+='<em><a href="###">吾哈哈:</a></em>';
		html+='<p>'+text+'</p>';
		html+='<span><a class="Js_talk_del" href="javascript:void(0)">删除</a><a class="Js_talk_res" href="javascript:void(0)">回复</a></span>';
		html+='</li>';
		$(this).parent().siblings('ul').append(html);
		$(this).siblings('textarea').val('').focus();
	});
	
	//删除评论
	$('.main_all').on('click','.Js_talk_del',function(){
		$(this).parents('li').fadeOut(200,function(){
			$(this).remove();
		});;
	});
	
	//评论回复
	$('.main_all').on('click','.Js_talk_res',function(){
		var name=$(this).parent().siblings('em').text();
		$(this).parents('ul').siblings('.main_list_text').find('textarea').val('@'+name).focus();
	});
	
	//图片放大
	$('.main_all').on('click','.main_detail_imgImg',function(){
		var imgW=parseInt($(this).width());
		if(imgW<=200){
			$(this).css({width:'auto',float:'none',display:'block'});
		}else{
			$(this).css({width:'200px',float:'left',display:'block'});
		};
		var scrH=$(this).offset().top;
		$('html,body').animate({scrollTop:scrH},200);
	});
	
	//视频播放
	$('.main_all').on('click','.main_detail_videoImg',function(){
		var videoUrl=$(this).siblings('.main_detail_videoM').find('div').attr('data');
		var video="<embed src='"+videoUrl+"' allowFullScreen='true' quality='high' width='510' height='400' align='middle' allowScriptAccess='always' type='application/x-shockwave-flash'></embed>";
		$(this).hide();
		$(this).siblings('.main_detail_videoM').show();
		$(this).siblings('.main_detail_videoM').find('div').html(video);	
	});
	//视频关闭
	$('.main_all').on('click','.main_v_xx',function(){
		$(this).parents('.main_detail_videoM').hide();
		$(this).parents('.main_detail_videoM').find('div').html('');
		$(this).parents('.main_detail_videoM').siblings('.main_detail_videoImg').show();
	})
	
	
	//整体图放大缩小
	$('.main_all').on('click','.main_detail_images',function(){
		var liW=parseInt($(this).find('li:first').width());
		if(liW==100){
			$(this).find('li').css({width:'100%',float:'none',height:'auto'});
			$(this).find('img').css({width:'auto'});
		}else{
			$(this).find('li').css({width:'100px',float:'left',height:'100px'});
			$(this).find('img').css({width:'100px'});
		};
		var scrH=$(this).offset().top;
		$('html,body').animate({scrollTop:scrH},200);
	})
	
	
	//模拟滚动下拉刷新出新的内容
	$(window).scroll(function(){
		var winH=$(window).height();//可视高度;
			webH=$('html').height();//网页实际高度;
			scrH=$('body').scrollTop()+$('html').scrollTop();//body支持chrome,html支持ie和火狐;滚动条高度
			if(scrH>=webH-winH){
				$.get('js/list.txt',function(data){
					var html='';
					html+='<div class="main_list">';
					html+='<a class="main_list_header" href="###"><img src="'+data.img+'" width="58" height="58"></a>';
					html+='<div class="main_list_M">';
					html+='<div class="main_list_top">';
					html+='<em class="main_list_userName"><a href="###">'+data.useName+'</a></em>';
					html+='<em class="main_list_follow"><a href="javascript:void(0)">喜欢</a></em>';					html+='<em class="main_list_share"><a href="###">转载</a></em>';
					html+='</div>';
					html+='<h3 class="main_list_tit"><a href="###">'+data.title+'</a></h3>';
					html+='<div class="main_detail">';
					html+='<div class="main_detail_img">';
					html+=data.detail;
					html+='</div>';
					html+='</div>';
					html+='<div class="main_list_time">'+data.time[0]+'<br>'+data.time[1]+'<br>发自'+data.time[2]+'</div>';
					html+='<div class="main_list_other">';
					html+='<dl class="main_list_tag">';
					html+='<dt>标签:</dt>';
					for(var i=0;i<data.tag.length;i++){
						html+='<dd><a href="###">#'+data.tag[i]+'</a></dd>';
					}
					html+='</dl>';
					html+='<div class="main_list_do">';
					html+='<a class="Js_apply" href="javascript:void(0)">回应</a>';
					html+='<a href="###">编辑</a>';
					html+='<a class="Js_del" href="javascript:void(0)">删除</a>';
					html+='</div>';
					html+='</div>';
					html+='</div>';
					html+='<div class="main_list_talk" style="display:none">';
					html+='<i></i>';
					html+='<div class="main_list_text">';
					html+='<textarea></textarea>';
					html+='<input type="button" value="回应">';
					html+='</div>'
					html+='<ul>';
					html+='</ul>';
					html+='</div>';
					html+='</div>';
					$('.main_all').append(html);
				},'json');
			};	
	});
	
	//搜索
	$('.main_serach_text').focus(function(){
		$(this).parent().addClass('main_serach_on')
	})
	$('.main_serach_text').blur(function(){
		$(this).parent().removeClass('main_serach_on')
	})
	$('input[focusValue]').each(function(){
		$(this).focus(function(){
			var value=$.trim($(this).val());
			if(value==$(this).attr('focusValue')){
				$(this).val('');
			}
		})
		$(this).blur(function(){
			var value=$.trim($(this).val());
			if(value==''){
				$(this).val($(this).attr('focusValue'));
			}
			$(this).siblings('span').hide();
		})
	})
	$('form').each(function(){
		$(this).submit(function(){;
			var attrText=$(this).find('input[focusValue]').attr('focusValue');
			var valText=$.trim($(this).find('input[focusValue]').val());
			if(valText==''||valText==attrText){
				
				$(this).find('span').show();
				$(this).find('input[focusValue]').focus();
				return false;
			}
		})
	})
	
	//公告等
	$('.main_info span').click(function(){
		if ($(this).text()=="-"){
			$(this).text('+');
			$(this).parents('.main_info').css({paddingBottom:'0px'});
			$(this).parents('.main_info').find('ul').slideToggle();
		}else{
			$(this).text('-');
			$(this).parents('.main_info').css({paddingBottom:'30px'});
			$(this).parents('.main_info').find('ul').slideToggle();
		}
	})
	

	
});

//发布页面
$(function(){
	$('.public_tag input').focus(function(){
		var value=$.trim($(this).val());
		var attrVal=$(this).attr('valueVal');
		if(value==attrVal){
			$(this).val('').css('color','#000');
		}
	});
	$('.public_tag input').blur(function(){
		var value=$.trim($(this).val());
		var attrVal=$(this).attr('valueVal');
		if(value==''){
			$(this).val(attrVal).css('color','#999999');
		}
	});
	
	$('.public_tag input').keyup(function(event){
		if(event.keyCode==13){//回车键
			inputVal($(this));
		}
	})
	
	$('.public_tag input').keydown(function(event){
		if(event.keyCode==32){//空格键
			inputVal($(this));
		}
	})
	
	function inputVal(obj){
		var value=$.trim(obj.val());
		var bool=1;//1表示没有重复，0表示重复
		$('.public_tag ul li').each(function(){
			var text=$.trim($(this).text());
			text=text.substring(0,text.length-1);
			if(text==value){
				bool=0;
				alert('你输入的标签有重复');
				return false;//停止each循环
			}
		})
		if(bool==1){
			$('.public_tag ul').append('<li>'+value+'<i>×</i></li>');
			obj.val('');
		}
	}
})