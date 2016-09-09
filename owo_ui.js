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
	//                     
    //－－－－－－－－－－－－－－－－－－－－－－
    // [参数]           target         grayscale
    // [含义]           目标元素         灰度
    // [重要性]           必填           必填
    // [默认值]            无            100%
    // [类型 or 单位]  字符串 or DOM    1%-100%
    //－－－－－－－－－－－－－－－－－－－－－－
	function grayscale(target,grayscale){
        grayscale=changeResult||"100%";
        if(typeof target === "string") target=document.getElementById(target);
		target.style.cssText="filter: grayscale("+grayscale+");-webkit-filter: grayscale("+grayscale+");-moz-filter: grayscale("+grayscale+");-o-filter: grayscale("+grayscale+");-ms-filter: grayscale("+grayscale+");";
	}
	
		//                     
    //－－－－－－－－－－－－－－－－－－－－－－
    // [参数]           target         grayscale
    // [含义]           目标元素         灰度
    // [重要性]           必填           必填
    // [默认值]            无            100%
    // [类型 or 单位]  字符串 or DOM    1%-100%
    //－－－－－－－－－－－－－－－－－－－－－－
	function grayscale(target,grayscale){
        grayscale=changeResult||"100%";
        if(typeof target === "string") target=document.getElementById(target);
		target.style.cssText="filter: grayscale("+grayscale+");-webkit-filter: grayscale("+grayscale+");-moz-filter: grayscale("+grayscale+");-o-filter: grayscale("+grayscale+");-ms-filter: grayscale("+grayscale+");";
	}
	
		//                     
    //－－－－－－－－－－－－－－－－－－－－－－
    // [参数]           target         grayscale
    // [含义]           目标元素        模糊值
    // [重要性]           必填           必填
    // [默认值]            无            5px
    // [类型 or 单位]  字符串 or DOM     像素
    //－－－－－－－－－－－－－－－－－－－－－－
	function blur(target,grayscale){
        grayscale=changeResult||"5px";
        if(typeof target === "string") target=document.getElementById(target);
		target.style.cssText="filter: blur("+grayscale+");-webkit-filter: blur("+grayscale+");-moz-filter: blur("+grayscale+");-o-filter: blur("+grayscale+");-ms-filter: blur("+grayscale+");";
	}
	