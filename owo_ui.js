    "use strict";
    //－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
    // [参数]           target         disappearDirection       time      changeResult 
    // [含义]           目标元素      过渡项目width or height     变化时间       改变至      
    // [重要性]           必填                必填                 可选         可选  
    // [默认值]            无                 无                   1            0   
    // [类型 or 单位]  字符串 or DOM          字符串                数值         整数  
    //－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
    
    function sizeTransition(target,disappearDirection,time,changeResult) {
        changeResult=changeResult||0;time=changeResult||1;
        if(typeof target === "string") target=document.getElementById(target);
        if(target){
            if (typeof time === "number") {
                target.style.cssText="transition:"+disappearDirection+" "+time+"s; -moz-transition:"+disappearDirection+" "+time+"s;-webkit-transition:"+disappearDirection+" "+time+"s;-o-transition:"+disappearDirection+" "+time+"s;";
                switch (disappearDirection){
                    case "width": target.style.width=changeResult;break;
                    case "height": target.style.height=changeResult;break;
                    default:console.error("owo_ui [sizeTransition:"+"disappearDirection属性可以接受的值只有字符串 'width' 和 'height']");break;
                }
                if(changeResult === 0) setTimeout(function() {target.style.display = "none";}, time*998);
            }
            else {
                console.error("owo_ui [sizeTransition:"+time+"不是一个数值!]");
            }
        }
        else console.error("owo_ui [sizeTransition:"+"参数1 不是一个可操作的DOM对象并且取不到id为 参数1 的元素!]");
    }
	//                     给图片加上特效     
    //－－－－－－－－－－－－－－－－－－－－－－－－－－－－
    // [参数]           target         attribute    value
    // [含义]           目标元素         特效        值
    // [重要性]           必填           必填       必填
    // [默认值]            无            无          无
    // [类型 or 单位]  字符串 or DOM    字符串      字符串
    //－－－－－－－－－－－－－－－－－－－－－－－－－－－－
	
	//－－－－－－－－－－－attribute－－－－－－－－－－－－
	//  [种类]      grayscale        blur      saturate       sepia       hue-rotate    invert   brightness  contrast
	//  [含义]        灰度           模糊       饱和度        老化         色相旋转    底片效果    高亮        均衡
	// [接受值]  0-1 or 1%-100%    0px-100px   0%-1000%   0-1 or 1%-100%  0deg-360deg    0-1      0%-1000%      0-1
	function grayscale(target,attribute,value){
        if(typeof target === "string") {target=document.getElementById(target);}
		if(target.tagName!=="IMG"){console.log("你输入的元素不是图片哦!");return;}
		target.style.cssText="filter: "+attribute+"("+value+");-webkit-filter: "+attribute+"("+value+");-moz-filter: "+attribute+"("+value+");-o-filter: "+attribute+"("+value+");-ms-filter: "+attribute+"("+value+");";
	}
	

	