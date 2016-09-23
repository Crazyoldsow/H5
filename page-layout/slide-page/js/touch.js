//    $(function(){
//        $("body").on("touchstart",function(){
//            e.preventDefault();
//            startX = e.originalEvent.changeTouches[0].pageX;
//            startY = e.originalEvent.changeTouches[0].pageY;
//        });
//        $("body").on("touchmove",function(){
//            e.preventDefault();
//            moveEndX = e.originalEvent.changeTouches[0].pageX;
//            moveEndY = e.originalEvent.changeTouches[0].pageY;
//            X = moveEndX - startX;
//            Y = moveEndY - startY;
//            if(Math.ads(X)>Math.abs(Y) && x>0){
//                console.log("left to right")
//            }else if (Math.abs(X)>Math.abs(Y) && X<0){
//                console.log("right to left")
//            }else if(Math.abs(X)<abs(Y) && Y>0){
//                console.log("bottom to top")
//            }else if (Math.abs(X)<abs(Y) && Y<0){
//                console.log("top to bottom")
//            }else{
//                console.log("just touch ")
//            }
//        })
//    })



 
    //返回角度
    function GetSlideAngle(dx, dy) {
        return Math.atan2(dy, dx) * 180 / Math.PI; //转化为弧度制
    }

//根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
function GetSlideDirection(startX, startY, endX, endY) {
    var dy = startY - endY;
    var dx = endX - startX;
    var result = 0;

    //如果滑动距离太短
    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        return result;
    }

    var angle = GetSlideAngle(dx, dy);
    if (angle >= -45 && angle < 45) {
        result = 4;
    } else if (angle >= 45 && angle < 135) {
        result = 1;
    } else if (angle >= -135 && angle < -45) {
        result = 2;
    }
    else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 3;
    }

    return result;
}
$.fn.getAngle = function(){
    document.addEventListener('touchstart', function (ev) {
        ev.preventDefault();
        startX = ev.touches[0].pageX;
        startY = ev.touches[0].pageY;   
    }, false);
    document.addEventListener('touchend', function (ev) {
        var endX, endY;
        ev.preventDefault();
        endX = ev.changedTouches[0].pageX;
        endY = ev.changedTouches[0].pageY;
        var direction = GetSlideDirection(startX, startY, endX, endY);
        switch (direction) {
            case 0:
                //没滑动
                console.log("nono")
                return false;
                break;
            case 1:
                //上滑
                return "上滑"
                break;
            case 2:
                //下滑
                return "下滑"
                break;
            case 3:
               //左滑
                console.log("左滑")
                break;
            case 4:
              //右滑
                console.log("右滑")
                break;
            default:            
        }
    }, false);
}
