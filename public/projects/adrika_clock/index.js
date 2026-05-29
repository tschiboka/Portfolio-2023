// DATE AND TIME FUNCS
const addZeros = num => (Number(num) <= 9 && Number(num) >= 0 ? "0" : "") + num; // eg: 1 becomes 01

const getDate = (date = new Date) => ({ day: date.getDate(), month: date.getMonth() + 1, year: date.getUTCFullYear(), dayOfWeek: date.getDay() });

function setDate({ day, month, year, dayOfWeek } = getDate()) {
    const days = "SUN,MON,TUE,WED,THU,FRI,SAT".split(","), dateTxt = `${addZeros(day)}. ${addZeros(month)}. ${year} ${days[dayOfWeek]}`;
    document.getElementById("date").innerHTML = dateTxt;
}

const getTime = (date = new Date) => ({ hour: date.getHours(), min: date.getMinutes(), sec: date.getSeconds() })

function setTime({ hour, min, sec } = getTime()) {
    const timeDigits = [...`${addZeros(hour)}:${addZeros(min)}:${addZeros(sec)}`];
    if (timeDigits === "00:00:00") setDate();

    timeDigits.map((digit, i) => document.getElementById(`digit${i + 1}`).innerHTML = digit);
}

// LOAD OPTIMALISATION

function introProgressBar(tot, curr) {
    const calcPercentage = () => ((100 / tot) * curr).toFixed(2);
    const percent = calcPercentage(tot, curr);

    document.getElementById("intro__progress").style.width = percent + "%";
    document.getElementById("intro__progress__txt").innerHTML = addZeros(percent) + "%";

    if (percent >= 100) {
        document.querySelector(".watercolor_bg").style.display = "block";
        document.querySelector(".intro__progressbar").style.display = "none";
    }
}


function loadImage(selector, url, callback) {
    try {
        const img = new Image();
        img.src = url;

        img.onload = function () {
            document.querySelector(selector).style.backgroundImage = `url(${this.src})`;
            typeof callback === 'function' && callback();
        };

        img.onerror = () => document.querySelector(".intro__progressbar h1").innerHTML = `ERROR: ${url} NOT FOUND`;

        return img;
    } catch (error) { console.log(error); }
}

function preLoadImages() {
    const imageObjs = [
        { selector: ".watercolor_bg",/*    */ url: "images/watercolor_bg.png" },
        { selector: ".clockface", /*       */ url: "images/analog-clockface.png" },
        { selector: ".clock-helperline",/* */ url: "images/clock_helperline.png" },
        { selector: ".arc1",/*             */ url: "images/arc1.png" },
        { selector: ".arc2",/*             */ url: "images/arc2.png" },
        { selector: ".lion",/*             */ url: "images/line_lion.png" },
        { selector: ".palmtree",/*         */ url: "images/line_palmtree.png" },
        { selector: ".watercolor-pink",/*  */ url: "images/line_watercolor-pink.png" },
        { selector: ".nails",/*            */ url: "images/line_nails.png" },
        { selector: ".galaxy",/*           */ url: "images/line_galaxy.png" },
        { selector: ".butterfly-blue",/*   */ url: "images/butterfly_blue.png" },
        { selector: ".butterfly-purple",/* */ url: "images/butterfly_purple.png" },
        { selector: ".face",/*             */ url: "images/face.png" },
        { selector: "#photo1",/*           */ url: "images/photo1.png" }, // load only the first, to reduce loading time
    ];
    let imagesLoaded = 0;

    imageObjs.forEach((imgObj, i, a) => loadImage(imgObj.selector, imgObj.url, () => introProgressBar(a.length, ++imagesLoaded)));
}

// START AND PHOTO TOGGLING

var currPhoto = 0;
var photosLoaded = false;

function togglePhotos() {
    currPhoto++;

    document.querySelectorAll(".photo").forEach(photo => photo.style.visibility = "hidden");

    if (currPhoto <= 10) {
        document.getElementById("photo-holder").style.visibility = "visible";

        const photoDiv = document.getElementById("photo" + currPhoto);
        photoDiv.style.visibility = "visible";
        photoDiv.style.backgroundImage = `url(images/photo${currPhoto}.png)`;
    }
    else {
        document.getElementById("photo-holder").style.visibility = "hidden";
        currPhoto = 0;
    }

    if (!photosLoaded) {
        const photos = [
            { selector: "#photo2", url: "images/photo2.png" },
            { selector: "#photo3", url: "images/photo3.png" },
            { selector: "#photo4", url: "images/photo4.png" },
            { selector: "#photo5", url: "images/photo5.png" },
            { selector: "#photo6", url: "images/photo6.png" },
            { selector: "#photo7", url: "images/photo7.png" },
            { selector: "#photo8", url: "images/photo8.png" },
            { selector: "#photo9", url: "images/photo9.png" },
            { selector: "#photo10", url: "images/photo10.png" },
        ];
        photos.forEach((imgObj, i, a) => loadImage(imgObj.selector, imgObj.url, () => introProgressBar(a.length, ++imagesLoaded)));
        photosLoaded = true;
    }
}

function start() {
    preLoadImages();
    setDate();
    setTime();

    setInterval(() => setTime(), 1000); // start clock

    document.getElementsByClassName("face")[0].addEventListener("click", togglePhotos);
}

start();