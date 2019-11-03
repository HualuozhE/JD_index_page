/*
*
* CN_Name: ---===Carousel轮播图模块===---
*
* Name: Carousel Module
*
* By: HualuozhE
*
* QQ: 540776612
*
* Version: 1.3
* Update-time: 2019年11月3日20:16:02
*
* !!!===Help Document:
*
* 1.布局图，一定要按照这种布局。
* 2.结构对就行了，只要把box[也就是最外面的那个包裹轮播图的元素]元素传入构造函数，里面的元素都会自动查找。
* -----------------------------------------------------========================================-=-=-=**********
*
* [box] ---------最外面的盒子。一般是div
*
*     [screen] ---------这是相框，也就是图片显示的区域
*         [ul] ------------这是ul，就是画幕。移动的就是这玩意儿。
*             [li][/li] ------这是里面的li就是轮播的图片，里面可以放img，里面放什么都无所谓。
*             [li][/li]
*             ...
*         [/ul]
*         [ol][/ol] ------------这是轮播图里面的小点点。
*     [/screen]
*
*     [arrow] ----------这是两边的双箭头。这玩意儿如果display: none 里面的箭头也会消失。---不要这东西的话可以不传
*         [left][/left] --------顺序一定要对，第一个元素会被绑定成left按钮，添加left的事件
*         [right][/right] --------第二个就是right
*     [/arrow]
*
* [/box]
*
* * -----------------------------------------------------======================================-=-=-=**********
*
*
*
* 3.传入参数：--------------------------------------------------important！！！！！！！！！！！！！！！！！！！
* Carousel( box, currentClassName, autoPlayDelay, duration, aniType);
*
* box和currentClassName必传。其他可忽略
* box**: 就是包裹轮播图的那层盒子，需要传入这个元素。
* currentClassName**：就是轮播图下面小点点，点亮后应用的类样式的名字。
* autoPlayDelay[可忽略，默认值1500ms]: 就是轮播图自动滚动的间隔
* duration[可忽略，默认值700ms]：放完一次动画持续的事件。
* aniType[可忽略，默认值ease-in-out]：设置过渡的动画类型。
*
* 动画类型介绍：
* linear： 线性过渡。等同于贝塞尔曲线(0.0, 0.0, 1.0, 1.0)
* ease： 平滑过渡。等同于贝塞尔曲线(0.25, 0.1, 0.25, 1.0)
* ease-in： 由慢到快。等同于贝塞尔曲线(0.42, 0, 1.0, 1.0)
* ease-out： 由快到慢。等同于贝塞尔曲线(0, 0, 0.58, 1.0)
* ease-in-out： 由慢到快再到慢。等同于贝塞尔曲线(0.42, 0, 0.58, 1.0)【默认值】
*
*
* */


