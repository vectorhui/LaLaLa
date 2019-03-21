window.onload = function () {
    var oContainer = document.querySelector("#container");
    var oMain = document.querySelector("#main");
    var aDesc = oMain.querySelectorAll(".desc");
    var oNav = document.querySelector("#nav");
    var oUl = oNav.querySelector("ul");
    var aLi = oUl.querySelectorAll("li");


    var aProjectLi = oMain.querySelectorAll(".project-list");
    var aMark = oMain.querySelectorAll(".mark");

    var aBar = document.getElementsByClassName("anm-bar");

    var H = document.documentElement.clientHeight;

    var barList = ["85%", "80%", "75%", "70%", "65%", "90%"];

    var navList = [
        ["Info", "I"],
        ["Skills", "S"],
        ["Project", "P"],
        ["Work", "W"],
        ["Contact", "C"]
    ];

    var disD = 0;
    var disS = 0;
    var disM = 0;
    var x = 0;
    var currentIndex = 0;
    var scrollRunning = false;
    var pages = aDesc.length;




    function doAnimate() {

        for (let i = 0; i < aBar.length; i++) {
            aBar[i].style.width = barList[i];
        };
    }


    function init() {

        oContainer.style.height = H + "px";

        for (var i = 0; i < pages; i++) {
            aDesc[i].style.height = H + "px";
        };

    }

    init();

    oMain.addEventListener("touchstart", tStart, false);
    oMain.addEventListener("touchmove", tMove, false);
    oMain.addEventListener("touchend", tEnd, false);
    oMain.addEventListener("mousewheel", fnM, false);

    function doScroll(obj, dir) {

        if (dir < 0) {
            currentIndex++;
        } else {
            currentIndex--;
        }
        scrollRunning = true;
        obj.style.top = -currentIndex * H + "px";
        obj.style.transition = "0.5s";
        changeNav(currentIndex);
        setDebounce();
    }

    function setDebounce() {
        setTimeout(function () {
            scrollRunning = false;
        }, 500);
    }

    function fnM(ev) {
        var _this = this;
        var ev = ev || window.event;
        ev.preventDefault();
        var dir = ev.wheelDelta;

        if (scrollRunning === false && dir < 0 && currentIndex < pages - 1) {
            doScroll(_this, dir);
            if (currentIndex === 1) {
                doAnimate();
            }
        } else if (scrollRunning === false && dir > 0 && currentIndex > 0) {
            doScroll(_this, dir);
            if (currentIndex === 1) {
                doAnimate();
            }
        }
    }

    function tStart(ev) {
        var ev = ev || window.event;
        ev.preventDefault();

        disS = ev.changedTouches[0].pageY;

    }

    function tMove(ev) {
        if (!scrollRunning) {
            var ev = ev || window.event;
            ev.preventDefault();
            disM = ev.changedTouches[0].pageY - disS;
            x = disD + disM;
            if (x >= 0) {
                x = 0;
            };
            this.style.top = x + "px";
        }

    }

    function tEnd(ev) {
        var ev = ev || window.event;
        ev.preventDefault();
        disM = ev.changedTouches[0].pageY - disS;
        if (disM < -100 && currentIndex < (pages - 1) && scrollRunning === false) {
            currentIndex++;
            scrollRunning = true;
            this.style.top = -(currentIndex) * H + "px";
            this.style.transition = "0.5s";
            changeNav(currentIndex);
            setDebounce();

            if (currentIndex === 1) {
                doAnimate();
            }

        } else if (disM > 100 && currentIndex > 0 && scrollRunning === false) {
            currentIndex--;
            scrollRunning = true;
            this.style.top = -(currentIndex) * H + "px";
            this.style.transition = "0.5s";
            changeNav(currentIndex);
            setDebounce();

            if (currentIndex === 1) {
                doAnimate();
            }
        } else {
            this.style.top = -(currentIndex) * H + "px";
        }
        disD = parseInt(this.style.top);
    }


    function changeNav(n) {
        clearNav();
        aLi[n].className = "active";
        aLi[n].innerHTML = navList[n][0];
    }

    function clearNav() {
        for (let i = 0; i < aLi.length; i++) {
            aLi[i].className = "";
            aLi[i].innerHTML = navList[i][1];
        }
    }

    for (let i = 0; i < aLi.length; i++) {
        aLi[i].onclick = function () {
            currentIndex = i;
            oMain.style.top = -i * H + "px";
            oMain.style.transition = "0.5s";
            changeNav(i);
            if (currentIndex === 1) {
                doAnimate();
            }
        }
    }

/* 
    for (let i = 0; i < aProjectLi.length; i++) {
        aProjectLi[i].onmouseover = function (ev) {

            var ev = ev || window.event;
            var mX = ev.clientX;
            var mY = ev.clientY;

            var T = aProjectLi[i].offsetTop;
            var B = T + aProjectLi[i].offsetHeight;
            var L = aProjectLi[i].offsetLeft;
            var R = L + aProjectLi[i].offsetWidth;

            var pT = Math.abs(mY - T);
            var pB = Math.abs(mY - B);
            var pL = Math.abs(mX - L);
            var pR = Math.abs(mX - R);

            var minDis = Math.min(pT, pB, pL, pR);

            function doMove(n) {
                aMark[n].style.top = "0%";
                aMark[n].style.left = "0%";
                aMark[n].style.transition = "0.5s";
            }

            switch (minDis) {
                case pT: //鼠标移入方向为上方移入

                    aMark[n].style.top = "-100%";   //把div定位到父级元素上方
                    aMark[n].style.left = "0%";

                    aMark[n].style.top = "0%";
                    aMark[n].style.transition = "0.5s";  //滑动div

                    console.log('上')
                    break;
                case pB:
                    doMove(i);

                    console.log('下')
                    break;
                case pL:
                    doMove(i);

                    console.log('左')
                    break;
                case pR:
                    doMove(i);

                    console.log('右')
            }


        }
    } */


}