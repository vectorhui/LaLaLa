window.onload = function () {
    var oContainer = document.querySelector("#container");
    var oMain = document.querySelector("#main");
    var aDesc = oMain.querySelectorAll(".desc");
    var oNav = document.querySelector("#nav");
    var oUl = oNav.querySelector("ul");
    var aLi = oUl.querySelectorAll("li");

    var aBar = document.getElementsByClassName("anm-bar");

    var H = document.documentElement.clientHeight;

    var barList = ["85%", "80%", "75%", "70%", "65%", "90%"];

    var navList = [
        ["Info", "I"],
        ["Skills", "S"],
        ["Project", "P"],
        ["Work", "W"]
    ];

    var disD = 0;
    var disS = 0;
    var disM = 0;
    var x = 0;
    var currentIndex = 0;
    var scrollRunning = false;




    function doAnimate() {

        for (let i = 0; i < aBar.length; i++) {
            aBar[i].style.width = barList[i];
        };
    }


    function init() {

        oContainer.style.height = H + "px";

        for (var i = 0; i < aDesc.length; i++) {
            aDesc[i].style.height = H + "px";
        };

        if (document.hasOwnProperty("ontouchstart")) {
            oMain.addEventListener("touchstart", tStart, false);
            oMain.addEventListener("touchmove", tMove, false);
            oMain.addEventListener("touchend", tEnd, false);
        } else {
            oMain.addEventListener("mousewheel", fnM, false);
        }
    }

    init();






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
        var dir = ev.wheelDelta;

        if (scrollRunning === false && dir < 0 && currentIndex < 3) {
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
        disS = ev.changedTouches[0].pageY;

    }

    function tMove(ev) {
        if (!scrollRunning) {
            var ev = ev || window.event;
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
        disM = ev.changedTouches[0].pageY - disS;
        if (disM < -100 && currentIndex < 3 && scrollRunning === false) {
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


}