(function (win) {
    //创建构造函数
    function Carousel(box, currentClassName, autoPlayDelay, duration, aniType) {
        if (!(box instanceof Element)) {
            alert("构造函数中第一个参数传入的值不是元素！！！By：Carousel Module");
            return;
        }
        this.box = box;
        this.screen = box.children[0];
        this.ulObj = box.children[0].children[0];
        this.liObj = box.children[0].children[0].children;
        this.imgWidth = box.children[0].children[0].children[0].offsetWidth;
        this.olObj = box.children[0].children[1];
        this.arr = box.children[1] || false;
        this.left = (box.children[1] && box.children[1].children[0]) || false;
        this.right = (box.children[1] && box.children[1].children[1]) || false;
        this.duration = duration || 600;
        this.aniType = aniType || "ease-in-out";
        this.currentClassName = currentClassName;
        this.autoPlayDelay = autoPlayDelay || 2500;
        this.index = 0;

        //动画回调函数
        this.aniCallBack = {
            // 默认可点击
            click: true
        }
    }

    //Carousel构造函数暴露给Window对象
    win.Carousel = Carousel;

    //开始轮播图
    Carousel.prototype.bind = function () {
        this.base();
        this.init();
        if (this.arr) {
            this.buttonClick();
            this.mouseoverHidden();
        } else {
            this.joinStopTimer();
        }
        this.autoplay();
    };

    //初始化
    Carousel.prototype.init = function () {
        var imgWidth = this.imgWidth;
        var ulObj = this.ulObj;
        var that = this;

        if (!ulObj) {
            console.log("ulObj无意义");
            return false;
        }
        ulObj.addEventListener("transitionend", function (e) {
            this.style.transition = "none";
            that.aniCallBack.click = true;
            that.aniCallBack.ff && that.aniCallBack.ff();
        }, false);

        //增加一张图用于无缝轮播
        var beforeEle = getElementLastChildByParent(ulObj);
        var afterEle = getElementFirstChildByParent(ulObj);
        ulObj.appendChild(afterEle.cloneNode(true));
        ulObj.insertBefore(beforeEle.cloneNode(true), ulObj.children[0]);

        //初始化margin-left值，以便做无缝
        ulObj.style.marginLeft = -imgWidth + "px";

        //初始化UL长度
        ulObj.style.width = ulObj.children.length * imgWidth + "px";
    };

    //基础小点轮播图base,也可以没有小点
    Carousel.prototype.base = function () {
        var i = 0;
        var olObj = this.olObj;
        var that = this;
        var liObj = this.liObj;
        if (!olObj) {
            console.log("没有小点");
            this.maxindex = liObj.length - 1;
            return false;
        }
        //添加ol的个数,并把olli的点击事件添加上去
        for (i = 0; i < liObj.length; i++) {
            var olli = document.createElement("li");
            olli.setAttribute("index", i.toString());
            olObj.appendChild(olli);
            addEventListener("mouseover", olli, function () {
                that.index = parseInt(this.getAttribute("index"));
                that.removeClassName();
                this.className = that.currentClassName;
                that.animation(-that.index * that.imgWidth);
            });

        }

        //初始化current选中状态
        olObj.children[0].className = that.currentClassName;

        //初始化maxindex的值
        that.maxindex = i - 1;
    };

    //添加左右按钮点击事件
    Carousel.prototype.buttonClick = function () {
        if (!this.arr) {
            return false;
        }
        var right = this.right;
        var left = this.left;
        addEventListener("click", right, this.rightClickHandle.bind(this));
        addEventListener("click", left, this.leftClickHandle.bind(this));
    };

    //添加right按钮点击事件处理函数
    Carousel.prototype.rightClickHandle = function () {
        var olObj = this.olObj;
        var ulObj = this.ulObj;
        var imgWidth = this.imgWidth;

        if (!this.aniCallBack.click) return false;

        this.aniCallBack.click = false

        if (this.index === this.maxindex) {
            this.index = 0;
            this.aniCallBack.ff = function () {
                ulObj.style.transform = "none";
                this.ff = false;
            };
            this.animation(-(this.maxindex + 1) * imgWidth);

        } else {
            this.index++;
            this.animation(-this.index * imgWidth);
        }

        if (olObj) {
            olObj && this.removeClassName() || (olObj.children[this.index].className = this.currentClassName);
        }
    };

    //添加left按钮点击事件处理函数
    Carousel.prototype.leftClickHandle = function () {
        var olObj = this.olObj;
        var ulObj = this.ulObj;
        var imgWidth = this.imgWidth;
        var that = this;

        if (this.index === 0) {
            this.index = this.maxindex;
            this.aniCallBack.ff = function () {
                ulObj.style.transform = "translate(" + -that.maxindex * imgWidth + "px)";
                this.ff = false;
            };
            this.animation(imgWidth);
        } else {
            this.index--;
            this.animation(-this.index * imgWidth);
        }

        if (olObj) {
            olObj && this.removeClassName() || (olObj.children[this.index].className = this.currentClassName);
        }
    };

    //添加鼠标进入隐藏按钮的原型方法
    Carousel.prototype.mouseoverHidden = function () {
        var arr = this.arr;
        if (!arr) {
            console.log("没有接收到arr按钮的有效值");
            return false;
        }
        //注册鼠标进入box的事件，显示按钮
        addEventListener("mouseover", this.box, function () {
            this.timeId && clearInterval(this.timeId) || (this.timeId = 0);
            this.arr.style.display = "block";
        }.bind(this));
        //注册鼠标 离开box的事件，隐藏按钮
        addEventListener("mouseout", this.box, function () {
            this.autoplay();
            this.arr.style.display = "none";
        }.bind(this));
    };

    //添加鼠标进入显示区域停止计时器的原型方法
    Carousel.prototype.joinStopTimer = function () {

        addEventListener("mouseover", this.box, function () {
            this.timeId && clearInterval(this.timeId) || (this.timeId = 0);
        }.bind(this));

        addEventListener("mouseout", this.box, function () {
            this.autoplay();
        }.bind(this));
    };

    //动画函数，自动绑定ulObj版本
    Carousel.prototype.animation = function (targetX) {
        var ulObj = this.ulObj;
        if (!ulObj) {
            console.log("没有接收到ulObj有效值！");
            return false;
        }
        ulObj.style.transition = "transform " + this.duration + "ms " + this.aniType;
        ulObj.style.transform = "translate(" + targetX + "px)";
    };

    //自动播放
    Carousel.prototype.autoplay = function () {
        this.timeId = setInterval(this.rightClickHandle.bind(this), this.autoPlayDelay);
    };

    // //动画回调函数
    // Carousel.prototype.aniCallBack = {};//原型共享数据惹得bug，。解释[给以后又犯傻的我来看]：：：
    /*
    * 原型共享数据也就是说
    * var a = new Carousel();
    * var b = new Carousel();
    * a.autoplay === b.autoplay;  结果是true
    * 又因为
    * 我这里采用的异步方式比较特别，利用事件来回调，需要一个复杂类型的数据才能完成回调，因为复杂类型传递的是地址。
    * 然而现在由于原型的关系，这两个实例对象中的方法指向是一样的，导致我用来的回调的复杂类型的内存地址其实在两个实例对象中是一样的，
    * 他们两个实例对象往同一个地址里进行传递回调函数，是冲突的。所以会导致，偶现动画未完成就归零位。
    * 这个问题为什么函数封装测试阶段没发现？
    * 因为测试阶段只测试了单个轮播图，并没有试多个。
    *
    * 解决方案？
    * 直接扔到构造函数去就行了。
    *
    *
    * */

    //删除所有的ol里面li的class
    Carousel.prototype.removeClassName = function () {
        var olObj = this.olObj;
        var i = 0;
        if (!olObj) {
            console.log("olObj无意义！");
            return false;
        }
        for (i = 0; i < olObj.children.length; i++) {
            olObj.children[i].removeAttribute("class");
        }
    };

}(window));