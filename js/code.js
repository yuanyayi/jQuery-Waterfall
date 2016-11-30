$(function(){
	$(window).on("load", function(){
		imgLocation();
		var dataImg={'data':[{'src':'011.jpg'},{'src':'012.jpg'},{'src':'013.jpg'},{'src':'014.jpg'},{'src':'015.jpg'},{'src':'016.jpg'}]};
		// 滚至边缘自动加载部分代码
		$(window).resize(function(){
			// console.log('resizeing');
			imgLocation();
		});
		window.onscroll=function(){
			if(scrollside())
			{
				// console.log('scrolling')
				$.each(dataImg.data, function(index,element){
					// 动态加载图片
					var box=$('<div>').addClass('box').appendTo($('#container')),
						content=$('<div>').addClass('content').appendTo(box);
					// 测试图片路径是否正确加载了
					// console.log('./img/'+$(element).attr('src'));
					// 路径正确，将图片加载进页面
					$('<img>').attr("src",'img/'+$(element).attr('src')).appendTo(content);
				});
				// 重新添加图片格式
				imgLocation();
			}
		};
	});
});

// 滚动到边缘？
function scrollside(){
	var box=$(".box"),
		// 最后一张图片的高度
		lastboxHeight=box.last().get(0).offsetTop+Math.floor(box.last().height()/2),
		// 当前容器的高度
		documentHeight=$(document).width(),
		// 选择临界点
		scrollHeight=$(window).scrollTop();
	// 是否允许加载取决于：
	// console.log(lastboxHeight+';'+scrollHeight+';'+documentHeight);
	return (lastboxHeight<scrollHeight+documentHeight)?true:false;
}

// 瀑布流布局代码
function imgLocation(){
	var box=$(".box"),
		// box的定宽
		boxWidth=box.eq(0).width(),
		// 每一排能放下的盒子个数
		num=Math.floor($(window).width()/boxWidth),
		// 缓存用数组
		boxArray=[];

	// console.log(num+';'+$(window).width());
	box.each(function(index,element){
		// console.log(index+","+element);
		// 每个盒子的高度
		var boxHeight=box.eq(index).height();
		// 判断：是否为第一排
		if(index<num)
		{
			$(element).css({
				'top':0,
				'left':index*boxWidth
			});
			boxArray[index]=boxHeight;
			// console.log(boxHeight);
		}
		else
		{
			// 从上一行中选出最短的列
			var minboxHeight=Math.min.apply(null,boxArray);
			// console.log('minboxHeight:'+minboxHeight);
			// 最短列的位置
			var minboxIndex=$.inArray(minboxHeight,boxArray);
			// console.log(minboxIndex+','+minboxHeight);
			// 通过位置进行摆放
			$(element).css({
				'position':'absolute',
				'top':minboxHeight,
				// 待完成：需要重新定义宽度！！！
				// 'left':box.eq(minboxIndex).position().left
				'left':minboxIndex*boxWidth
			});
			// console.log(minboxHeight+';'+box.eq(minboxIndex).position().left);
			boxArray[minboxIndex]+=box.eq(index).height();
		}
	});
}