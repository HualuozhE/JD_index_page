window.onload = function () {

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
    (function () {
        var centerBanner = new Carousel(my$("jd-inc2-screen"), "jd-current",3000,700);
        centerBanner.bind();
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
        var ani = new Carousel(my$("kill-bd-one-arr").parentElement, 0, 4000, 750);
        ani.bind();
    }());


    //右侧小轮播图
    (function () {
        var smailCarousel = new Carousel(my$("kill-bd-two-screen"),"kill-bd-two-screen-current",2000,600);
        smailCarousel.bind();
    }());


}
