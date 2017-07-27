
// util  wei_chen
//全是原生编写，用ctrl+F进行全局匹配查找，如找原生ajax，浏览器兼容
//返回对象子元素数量
function chen_getEleNumber(idname){
      return ((document.getElementById(idname)).getElementsByTagName("*")).length;
}
//返回对象所有子元素
function chen_getChildEle(idname){
      return (document.getElementById(idname)).getElementsByTagName("*");
}
//返回对象下某标签子元素组
function chen_getTagChildEle(idname,tagname){
      return (document.getElementById(idname)).getElementsByTagName(tagname);
}

//使某个隐藏元素产生智能悬停效果，防止元素display被设置成none，防止原元素的top和margin-top已经被设置
function chen_makeEleMove(idname){
  var bar= document.getElementById(idname);
  bar.style.display="block";
  bar.style.position="absolute";
  bar.style.visibility="hidden";
  var bar_origintop=bar.offsetTop;
  window.onscroll=function(){
    var win_top=document.body.scrollTop;
    if(win_top>=bar_origintop){
      bar.style.visibility="visible";
      bar.style.position="fixed";
      bar.style.top=0;
      bar.style.marginTop=0;
    }else{
      bar.style.visibility="hidden";
      bar.style.position="absolute";
      bar.style.top=bar_origintop;
      bar.style.marginTop=bar_origintop;
    }};}
//让表格元素的某1行显示隐藏,找td用firstChild,等价于$("#tableHide").find("tr").eq(i).hide()
function chen_hiddenshowtr(tableid,i,sta){
  var table = document.getElementById(tableid);
  var tr = table.getElementsByTagName("tr")[i];
  tr.style.display=sta;
}
//为原生js写hover函数
function chen_hover(id,mouseenter,mouseleave){
  document.getElementById(id).onmouseenter = mouseenter;
  document.getElementById(id).onmouseleave = mouseleave;
}
//删除子元素,同时删除自己本身
function chen_removeall(idname){
  var self=document.getElementById(idname);
  self.parentNode.removeChild(self);
}

//原生js写empty函数,删除子元素,保留自身
function chen_empty(idname)
{
    var parent = document.getElementById(idname);
    while(parent.hasChildNodes()) //当div下还存在子节点时 循环继续
    {
        parent.removeChild(parent.firstChild);
    }
}

//ajax 中判断有没有xmlhttprequest
//主要是IE和Mozilla、Opera、Safari 大部分非IE的浏览器的区别
//IE（ 使用的是XMLHttp对象，IE7统一了 ）
//较新的IE版本创建Msxml12.XMLHTTP对象
//var xmlhttp=ActiveXobject("Msxml12.XMLHTTP");
//较老的IE版本创建Microsoft.XMLHTTP对象
//var xmlhttp=ActiveXobject("Microsoft.XMLHTTP");
function chen_createXHR(){
    if(typeof XMLHttpRequest != "undefined"){
      return new XMLHttpRequest();
    }else if (typeof ActiveXObject != "undefined") {
      if(typeof arguments.callee.activeXString !="string"){
        var versions = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],
        i,len;
        for(i = 0,len = versions.length;i<len;i++){
          try{
            new ActiveXObject(versions[i]);
            arguments.callee.activeXString = versions[i];
            break;
          }catch(ex){
            console.log("create xhr function throw error");
          }}}
      return new ActiveXObject(arguments.callee.activeXString);
    }else{
      throw new Error("no XHR object availble.");
    }
}

//ajax让url携带数据，解决拼接的字符串编码问题
function addURLParam(url,name,value) {
    url+=(url.indexOf("?")==-1)?"?":"&";
    url+=encodeURIComponent(name)+"="+encodeURIComponent(value);
    return url;
}

