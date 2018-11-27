//event头部banner广告的x点击的事件
my$("J_head_banner_close").onclick = function () {
    completeAnimate(my$("J_head_banner"), {"height": 0}, function () {
        document.body.removeChild(my$("J_head_banner"));
    })
};

//随机LOGO
my$("J_logo").style.backgroundImage = "url(images/logo-gif" + parseInt(Math.random() * 4 + 1) + ".gif)";

//shortcut的二维码事件
my$("J_shortcut_qrcode").onmouseover = function () {
    var div = document.createElement("div");
    div.className = "qrcode-complete";
    div.id = "J_qrcode_complete";
    div.innerHTML = "<div><div class='inner'><img src='images/qr_code.png'><span>京东</span></div></div><div><div class='inner'><img src='images/qr_code.png'><span>京东</span></div></div><div><div class='inner'><img src='images/qr_code.png'><span>京东</span></div></div>";
    this.appendChild(div);
};
my$("J_shortcut_qrcode").onmouseout = function () {
    this.removeChild(getElementLastChildByParent(this));
};

//search搜索框的焦点事件
my$("J_search").onfocus = function () {
    if (this.value === "微软平板电脑") {
        this.value = "";
        this.style.color = "#222";
    }
};
my$("J_search").onblur = function () {
    if (this.value.length === 0) {
        this.value = "微软平板电脑";
        this.style.color = "#989898";
    }
};


//页面中心的轮播图部分====================================================================================================
//采用CSS3轮播图技术======================================
(function () {
    //初始化变量
    var box = my$("screen").parentNode;
    var screen = my$("screen");
    var list = my$("screen").children;
    var olObj = getNextElementSibling(my$("screen"));
    var arr = my$("arrow");
    var left = my$("left");
    var right = my$("right");
    var index = 0;
    var imgWidth = my$("screen").parentElement.offsetWidth;
    var flag = true;

    //初始化函数
    function mouseoverHandle() {
        removeCurrent();
        this.className = "jd-current";
        index = parseInt(this.getAttribute("index"));
        screen.style.transition = "transform 600ms ease-in-out";
        screen.style.transform = "translate(" + -(index + 1) * imgWidth + "px)";
    }

    function removeCurrent() {
        for (var i = 0; i < olObj.children.length; i++) {
            olObj.children[i].removeAttribute("class");
        }
    }

    function rightEvent() {
        if (!flag) {
            return;
        }
        flag = false;
        setTimeout(function () {
            screen.style.transition = "none 0s";
            if (index === screen.children.length - 2) {
                index = 0;
                screen.style.transform = "translate(-590px)";
                console.log("测试");
            }
            flag = true;
        }, 600);
        index++;
        screen.style.transition = "transform 600ms ease-in-out";
        screen.style.transform = "translate(" + -(index + 1) * imgWidth + "px)";
        if (index === screen.children.length - 2) {
            olObj.children[olObj.children.length - 1].removeAttribute("class");
            olObj.children[0].className = "jd-current";
        } else {
            removeCurrent();
            olObj.children[index].className = "jd-current";
        }
    }


    //初始化小点个数
    for (var i = 0; i < list.length; i++) {
        var liObj = document.createElement("li");
        liObj.setAttribute("index", i);
        olObj.appendChild(liObj);
        //注册事件
        addEventListener("mouseover", liObj, mouseoverHandle);
    }

    //给screen增加一个图，用于轮播图无缝切换
    var firstChild = screen.children[0].cloneNode(true);
    var lastChild = getElementLastChildByParent(screen).cloneNode(true);
    screen.appendChild(firstChild);
    screen.insertBefore(lastChild, screen.children[0]);
    //设置screen宽度等于图片总宽度
    screen.style.width = (olObj.children.length + 2) * imgWidth + "px";
    // screen.style.height = "470px";
    //默认第一个小按钮选中状态
    olObj.children[0].className = "jd-current";

    screen.style.transform = "translate(-590px)";

    addEventListener("click", right, rightEvent);

    addEventListener("mouseover", box, function () {
        arr.style.display = "block";
        clearInterval(timeId);
    });
    addEventListener("mouseout", box, function () {
        arr.style.display = "none";
        timeId = setInterval(rightEvent, 1800);
    });

    var timeId = setInterval(rightEvent, 1800);


}());


