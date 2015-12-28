var winWidth = $(window).width();

function initPic($dom) {
    var pics = $dom.data("pics"),
        picNum = pics.length;
    showSmallPic($dom,pics,picNum);
}

function showSmallPic($dom,pics,picNum) {
    if (picNum == 1) {
        $dom.children().removeClass("hidden").addClass("single-pic").css("background-image", "url(" + pics[0]._id + ")").attr("value","0").on("click",function(){
                showBigPic($(this),pics,picNum)
            });
    } else if (picNum) {
        for (var i = 0; i < picNum; i++) {
            var sample0 = $dom.children().eq(0),
                sample = sample0.clone(true);
            sample.removeClass("hidden").css("background-image", "url(" + pics[i]._s + ")").appendTo($dom).attr("value",i);
            sample.on("click",function(){
                showBigPic($(this),pics,picNum)
            });
            if (i == (picNum - 1)) {
                sample0.remove();
            }
        };
    }
}

function showBigPic ($clickDom,pics,picNum) {
    var picIndex = $clickDom.attr("value");
    if (!$("#pics-out-container").length) {
        var ele = '<div id="pics-out-container"> <div id="curNumBox"><div id="curNum">1/1</div></div><div id="pics-inner-container"> <i></i> <img src="" alt=""> </div> </div>';

        $(ele).appendTo("body");
        $("#pics-out-container").on("click",function(){
            $("#pics-out-container").remove()
        })

        var imgClone0 = $("#pics-inner-container img").eq(0);
        for (var i = 0; i < picNum; i++) {
            var imgClone = imgClone0.clone(true);
            imgClone.attr("src",pics[i]._id).appendTo("#pics-inner-container");
            if (i == (picNum - 1)) {
                imgClone0.remove();
            };
        };
    };
    $("#curNum").text((picIndex * 1 + 1) + "/" + picNum);
    var slideDomParent = $("#pics-inner-container");
    slideChange($clickDom,slideDomParent);
    slideDomParent.css("transform","translateX(" + (-(winWidth - 2) * picIndex + 1) + "px)")
    slideDomParent.width(winWidth * picNum)
    slideDomParent.find("img").width(winWidth - 22);
}

function slideChange ($clickDom,slideDomParent) {
    console.log("bind slideChange")
    var alreadyMoved = true;
    var touchx = 0;
    var touchy = 0;
    var threshold = 70;

    slideDomParent.unbind('touchstart').bind('touchstart', function(e) {
        console.log("start")
        if (alreadyMoved) {
            var touch = e.originalEvent.touches[0];
            touchx = touch.pageX;
            touchy = touch.pageY;
            alreadyMoved = false;
        }
    });

    slideDomParent.unbind('touchmove').bind('touchmove', function(e) {
        if (!alreadyMoved) {
            var release = e.originalEvent.changedTouches[0];
            var releasedAt = release.pageX;
            var releasedAt2 = release.pageY;
            var slideLength = releasedAt - touchx;
            var slideLength2 = touchy - releasedAt2;
            console.log("slideLength:" + slideLength + ",slideLength2:"+slideLength2)
            if (Math.abs(slideLength2) < Math.abs(slideLength)) {
                console.log(slideLength + ">" + threshold)
                if (slideLength > threshold && Math.abs(slideLength2) < 50) {
                    showPrev($clickDom);
                    alreadyMoved = true;
                }
                else if (slideLength < -threshold && Math.abs(slideLength2) < 50) {
                    showNext($clickDom);
                    alreadyMoved = true;
                }
            }
        }
    });
    slideDomParent.unbind('touchcancel');
    slideDomParent.unbind('touchend').bind('touchend', function(e) {
        var alreadyMoved = true;
        var touchx = 0;
        var touchy = 0;
    });
}

function showNext($clickDom) {
    // console.log("next")
    if ($clickDom.next().length) {
        $clickDom.next().click();
    };
}
function showPrev($clickDom) {
    // console.log("prev")
    if ($clickDom.prev().length) {
        $clickDom.prev().click();
    };
}