//ajax的get方法
function chen_ajaxGet(url,callback) {
    // var ajax=new XMLHttpRequest();
    var ajax = chen_createXHR();
    ajax.open('GET',url,true);
    ajax.timeout=3000;
    ajax.ontimeout=function () {
      console.log("times are too long");
    };
    ajax.send(null);
    ajax.onreadystatechange=function(){
        if(ajax.readyState==4){
            if(ajax.status>=200 && ajax.status<300 || ajax.status==304){
                callback(ajax.responseText);
            }else{callback(null);}
        }};}

//ajax的post方法 ，get也类似
function chen_ajaxPost(url,data,callback) {
    var ajax = chen_createXHR();
    ajax.open('POST',url,true);
    ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    ajax.send(data);
    ajax.onreadystatechange=function(){
        if(ajax.readyState==4){
            if(ajax.status>=200 && ajax.status<300 || ajax.status==304){
                callback(ajax.responseText);
            }else{callback(null);}
        }};}

//原生js一些方法的兼容性考虑（主要针对IE6、7、8）
//考虑到上面那个小组件需要获取到高度，写了这个
//http://www.jb51.net/article/32874.htm

   //有时经常用到
   function offsetTL(obj){//获取元素内容距离浏览器边框的距离（含边框）
        var ofL=0,ofT=0;
        while(obj){
            ofL+=obj.offsetLeft+obj.clientLeft;
            ofT+=obj.offsetTop+obj.clientTop;
            obj=obj.offsetParent;
        }
        return{left:ofL,top:ofT};
   }

   //网页可见区域宽
   function chen_winSeeWidth(obj){
      return document.body.clientWidth||document.docuemntElement.clientWidth;
   }
   //网页可见区域宽
   function chen_winSeeHeight(obj){
     return document.body.clientHeight||document.docuemntElement.clientHeight;
   }
   //以上为不包括边框的宽高，如果是offsetWidth或者offsetHeight的话包括边框


   //整个网页正文的宽
   function chen_winFullWidth(obj){
      return document.body.scrollWidth||document.docuemntElement.scrollWidth;
   }
   //整个网页正文的高
   function chen_FullHeight(obj){
      return document.body.scrollHeight||document.docuemntElement.scrollHeight;
   }
   //网页被卷去的高
   function chen_scrollTop(obj){
      return document.body.scrollTop||document.docuemntElement.scrollTop;
   }
   //网页左卷的距离
   function chen_scrollLeft(obj){
    return document.body.scrollLeft||document.docuemntElement.scrollLeft;
   }
   //屏幕分辨率的高
   var screenH=window.screen.height;
   //屏幕分辨率的宽
   var screenW=window.screen.width;
   //浏览器窗口相对于屏幕的x坐标（除了FireFox）
   var screenX=window.screenLeft;
   //FireFox相对于屏幕的X坐标
   var screenXX=window.screenX;
   //浏览器窗口相对于屏幕的y坐标（除了FireFox）
   var screenY=window.screenTop;
   //FireFox相对于屏幕的y坐标
   var screenYY=window.screenY;


   //DOM节点获取相关，主要兼容IE 6 7 8
   function chen_nextNode(obj){//获取下一个兄弟节点
      if (obj.nextElementSibling) {
        return obj.nextElementSibling;
      } else{
        return obj.nextSibling;
        }
   }

   function chen_preNode(obj){//获取上一个兄弟节点
      if (obj.previousElementSibling) {
        return obj.previousElementSibling;
      } else{
        return obj.previousSibling;
        }
   }

   function chen_firstNode(obj){//获取第一个子节点
      if (obj.firstElementChild) {
        return obj.firstElementChild;//非IE678支持
      } else{
        return obj.firstChild;//IE678支持
        }
   }

   function lastnode(obj){//获取最后一个子节点
      if (obj.lastElementChild) {
        return obj.lastElementChild;//非IE678支持
      } else{
        return obj.lastChild;//IE678支持
        }
   }

   //设计监听事件
   //添加事件监听，三个参数分别为 对象、事件类型、事件处理函数，默认为false
   function chen_addEvent(obj,type,fn){
      if (obj.addEventListener) {
          obj.addEventListener(type,fn,false);//非IE
      } else{
          obj.attachEvent('on'+type,fn);//ie,这里已经加上on，传参的时候注意不要重复加了
      }
   }
  //移除事件监听
  function removeEvent(obj,type,fn){
      if (obj.removeEventListener) {
          obj.removeEventListener(type,fn,false);//非IE
      } else{
          obj.detachEvent('on'+type,fn);//ie，这里已经加上on，传参的时候注意不要重复加了
      }
  }

