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


const owo_ui={
    G:function(str){
        if(typeof str==="object"){return str;}
        else{
            switch(str[0]){
                case ".":const a =document.getElementsByClassName(str.slice(1));if(a.length>0){return a;}else{console.error("找不到class为"+str.slice(1)+"的元素！     ——owo_ui");}break;
                case "#":const b =document.getElementById(str.slice(1));if(b){return b;}else{console.error("找不到id为"+str.slice(1)+"的元素！     ——owo_ui");}break;
                default :const c =document.getElementsByTagName(str);if(c.length>0){return c;}else{console.error("找不到标签为"+str.slice(1)+"的元素！     ——owo_ui");}break;
            }
        }
    },
    //-------------------------让一个元素逐渐消失-------------------------
    //参数1.    欲操作元素的元素标识  参数2.完成的会掉  参数3.持续时间(500)
    //实例下载：http://xn--9tr.com/demo/puge/fadeOut.html
    fadeOut:function (target,oncomplete,time){target = G(target);if(!time) time = 500;const start = (new Date()).getTime();function animate(){const elapsed = (new Date()).getTime()-start;const fraction = elapsed/time;if(fraction < 1){const opacity = 1 - Math.sqrt(fraction);target.style.opacity = String(opacity);setTimeout(animate,Math.min(25,time-elapsed));}else{target.style.opacity ="0";if(oncomplete) oncomplete(target);}}animate();},
    //-------------------------给一个元素添加水波纹特效-------------------------
    //参数1.    欲操作元素的class  参数2.水波纹的颜色  参数3.水波扩散速度
    //注意：    元素的css：canvas {opacity: 0.25;position: absolute;width :100%;height :100%;top: 0;left: 0;}  上层元素css：div{position: relative;}
    //实例下载：http://xn--9tr.com/demo/puge/waterRipple.html
    waterRipple:function (dom,color,increment) {let centerX = 0, centerY = 0, context = {}, element = {}, radius = 0;const requestAnimFrame = function () {return (window.requestAnimationFrame       ||window.mozRequestAnimationFrame    ||window.oRequestAnimationFrame      ||window.msRequestAnimationFrame ||function (callback) {window.setTimeout(callback, 1000 / 60);});} ();const draw = function () {context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);context.fillStyle = color;context.fill();radius += increment ;if (radius < element.width) {requestAnimFrame(draw);}};const press = function (event) {element = event.toElement;context = element.getContext('2d');radius = 0;centerX = event.offsetX;centerY = event.offsetY;context.clearRect(0, 0, element.width, element.height);context.beginPath();draw();};const containers = Array.prototype.slice.call(document.getElementsByClassName(dom));for (var i = 0; i < containers.length; i += 1) {let canvas = document.createElement('canvas');canvas.addEventListener('click', press, false);containers[i].appendChild(canvas);canvas.width  = canvas.offsetWidth;canvas.height = canvas.offsetHeight;}}

}