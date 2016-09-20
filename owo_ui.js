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
function pictureEffects(target,attribute,value){
    if(typeof target === "string") {target=document.getElementById(target);}
	if(target.tagName!=="IMG"){console.log("你输入的"+target+"不是图片元素哦!");return;}
	target.style.cssText="filter: "+attribute+"("+value+");-webkit-filter: "+attribute+"("+value+");-moz-filter: "+attribute+"("+value+");-o-filter: "+attribute+"("+value+");-ms-filter: "+attribute+"("+value+");";
}

//                          让一个元素左右抖动     
//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
// [参数]           target         oncomplete    distance     time
// [含义]           目标元素           回调         抖动范围    持续时间   
// [重要性]           必填             必填          可选        可选
// [默认值]            无              无            5          500
// [类型 or 单位]  字符串 or DOM       函数           数值        毫秒
//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
function shake(target,oncomplete,distance,time) {
    var originalStyle = target.style.cssText;
    var start = (new Date()).getTime();
    function animate() {
        var now = (new Date()).getTime();
        var elapsed = now - start;
        var fraction = elapsed/time;
        if(fraction < 1){
            var x =distance * Math.sin(fraction*4*Math.PI);
            target.style.left = x +"px";
            setTimeout(animate,Math.min(25,time-elapsed));
        }
        else {
            target.style.cssText = originalStyle;
            if (oncomplete) oncomplete();
        }
    }
    if(typeof target === "string") target =document.getElementById(target);
    if(!time) time = 500;
    if(!distance) distance = 5;
    target.style.position = "relative";
    animate();

}
//                          让一个元素逐渐消失    
//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
// [参数]           target         oncomplete      time
// [含义]           目标元素           回调         持续时间   
// [重要性]           必填             必填          可选
// [默认值]            无              无            500
// [类型 or 单位]  字符串 or DOM       函数           毫秒
//－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
function fadeOut(target,oncomplete,time){
    if(typeof target === "string") target = document.getElementById(target);
    if(!time) time = 500;
    var start = (new Date()).getTime();
    function animate(){
        var elapsed = (new Date()).getTime()-start;
        var fraction = elapsed/time;
        if(fraction < 1){
            var opacity = 1 - Math.sqrt(fraction);
            target.style.opacity = String(opacity);
            setTimeout(animate,Math.min(25,time-elapsed));
        }
        else{
            target.style.opacity ="0";
            if(oncomplete) oncomplete(target);
        }
    }
    animate();
}