//这个部分主要是针对video封装一些可以用到的方法，包括播放、暂停、控制大小
   function chen_videoControl(obj){ //还是接收id
      var myVideo=document.getElementById(obj);
      
      //暂停或播放
      myVideo.playPause(){ 
	if (myVideo.paused) 
	  myVideo.play(); 
	else 
  	  myVideo.pause(); 
	}   
       //缩小到320宽 
       myVideo.makeSmall(){ 
	  myVideo.width=320; 
       } 
       //420宽 
       myVideo.makeNormal(){ 
	  myVideo.width=420; 
       }
       //560宽 
       myVideo.makeBig(){ 
	  myVideo.width=560; 
       }  

   }


//快速排序
function chen_quickSort(array){
    function sort(prev, numsize){
        var nonius = prev;
        var j = numsize -1;
        var flag = array[prev];
        if ((numsize - prev) > 1) {
            while(nonius < j){
                for(; nonius < j; j--){
                    if (array[j] < flag) {
                        array[nonius++] = array[j];　//a[i] = a[j]; i += 1;
                        break;
                    };
                }
                for( ; nonius < j; nonius++){
                    if (array[nonius] > flag){
                        array[j--] = array[nonius];
                        break;
                    }
                }
            }
            array[nonius] = flag;
            sort(0, nonius);
            sort(nonius + 1, numsize);
        }
    }
    sort(0, array.length);
    return array;
}

//原生js实现移动端的tap
function chen_makeMobileTap() {
    if (!HTMLElement.prototype.addTapEvent) {
        HTMLElement.prototype.addTapEvent = function(callback) {
            var tapStartTime = 0,
                tapEndTime = 0,
                tapTime = 500, //tap等待时间，在此事件下松开可触发方法
                tapStartClientX = 0,
                tapStartClientY = 0,
                tapEndClientX = 0,
                tapEndClientY = 0,
                tapScollHeight = 15, //水平或垂直方向移动超过15px测判定为取消（根据chrome浏览器默认的判断取消点击的移动量)
                cancleClick = false;
            this.addEventListener('touchstart', function() {
                tapStartTime = event.timeStamp;
                var touch = event.changedTouches[0];
                tapStartClientX = touch.clientX;
                tapStartClientY = touch.clientY;
                cancleClick = false;
            })
            this.addEventListener('touchmove', function() {
                var touch = event.changedTouches[0];
                tapEndClientX = touch.clientX;
                tapEndClientY = touch.clientY;
                if ((Math.abs(tapEndClientX - tapStartClientX) > tapScollHeight) || (Math.abs(tapEndClientY - tapStartClientY) > tapScollHeight)) {
                    cancleClick = true;
                }
            })
            this.addEventListener('touchend', function() {
                tapEndTime = event.timeStamp;
                if (!cancleClick && (tapEndTime - tapStartTime) <= tapTime) {
                    callback();
                }
            })
        }
    }
}


//程序休眠几秒;会导致页面一直处于加载状态
  javaSleep(numberMillis) {
  var now = new Date();
  var exitTime = now.getTime() + numberMillis;
  while (true) {
    now = new Date();
    if (now.getTime() > exitTime)
      return;
  }
}

//数组去重复项
  uniqueArr(arr) {
    let result = [], hash = {};
    for (let i = 0, elem; (elem = arr[i]) != null; i++) {
      if (!hash[elem]) {
        result.push(elem);
        hash[elem] = true;
      }
    }
    return result;
  }