// 右侧新闻界面滚动切换TAB
(function () {
    var a1 = my$("jd-tab-hd").children[0];
    var a2 = my$("jd-tab-hd").children[2];
    var content = my$("jd-tab-bd").children[0];
    var index = 0;

    a1.setAttribute("index", "0");
    a2.setAttribute("index", "1");
    var line = my$("jd-tab-hd").children[4];

    function overEvent() {
        completeAnimate(line, {"left": this.offsetLeft - 1,});
        // console.log(this.offsetLeft - 1);
        index = parseInt(this.getAttribute("index"));
        console.log(index);
        completeAnimate(content, {"marginLeft": -index * 160,});
    }

    addEventListener("mouseover", a1, overEvent);
    addEventListener("mouseover", a2, overEvent);
}());


//kill区域时间倒计时（伪效果）
(function () {
    var hours = parseInt(my$("kill-hours").innerHTML);
    var minute = parseInt(my$("kill-minute").innerHTML);
    var second = parseInt(my$("kill-second").innerHTML);
    var time = new Date();
    time.setSeconds(second);
    time.setMinutes(minute);
    time.setHours(hours);
    var timeS = time.valueOf();
    var timeId = setInterval(function () {
        timeS -= 1000;
        time = new Date(timeS);
        my$("kill-hours").innerHTML = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
        my$("kill-minute").innerHTML = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
        my$("kill-second").innerHTML = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
    }, 1000);
}());


//秒杀区的滚动动画
(function () {
    var screen = my$("kill-screen");
    var imgWidth = my$("kill-screen").children[0].offsetWidth;
    var list = my$("kill-screen").children;
    var arr = my$("kill-bd-one-arr");
    var left = my$("kill-bd-one-arr-left");
    var right = my$("kill-bd-one-arr-right");
    var index = 0;


    addEventListener("click", right, function () {
        console.log(list.length);
        if (index === list.length - 1) {
            index = 0;
            screen.style.left = "0px";
        }
        index++;
        thinAnimate(screen, -index * imgWidth);
    });

    addEventListener("click", left, function () {
        console.log(list.length);
        if (index === 0) {
            index = list.length - 1;
            screen.style.left = -index * imgWidth + "px";
        }
        index--;
        thinAnimate(screen, -index * imgWidth);
    });

    screen.appendChild(list[0].cloneNode(true));
    screen.style.width = (list.length) * imgWidth + "px";


}());


//右侧小轮播图
(function () {
    var box = my$("kill-bd-two-screen");
    var ulObj = my$("kill-bd-two-screen").children[0];
    var olObj = my$("kill-bd-two-screen").children[1];
    var list = my$("kill-bd-two-screen").children[0].children;
    var imgWidth = my$("kill-bd-two-screen").offsetWidth;
    var index = 0;
    var flag = true;

    function removeCurrent() {
        for (var i = 0; i < olObj.children.length; i++) {
            olObj.children[i].removeAttribute("class");
        }
    }

    for (var i = 0; i < list.length; i++) {
        var liObj = document.createElement("li");
        liObj.setAttribute("index", i);
        olObj.appendChild(liObj);
        addEventListener("mouseover", liObj, function () {
            if (!flag) {
                return;
            }
            flag = false;
            setTimeout(function () {
                ulObj.style.transition = "none 0s";
                flag = true;
            }, 700);
            ulObj.style.transition = "transform 700ms ease-in-out";
            index = parseInt(this.getAttribute("index"));
            ulObj.style.transform = "translate(" + -index * imgWidth + "px)";
            removeCurrent();
            this.className = "kill-bd-two-screen-current";
        });
    }
    ulObj.appendChild(list[0].cloneNode(true));

    setInterval(function () {
        setTimeout(function () {
            ulObj.style.transition = "none 0s";
            if (index === list.length - 1) {
                index = 0;
                ulObj.style.transform = "translate(0px)";
            }
        }, 700);
        index++;
        ulObj.style.transition = "transform 700ms ease-in-out";
        ulObj.style.transform = "translate(" + -index * imgWidth + "px)";

        if (index === list.length - 1) {
            olObj.children[olObj.children.length - 1].removeAttribute("class");
            olObj.children[0].className = "kill-bd-two-screen-current";
        } else {
            removeCurrent();
            olObj.children[index].className = "kill-bd-two-screen-current";
        }

    }, 1800);


}());