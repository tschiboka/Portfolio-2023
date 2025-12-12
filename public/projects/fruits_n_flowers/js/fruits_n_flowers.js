$(document).ready(
    () => {
        // preload pictures while logo animation is running
        preloadPics();

        // set app values from local storage
        setAppValuesFromLocalStorage();

        // post and get views
        requestVisitorsInfo();

        // delay start while logo animation is running
        setTimeout(() => { start(); }, 3000);
    } // end of ready
);




function start() {
    $(".logo").hide();
    $("header, .level-menu, .menu").show();

    // prepare levels
    createLevelTables();
    createLevelPageIndicator();
    setLevelMax();
    styleLevelMenuToCurrenPage();
    addMenuEvents();
    addLevelEvents();
    addInventoryEvents();
    addShopEvents();
    createWalkthroughAndAboutEvents();

    preloadRest(); // preload imgs that are not essencial for the gameplay
} // end of start





function requestVisitorsInfo() {
    const url = "http://localhost:3000/api/visitors";
    const meta = {
        mode: "no-cors",
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    };

    const postVisit = async (url, meta) => {
        try { await fetch(url, meta); }
        catch (err) { console.log(`Error ${err}`) };
    }

    postVisit(url, meta);

    const getVisits = async (url) => {
        try {
            const response = await fetch(url);
            const visits = await response.json();

            app.visits = visits;

            console.log("VISITORS: ", JSON.stringify(app.visits));
            $("#visitors--total").html(visits.total);
            $("#visitors--unique").html(visits.unique);
        } catch (err) { console.log(`Error ${err}`) };
    };

    getVisits(url);
}





function preloadPics() {
    console.log("PRELOAD REST");
    path = [
        "fruits/strawberry",
        "fruits/peach",
        "fruits/plum",
        "fruits/orange",
        "fruits/lime",
        "fruits/apple",
        "fruits/lemon",
        "fruits/kiwi",
        "fruits/blood_orange",
        "walls/rock_wall",
        "walls/stone_sm",
        "walls/stone_md",
        "walls/stone_lg",
        "flowers/flower1",
        "flowers/flower2",
        "flowers/flower3",
        "flowers/flower4",
        "flowers/flower5",
        "misc/basket",
        "misc/diamond",
        "shards/apple_shard1", "shards/apple_shard2", "shards/apple_shard3", "shards/apple_shard4", "shards/apple_shard5",
        "shards/blood_orange_shard1", "shards/blood_orange_shard2", "shards/blood_orange_shard3", "shards/blood_orange_shard4", "shards/blood_orange_shard5",
        "shards/kiwi_shard1", "shards/kiwi_shard2", "shards/kiwi_shard3", "shards/kiwi_shard4", "shards/kiwi_shard5",
        "shards/lemon_shard1", "shards/lemon_shard2", "shards/lemon_shard3", "shards/lemon_shard4", "shards/lemon_shard5",
        "shards/lime_shard1", "shards/lime_shard2", "shards/lime_shard3", "shards/lime_shard4", "shards/lime_shard5",
        "shards/orange_shard1", "shards/orange_shard2", "shards/orange_shard3", "shards/orange_shard4", "shards/orange_shard5",
        "shards/peach_shard1", "shards/peach_shard2", "shards/peach_shard3", "shards/peach_shard4", "shards/peach_shard5",
        "shards/plum_shard1", "shards/plum_shard2", "shards/plum_shard3", "shards/plum_shard4", "shards/plum_shard5",
        "shards/strawberry_shard1", "shards/strawberry_shard2", "shards/strawberry_shard3", "shards/strawberry_shard4", "shards/strawberry_shard5",
        "shards/blood_orange_shard1", "shards/blood_orange_shard2", "shards/blood_orange_shard3", "shards/blood_orange_shard4", "shards/blood_orange_shard5",
        "icons/back-icon", "icons/flower-icon", "icons/info-icon", "icons/intro-icon",
        "icons/padlock-icon", "icons/pause-icon", "icons/restart-icon", "icons/shop-icon",
    ]; // end of fileName

    try {
        path.forEach(p => {
            const picVarName = p.match(/\/.+/g)[0].match(/\w+/)[0],
                img = new Image();

            img.src = `https://tschiboka.com/projects/fruits_n_flowers/images/${p}.png`;
            app.images[picVarName] = img;
        }); // end of forEach path
    } // end of try loading images
    catch (e) {
        throw Error("404 One or more picture couldn't be loaded from server!");
    } // end of catch
} // end of preloadPics




// preload walkthrough gifs
function preloadRest() {
    const path =
        [
            "walkthrough/bonus-I4H", "walkthrough/bonus-I4V", "walkthrough/bonus-I5CR", "walkthrough/bonus-I5X",
            "walkthrough/bonus-L51", "walkthrough/bonus-L52", "walkthrough/bonus-T5", "walkthrough/bonus-T6",
            "walkthrough/destroy-stones", "walkthrough/diamondcreation", "walkthrough/double-explosion",
            "walkthrough/flower-falls", "walkthrough/flower-horizontal-move", "walkthrough/inventory",
            "walkthrough/match-three", "walkthrough/match-I3", "walkthrough/match-I4H", "walkthrough/match-I4V",
            "walkthrough/match-I5", "walkthrough/match-L5", "walkthrough/match-O4", "walkthrough/match-T5",
            "walkthrough/match-T6", "walkthrough/match-T7", "walkthrough/menu", "walkthrough/shop",
            "walkthrough/swipe-flower-down", "walkthrough/three-flowers",
        ];


    try {
        path.forEach(p => {
            const picVarName = p.match(/\/.+/g)[0].match(/\w+/)[0],
                img = new Image();

            img.src = `https://tschiboka.co.uk/projects/fruits_n_flowers_v2/images/${p}.gif`;
            app.images[picVarName] = img;
        }); // end of forEach path

        // preload face photo (.jpg)
        const photo = new Image();

        photo.src = "https://tschiboka.co.uk/projects/fruits_n_flowers_v2/images/misc/photo.jpg";
        app.images.photo = photo;

    } // end of try loading images
    catch (e) {
        throw Error("404 One or more picture couldn't be loaded from server!");
    } // end of catch
} // end of preloadRest






function createLevelPageIndicator() {
    // create as many page indicator as many tables are
    const tableNum = Math.ceil(levels.length / 25);

    // handle error and give messsage if level obj is missing
    if (!tableNum) {
        $(".level-menu__page").addClass("error--no-level")
            .html("Ooop, it looks like something went wrong: can not load levels! :(");

        throw Error("There is no levels object!");
    } // end of error handling

    for (i = 0; i < tableNum; i++) {
        const indicator = document.createElement("div"),
            light = document.createElement("div");

        $(indicator).addClass(`level-indicator to-level-page-${i + 1}`);
        $(light).addClass(`level-light to-level-page-${i + 1}`);

        if (i == 0) {
            $(light).addClass("level-light--active");
        } // end of if first page

        $(indicator).append(light);
        $(".level-menu__header__level-indicator").append(indicator);
    } // end of level page iteration
} // end of createLevelPageIndicator

function createLevelTables() {
    // get how many tables are created
    const tableNum = Math.ceil(levels.length / 25);
    let levelNum = 1;

    for (t = 0; t < tableNum; t++) {
        const table = document.createElement("table"),
            tbody = document.createElement("tbody");

        table.id = `level-page-${t + 1}`;
        $(table).addClass("level-page");

        // create rows
        for (r = 0; r < 5; r++) {
            const row = document.createElement("tr");

            // create cells
            for (c = 0; c < 5; c++) {
                const cell = document.createElement("td"),
                    box = document.createElement("div"),
                    progressBar = document.createElement("div");

                box.id = `level-btn-${levelNum}`;
                $(box).addClass(`to-level-${levelNum}`);
                box.innerHTML = `${levelNum}`;

                progressBar.id = `level-progress-${levelNum}`;
                $(progressBar).addClass("level-progressbar to-level-" + levelNum);
                box.append(progressBar);

                cell.id = `level-cell-${levelNum}`;
                $(cell).addClass(`to-level-${levelNum} level-cell`);

                cell.append(box);

                // do not show cells that are out of the level array
                if (!levels[levelNum - 1]) {
                    $(box).hide();
                } // end of if theres no level at this number

                row.append(cell);
                levelNum++;
            } // end of for cell
            tbody.append(row);
        } // end of for row
        // make first table active
        if (t === 0) {
            $(table).addClass("active-page");
        }

        $(table).append(tbody);
        $(".level-menu__page").append(table);
    } // and of table for
} // end of createLevelTable




// set the progress bars on each level
// on levels that are not available yet (the previous level has not been completed yet), put a padlock sign
// on levels that are completed put a progress bar, that shows how much has been completed from the level target
// last level completed is 5. app.game_max_points = [120, 33, 660, 105, 509]
function setLevelMax() {
    const levelCells = $(".level-cell");

    // iterate over all level cells
    levelCells.each(function (ind) {
        if (ind < levels.length) {
            $(this).removeClass("locked"); // make sure no cell has been left locked, later we refresh locked cells

            // CREATE PROGRESSBAR
            if (app.game_max_points[ind]) {
                // create a progress div
                const
                    progress = document.createElement("div"),
                    progressBar = $(this).find(".level-progressbar"),
                    percent = Math.min(
                        Math.floor(
                            ((app.game_max_points[ind] / levels[ind].targetPoints) || 0) * 100
                        ), 100);

                let className = "";

                switch (true) {
                    case percent <= 0: { className = "zero"; break; }
                    case percent >= 1 && percent < 25: { className = "under-twentyfive-percent"; break; }
                    case percent >= 25 && percent < 50: { className = "under-fifty-percent"; break; }
                    case percent >= 50 && percent < 75: { className = "under-seventyfive-percent"; break; }
                    case percent >= 75 && percent < 100: { className = "under-hundred-percent"; break; }
                    case percent >= 100: { className = "maxed"; }
                } // end of switch percent


                $(progress)
                    .removeClass()
                    .addClass("progress " + className) // different color for different percentage
                    .css("width", percent + "%");

                $(progressBar)
                    .empty() // so it won't be duplicated, if function is called multiple times
                    .append(progress);
            } // end of there is any progress so far


            // ADD PADLOCKS
            const
                lockedFrom = !app.game_max_points[app.game_max_points.length - 1]
                    ? app.game_max_points.length
                    : app.game_max_points.length + 1;

            // if previous level has been completed aka its level max is not 0 or undefined
            if (ind >= lockedFrom) {
                $(this).addClass("locked");
            } // end of locked cells
        } // end of level cell has a valid level
    }); // end of level cell iteration
} // end of setLevelMax





/*


        EVENTS


*/






function addLevelEvents() {
    // add eventlistener to arrows, there are only two of them, no need to delegate
    $(".level-menu__arrow-left").on("click", () => { turnLevelPage("-") });
    $(".level-menu__arrow-right").on("click", () => { turnLevelPage("+") });

    // add swipe event to level menu page
    // vars for the swipe events
    let
        pageSwipeStartX = 0,
        pageSwipeEndX = 0;

    const
        getXCoord = event => {
            const // get X coord
                mouse = event.pageX,
                touch = (event.changedTouches ? event.changedTouches[0].pageX : undefined);


            return mouse || touch;
        }; // end of getXCoord

    // add mouse down touch start event on menu page
    $(".level-menu__page").on("mousedown touchstart", e => {

        pageSwipeStartX = getXCoord(e);
    }); // end of menu page mouse down / touch start event

    $(".level-menu__page").on("mouseup touchend", e => {

        pageSwipeEndX = getXCoord(e);
        // case for swipe right
        if (pageSwipeStartX + 40 < pageSwipeEndX) {
            turnLevelPage("-");
        } // end of swipe right

        // case for swipe left
        if (pageSwipeStartX - 40 > pageSwipeEndX) {
            turnLevelPage("+");
        } // end of swipe left
    }); // end of menu page mouse up / touch end

    $(".level-menu__header__level-indicator").on("click", function (event) {
        // event is delegated by common class name to-level-page-n
        if (/to-level-page-/g.test($(event.target).attr("class"))) {
            const pageNum = $(event.target).attr("class").match(/to-level-page-\d+/g)[0]
                .match(/\d+/)[0]; // extract page number from class name
            turnLevelPage(pageNum);
        } // end of if target is valid elem
    }); // end of indicator click



    // add eventListeners to level buttons
    // level buttons are all delegated to level-page
    $(".level-page").on("click", function (e) {
        const // get level number
            levelNum = [...e.target.classList]       // extract array-like dom tokens to array
                .find(lvl => /\d+/g.test(lvl))       // find a className where level number is indiicated (all has to have one, else it is not a level btn)
                .match(/\d+/g).map(Number)[0];       // extract the number

        if (levelNum && levels[levelNum - 1]) {
            const isLocked = $("#level-cell-" + levelNum).hasClass("locked");

            if (!isLocked) {
                const // validate level
                    L = levels[levelNum - 1], // just to spare some chars L = current level obj
                    props = ["blueprint", "fruitVariationNumber", "minimumFlowersOnBoard", "flowersToCompleteTheLevel", "targetPoints", "time"],
                    HASALLPROPS = props.every(pr => L.hasOwnProperty(pr)), // check if level has any missing property
                    blueprint = L.blueprint || [[]],
                    blueprintIsCorrectSize = blueprint.length === 11 && blueprint.every(row => row.length === 9), // blueprint is 11 X 9 2D array
                    blueprintCharsValid = /[123456789.ABCDEFSMLU*#]/g.test(blueprint.join("")), // blueprint has only valid caracters
                    BLUEPRINTOK = blueprintCharsValid && blueprintIsCorrectSize,
                    inRange = (num, fromN, toN) => !isNaN(num) && num >= fromN && num <= toN, // range is inclusive! from N to N
                    FRUITOK = inRange(L.fruitVariationNumber, 5, 9),
                    MINFLOWEROK = inRange(L.minimumFlowersOnBoard, 1, 9),
                    FLOWERSTOCOMPLETEOK = inRange(L.flowersToCompleteTheLevel, 1, 20),
                    TARGETOK = inRange(L.targetPoints, 500, 10000),
                    TIMEOK = inRange(L.time, 60, 300),
                    VALIDLEVEL = HASALLPROPS && BLUEPRINTOK && FRUITOK && MINFLOWEROK && FLOWERSTOCOMPLETEOK && TARGETOK && TIMEOK;

                if (VALIDLEVEL) {
                    startLevel(levelNum);
                } // end of if level can be started safely and no erors were found in the current level
                else {
                    let errorMsg = "\n";

                    errorMsg += HASALLPROPS ? "" : "\tLEVEL HAS MISSING PROPERTIES\n";
                    errorMsg += BLUEPRINTOK ? "" : "\tBLUEPRINT PROPERTY MISSING OR INVALID SIZE OR HAS INVALID VALUE\n";
                    errorMsg += FRUITOK ? "" : "\tFRUIT VARIATION NUMBER IS MISSING OR OUT OF RANGE (5 - 9)\n";
                    errorMsg += MINFLOWEROK ? "" : "\tMINIMUM FLOWERS ON LEVEL IS MISSING OR OUT OF RANGE (1 - 9)\n";
                    errorMsg += FLOWERSTOCOMPLETEOK ? "" : "\tFLOWERS TO COMPLETE LEVEL IS MISSING OR OUT OF RANGE (1 - 20)\n";
                    errorMsg += TARGETOK ? "" : "\tTARGET POINT IS MISSING OR OUT OF RANGE (500 - 10000)\n";
                    errorMsg += TIMEOK ? "" : "\tLEVEL TIME IS MISSING OR OUT OF RANGE (60 - 300)\n";

                    throw Error(errorMsg);
                } // end of if level has any invalid property
            } // end of if level is not locked
        } // end of if event is on a valid level number
    }); // end of level-page click listener
} // end of addLevelEvents





function turnLevelPage(turnTo) {
    // turnTo parameter can be number or + or -
    // number turn page to the page number
    // + - increments or decrements it if possible

    const activePage = $(".active-page")[0],
        pageNum = activePage.id.match(/\d+/)[0];

    if (turnTo === "+") {
        displayPage(Number(pageNum) + 1, activePage);
    } else if (turnTo === "-") {
        displayPage(Number(pageNum) - 1, activePage);
    } else if (Number(turnTo)) {
        displayPage(turnTo, activePage);
    } else throw Error("turnLevelPage function got unvalid parameters : [" + turnTo + "]!");
} // end of turnLevelPage



function displayPage(pNum, currentActive) {
    const lastPage = Math.ceil(levels.length / 25);

    if (pNum > 0 && pNum <= lastPage) {
        $(currentActive).removeClass("active-page");
        $("#level-page-" + pNum).addClass("active-page")[0];
        styleLevelMenuToCurrenPage();
    } // end of if num in range
} // end of displayPage



function styleLevelMenuToCurrenPage() {
    const activePageNum = $(".active-page")[0].id.match(/\d+/g)[0];

    // hightlight the right page indicator
    $(".level-light--active").removeClass("level-light--active");
    $(".level-light.to-level-page-" + activePageNum).addClass("level-light--active");

    // activate available arrows
    activePageNum > 1
        ? $(".level-arrow-left").addClass("level-arrow-left--active")
        : $(".level-arrow-left").removeClass("level-arrow-left--active");
    activePageNum < Math.ceil(levels.length / 25)
        ? $(".level-arrow-right").addClass("level-arrow-right--active")
        : $(".level-arrow-right").removeClass("level-arrow-right--active");

    // change footer text accordingly
    $(".level-menu__footer__text-container")
        .html(`-&lt;[&nbsp;&nbsp;${activePageNum} / ${Math.ceil(levels.length / 25)}&nbsp;&nbsp;]&gt;-`);
} // end of styleLevelMenu




function addMenuEvents() {
    let // set swipe positions
        isMouseDownOnMainMenuBtn = false,
        mainMenuSwipeStart = 0,
        mainMenuSwipeEnd = 0;


    // menu arrow
    $(".menu__open-close-btn-box")
        .on("click", () => {
            // in case pause message have been left open, and menu opened again
            // you could return the game while game is paused, so I make
            // sure cheating is not possible
            $(".main-menu-msg").remove(); // remove message if it was left open
            app.game_is_paused = false;


            // toggle menu open-close
            if (!$(".menu").hasClass("menu-open")) {
                $(".menu")
                    .addClass("menu-open")
                    .removeClass("menu-close");

                $(".menu__open-close-arrow")
                    .addClass("arrow-open")
                    .removeClass("arrow-close");
            } // end of if menu was open
            else {
                $(".menu")
                    .removeClass("menu-open")
                    .addClass("menu-close");

                $(".menu__open-close-arrow")
                    .addClass("arrow-close")
                    .removeClass("arrow-open");
            } // end of if menu was closed

            // prevent scrolling the page for the duration of the swipe
            $("body").addClass("noscroll");
        }) // end of menu button click event
        // menu arrow swipe
        .on("mousedown touchstart", event => {
            isMouseDownOnMainMenuBtn = true;
            mainMenuSwipeStart = event.pageY || event.changedTouches[0].pageY; // case for desktop / mobile
        }); // end of menu button mousedown

    // add mouse/touch up to body, because swipe will not end on the main menu open-colse btn
    $("body")
        .on("mouseup touchend", event => {
            // if swipe started on menu
            if (isMouseDownOnMainMenuBtn) {
                isMouseDownOnMainMenuBtn = false; // reset
                mainMenuSwipeEnd = event.pageY || event.changedTouches[0].pageY; // case for desktop / mobile

                // if swipe larger than 30px direction top
                if (mainMenuSwipeStart > mainMenuSwipeEnd + 30) {
                    $(".menu")
                        .addClass("menu-open")
                        .removeClass("menu-close");

                    $(".menu__open-close-arrow")
                        .addClass("arrow-open")
                        .removeClass("arrow-close");
                } // end of swipe up

                // if swipe smaller than 30px direction bottom
                if (mainMenuSwipeStart < mainMenuSwipeEnd - 30) {
                    $(".menu")
                        .removeClass("menu-open")
                        .addClass("menu-close");

                    $(".menu__open-close-arrow")
                        .addClass("arrow-close")
                        .removeClass("arrow-open");
                } // end of swipe down
            } // end of mousedown is made by main menu btn

            // let scrolling when swipe done
            $("body").removeClass("noscroll");
        }); // end of body mouse end / touch up

    $(".back-btn").on("click", () => { menuFunctions("back"); });

    $(".pause-btn").on("click", () => { menuFunctions("pause"); });

    $(".restart-btn").on("click", () => { menuFunctions("restart"); });

    $(".intro-btn").on("click", () => {
        if (app.game_is_on) app.game_is_paused = true; // pause game, if user were playing

        closeAllMenuWindows();

        $(".walkthrough").show();
    }); // end of intro btn click

    $(".info-btn").on("click", () => {
        if (app.game_is_on) app.game_is_paused = true; // pause game, if user were playing

        closeAllMenuWindows();

        $(".about").show();
    }); // end of intro btn click

} // end of add MenuEvents



// action arg must be provided
function menuFunctions(action) {

    // Back, restart, pause have the same message type
    // callBackYes, callBackNo are the button functions when clicked
    // if absent button will not be created
    // buttonYesTxt buttonNoTxt are not necessary to be provided
    function giveMessage(text, callBackYes, callBackNo, buttonYesTxt, buttonNoTxt) {

        // message is only visible when game board is open
        if (app.game_is_on) {

            const // create divs end buttons
                msgDiv = document.createElement("div"),
                msgInnerDiv = document.createElement("div"),
                buttonDiv = document.createElement("div"),
                yesBtn = callBackYes ? document.createElement("button") : null,
                noBtn = callBackNo ? document.createElement("button") : null;


            // add buttons
            if (!!callBackYes) {
                $(yesBtn)
                    .addClass("main-menu-msg-btn")
                    .html(buttonYesTxt || "Yes")
                    .on("click", callBackYes);
            } // end of if callBackYes is provided

            if (!!callBackNo) {
                $(noBtn)
                    .addClass("main-menu-msg-btn")
                    .html(buttonNoTxt || "No")
                    .on("click", callBackNo); // end of NO button ckick event
            } // end of if callBackNo is provided

            // add button container
            $(buttonDiv)
                .addClass("main-menu-msg-button-container")
                .append(yesBtn)
                .append(noBtn);

            // add inner div
            $(msgInnerDiv)
                .addClass("main-menu-msg-inner")
                .html(text)
                .append(buttonDiv);

            // append the whole lot
            $(msgDiv)
                .addClass("main-menu-msg")
                .append(msgInnerDiv);

            $(".game-board").append(msgDiv);
            $(msgDiv).show();

            $(".menu").removeClass("menu-open").addClass("menu-close");
            $(".menu__open-close-arrow").addClass("arrow-close").removeClass("arrow-open");

        } // end of if game is on
    } // end of giveMessage


    // close the level without giving point or playing the end game
    function coldCloseLevel() {
        app.game_interaction_enabled = false; // user can not interact the board after this point
        app.game_interaction_locked = true; // don't let further functions set interaction back as a side effect


        // stop timer
        clearInterval(levelTimer);

        // close shop if it was open
        $(".shop").hide();

        // close previous message if it was left open
        closeSelf();

        app.game_is_on = false;
        app.game_is_paused = false;

        $(".game-board__table").remove();
        $(".game-board").hide();

        // reset level-points
        const lvlPts = $(".game-board__level-points")
            .html()
            .replace(/\d+/, "0");

        $(".game-board__level-points").html(lvlPts);


        $("header")
            .removeClass("header--hidden header-out")
            .addClass("header--visible header-in");
        $(".level-menu").show();
        setLevelMax();
    } // end of coldCloseLevel

    function closeSelf() {
        $(".main-menu-msg").remove();

        // close menu
        $(".menu")
            .removeClass("menu-open")
            .addClass("menu-close");

        $(".menu__open-close-arrow")
            .addClass("arrow-close")
            .removeClass("arrow-open");
    } // end of closeSelf

    switch (action) {
        case "back": {
            const
                txt = "Are you sure you want to quit the current game and return to the level menu?",
                callBackYes = () => { closeSelf(); coldCloseLevel(); },
                callBackNo = () => { closeSelf(); };

            giveMessage(txt, callBackYes, callBackNo);
            break;
        } // end of case back
        case "pause": {
            const
                txt = "Game is paused! Press OK if you want to return to the game!",
                callBackYes = () => { app.game_is_paused = false; closeSelf(); };

            app.game_is_paused = true;
            giveMessage(txt, callBackYes, null, "OK");
            break;
        } // end of case pause
        case "restart": {
            const
                txt = "Would you like to restart the level?",
                callBackYes = () => { closeSelf(); coldCloseLevel(); startLevel(app.currentLevel) },
                callBackNo = () => { closeSelf(); };

            giveMessage(txt, callBackYes, callBackNo, "Restart");
            break;
        } // end of case restart
    } // end of switch action
} // end of menuFunctions 



// In this function the event delegation is done by the characters id.
// Both box and picture can be targets, and their class name has their 
// unic number.
function addGameBoardEvents() {
    const
        extractRowCol = el => {
            // eleminate any invalid elements
            if ($(el).hasClass("game-board__cell-pic") || $(el).hasClass("game-board__cell-box")) {
                return el.id.match(/r\d+c\d+/g)[0];
            } // end of if invalid element
        }, // end of extract row col from id

        checkSwipeDirection = ids => {
            if (ids[0] && ids[1]) {
                // extract coordinates from ids
                const [Y1, X1] = [...ids[0].match(/\d+/g)].map(Number),
                    [Y2, X2] = [...ids[1].match(/\d+/g)].map(Number),
                    X = X2 - X1,
                    Y = Y2 - Y1;
                // check which axis is affected more by the swipe
                if (X === Y) {
                    return "NOMOVE"; // diagonal swipes are not valid
                } else
                    if (Math.abs(X) > Math.abs(Y)) {
                        if (X1 > X2) return "LEFT";
                        else return "RIGHT";
                    } else {
                        if (Y1 > Y2) return "UP";
                        else return "DOWN";
                    } // end of determining of axis
            } // end of if none of the ids missing
        }; // end of checkSwipeDirection

    let swapIds = [null, null];

    // event on a game board cell delegated to game board

    $(".game-board__table").on("mousedown touchstart", function (event) {
        event.preventDefault();
        if (app.game_interaction_enabled) {
            swapIds[0] = extractRowCol(event.target);

            app.game_time_from_last_hint = 0; // cancel hints if user swipes

            // stop animation playing when user interacts with the board
            const hintClasses = ".hint-horizontal-left, .hint-horizontal-right, .hint-vertical-upper, .hint-vertical-lower";
            $(hintClasses).css("-webkit-animation-play-state", "paused");
        } // interact only when it's allowed
    }); // end of game board mousedown

    $(".game-board__table").on("mouseup", function (event) {
        event.preventDefault();

        if (app.game_interaction_enabled) {
            if (swapIds[0]) {
                event.preventDefault();

                swapIds[1] = extractRowCol(event.target);

                // check for mobility (walls, stones...)
                if (checkswipeMobility(swapIds[0], checkSwipeDirection(swapIds))) {
                    swipeCharacters(checkswipeMobility(swapIds[0], checkSwipeDirection(swapIds)));
                } // end of if swipe is mobile
                // reset ids
                swapIds = [null, null];
            } // end of if mousedown or touchstart has already happened
        } // interact only when it's allowed
    }); // end of game board mouseup

    $(".game-board__table").on("touchend", function (event) {
        event.preventDefault();

        if (app.game_interaction_enabled) {
            if (swapIds[0]) {
                event.preventDefault();

                // Touchend returns the start position as a target by default
                // So we extract the end element by identifying which element
                // is on the current cursor position when the tounchend happens.
                const x = event.changedTouches[0].pageX,
                    y = event.changedTouches[0].pageY,
                    touchEndElem = document.elementFromPoint(x, y);

                swapIds[1] = extractRowCol(touchEndElem);

                // check for mobility (walls, stones...)
                if (checkswipeMobility(swapIds[0], checkSwipeDirection(swapIds))) {
                    swipeCharacters(checkswipeMobility(swapIds[0], checkSwipeDirection(swapIds)));
                } // end of if swipe is mobile
                // reset ids
                swapIds = [null, null];
            } // interact only when it's allowed
        } // end of if mousedown or touchstart has already happened
    }); // end of game board mouseup
} // end of addGameBoardEvents


// Check if swipe is valid in terms of immobile characters
// And return the row and column coords.
function checkswipeMobility(startId, dir) {
    if (["LEFT", "RIGHT", "UP", "DOWN"].find(dirs => dirs === dir)) {
        const [R1, C1] = startId.match(/\d+/g).map(Number);  // ROW COL

        // check board if the move is not possible because of walls and stones
        const originVal = app.board[R1][C1];
        let [R2, C2] = [R1, C1];  // copy

        // adjust it to the new direction
        switch (dir) {
            case "LEFT": { --C2; break; }
            case "RIGHT": { ++C2; break; }
            case "UP": { --R2; break; }
            case "DOWN": { ++R2; break; }
        } // end of switch

        const destinVal = app.board[R2][C2],
            immobileChars = ["S", "M", "L", "#", "U"];

        // check if swipe origin or destination are immobile
        if (immobileChars.find(ch => ch === originVal || ch === destinVal)) {
            return void (0);
        } // end of immobiliti check

        return [R1, C1, R2, C2, dir];
    } // end of if direction is valid
} // end of select

// function returns true if swipe had bonus matches 
function swipeCharacters(swipeArgs) {
    function swapCharacters(r1, c1, r2, c2) {
        const temp = app.board[r1][c1];

        app.board[r1][c1] = app.board[r2][c2];
        app.board[r2][c2] = temp;
        displayBoard(); // show the new board when swap is done

        // special case for charaters with bonus classes (special gems)
        return swapBonusClasses(r1, c1, r2, c2);
    } // end of swipeCharacters


    // function checks if any or both characters being swapped
    // are bonus and swaps their classes
    function swapBonusClasses(r1, c1, r2, c2) {
        // the actual swapping function, do the code gets DRYer
        function swapElementsAndClasses(e1, e2) {
            const tempElemClass = $(elem1).hasClass("bonus") ? "bonus" : "",
                tempElemClone = $(elem1).children();

            $(elem1)
                .removeClass("bonus")
                .addClass($(elem2).hasClass("bonus") ? "bonus" : "")
                .empty()
                .append($(elem2)
                    .children());

            $(elem2)
                .removeClass("bonus")
                .addClass(tempElemClass)
                .empty()
                .append(tempElemClone);

        } // end of swapElementsAndClasses

        const elem1 = $(`#r${r1}c${c1}-pic`),
            elem2 = $(`#r${r2}c${c2}-pic`),
            elemHasBonus = (el) => el.hasClass("bonus");

        // get out of function if NONE has BONUS or DIAMOND
        if (!elemHasBonus(elem1) && !elemHasBonus(elem2) &&
            app.board[r1][c1] !== "*" && app.board[r2][c2] !== "*") return void (0);


        // BOTH DIAMONDS
        // two diamonds clear all the fruits, and get extreme points 
        if (app.board[r1][c1] === "*" && app.board[r2][c2] === "*") {
            const matches = [];
            app.board.map((row, rowInd) => {
                row.forEach((cell, cellInd) => {
                    // clear cell if fruit
                    if ("123456789".split("").some(fr => fr === cell)) {
                        // add explosion animation to element
                        $(`r${rowInd}c${cellInd}-pic`).addClass("explosion");

                        // fill up matches with all the fruits available on board
                        matches.push(
                            {
                                "patternName": "DD",
                                "sample": app.board[rowInd][cellInd],
                                "coords": [[rowInd, cellInd]]
                            } // end of match obj
                        ); // end of push

                        app.game_matches = matches;
                        app.board[rowInd][cellInd] = "X";
                        $(`#r${rowInd}c${cellInd}-pic`).addClass("explosion");
                    } // end of if cell is fruit
                }); // end of cell iteration
            }); // end of forEach row

            // distroy diamonds
            app.board[r1][c1] = app.board[r2][c2] = "X";

            animateExplosions(matches);
            return true; // escape out of function
        } // end of if both diamonds

        // if ONE is DIAMOND
        // explose all fruits the same type it was swapped with
        if (app.board[r1][c1] === "*" || app.board[r2][c2] === "*") {
            // get the type of the fruit, which of the two is unknown though
            const fruit = app.board[r1][c1] === "*" ? app.board[r2][c2] : app.board[r1][c1],
                matches = [];

            // if the element being swapped with diamond is a fruit explose, else return
            if ("123456789".split("").some(fr => fr === fruit)) {
                app.board.forEach((row, rowInd) => {
                    row.forEach((cell, cellInd) => {
                        if (cell === fruit) {
                            // add explosion animation to element
                            $(`r${rowInd}c${cellInd}-pic`).addClass("explosion");

                            // fill up the matches with the corrisponding fruit
                            matches.push(
                                {
                                    "patternName": "D",
                                    "sample": app.board[rowInd][cellInd],
                                    "coords": [[rowInd, cellInd]]
                                } // end of match obj
                            ); // end of matches push

                            app.game_matches = matches;
                            app.board[rowInd][cellInd] = "X";
                            $(`#r${rowInd}c${cellInd}-pic`).addClass("explosion");
                        } // end of if cell the fruit to be destroyed
                    }); // end of cell iteration
                }); // end of row iteration

                // destroy the diamond, we don't know which one is diamond
                app.board[r1][c1] === "*" ? app.board[r1][c1] = "X" : app.board[r2][c2] = "X";
                animateExplosions(matches);
                return true; // escape out of function
            } // end of if the one being swapped is a fruit
            else return void (0);
        } // end of if one is diamond


        // if BOTH has BONUS, do both elements' explosion
        if (elemHasBonus(elem1) && elemHasBonus(elem2)) {
            swapElementsAndClasses(elem1, elem2);
            // add explosion animation to element
            $(`r${r1}c${c1}-pic`).addClass("explosion");
            $(`r${r2}c${c2}-pic`).addClass("explosion");

            // fill matches with the two elements being swapped
            const matches = [
                {
                    "patternName": "BB",
                    "sample": app.board[r1][c1],
                    "coords": [[r1, c1]]
                }, // end of match obj1
                {
                    "patternName": "BB",
                    "sample": app.board[r2][c2],
                    "coords": [[r2, c2]]
                } // end of match obj2
            ]; // end of matches

            app.game_matches = matches;
            app.board[r1][c1] = app.board[r2][c2] = "X";
            $(`#r${r1}c${c1}-pic`).addClass("explosion");
            $(`#r${r2}c${c2}-pic`).addClass("explosion");
            animateExplosions(matches);
            return true; // escape out of function
        } // end of both bonus


        // the remaining option is, if ONE has BONUS swap its classes an children
        // otherwise the execution is already out of this function

        swapElementsAndClasses(elem1, elem2);
    } // end of swapBonusClasses


    const [R1, C1, R2, C2, dir] = [...swipeArgs];  // destruct args

    // check if orientation is horizontal and if it is a flower and swipe them if they are
    const flowerAndHorizontal = () => {
        const flowerChars = ["A", "B", "C", "D", "E"],
            isFlower = (r, c) => flowerChars.find(fl => fl === app.board[r][c]);


        anyFlower = (isFlower(R1, C1) || isFlower(R2, C2)) ? true : false;
        isHorizontal = (dir === "LEFT" || dir === "RIGHT") ? true : false;
        return anyFlower && isHorizontal;
    };

    const swapHasBonusMatch = swapCharacters(R1, C1, R2, C2); // if swap has bonus match don't swap back
    const matches = checkMatches();

    if (!matches) {
        if (!flowerAndHorizontal() && !swapHasBonusMatch) {
            app.game_interaction_enabled = false;
            app.game_hint_is_paused = true; // hints stops

            // delay to see the unmatching swipe
            const swapDelay = () => setTimeout(() => {
                swapCharacters(R1, C1, R2, C2);
                clearTimeout(swapDelay);
                app.game_interaction_enabled = true; // set interaction back
                app.game_hint_is_paused = false; // hint can count time again
            }, 150); // end of swapDelay 

            // delay and stop user interaction while showing unmatched swap
            swapDelay();
        } // end of swap back
    } // end of if no matches found
    else {
        animateExplosions(matches);
    } // end of if matches found
    displayBoard();
    destroyFlowersOverBasket();
} // end of swipeCharacters



function addInventoryEvents() {
    function toggleInventoryRight() {
        const invAt = app.inventoryAt,
            invLen = app.inventory.length - 1;

        // if there is at least 5 more items left to display
        if (invLen - 4 >= invAt + 5) {
            app.inventoryAt += 5;
            displayInventoryItems();
        } // end of if 5 more left
        else if (invAt < invLen - 4) {
            // if less than 5 but there is still left to display
            // display the rest of the items
            app.inventoryAt = invLen - 4;
            displayInventoryItems();
        } // end if any left to display
    } // end of toggleInventoryRight


    function toggleInventoryLeft() {
        const invAt = app.inventoryAt;

        // if there is 5 more items left to display
        if (invAt > 4) {
            app.inventoryAt -= 5;
            displayInventoryItems();
        } // end of if 5 more left
        else if (invAt > 0) {
            // if less than 5 but there is still left to display
            // display the rest of the items
            app.inventoryAt = 0;
            displayInventoryItems();
        } // end if any left to display
    } // end of toggleInventoryLeft


    function swipeStart(e) {
        if (e.target !== this) {
            swipeStartCoord = e.pageX;
        } // end of if target is menuitems
        return e.pageX || e.targetTouches[0].pageX; // case for desktop / mobile
    } // end of swipeStart


    function swipeOn(mouseDown, startX, currX, event) {
        event.preventDefault();

        if (mouseDown) {
            if (startX > currX + 40) {
                toggleInventoryRight();
                return [false, 0]; // reset swipe
            } // end of 40px left

            if (startX < currX - 40) {
                toggleInventoryLeft();
                return [false, 0]; // reset swipe
            } // end of 40px right
        } // end of if mouse is down
        return [mouseDown, startX];
    } // end of swipeOn


    function inventoryItemStart(event, dragObj = {}) {
        // get the target container
        const target = event.target;
        if (app.game_interaction_enabled) {
            if ($(target).hasClass("inventory-item-container") || $(target).hasClass("inventory-item")) {
                const itemNum = Number([...target.classList].join("").match(/\d/)[0]),
                    item = $(`.inventory-item${itemNum}-container`)[0];

                dragObj.item = item;
                dragObj.itemNum = itemNum;
                dragObj.down = true;
                dragObj.startX = event.pageX || event.targetTouches[0].pageX;
                dragObj.startY = event.pageY || event.targetTouches[0].pageY;
                dragObj.fruit = app.inventory[app.inventoryAt + itemNum - 1];
                const itemRect = $("#r0c0-pic")[0].getBoundingClientRect();
                dragObj.height = itemRect.height;
                dragObj.width = itemRect.width;

            } // end of if target is an inventory item
        } // end of if interaction is enabled
        return dragObj.fruit ? dragObj : {}; // return empty obj if fruit is not present
    } // end of inventoryItemOn



    function dragInventoryItem(event, dragObj) {
        const // get cursor position
            currX = event.pageX || event.targetTouches[0].pageX,
            currY = event.pageY || event.targetTouches[0].pageY;

        function createInventoryItemClone() {
            const // get the difference of current and start
                diffX = Math.max(dragObj.startX, currX) - Math.min(dragObj.startX, currX),
                diffY = Math.max(dragObj.startY, currY) - Math.min(dragObj.startY, currY);

            // if swipe is not horizontal make a copy of the item
            // horizontal swipe reults in swipeing the menu items left n right
            // which is a different event handler thus
            // more than 40px on X should cause a menu swipe if event is still on menu-items

            if (diffY > diffX && diffX < 40 && diffY > 15) {
                const // get some css attributes width height top left
                    itemRect = $(dragObj.item)[0].getBoundingClientRect(),
                    top = itemRect.top,
                    left = itemRect.left,
                    height = itemRect.height,
                    width = itemRect.width;

                // get a clone and set it's 
                const clone = $(dragObj.item)
                    .clone()
                    .css("top", top + "px")
                    .css("left", left + "px")
                    .css("width", width + "px")
                    .css("height", height + "px")
                    .addClass("inventory-item--clone");

                $("body").append(clone);

                dragObj.dragClone = dragObj.dragClone ? dragObj.dragClone : clone;

                $(`.inventory-item:nth-child(${dragObj.itemNum})`)
                    .css("opacity", "0.2");

            } // end of if verical swipe
        } // end of createInventoryItemClone


        function dragInventoryItemClone() {
            event.stopPropagation();
            // empty crossight
            $(".cross-sight").remove();

            const // get coordinates
                x = currX - (dragObj.width / 2),
                y = currY - (dragObj.height / 2);

            const // check if cursor is out of game-board 
                boardRect = $(".game-board")[0].getBoundingClientRect(),
                [xMin, yMin, xMax, yMax] = [boardRect.left, boardRect.top, boardRect.right, boardRect.bottom]
                    .map(num => Math.round(num));

            // cases the drag can be canceled:
            //   - its out of the game boards range
            //   - the level has been over while dragging
            //   - interaction with the board is unabled (eg: end game explosions)
            if (currX < xMin || currY < yMin || currX > xMax || currX > yMax || !app.game_is_on || !app.game_interaction_enabled) {
                cancelInventoryItemDrag();
                return void (0);
            } // end of if out of range or game is on

            // set the clone coordinates to the current cursor position
            $(dragObj.dragClone).css("left", x + "px").css("top", y + "px");

            const // identify cells under the clone object
                underId = (document.elementFromPoint(x + (dragObj.width / 2), y + (dragObj.height / 2)) ||
                    { "id": "" }).id, // avoid null obj
                isUnderGameCell = /^r\d+c\d+\-(box|pic)$/.test(underId); // eg r2c2-box or r4c0-pic 

            // Find objects under the cursor
            // Highlight cells and give a horizontal and vertical clue about the highlighted cell,
            // it is usefull on mobile when the finger can cover the actual cell we want to drag.
            // Valid characters and row/cols are highlighted green and invalids are red. 
            if (isUnderGameCell) {
                function createCrossightCell(row, col, color) {
                    const // get the cells position 
                        crossEl = document.createElement("div"),
                        cellRect = $(`#r${row}c${col}-box`)[0].getBoundingClientRect(),
                        boardRect = $(".game-board")[0].getBoundingClientRect();

                    // set attributes
                    $(crossEl).addClass("cross-sight")
                        .css("top", cellRect.top - boardRect.top + 1 + "px")
                        .css("left", cellRect.left - boardRect.left + 1 + "px")
                        .css("width", cellRect.width - 1 + "px")
                        .css("height", cellRect.height - 1 + "px")
                        .css("background-color", color)
                        .css("opacity", "1")
                        .attr("id", `cross-sight-${row}-${col}`);

                    $(".game-board").append(crossEl);
                } // end of createCrosSightCell

                function createCrossightBorder(row, col) {
                    const // get neightbouring cells
                        getId = (x, y) => document.getElementById(`cross-sight-${x}-${y}`),    // GET ELEMENT ID
                        [N1, N2, N3] = Array(3).fill().map((_, i) => ({ "el": getId(row - 1 - i, col), "dist": i })), // NORTH ELEMENTS
                        [S1, S2, S3] = Array(3).fill().map((_, i) => ({ "el": getId(row + 1 + i, col), "dist": i })), // SOUTH ELEMENTS
                        [W1, W2, W3] = Array(3).fill().map((_, i) => ({ "el": getId(row, col - 1 - i), "dist": i })), // WEST ELEMENTS
                        [E1, E2, E3] = Array(3).fill().map((_, i) => ({ "el": getId(row, col + 1 + i), "dist": i })), // EAST ELEMENTS
                        opacity = [0.9, 0.6, 0.3];

                    // NORT-SOUTH has vertical borders
                    [N1, N2, N3, S1, S2, S3].forEach(el => {
                        if (el.el) {
                            const bgColor = $(el.el).css("background-color");
                            $(el.el)
                                .css("border-left", `1px solid rgb(200, 200, 200, ${opacity[el.dist]})`)
                                .css("border-right", `1px solid rgb(200, 200, 200, ${opacity[el.dist]})`)
                                .css("width", `1px solid ${bgColor}`)
                                .css("border-bottom", `1px solid ${bgColor}`);
                        } // end of if there is an element
                    }); // end of N - S

                    // WEST - EAST has horizontal borders
                    [W1, W2, W3, E1, E2, E3].forEach(el => {
                        if (el.el) {
                            const bgColor = $(el.el).css("background-color");
                            $(el.el)
                                .css("border-top", `1px solid rgb(200, 200, 200, ${opacity[el.dist]})`)
                                .css("border-bottom", `1px solid rgb(200, 200, 200, ${opacity[el.dist]})`)
                                .css("border-left", `1px solid ${bgColor}`)
                                .css("border-right", `1px solid ${bgColor}`);
                        } // end of if there is an element
                    }); // end of W - E
                } // end of createCrossightBorder

                const // check if cell under item is droppable aka is a fruit without existing bonus
                    [cellUnderRow, cellUnderCell] = underId.match(/\d+/g).map(Number).map(e => Math.abs(e)), // get row, cell
                    isFruit = !!(app.board[cellUnderRow][cellUnderCell].match(/[1-9]/g)), // 1-9 true else false
                    hasBonus = $(`#r${cellUnderRow}c${cellUnderCell}-pic`).hasClass("bonus"),
                    dropable = isFruit && !hasBonus, // valid cell green, invalid red
                    fillRange = (num1, num2, start = Math.min(num1, num2), end = Math.max(num1, num2)) =>
                        Array(end - start).fill().map((_, i) => Math.abs(start + i)), // eg: fillRange(2,6) => [2, 3, 4, 5] excluding end
                    [toRow, fromRow] = [fillRange(0, cellUnderRow).reverse(), fillRange(cellUnderRow + 1, 11)], // from is ascending, to is decending
                    [toCol, fromCol] = [fillRange(0, cellUnderCell).reverse(), fillRange(cellUnderCell + 1, 9)], // eg: to [543210] 6 [789]    
                    RED = [252, 69, 100], // rgb
                    GREEN = [88, 232, 243],
                    color = dropable ? GREEN : RED, // decide color 
                    sequence = (length, start = 0.35, end = 0.075) => Array(length)
                        .fill((start - end) / length)
                        .map((len, i) => (start - ((i + 1) * len)).toFixed(3));

                // CENTER
                createCrossightCell(cellUnderRow, cellUnderCell, `rgba(${color.join(",")},0.5)`);

                // NORTH part of cross-sight
                toRow.forEach((rowInd, i) => {
                    createCrossightCell(rowInd, cellUnderCell, `rgba(${color.join(",")},${sequence(toRow.length)[i]})`);
                }); // end of NORTH iteration

                // SOUTH part of cross-sight
                fromRow.forEach((rowInd, i) => {
                    createCrossightCell(rowInd, cellUnderCell, `rgba(${color.join(",")},${sequence(fromRow.length)[i]})`);
                }); // end of SOUTH iteration

                // WEST part of cross-sight
                toCol.forEach((colInd, i) => {
                    createCrossightCell(cellUnderRow, colInd, `rgba(${color.join(",")},${sequence(toCol.length)[i]})`);
                }); // end of WEST iteration

                // EAST part of cross-sight
                fromCol.forEach((colInd, i) => {
                    createCrossightCell(cellUnderRow, colInd, `rgba(${color.join(",")},${sequence(fromCol.length)[i]})`);
                }); // end of EAST iteration

                createCrossightBorder(cellUnderRow, cellUnderCell); // add some border to the neightbouring cells

                dragObj.validItemUnderCursor = dropable;
                dragObj.dropRow = dropable ? cellUnderRow : false;
                dragObj.dropCol = dropable ? cellUnderCell : false;
            } // end of if under the clone object and cursor there is a game-board table cell
        } // end of dragInventoryItemClone


        // if mouseDown and clone has not been created
        // short circuit so condition won't give error when dragObj has not been created yet
        if (dragObj && dragObj.down && !dragObj.dragClone) {
            createInventoryItemClone();
        } // end of if mouse is down

        // if clone exist drag it
        if (dragObj && dragObj.down && dragObj.dragClone) {
            dragInventoryItemClone();
        } // end of if clone exist
    } // end of dragInventoryItem



    function cancelInventoryItemDrag() {
        if ((document.querySelector(".inventory-item--clone"))) {
            // JQuery gets strange errors here with no apparent reason,
            // so I will rely on vanilla js now
            document.getElementsByTagName("body")[0]
                .removeChild(document.querySelector(".inventory-item--clone"));
        } // end of if there is a clone item in the body

        // set back the opacity of the removed inventory item
        $(`.inventory-item:nth-child(${dragObj.itemNum})`)
            .css("opacity", "1");

        // empty crossight
        $(".cross-sight").remove();

        isMouseDown = false; // so drag won't affect menu swipe
        dragObj = {}; // reset 
    } // end of cancelInventoryItemDrag


    function dropInventoryItem() {
        const [fruit, bonus] = (dragObj.fruit).match(/[^-]+/g);

        // set fruit and bonus
        app.board[dragObj.dropRow][dragObj.dropCol] = fruit;

        if (bonus) {
            createspecialGemDiv([dragObj.dropRow, dragObj.dropCol], bonus);

            $(`#r${dragObj.dropRow}c${dragObj.dropCol}-pic`).addClass("bonus");
        } // end of if theres bonus

        // take off element from inventory
        app.inventory.splice(dragObj.itemNum - 1, 1);


        app.inventoryAt = 0;

        displayInventoryItems();
        displayBoard();

        cycleMatches();
    } // end of dropInventoryItem


    // INVENORY EVENTS


    // click on arrows
    $(".inventory-right").on("click", toggleInventoryRight);
    $(".inventory-left").on("click", toggleInventoryLeft);

    // swipe with mouse on menu items (left - right directions) / mobile device swipe
    let isMouseDown = false, swipeStartCoord = 0;

    $(".inventory-items").on("mousedown touchstart", function (e) { isMouseDown = true; swipeStartCoord = swipeStart(e); });
    $(".inventory-items").on("mouseup touchend", function () { isMouseDown = false; swipeStartCoord = 0; });
    $(".inventory-items").on("mousemove touchmove", function (e) {
        const xCoord = e.pageX || e.targetTouches[0].pageX; // case for desktop / mobile
        [isMouseDown, swipeStartCoord] = swipeOn(isMouseDown, swipeStartCoord, xCoord, e);
    }); // end of mouse / touch move


    // inventory element drag to the board

    // event is not delegated to the inventory-items div, rather have the five elements separate
    // events because inventory-items div has already swipe event added
    // the mousedown / touchstart event is on the inventory item
    // on the other hand mousemove / touchmove and mouseup / touchup event happens on the body

    let dragObj = {},
        isMouseDownDrag = false;

    $(".inventory-item").each(function () {
        $(this).on("mousedown touchstart", function (e) {
            dragObj = inventoryItemStart(e, dragObj);
            console.log("START");

            isMouseDownDrag = true;
        }); // end of mousedown / touchstart on inventory item
    }); // end of inventory-item iteration

    $("body").on("mousedown touchstart", () => { fullScreen(); });

    $("body").on("mousemove touchmove", function (e) {
        if (isMouseDownDrag) { dragInventoryItem(e, dragObj); }
    }); // end of body onmousemove / ontouchmove

    $("body").on("mouseup touchend", function (e) {
        if (dragObj.dragClone && isMouseDownDrag) {
            if (dragObj.validItemUnderCursor) {
                dropInventoryItem();
                e.stopPropagation();
            } // end of if valid item under cursor
            cancelInventoryItemDrag();

            isMouseDownDrag = false;
        } // end of if there is a dragObj
    }); // end of body mouse / touch up
} // end of addInventoryEvents




function addShopEvents() {
    function shopSetup() {
        const
            fruitPics = [
                app.images.apple, app.images.orange, app.images.peach,
                app.images.strawberry, app.images.plum, app.images.lime,
                app.images.kiwi, app.images.blood_orange, app.images.lemon
            ], // end of fruitPics
            bonusType = ["I4H", "I4V", "T5", "L51", "L52", "I5X", "I5CR", "T6"],
            fruits = ["apple", "orange", "peach", "strawberry", "plum", "lime", "kiwi", "blood_orange", "lemon"];


        app.shop_basket = { "fruit": "", "bonus": "", "diamond": "", "best_hint": "", "fast_hint": "", "price": 0 };

        // add fruit pics
        $(".shop__fruits > div").each(function (i) {
            $(this)
                .css("background-image", `url(${fruitPics[i].src})`)
                .attr("id", "shop__" + fruits[i] + "-btn");
        });

        // add bonus pic
        $(".shop__bonuses > div").each(function (i) { createspecialGemDiv(null, bonusType[i], this); });

        // stop animation
        $(".shop__bonuses div.bonus-sign div")
            .css("animation", "none")
            .css("background", "rgb(71, 62, 77)");

        // square is a bit different, here I need to set other properties
        $(".shop__bonuses .bonus-square")
            .css("background-color", "transparent")
            .css("border-color", "rgb(71, 62, 77)");
    } // end of shopSetup



    function updateShop() {
        // PRICEING THE ITEMS IN THE BASKET
        let price = 0;

        if (app.shop_basket.fruit) { price += 50; }

        if (app.shop_basket.fast_hint) { price += 200; }

        if (app.shop_basket.best_hint) { price += 300; }

        if (app.shop_basket.diamond) { price += 2000; }

        if (app.shop_basket.bonus && app.shop_basket.fruit) {
            const bonusPrices = { "I4H": 250, "I4V": 750, "T5": 500, "L51": 400, "L52": 400, "I5X": 600, "I5CR": 850, "T6": 1000 };

            price += bonusPrices[app.shop_basket.bonus];
        } // end of if has bonus and there is a fruit selected (otherwise bonus wouldn't make sense)

        // DISPLAY PRICE
        $("#shop__price")
            .html("$" + price)
            .css("color", `${price <= app.game_total_points ? "#58e8f3" : "#d684bb"}`);

        app.shop_basket.price = price;

        // DISPLAY ITEM

        // display fruits
        fruitPics = {
            "apple": app.images.apple, "orange": app.images.orange, "peach": app.images.peach,
            "strawberry": app.images.strawberry, "plum": app.images.plum, "lime": app.images.lime,
            "blood_orange": app.images.blood_orange, "kiwi": app.images.kiwi, "lemon": app.images.lemon
        }; // end of fruitPics 

        if (app.shop_basket.fruit) {
            $(".shop__display").css("background-image", `url(${fruitPics[app.shop_basket.fruit].src})`);
        } // end of if basket has a fruit
        else if (app.shop_basket.diamond) {
            $(".shop__display").css("background-image", `url(${app.images.diamond.src})`);
        } // end of if basket has diamond
        else {
            $(".shop__display").css("background-image", "none");
        } // end of basket has no fruit or diamond

        // display bonuses
        $(".shop__display").empty();

        if (app.shop_basket.bonus) {
            createspecialGemDiv(null, app.shop_basket.bonus, ".shop__display");
        } // end of if basket has bonus
    } // end of updateShop


    function buyContentOfBasket() {
        let transaction = false;
        if (app.game_total_points >= app.shop_basket.price) {

            // take price off and save it in storage
            app.game_total_points -= app.shop_basket.price;
            setStorage("game_total_points", app.game_total_points);

            // display current user poins
            $(".game-board__total-points").html(app.game_total_points + "$");

            // create an inventory element
            const fruits = ["apple", "orange", "peach", "strawberry", "plum", "lime", "kiwi", "blood_orange", "lemon"];
            let newInventoryElem = null;

            // add fruit
            if (app.shop_basket.fruit) {
                newInventoryElem = fruits.findIndex(f => f === app.shop_basket.fruit) + 1;
                transaction = true;
            } // end of if basket had fruit

            // add bonus
            if (app.shop_basket.bonus) {
                newInventoryElem += "-" + app.shop_basket.bonus;
                transaction = true;
            } // end of if basket had bonus

            // add diamond
            if (app.shop_basket.diamond) {
                newInventoryElem = "*";
                transaction = true;
            } // end of basket had diamond

            // add fast hint
            if (app.shop_basket.fast_hint) {
                app.game_give_hint_at = 3;
                transaction = true;
            } // and of basket had fast-hint

            // add best hint
            if (app.shop_basket.best_hint) {
                app.game_best_hint = true;
                transaction = true;
            } // and of basket had fast-hint

            // display item in the inventory
            if (newInventoryElem) {
                app.inventory.unshift(newInventoryElem);
                displayInventoryItems();
            } // end of if there was an element to be displayed in the inventory

            // close shop if any transactoion happened
            if (transaction) $(".shop").hide();
        } // end of there is sufficient found
        else {
            // create no funds message
            const
                msgDiv = document.createElement("div"),
                okBtn = document.createElement("button");

            $(okBtn)
                .addClass("insufficient-funds-btn")
                .html("OK")
                .on("click", () => {
                    $(".insufficient-funds-msg").remove();
                });

            $(msgDiv)
                .addClass("insufficient-funds-msg")
                .html("Insufficient funds!")
                .append(okBtn);

            $(".shop").append(msgDiv);
        } // end of there were insufficient founds
    } // end of buyContentOfBasket





    shopSetup(); // set the fruit images and bonuses dynamically





    // SHOP EVENTS

    $("#shop-icon").on("click", () => {
        if (app.game_interaction_enabled) {
            $(".shop").show();

            // remove message if it has been left open
            $(".insufficient-funds-msg").remove();

            // reset shop properties
            $("#shop__price").html("$0");

            app.shop_basket = { "fruit": "", "bonus": "", "diamond": "", "best_hint": "", "fast_hint": "", "price": 0 };

            app.game_best_hint ? $("#shop__best-hint").css("color", "rgb(43, 34, 49)") : $("#shop__best-hint").css("color", "#58e8f3");

            app.game_give_hint_at !== 10 ? $("#shop__fast-hint").css("color", "rgb(43, 34, 49)") : $("#shop__fast-hint").css("color", "#58e8f3");

            updateShop();
        } // end of if interaction is enabled with the board
    }); // end of shop icon click event


    $("#shop__back").on("click", () => { $(".shop").hide(); });

    $("#shop__buy").on("click", () => { buyContentOfBasket(); });

    $("#shop__fast-hint").on("click", () => {
        if (app.game_give_hint_at === 10) {
            if (!app.shop_basket.fast_hint) {
                app.shop_basket.fast_hint = true;

                $("#shop__fast-hint").css("color", "rgb(43, 34, 49)"); // dim color
            } // end of if basket has no fasthint
            else {
                app.shop_basket.fast_hint = "";

                $("#shop__fast-hint").css("color", "#58e8f3"); // lighten color
            } // end of if basket has fast hint

            updateShop();
        } // end of if fast hint is not set yet
    }); // end of fast hint click event

    $("#shop__best-hint").on("click", () => {
        if (!app.game_best_hint) {
            if (!app.shop_basket.best_hint) {
                app.shop_basket.best_hint = true;

                $("#shop__best-hint").css("color", "rgb(43, 34, 49)"); // dim color
            } // end of if basket has no besthint
            else {
                app.shop_basket.best_hint = "";

                $("#shop__best-hint").css("color", "#58e8f3"); // lighten color
            } // end of if basket has best hint

            updateShop();
        } // end of if best hint is not set yet
    }); // end of fast hint click event

    $("#shop__diamond").on("click", () => {
        app.shop_basket.diamond = true;

        // reset fruit and bonus
        app.shop_basket.fruit = "";
        app.shop_basket.bonus = "";

        updateShop();
    }); // end of diamond click event

    // delegate fruits to the whole container
    $(".shop__fruits-container").on("click", e => {
        if (e.target.id) {
            const fruit = e.target.id.replace(/(shop__|-btn)/g, "");

            app.shop_basket.fruit = fruit;

            if (!app.shop_basket.bonus) {
                app.shop_basket.bonus = "I4H";
            } // end of if no bonus has been selected yet

            // reset unnecessary basket properties, in this case diamond needs to go
            app.shop_basket.diamond = "";

            updateShop();
        } // end of if target has an id (only fruit buttons have)
    }); // end of fruit container click event

    // delegate bonuses to it's container
    $(".shop__bonuses-container").on("click", e => {
        if ($(e.target).children().hasClass("bonus-sign")) {
            const bonus = $(e.target).children().attr("class").split("bonus-sign SIGN-")[1];

            app.shop_basket.bonus = bonus;

            // add apple as a fruit if fruit has not been chosen yet
            if (!app.shop_basket.fruit) { app.shop_basket.fruit = "apple"; }

            // reset unnecessary basket properties, in this case diamond needs to go
            app.shop_basket.diamond = "";

            updateShop();
        } // end of if first child element is a bonus (the last element of the container is a blank place-holder)
    }); // end of bonuses container click event
} // end of createShop




/*
 

            GAME BOARD FUNCTIONS


*/



// Check all possible match patterns and return them in an array
// Multiple matches return multiple arrays
function checkMatches() {

    const matches = [];
    /* Patterns need to be divided by sections
           Example: (O4 match which won't happen)
           1        X               1
           11  =>   X1  instead of  XX
           11       X1              XX
           The reason is that the match I3 is found before the loop gets to
           the higher ranking O4 match 
    */


    // app is entering a turn
    if (matches.length) app.game_turn_is_over = false;  // start a turn only if there are matches at all

    for (r = 0; r < 11; r++) {
        for (c = 0; c < 9; c++) {
            checkPattern7(r, c);
        } // end of cell iteration
    } // end of row iteration

    for (r = 0; r < 11; r++) {
        for (c = 0; c < 9; c++) {
            checkPattern6(r, c);
        } // end of cell iteration
    } // end of row iteration 

    for (r = 0; r < 11; r++) {
        for (c = 0; c < 9; c++) {
            checkPattern5(r, c);
        } // end of cell iteration
    } // end of row iteration

    // matches with explosion eg I4 has priority over O4 (wins time)
    for (r = 0; r < 11; r++) {
        for (c = 0; c < 9; c++) {
            match("I4H", [r, c], [0, 0], [0, 1], [0, 2], [0, 3]);
            match("I4V", [r, c], [0, 0], [1, 0], [2, 0], [3, 0]);
        } // end of cell iteration
    } // end of row iteration

    for (r = 0; r < 11; r++) {
        for (c = 0; c < 9; c++) {
            match("O4", [r, c], [0, 0], [0, 1], [1, 0], [1, 1]);
        } // end of cell iteration
    } // end of row iteration

    for (r = 0; r < 11; r++) {
        for (c = 0; c < 9; c++) {
            match("I3", [r, c], [0, 0], [0, 1], [0, 2]);
            match("I3", [r, c], [0, 0], [1, 0], [2, 0]);
        } // end of cell iteration
    } // end of row iteration


    function checkPattern7(r, c) {
        match("T7", [r, c], [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [2, 2]);
        match("T7", [r, c], [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [2, 0], [2, 1]);
        match("T7", [r, c], [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [0, 2], [1, 2]);
        match("T7", [r, c], [0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [2, 1], [2, 2]);
    } // end of pattern 7   

    function checkPattern6(r, c) {
        match("T6", [r, c], [0, 0], [0, 1], [0, 2], [0, 3], [1, 2], [2, 2]);
        match("T6", [r, c], [0, 2], [1, 2], [2, 2], [3, 2], [2, 0], [2, 1]);
        match("T6", [r, c], [2, 0], [2, 1], [2, 2], [2, 3], [0, 1], [1, 1]);
        match("T6", [r, c], [0, 0], [1, 0], [2, 0], [3, 0], [2, 1], [2, 2]);
        match("T6", [r, c], [0, 0], [0, 1], [0, 2], [0, 3], [1, 1], [2, 1]);
        match("T6", [r, c], [0, 2], [1, 2], [2, 2], [3, 2], [1, 0], [1, 1]);
        match("T6", [r, c], [2, 0], [2, 1], [2, 2], [2, 3], [0, 2], [1, 2]);
        match("T6", [r, c], [0, 0], [1, 0], [2, 0], [3, 0], [1, 1], [1, 2]);
    } // end of pattern 6

    function checkPattern5(r, c) {
        match("I5", [r, c], [0, 0], [0, 1], [0, 2], [0, 3], [0, 4]);
        match("I5", [r, c], [0, 0], [1, 0], [2, 0], [3, 0], [4, 0]);
        match("L51", [r, c], [0, 0], [0, 1], [0, 2], [1, 2], [2, 2]);
        match("L51", [r, c], [0, 0], [1, 0], [2, 0], [2, 1], [2, 2]);
        match("L52", [r, c], [0, 0], [0, 1], [0, 2], [1, 0], [2, 0]);
        match("L52", [r, c], [2, 0], [2, 1], [2, 2], [1, 2], [0, 2]);
        match("T5", [r, c], [0, 0], [0, 1], [0, 2], [1, 1], [2, 1]);
        match("T5", [r, c], [1, 0], [1, 1], [1, 2], [0, 2], [2, 2]);
        match("T5", [r, c], [2, 0], [2, 1], [2, 2], [0, 1], [1, 1]);
        match("T5", [r, c], [0, 0], [1, 0], [2, 0], [1, 1], [1, 2]);
    } // end of pattern 5



    // match function arguments explained:
    // 1 - pattern name: later on we can get bonus points by referring which pattern we matched
    // 2 - [top-leftX, Y coordinates]: every single pattern search must start form top left,
    //     thus we certainly can avoid bumping into negative numbers
    // 3 - [[the pattern distance coordinates]]: the coordinates are representing the difference
    //     from the top-left coordinates, resulting dryer code.
    // The function returns false when no matches found or the matches array
    function match(patternName, [topLeftY, topLeftX], ...patterns) {
        // create ids from pattern
        const ids = patterns.map(p => [p[0] + topLeftY, p[1] + topLeftX]);


        const fruits = ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
            isFruit = (r, c) => fruits.find(fr => fr === app.board[r][c]),
            // if any coords in range and is fruit
            validId = (ca => ca[0] < 11 && ca[1] < 9 && isFruit(ca[0], ca[1]));

        // if any of the ids are invalid, return, making the search faster if we certainly know
        // the pattern can not be matched
        for (i = 0; i < ids.length; i++) {
            if (!validId(ids[i])) return void (0);
        } // end of for ids

        chars = ids.map(ch => app.board[ch[0]][ch[1]]); // get all board values

        const isMatching = chars.every((ch, _, a) => ch === a[0]); // check  if every char is the same
        if (isMatching) {
            matches.push({
                "patternName": patternName,
                "sample": chars[0],
                "coords": [...ids]
            });

            // make matched patterns X, so they won't be matched in other pattern searches
            // resulting faster code running
            // and make explosion background
            ids.forEach(id => {
                app.board[id[0]][id[1]] = "X";
                $(`#r${id[0]}c${id[1]}-pic`).addClass("explosion");
            }); // end of ids iteration
        } // end of its matching 
    } // end of general match function

    // check if any of the matches has bonus
    checkBonuses();

    // get special gems, function modifies the board!!! in order to leave
    // one fruit with the special sign, avoiding destroying it
    getSpecialGems(matches);

    // app.matches might have already matches by bonus gems at this point of execution
    // NOTE: app.game_matches and matches (in this lexical scope) therefore
    // are not necessarily identical
    if (matches.length) {
        // app matches might have bonus matches at this point
        // add them the regular fruit matches
        app.game_matches = app.game_matches.concat(matches);
    }

    // get points for the matches
    app.game_matches.forEach(match => {
        const points = {
            "I3": 3, "O4": 5, "I4": 5,
            "T5": 10, "L5": 10, "I5": 10,
            "T6": 25, "T7": 100,
            "BB": 10, "D": 20, "DD": 25,
            "A": 100, "B": 100, "C": 100, "D": 100, "E": 100
        }; // end of patternName to points object declaration

        app.game_partial_points += points[match.patternName[0] + (match.patternName[1] || "")]; // the firts 2 letter of the patternName is enough to determine it's value
    }); // end of matches for adding points

    // multiple match double the points
    if (matches.length > 1) app.game_partial_points *= 2;

    if (!matches.length && checkFlowersOverBasket === 0) app.game_turn_is_over = true;

    return matches.length ? matches : false; // return false if no matches 
} // end of checkMatches



function animateExplosions(matches) {
    // several function can call animateExplosions, in cases matches might be even empty
    if (matches.length) {
        // disable interaction with the gameboard while animation is going 
        // until new characters are on the board
        app.game_interaction_enabled = false;
        app.game_hint_is_paused = false; // hint stops counting time, so it won't disrupt animation

        // parentXY is necessary for calculating the shards relative xy
        const parentXY = $(".game-board")[0].getBoundingClientRect();

        // iterate matches
        matches.map(match => {
            if (match.sample !== "X") {
                // iterate id coordinates
                for (i = 0; i < match.coords.length; i++) {
                    const coord = match.coords[i];

                    // get id XY position
                    const idXY = $(`#r${coord[0]}c${coord[1]}-pic`)[0].getBoundingClientRect();

                    // create 5 shards for each id
                    for (sh = 0; sh < 5; sh++) {
                        // create a shard
                        shard = document.createElement("div");
                        shard.id = `shard_r${coord[0]}c${coord[1]}`;
                        $(shard).addClass("shard");

                        // set x y relative to gameboard and its own piece position
                        const diffX = [18, 18, 10, 2, 0], // each piece is placed a bit differently
                            diffY = [0, 14, 17, 14, 0];

                        $(shard).css({ top: idXY.y - parentXY.y + diffY[sh], left: idXY.x - parentXY.x + diffX[sh] });

                        // set background image according to the fruit type
                        // 0 is reserved for transparent so array should start from 1
                        const fruits = ["", "apple", "orange", "peach", "strawberry", "plum", "lime", "kiwi", "blood_orange", "lemon"],
                            imgName = fruits[Number(match.sample)] + "_shard" + (sh + 1),
                            imgURL = `url(${app.images[imgName].src})`;

                        $(shard).css(`backgroundImage`, imgURL);
                        $(shard).addClass(`shard${sh + 1}`); // add shard number for different keyframe animations

                        // delay explosion on pieces randomly
                        const randomDelay = ((Math.random() * 1.5) / 10).toFixed(2) + "s";
                        $(shard)[0].style.animationDelay = randomDelay;
                        $(shard)[0].style.WebkitAnimationDelay = randomDelay;
                        $(".game-board").append(shard);
                    } // end of creating five shards
                }; // end of iteration id times
            } // end if sample is not none
        }); //end of match iteration

        // remove elements with 0.45s delay, giving time for animation
        const removeShardsDelay = setTimeout(() => {
            $(".shard").remove();

            // when animation is done start to fill the board up again
            gravity();  // make elements fill the created gaps
            clearTimeout(removeShardsDelay);
        }, 450);

        destroyStones(matches.map(match => match.coords));
    } // end of if there are matches at all
} // end of animateExplosions


function gravity() {
    let currentBoard = app.board;
    // each column need to be tested against column gravity
    const columnGravityDone = Array(9).fill(false);

    // function returns if the column has any element that is against gravity
    // Consider: walls, stones, baskets have fixed position on the board,
    // while fruits and flowers are mobile elements 
    function checkColumnGravity(col) {
        // check if column has any X (gaps)
        if (!col.some(e => e === "X")) return true;

        // check if the first gap has any mobile element above (any fruit or flower, rest are immobile) 
        const firstGap = col.indexOf("X"),
            restOfCol = col.slice(firstGap + 1, col.length);


        return !(/[A-E1-9]/g.test(restOfCol.join("")));
    } // end of checkColumnGravity



    // Function applies gravity on column recieved as its parameter.
    function gravitiseColumn(col, colNum) {
        // temporaly name gems with bonuses like "1B0"
        // where 1 means the fruit and B0 is the bonus type
        // so we can make sure the bonus is moving with the gravity

        const columnBonuses = [];

        col = col.map((gem, ind) => {
            const id = `#r${10 - ind}c${colNum}-pic`;
            if ($(id).hasClass("bonus")) {
                // save the bonus, and delete it
                const clone = $(id).children();
                $(id).removeClass("bonus").empty();
                gem += `B${columnBonuses.length}`; // extend name
                columnBonuses.push(clone); // save bonus here!
            } // end of if gem has bonus
            return gem;
        }); // end of map col

        // take off fixed positioned elements from column
        const fixedPosGem = ["S", "M", "L", "#", "U"],
            isFixedPosGem = (gem) => fixedPosGem.find(el => el === gem);

        let newCol = col.filter(gem => isFixedPosGem(gem) ? "" : gem);

        // find first gap ("X") and remove it from column and put it on the top (end)
        const firstGap = newCol.indexOf("X");
        newCol.splice(firstGap, 1);

        newCol.push("X");

        // place fixed pos items back to their original place
        col.map((orig, oInd) => {
            if (isFixedPosGem(orig)) {
                newCol.splice(oInd, 0, orig);
            } // end of if gem is a fixedPos
        }); // end of original column iteration

        // place bonuses back
        newCol = newCol.map((gem, ind) => {
            if (gem.length > 1) {
                const bonusNum = gem.replace(/.B/g, "");
                $(`#r${10 - ind}c${colNum}-pic`)
                    .addClass("bonus")
                    .append(columnBonuses[bonusNum]);
            } // end of if bonus
            return gem[0]; // make sure only the first character is leaving the function
        }); // end of col map
        return newCol;
    } // end of gravitiseColumn


    // function iterates all columns, if column needs gravity, apply
    // else correct columnGravityDone array 
    function gravitiseBoard(board) {
        const updateColumnGravityDone = (c, cn) => {
            columnGravityDone[cn] = checkColumnGravity(c);
            return columnGravityDone[cn];
        } // end of update...

        for (colNum = 0; colNum < board[0].length; colNum++) {
            // check if column need gravity end skip the ones 
            // that have no altering needed (first iteration all cols checked)
            if (!columnGravityDone[colNum]) {
                // Extract the column from board
                let column = board.map(row => row[colNum]).reverse();

                if (!updateColumnGravityDone(column, colNum)) {

                    column = gravitiseColumn(column, colNum);
                    // modify the board
                    let gem = 0; // column counter for row iteration
                    for (r = currentBoard.length - 1; r >= 0; r--) {
                        currentBoard[r][colNum] = column[gem++]; // update board 
                    } // end of row iteration
                    updateColumnGravityDone(column, colNum); // if done, it can skip next iteration
                } // end of if gravity needed
            } // end of first gravity arr check
        } // end of column iteration
        app.board = currentBoard; // update the live board
        displayBoard();

        // recursive function with delay until all gaps are on the top
        if (columnGravityDone.some(c => !c)) {
            const gravityDelay = setTimeout(() => {
                gravitiseBoard(currentBoard);
                clearTimeout(gravityDelay);
            }, 20); // end of timer
        } // end of if board incomplete 
        else {
            fillBoardWithNewFruits();
        } // end of if board is done and ready to refill
    } // end of gravitizeBoard

    gravitiseBoard(currentBoard);
} // end of gravity


function fillBoardWithNewFruits() {
    const idsToFill = [];

    for (r = 10; r >= 0; r--) {
        for (c = 0; c <= 8; c++) {
            if (app.board[r][c] === "X") {
                idsToFill.push([[r], [c]]);
            } // end of if cell is empty
        } // end of cell iteration
    } // end of reverse row iteration

    function fillEmptyCell(num) {
        const randFruit = Math.ceil(Math.random() * levels[app.currentLevel - 1].fruitVariationNumber) + "";
        app.board[idsToFill[num][0]][idsToFill[num][1]] = randFruit;

        // check if there is enough flowers on the board
        const currentFlowers = [
            ...(app.board.join("")
                .replace(/,/g, ""))]
            .filter(el => /[ABCDE]/g.test(el))
            .length;

        // add a flower to the top if flowers are less than the minimal
        if (currentFlowers < levels[app.currentLevel - 1].minimumFlowersOnBoard) {
            // find empty the top most row id
            const topmostRow = idsToFill[idsToFill.length - 1][0][0],
                // get the cells on the topmost row that were gaps
                cellIds = idsToFill
                    .filter(id => id[0][0] === topmostRow)
                    .map(id => id[1][0]),
                // choose one randomly
                randomColumnInd = cellIds[Math.floor(Math.random() * cellIds.length)];

            // set the chosen cell as a random flower (F will become a valid flower(ABCDE) in displayBoard func)
            app.board[topmostRow][randomColumnInd] = "F";
        } // end of currentflowers are less then minimal

        displayBoard();
    } // end of fillEmptyCell

    displayLevelPoints();

    let nextId = 0;
    const drippingDelay = setInterval(() => {
        if (nextId === idsToFill.length) {
            clearInterval(drippingDelay);
            cycleMatches(); // cicle back and look for more matches
        } else {
            fillEmptyCell(nextId);
            nextId++;
        } // end of if there are still more ids to fill
    }, 50); // end of drippingDelay
} // end of drippingNewFruits



function cycleMatches() {
    const matches = checkMatches();
    displayBoard();
    destroyFlowersOverBasket();
    if (matches) {
        animateExplosions(matches);
    } // if there are further matches
    else {
        const possibleMatches = possibleMoves();
        if (possibleMatches.length === 0) {
            app.game_turn_is_over = true;
            noMoreMovesMessage();
        } // end of there are no more moves on board
        else {
            // app is exiting a turn
            app.game_turn_is_over = true;
            if (!app.game_interaction_locked) {
                app.game_interaction_enabled = true; // give interaction back to player
                app.game_hint_is_paused = false; // hint can count time again
            } // end of if interaction is not locked because of the end-game
        } // end of if there are possible matches
    } // end of if there are no further matches
    destroyFlowersOverBasket();
} // end of cycleMatches


function displayLevelPoints() {
    // double the points if level has been maxed out
    if (app.game_current_level_maxed) app.game_partial_points *= 2;

    // display partial points
    // find the centre of the matches
    const X = [], Y = [];
    // get the x and y coordinates
    if (app.game_matches.length) {
        app.game_matches.forEach(match => {
            match.coords.forEach(xy => {
                const rect = $(`#r${xy[0]}c${xy[1]}-box`)[0].getBoundingClientRect();

                X.push(rect.x);
                Y.push(rect.y);
            }); // end of match foreach
        }); // end of matches forEach    
    } // end of if points coming from a match
    else {
        const rect = $(".game-board")[0].getBoundingClientRect();

        X.push(rect.x);
        Y.push(rect.y);
    } // end of points coming without a match eg: flower over basket

    // get the average xy
    avgCoords = {
        "x": Math.round(X.reduce((a, b) => a + b, 0) / X.length),
        "y": Math.round(Y.reduce((a, b) => a + b, 0) / Y.length),
    }; // end of avgCoords

    // greate a points on a turn element
    const pointsOnTurn = document.createElement("div");

    $(pointsOnTurn)
        .attr("id", "points-on-turn")
        .html(app.game_partial_points + "$");

    $(".game-board")[0].append(pointsOnTurn);

    pointsOnTurn.style.top = avgCoords.y - $(".game-board")[0].getBoundingClientRect().y + "px";
    pointsOnTurn.style.left = avgCoords.x - $(".game-board")[0].getBoundingClientRect().x + "px";

    // take element off the DOM with delay
    const pointsDelay = setTimeout(() => {
        $(".game-board")[0].removeChild(pointsOnTurn);
        clearTimeout(pointsDelay);
    }, 750);


    // display level points
    // points goes up with some animation eg 1350 1352 1357 1359 1363

    if (app.game_partial_points < 6) {
        let counter = app.game_partial_points;
        const increasePointsDelay = setInterval(() => {
            counter--;
            let point = $(".game-board__level-points")
                .html()
                .match(/\d+/g)[0]; // extract points

            $(".game-board__level-points").html(
                $(".game-board__level-points")
                    .html()
                    .replace((/\[\d+/g), "[" + ++point)
            );

            if (counter < 1) clearTimeout(increasePointsDelay);
        }, 100); // end of delay
    } // end of if points less than 6
    else {
        let counter = 0,
            point = $(".game-board__level-points")
                .html()
                .match(/\d+/g)[0]; // extract points

        const points = [...Array(app.game_partial_points).keys()]
            .map(p => Number(p) + Number(point));
        let randomPoints = [];

        // choose 4 values randomly
        for (let i = 0; i < 4; i++) {
            const ran = Math.floor(Math.random() * points.length);

            randomPoints.push(points[ran]);
            points.splice(ran, 1)
        } // end of for 5

        // the last value is the sum of partial and level points
        randomPoints.push(Number(point) + app.game_partial_points);
        randomPoints = randomPoints.sort((a, b) => a > b);

        const increasePointsDelay = setInterval(() => {
            $(".game-board__level-points").html(
                $(".game-board__level-points")
                    .html()
                    .replace((/\[\d+/g), "[" + randomPoints[counter])
            );

            if (counter === 4) clearTimeout(increasePointsDelay);
            counter++;
        }, 100); // end of delay
    } // end of if point is more than five

    // clear points
    app.game_level_points += app.game_partial_points;
    app.game_partial_points = 0;
    app.game_matches = [];
} // end of displayLevelPoints




// just a helper function, when game is finishing, it won't let the game finish while there is flowers above any basket
function checkFlowersOverBasket() {
    // check if character above is flower
    const isFlower = (e) => ["A", "B", "C", "D", "E"].find(fl => fl === e);
    let flowerOverBasket = 0;

    app.board.forEach((row, rowPos) =>
        row.forEach((cell, cellPos) => {
            if (cell === "U" && isFlower((app.board[rowPos - 1] || [])[cellPos])) flowerOverBasket++;
        }) // end of cell
    ); // end of row
    return flowerOverBasket;
} // end of checkFlowersOverBasket




function destroyFlowersOverBasket() {
    // get the basket positions
    basketsPos = []
    app.board.forEach((row, rowPos) =>
        row.forEach((cell, cellPos) => {
            if (cell === "U") basketsPos.push([rowPos, cellPos]); // fill up basketPositions
        })); // end of board search

    // check if character above is flower
    const isFlower = (r, c) => ["A", "B", "C", "D", "E"].find(fl => fl === app.board[r][c]);

    // remove flowers from board
    basketsPos.forEach(basket => {
        // skip basket on row 0, it gets Error, flower on row -1 is impossible
        if (basket[0] !== 0) {
            if (isFlower(basket[0] - 1, basket[1])) {
                // update flowers
                app.flowers++;
                app.game_partial_points += 100;

                // update mathes so points on the turn can be displayed
                // on the right coords if only a flower has gone down
                // NOTE: in case the turn has only the flower disappearing
                // it will show the points in the top left corner because
                // coordinates are calculated from the matches object
                const flower = app.board[basket[0] - 1][basket[1]];
                app.game_matches.push({
                    "patternName": flower,
                    "sample": "none",
                    "coords": [[basket[0] - 1, basket[1]]]
                }); // end of push matches

                // display how many flowers has been left to complete level requirement
                let flowersLeftToCompleteLevelReq = levels[app.currentLevel - 1].flowersToCompleteTheLevel - app.flowers;
                $("#flower-counter")
                    .html(flowersLeftToCompleteLevelReq > 0 ? flowersLeftToCompleteLevelReq : 0);

                // remove flower
                app.board[basket[0] - 1][basket[1]] = "X";

                // add animation, remove spin anim
                $(`#r${basket[0] - 1}c${basket[1]}-pic`)
                    .removeClass("spin-pic")
                    .addClass("flower-disappear");

                // remove class if animation is done
                const flowerTimer = setTimeout(() => {
                    $(`#r${basket[0] - 1}c${basket[1]}-pic`).removeClass("flower-disappear");

                    // check newly created board
                    gravity();

                    // check if the changed board has any matches
                    const matches = checkMatches();
                    if (matches) {
                        animateExplosions(matches);
                    }

                    displayBoard();

                    clearTimeout(flowerTimer);
                }, 450); // end of delayed class removal
            } // if flower
        } // end of if row > 0
    }); // end of basket iteration
} // end of destroyFlowersOverBasket


function getSpecialGems(matches) {
    const getRandomPos = (posArr) => Math.floor(Math.random() * posArr.length);

    matches.forEach(match => {
        const specialCoord = match.coords[getRandomPos(match.coords)];

        // ignore matches like I3 or diamond T7
        if (match.patternName !== "I3" && match.patternName !== "T7" && match.patternName !== "O4") {
            // get one of the position randomly and put the special class 
            $(`#r${specialCoord[0]}c${specialCoord[1]}-pic`).addClass("bonus");
            createspecialGemDiv(specialCoord, match.patternName);

            // leave one of the sample on the board
            app.board[specialCoord[0]][specialCoord[1]] = match.sample;
        } // end of if not I3 T7

        // O4 adds 5 sec extra time
        if (match.patternName === "O4") {
            app.game_time_left += 5;

            // animate the five sec to go into the time display
            // create element
            const fiveSec = document.createElement("div");

            $(fiveSec)
                .attr("id", "five-sec")
                .html("+5 sec");

            // add it to the board
            $(".game-board")[0].append(fiveSec);

            // detect match coordinates
            let coordsMatch = $(`#r${match.coords[0][0]}c${match.coords[0][1]}-box`)[0]
                .getBoundingClientRect();

            // detect game-board coordinates
            let coordsBoard = $(".game-board")[0].getBoundingClientRect();

            // set the style according the calculated attributes
            fiveSec.style.left = (coordsMatch.x - coordsBoard.x) + "px";
            fiveSec.style.top = (coordsMatch.y - coordsBoard.y + coordsMatch.height / 2) + "px";
            fiveSec.style.width = coordsMatch.width * 2 + "px";
            fiveSec.style.height = coordsMatch.height + "px";
            fiveSec.style.fontSize = coordsMatch.height / 2 + "px";
            fiveSec.style.lineHeight = coordsMatch.height + "px";

            // remove element with delay
            const fivesecDelay = setTimeout(() => {
                $(".game-board")[0].removeChild(fiveSec);
                clearTimeout(fivesecDelay);
            }, 550);
        } // end of if O4

        // T7 creates a diamond
        if (match.patternName === "T7") {
            app.board[specialCoord[0]][specialCoord[1]] = "*";
        } // end of if T7
    }); // end of match iteration
} // end of getSpecialGems




// function creates the special divs for bonus gems
// parameters: the gems coordinates, if null add spacial to divs to elementSelector 
//             the name of the pattern
//             the elementSelector is used if coords are null
function createspecialGemDiv(coord, name, elementSelector) {
    // function append a div with className to specialDiv
    function addDivToBonusDiv(className) {
        const div = document.createElement("div");

        $(div).addClass(className);
        $(specialDiv).append(div);
    } // end of addDiv


    const specialDiv = document.createElement("div");

    switch (name) {
        case "I4V": {
            addDivToBonusDiv("bonus-vertical-line");
            $(specialDiv).addClass(`bonus-sign SIGN-I4V`);
            break;
        } // end of case I4V
        case "I4H": {
            addDivToBonusDiv("bonus-horizontal-line");
            $(specialDiv).addClass(`bonus-sign SIGN-I4H`);
            break;
        } // end of case I4H
        case "T5": {
            addDivToBonusDiv("bonus-square");
            $(specialDiv).addClass(`bonus-sign SIGN-T5`);
            break;
        } // end of case T5
        case "L51": {
            addDivToBonusDiv("bonus-diagonal1-line");
            $(specialDiv).addClass(`bonus-sign SIGN-L51`);
            break;
        } // end of case L51
        case "L52": {
            addDivToBonusDiv("bonus-diagonal2-line");
            $(specialDiv).addClass(`bonus-sign SIGN-L52`);
            break;
        } // end of case L52
        case "I5": {
            // I5 match is randomly + or X
            if (!!Math.floor(Math.random() * 2)) {
                addDivToBonusDiv("bonus-diagonal1-line");
                addDivToBonusDiv("bonus-diagonal2-line");
                $(specialDiv).addClass(`bonus-sign SIGN-I5X`);
            }
            else {
                addDivToBonusDiv("bonus-vertical-line");
                addDivToBonusDiv("bonus-horizontal-line");
                $(specialDiv).addClass(`bonus-sign SIGN-I5CR`);
            } // end of if random false or true
            break;
        } // end of case I5
        case "I5X": { // in case I5X is given (only in inventory otherwise randomly given I5X / I5CR)
            addDivToBonusDiv("bonus-diagonal1-line");
            addDivToBonusDiv("bonus-diagonal2-line");
            $(specialDiv).addClass(`bonus-sign SIGN-I5X`);
            break;
        } // end of case I5X
        case "I5CR": { // in case I5CR is given (only in inventory otherwise randomly given I5X / I5CR)
            addDivToBonusDiv("bonus-vertical-line");
            addDivToBonusDiv("bonus-horizontal-line");
            $(specialDiv).addClass(`bonus-sign SIGN-I5CR`);
            break;
        } // end of case I5X
        case "T6": {
            addDivToBonusDiv("bonus-diagonal1-line");
            addDivToBonusDiv("bonus-diagonal2-line");
            addDivToBonusDiv("bonus-vertical-line");
            addDivToBonusDiv("bonus-horizontal-line");
            $(specialDiv).addClass(`bonus-sign SIGN-T6`);
            break;
        } // end of case T6
    } // end of switch patternNames

    if (coord) {
        $(`#r${coord[0]}c${coord[1]}-pic`).append(specialDiv);
    } // end of if coord parameter is true
    else {

        // otherwise add divs to elementId
        $(elementSelector).append(specialDiv);
    } // end of if coord is falsy
} // end of createSpecialGemDiv


// function check if any gaps created by a match or a bonus explosion has bonuses
function checkBonuses() {
    app.board.forEach((row, rowInd) => {
        row.forEach((cell, cellInd) => {
            const elem = $(`#r${rowInd}c${cellInd}-pic`);
            if (cell === "X" && elem.hasClass("bonus")) {
                // extract the bonus type from childrens class
                const bonusType = elem
                    .children()
                    .attr("class")
                    .split("SIGN-")[1];

                // remove bonus
                $(elem)
                    .removeClass("bonus")
                    .empty();

                bonusExplode(bonusType, rowInd, cellInd);
            } // end of if gap and Bonus
        }); // end of cell foreach
    }); // end of row foreach
} // end of checkBonuses




// explose bonuses in different patterns according to bonusType
function bonusExplode(bonusType, rowInd, cellInd) {
    function explose(r, c) {
        // prevent any invalid value to cause error
        if (r < 0 || r > 10 || c < 0 || c > 8) return void (0);

        const fruits = [..."123456789"],
            char = app.board[r][c];

        if (fruits.some(fr => fr === char)) {
            app.board[r][c] = "X";
            app.game_partial_points++;
        } // end of if char is fruit

        $(`#r${r}c${c}-pic`).addClass("explosion");
        // take care of stones
        switch (app.board[r][c]) {
            case "L": {
                app.board[r][c] = "M";
                app.game_partial_points++;
                break;
            } // end of case large
            case "M": {
                app.board[r][c] = "S";
                app.game_partial_points++;
                break;
            } // end of case large
            case "S": {
                app.board[r][c] = "X";
                app.game_partial_points++;
            } // end of case large
        } // end of switch stone
    } // end of explode 


    // set the direction like dirR = -1 so it will check the negative direction
    // quick 101 on dirR dirC: NE: -1 1, SE: 1 1, SW: 1 -1, NW: -1 -1
    const exploseDiagonal = (dirR, dirC) => [...Array(8).keys()]
        .forEach(dist => explose(rowInd + dist * dirR, cellInd + dist * dirC));


    switch (bonusType) {
        case "I4H": {
            // get all row X
            app.board[rowInd].forEach((_, ci) => explose(rowInd, ci));
            break;
        } // end of case I4H
        case "I4V": {
            // get all cell Y
            app.board.forEach((_, ri) => explose(ri, cellInd));
            break;
        } // end of case I4H
        case "T5": {
            let r = rowInd,
                c = cellInd;

            const explosionPath = [
                [r - 2, c],                                             //      *
                [r - 1, c - 1], [r - 1, c], [r - 1, c + 1],             //    * * *
                [r, c - 2], [r, c - 1], [r, c], [r, c + 1], [r, c + 2], //  * * * * *
                [r + 1, c - 1], [r + 1, c], [r + 1, c + 1],             //    * * *
                [r + 2, c]                                              //      *
            ];

            explosionPath.forEach(xy => explose(xy[0], xy[1]));
            break;
        } // end of case T5
        case "L51": {
            exploseDiagonal(-1, -1);
            exploseDiagonal(1, 1);
            break;
        } // end of case L51 ( \ ) diag from NW to SE
        case "L52": {
            exploseDiagonal(-1, 1);
            exploseDiagonal(1, -1);
            break;
        } // end of case L51 ( \ ) diag from NW to SE
        case "I5CR": {
            app.board.forEach((_, ri) => explose(ri, cellInd));
            app.board[rowInd].forEach((_, ci) => explose(rowInd, ci));
            break;
        } // end of case I5CR
        case "I5X": {
            exploseDiagonal(-1, -1);
            exploseDiagonal(1, 1);
            exploseDiagonal(-1, 1);
            exploseDiagonal(1, -1);
            break;
        } // end of case I5X
        case "T6": {
            app.board.forEach((_, ri) => explose(ri, cellInd));
            app.board[rowInd].forEach((_, ci) => explose(rowInd, ci));
            exploseDiagonal(-1, -1);
            exploseDiagonal(1, 1);
            exploseDiagonal(-1, 1);
            exploseDiagonal(1, -1);
        } // end of case T6
    } // end of swith

    displayBoard();
    // recursively check bonuses, if they triggered more explosions
    checkBonuses();
} // end of bonusExplode



// function check if any gap created by an explosion or match has any stones around
// Large stones become medium, medium small, small becomes a gap
function destroyStones(coordsArr) {
    coordsArr.forEach(coords => {
        coords.forEach(coord => {
            // check if any of the cells around is stone [North, South, West, East]
            const [rowInd, cellInd] = [...coord],
                cellsAroundHaveStone = [
                    (app.board[rowInd - 1] || [])[cellInd],  // avoid array out of range error
                    (app.board[rowInd + 1] || [])[cellInd],
                    app.board[rowInd][cellInd - 1],
                    app.board[rowInd][cellInd + 1]
                ]; // end of cellsAroundHaveStones declaration

            cellsAroundHaveStone.forEach((cellAround, ind) => {
                const direction = [[-1, 0], [1, 0], [0, -1], [0, 1]][ind]; // returns the index the stone is on

                switch (cellAround) {
                    case "L": {
                        app.board[rowInd + direction[0]][cellInd + direction[1]] = "M";
                        $(`#r${rowInd}c${cellInd}-pic`).addClass("explosion");
                        app.game_partial_points++;
                        break;
                    } // end of case large stone
                    case "M": {
                        app.board[rowInd + direction[0]][cellInd + direction[1]] = "S";
                        $(`#r${rowInd}c${cellInd}-pic`).addClass("explosion");
                        app.game_partial_points++;
                        break;
                    } // end of case large stone
                    case "S": {
                        app.board[rowInd + direction[0]][cellInd + direction[1]] = "X";
                        $(`#r${rowInd}c${cellInd}-pic`).addClass("explosion");
                        app.game_partial_points++;
                        break;
                    } // end of case large stone
                } // end of switch cellAround
            }); // end of iterate cellsAroundHaveStone
        }); // end of coord iteration
    }); // end of coordsArr iteration
} // end of destroyStones


// function returns possible matches, or null if none left
function possibleMoves() {
    function checkPattern(patternName, indices, r, c, r1, c1) {
        const valsOnIndex = [];
        // return false if any of the indices are out of boards range
        // or the val is not matching the first instance of the val array
        // making the iteration as efficient as possible
        for (i = 0; i < indices.length; i++) {
            const val = (app.board[indices[i][0] + r] || [])[indices[i][1] + c];

            // if value out of range, spare some computation cost
            if (!val) return false;

            // build values
            valsOnIndex.push(val);

            // if any of the values are different than the first one,
            // escape; no further search will fulfill the requirement of a match
            if (val !== valsOnIndex[0]) return false;
        } // end of indices iteration

        moves.push({
            "patternName": patternName,
            "swap": [[r, c], [r1, c1]],
            "coords": indices.map(index => [index[0] + r, index[1] + c])
        }); // end of push moves

        return true;
    } // end of check patterns

    let moves = [];
    const isMobileChar = (cell) => "123456789ABCDE".split("").some(fr => fr === cell);

    app.board.forEach((row, rowInd) =>
        row.forEach((cell, cellInd) => {
            // ignore immobile characters, swipe would be impossible anyway
            if (isMobileChar(cell)) {
                // if any match is found return, no more search is required, 
                // so always the highest valued match is gonna be in moves obj

                // SWIPE RIGHT
                if (cellInd < 8 && isMobileChar(app.board[rowInd][cellInd - 1])) {
                    function checkRightSwipe() { //direction functions are created so I can escape them separately
                        if (checkPattern("T7", [[-2, 0], [-1, 0], [0, -1], [1, 0], [2, 0], [0, 1], [0, 2]], rowInd, cellInd, rowInd, cellInd - 1)) return void (0);
                        if (checkPattern("T6", [[-1, 0], [0, -1], [1, 0], [2, 0], [0, 1], [0, 2]], rowInd, cellInd, rowInd, cellInd - 1)) return void (0);
                        if (checkPattern("T6", [[-2, 0], [-1, 0], [0, -1], [0, 1], [0, 2], [1, 0]], rowInd, cellInd, rowInd, cellInd - 1)) return void (0);
                        if (checkPattern("I5", [[-2, 0], [-1, 0], [0, -1], [1, 0], [2, 0]], rowInd, cellInd, rowInd, cellInd - 1)) return void (0);
                        if (checkPattern("L5", [[-2, 0], [-1, 0], [0, -1], [0, 1], [0, 2]], rowInd, cellInd, rowInd, cellInd - 1)) return void (0);
                        if (checkPattern("L5", [[2, 0], [1, 0], [0, -1], [0, 1], [0, 2]], rowInd, cellInd, rowInd, cellInd - 1)) return void (0);
                        if (checkPattern("T5", [[0, -1], [-1, 0], [0, 1], [0, 2], [1, 0]], rowInd, cellInd, rowInd, cellInd - 1)) return void (0);
                        if (checkPattern("I4", [[-1, 0], [0, -1], [1, 0], [2, 0]], rowInd, cellInd, rowInd, cellInd - 1)) return void (0);
                        if (checkPattern("I4", [[-2, 0], [-1, 0], [0, -1], [1, 0]], rowInd, cellInd, rowInd, cellInd - 1)) return void (0);
                        if (checkPattern("O4", [[0, -1], [0, 1], [1, 0], [1, 1]], rowInd, cellInd, rowInd, cellInd - 1)) return void (0);
                        if (checkPattern("O4", [[0, -1], [0, 1], [-1, 0], [-1, 1]], rowInd, cellInd, rowInd, cellInd - 1)) return void (0);
                        if (checkPattern("I3", [[0, -1], [1, 0], [2, 0]], rowInd, cellInd, rowInd, cellInd - 1)) return void (0);
                        if (checkPattern("I3", [[-1, 0], [0, -1], [1, 0]], rowInd, cellInd, rowInd, cellInd - 1)) return void (0);
                        if (checkPattern("I3", [[-2, 0], [-1, 0], [0, -1]], rowInd, cellInd, rowInd, cellInd - 1)) return void (0);
                        if (checkPattern("I3", [[0, -1], [0, 1], [0, 2]], rowInd, cellInd, rowInd, cellInd - 1)) return void (0);
                    } // end of checkRightSwipe

                    checkRightSwipe();
                } // end of swipe RIGHT

                // SWIPE LEFT
                if (cellInd < 8 && isMobileChar(app.board[rowInd][cellInd + 1])) {
                    function checkLeftSwipe() {
                        if (checkPattern("T7", [[-2, 0], [-1, 0], [0, 1], [1, 0], [2, 0], [0, -1], [0, -2]], rowInd, cellInd, rowInd, cellInd + 1)) return void (0);
                        if (checkPattern("T6", [[-1, 0], [0, 1], [1, 0], [2, 0], [0, -1], [0, -2]], rowInd, cellInd, rowInd, cellInd + 1)) return void (0);
                        if (checkPattern("T6", [[-2, 0], [-1, 0], [0, -2], [0, -1], [0, 1], [1, 0]], rowInd, cellInd, rowInd, cellInd + 1)) return void (0);
                        if (checkPattern("I5", [[-2, 0], [-1, 0], [0, 1], [1, 0], [2, 0]], rowInd, cellInd, rowInd, cellInd + 1)) return void (0);
                        if (checkPattern("L5", [[-2, 0], [-1, 0], [0, -2], [0, -1], [0, 1]], rowInd, cellInd, rowInd, cellInd + 1)) return void (0);
                        if (checkPattern("L5", [[0, -2], [0, -1], [0, 1], [1, 0], [2, 0]], rowInd, cellInd, rowInd, cellInd + 1)) return void (0);
                        if (checkPattern("T5", [[0, -2], [0, -1], [-1, 0], [0, 1], [1, 0]], rowInd, cellInd, rowInd, cellInd + 1)) return void (0);
                        if (checkPattern("I4", [[-1, 0], [0, 1], [1, 0], [2, 0]], rowInd, cellInd, rowInd, cellInd + 1)) return void (0);
                        if (checkPattern("I4", [[-2, 0], [-1, 0], [0, 1], [1, 0]], rowInd, cellInd, rowInd, cellInd + 1)) return void (0);
                        if (checkPattern("O4", [[0, -1], [0, 1], [1, -1], [1, 0]], rowInd, cellInd, rowInd, cellInd + 1)) return void (0);
                        if (checkPattern("O4", [[-1, -1], [-1, 0], [0, -1], [0, 1]], rowInd, cellInd, rowInd, cellInd + 1)) return void (0);
                        if (checkPattern("I3", [[0, 1], [1, 0], [2, 0]], rowInd, cellInd, rowInd, cellInd + 1)) return void (0);
                        if (checkPattern("I3", [[-1, 0], [0, 1], [1, 0]], rowInd, cellInd, rowInd, cellInd + 1)) return void (0);
                        if (checkPattern("I3", [[-2, 0], [-1, 0], [0, 1]], rowInd, cellInd, rowInd, cellInd + 1)) return void (0);
                        if (checkPattern("I3", [[0, -2], [0, -1], [0, 1]], rowInd, cellInd, rowInd, cellInd + 1)) return void (0);
                    } // end of checkLeftSwipe

                    checkLeftSwipe();
                } // end of swipe LEFT

                // SWIPE DOWN
                if (cellInd < 8 && isMobileChar((app.board[rowInd - 1] || [])[cellInd])) {
                    function checkDownSwipe() {
                        if (checkPattern("T7", [[-1, 0], [0, -2], [0, -1], [0, 1], [0, 2], [1, 0], [2, 0]], rowInd, cellInd, rowInd - 1, cellInd)) return void (0);
                        if (checkPattern("T6", [[-1, 0], [0, -1], [0, 1], [0, 2], [1, 0], [2, 0]], rowInd, cellInd, rowInd - 1, cellInd)) return void (0);
                        if (checkPattern("T6", [[-1, 0], [0, -2], [0, -1], [0, 1], [1, 0], [2, 0]], rowInd, cellInd, rowInd - 1, cellInd)) return void (0);
                        if (checkPattern("I5", [[0, -2], [0, -1], [-1, 0], [0, 1], [0, 2]], rowInd, cellInd, rowInd - 1, cellInd)) return void (0);
                        if (checkPattern("L5", [[-1, 0], [0, 1], [0, 2], [1, 0], [2, 0]], rowInd, cellInd, rowInd - 1, cellInd)) return void (0);
                        if (checkPattern("L5", [[-1, 0], [0, -1], [0, -2], [1, 0], [2, 0]], rowInd, cellInd, rowInd - 1, cellInd)) return void (0);
                        if (checkPattern("T5", [[-1, 0], [0, -1], [0, 1], [1, 0], [2, 0]], rowInd, cellInd, rowInd - 1, cellInd)) return void (0);
                        if (checkPattern("I4", [[-1, 0], [0, -1], [0, 1], [0, 2]], rowInd, cellInd, rowInd - 1, cellInd)) return void (0);
                        if (checkPattern("I4", [[-1, 0], [0, -2], [0, -1], [0, 1]], rowInd, cellInd, rowInd - 1, cellInd)) return void (0);
                        if (checkPattern("O4", [[-1, 0], [0, 1], [1, 0], [1, 1]], rowInd, cellInd, rowInd - 1, cellInd)) return void (0);
                        if (checkPattern("O4", [[-1, 0], [0, -1], [1, -1], [1, 0]], rowInd, cellInd, rowInd - 1, cellInd)) return void (0);
                        if (checkPattern("I3", [[-1, 0], [0, 1], [0, 2]], rowInd, cellInd, rowInd - 1, cellInd)) return void (0);
                        if (checkPattern("I3", [[-1, 0], [0, -1], [0, 1]], rowInd, cellInd, rowInd - 1, cellInd)) return void (0);
                        if (checkPattern("I3", [[-1, 0], [0, -2], [0, -1]], rowInd, cellInd, rowInd - 1, cellInd)) return void (0);
                        if (checkPattern("I3", [[-1, 0], [1, 0], [2, 0]], rowInd, cellInd, rowInd - 1, cellInd)) return void (0);
                    } // end of checkDownSwipe

                    checkDownSwipe();
                } // end of swipe DOWN

                // SWIPE UP
                if (cellInd < 8 && isMobileChar((app.board[rowInd + 1] || [])[cellInd])) {
                    function checkUpSwipe() {
                        if (checkPattern("T7", [[-2, 0], [-1, 0], [0, -2], [0, -1], [0, 1], [0, 2], [1, 0]], rowInd, cellInd, rowInd + 1, cellInd)) return void (0);
                        if (checkPattern("T6", [[-2, 0], [-1, 0], [0, -1], [0, 1], [0, 2], [1, 0]], rowInd, cellInd, rowInd + 1, cellInd)) return void (0);
                        if (checkPattern("T6", [[-2, 0], [-1, 0], [0, -2], [0, -1], [0, 1], [1, 0]], rowInd, cellInd, rowInd + 1, cellInd)) return void (0);
                        if (checkPattern("I5", [[0, -2], [0, -1], [0, 1], [0, 2], [1, 0]], rowInd, cellInd, rowInd + 1, cellInd)) return void (0);
                        if (checkPattern("L5", [[-2, 0], [-1, 0], [1, 0], [0, 1], [0, 2]], rowInd, cellInd, rowInd + 1, cellInd)) return void (0);
                        if (checkPattern("L5", [[-2, 0], [-1, 0], [1, 0], [0, -1], [0, -2]], rowInd, cellInd, rowInd + 1, cellInd)) return void (0);
                        if (checkPattern("T5", [[-2, 0], [-1, 0], [1, 0], [0, -1], [0, 1]], rowInd, cellInd, rowInd + 1, cellInd)) return void (0);
                        if (checkPattern("I4", [[0, -1], [1, 0], [0, 1], [0, 2]], rowInd, cellInd, rowInd + 1, cellInd)) return void (0);
                        if (checkPattern("I4", [[0, -2], [0, -1], [1, 0], [0, 1]], rowInd, cellInd, rowInd + 1, cellInd)) return void (0);
                        if (checkPattern("O4", [[-1, 0], [-1, 1], [0, 1], [1, 0]], rowInd, cellInd, rowInd + 1, cellInd)) return void (0);
                        if (checkPattern("O4", [[-1, -1], [-1, 0], [0, -1], [1, 0]], rowInd, cellInd, rowInd + 1, cellInd)) return void (0);
                        if (checkPattern("I3", [[0, 1], [0, 2], [1, 0]], rowInd, cellInd, rowInd + 1, cellInd)) return void (0);
                        if (checkPattern("I3", [[0, 1], [0, -1], [1, 0]], rowInd, cellInd, rowInd + 1, cellInd)) return void (0);
                        if (checkPattern("I3", [[0, -2], [0, -1], [1, 0]], rowInd, cellInd, rowInd + 1, cellInd)) return void (0);
                        if (checkPattern("I3", [[-2, 0], [-1, 0], [1, 0]], rowInd, cellInd, rowInd + 1, cellInd)) return void (0);
                    } // end of checkUpSwipe

                    checkUpSwipe();
                } // end of swipe UP
            } // end of if cell is mobile
        })); // end of row end cell iteration

    // reduce moves: if a swipe results in two matches combine them
    // thus we can see the best possible move

    const combined = [];

    for (ind0 = 0; ind0 < moves.length; ind0++) {
        for (ind1 = 0; ind1 < moves.length; ind1++) {
            // extract swaps
            const swap0 = moves[ind0].swap.join("").replace(/,/g, "").match(/\d{2}/g),
                swap1 = moves[ind1].swap.join("").replace(/,/g, "").match(/\d{2}/g);

            // if swaps are the same just from the reverse direction
            if (swap0[0] === swap1[1] && swap0[1] === swap1[0]) {
                // combine the two
                combined.push({
                    "patternName": moves[ind0].patternName + " " + moves[ind1].patternName,
                    "swap": moves[ind0].swap,
                    "coords": moves[ind0].coords.concat(moves[ind1].coords)
                }); // end of push combined
                // delete the two 
                moves.splice(ind1, 1);
                moves.splice(ind0, 1);
            } // end of if swaps are same
        } // end of inner for
    } // end of outer for

    // add combined to the moves and sort it by element length
    moves = moves
        .concat(combined)
        .sort((movA, movB) => movB.coords.length - movA.coords.length);

    // Reorder moves (already sorted descending), to have I3 I3 moves after T4 and before I3
    // Reason: even though I3 I3 moves make more matches, they don't result in getting bonus 
    // characters, rendering them less valuable in the long run.

    // Take out I3 I3 moves
    const i3I3s = moves.filter(mov => mov.patternName === "I3 I3");
    moves = moves.filter(mov => mov.patternName !== "I3 I3");

    // check the first I3 index
    const i3Ind = moves.findIndex(mov => mov.patternName === "I3");

    // push them back to moves
    i3I3s.forEach(i3I3 => { moves.splice(i3Ind, 0, i3I3); });

    return moves;
} // end of possible moves


function giveHint() {
    const hints = possibleMoves();
    if (hints.length > 0) {
        let hint;
        // if besthint is earned or bought give the highest value hint
        if (app.game_best_hint) {
            // if only I3 matches are available, choose the last one
            // it usually matches more when matches are taken from the bottom of the board
            // else find the strongest match
            hint = hints.every(h => h.patternName === "I3") ? hints[hints.length - 1] : hints[0];
        } // end of if besthint is on
        // if besthint is off give one hint randomly
        else {
            hint = hints[Math.floor(Math.random() * hints.length)];
        } // end of if besthint is off

        // determine if swap is horizontal
        const hintOrientation = hint.swap[0][0] === hint.swap[1][0] ? "horizontal" : "vertical";
        let hintPosition = [];
        if (hintOrientation === "horizontal") {
            if (hint.swap[0][1] < hint.swap[1][1]) {
                hintPosition.push("left", "right");
            } else {
                hintPosition.push("right", "left");
            }
        } // end of if horizontal
        else {
            if (hint.swap[0][0] > hint.swap[1][0]) {
                hintPosition.push("upper", "lower");
            } else {
                hintPosition.push("lower", "upper");
            }
        } // end of if vertical
        hint.swap.forEach((coord, coordInd) => {
            let hintMovementClassName = "hint-" + hintOrientation + "-" + hintPosition[coordInd];

            $(`#r${coord[0]}c${coord[1]}-pic`).addClass(hintMovementClassName);

            const hintRemoveDelay = setTimeout(() => {
                $(`#r${coord[0]}c${coord[1]}-pic`).removeClass(hintMovementClassName);
                clearTimeout(hintRemoveDelay);
            }, 1400); // end of remove delay
        }); // end of coords iteration
    } // end of if there is a hint available
} // end of giveHint


// puts a message out when there are no more moves found on the gameboard
function noMoreMovesMessage() {
    const msgDiv = document.createElement("div");

    $(msgDiv)
        .attr("id", "no-more-moves-msg-div")
        .addClass("board__message")
        .html("No More Moves")
        .fadeIn(1000);

    createFreshBoard(msgDiv);
    $(".game-board").append(msgDiv);
} // end of noMoreMovesMessage


// put randomly new fruits on board, but they can not match 
function createFreshBoard(msgDiv) {
    fruits = [...Array(levels[app.currentLevel - 1].fruitVariationNumber).keys()].map(el => ++el);

    app.board.map((row, rowInd) => row.map((cell, cellInd) => {
        let availableFruits = fruits.slice(); // don't copy reference

        // if cell is fruit
        if (availableFruits.some(fr => fr == cell)) {
            // if the above two cells are already matching
            if ((app.board[rowInd - 1] || [])[cellInd] === (app.board[rowInd - 2] || [])[cellInd]) {
                // take them out from the pool of choices
                availableFruits = availableFruits.filter(fr => fr != (app.board[rowInd - 1] || [])[cellInd]);
            }
            // if the two cells on the left are already matching
            if ((app.board[rowInd] || [])[cellInd - 1] === (app.board[rowInd] || [])[cellInd - 2]) {
                // take them out from the pool of choices
                availableFruits = availableFruits.filter(fr => fr != (app.board[rowInd] || [])[cellInd - 1]);
            }
            app.board[rowInd][cellInd] = availableFruits[Math.floor(Math.random() * availableFruits.length)] + "";
        } // end of if cell is fruit

    })); // end of row iteration
    if (possibleMoves().length < 1) createFreshBoard(); // recursive if new fruits has no matches

    if (msgDiv) $(msgDiv).fadeOut(2500);

    displayBoard();

    app.game_interaction_enabled = true; // give interaction back to player
    app.game_hint_is_paused = false; // hint can count time again
} // end of createFreshBoard


function displayTime(time) {
    const clock = $("#counter");

    // convert sec to min : sec
    let mins = Math.floor(time / 60),
        secs = time - mins * 60;

    // add leading 0 if necessary
    secs = secs <= 9 ? "0" + secs : secs;
    clock.html(mins + ":" + secs);

    // switch off time progress leds if time is less than it's range
    const range = levels[app.currentLevel - 1].time / 10;

    let ledsOn = Math.ceil(time / range);

    for (i = 1; i <= 10; i++) {
        $(`#countback-led${i}`).addClass("led-off");
        if (i <= ledsOn) {
            $(`#countback-led${i}`).removeClass("led-off");
        } // if led should be on
    } // end of iterating leds
}


function closeLevel() {
    app.game_interaction_enabled = false; // user can not interact the board after this point
    app.game_interaction_locked = true; // don't let further functions set interaction back as a side effect
    //app.game_turn_is_over = true;

    // close shop if it was open
    $(".shop").hide();
    $(".main-menu-msg").remove(); // remove message if it was left open

    // an end game is coming where all bonus gems are destoyed
    // display time is up label
    const timeIsUp = document.createElement("div");

    $(timeIsUp)
        .html("TIME IS UP!")
        .attr("id", "time-is-up");

    $(".game-board").append(timeIsUp);

    // destroy bonus gems from bottom to top
    // search for the last bonus gem

    function endGameTurn() {
        const bonuses = [...$(".bonus")].reverse();

        if (bonuses.length) {
            const lastBonusXY = bonuses[0].id.match(/\d+/g);

            app.board[lastBonusXY[0]][lastBonusXY[1]] = "X";
            checkBonuses();
            fillBoardWithNewFruits();
        } // end of if there are still bonuses left

        return bonuses.length;
    } // end of endGameTurn



    let bonusesLeft;
    const turnDelay = setInterval(() => {
        // if no more bonus left get out of Interval
        if (bonusesLeft === 0) {
            // remove game table and display levelboard again
            $(timeIsUp).remove();
            $(".game-board__table").remove();
            $(".game-board").hide();
            $("header")
                .removeClass("header--hidden header-out")
                .addClass("header--visible header-in");
            $(".level-menu").show();

            // some cases level point didn't match the displayed one so now I simply copy it
            app.game_level_points = Number($(".game-board__level-points").html().match(/\d+/g)[0]);

            setLevelMax();
            showLevelStats();
            clearInterval(turnDelay);
        } // end of no more bonuses left

        // when turn is over destroy next gem
        if (app.game_turn_is_over) {
            bonusesLeft = endGameTurn();
        }
    }, 1000); // end of setInterval

    // set up variables
    // setup values and counters
    app.game_is_on = false;
    app.game_is_paused = false;
} // end of closeLevel



function showLevelStats() {
    // if level has not been completed create a message div: level has not been completed
    if (app.flowers < levels[app.currentLevel - 1].flowersToCompleteTheLevel) {
        const
            notCompletedDiv = document.createElement("div"),
            okBtn = document.createElement("button"),
            pluralS = levels[app.currentLevel - 1].flowersToCompleteTheLevel > 1 ? "s" : "";

        // set OK button
        $(okBtn)
            .addClass("end-of-level-ok-btn")
            .html("Try again!")
            .on("click", () => { $(notCompletedDiv).remove(); });

        // set the message div
        $(notCompletedDiv)
            .addClass("levelHasNotBeenCompletedDiv")
            .html("Level has not been completed! On this level you need to collect " +
                levels[app.currentLevel - 1].flowersToCompleteTheLevel + " flower" +
                pluralS + ", and your basket has " + app.flowers + ".")
            .append(okBtn);

        // add it to level-menu (it's size perfectly fits the layout,
        // even though thematicaly containing such element doesn't make sense)
        $(".level-menu").append(notCompletedDiv);

        $(notCompletedDiv).show();

        // reset level-points
        app.game_level_points = 0;
        $(".game-board__level-points")
            .html()
            .replace(/\d+/, "0");
    } // end of if level task hasn't been completed
    // if the requrement has been completed show level stats and add points
    else {
        const max = app.game_max_points[app.currentLevel - 1] || 0;

        // update max points if its greater than the previous one
        app.game_max_points[app.currentLevel - 1] = max <= app.game_level_points
            ? app.game_level_points
            : max;

        // update storage
        setStorage("game_max_points", app.game_max_points);


        // Create end of level stat message
        const // create elements
            container = document.createElement("div");

        $(container)
            .addClass("end-of-level-stat")
            .html("" +
                "<div id='end-of-level-stat-txt-total'>Total money</div>" +
                "<div id='level-stat__total-points'></div>" +
                "<div id='end-of-level-stat-txt-level'>Earned on this level</div>" +
                "<div id='level-stat__level-points'></div>" +
                "<button id='level-stat__ok-btn'>OK</button>");

        $(".level-menu").append(container);

        // Display new Total points
        $(".end-of-level-stat").show();

        const
            totEl = $("#level-stat__total-points"),
            lvlEl = $("#level-stat__level-points");

        // ok button not visible yet
        $("#level-stat__ok-btn").hide();

        let tot = app.game_total_points,
            lvl = app.game_level_points;

        // display the point values
        totEl.html(tot);
        lvlEl.html(lvl);

        // animate tot points going up while level points down (2sec = 20 display)
        let counter = 40,
            pointsDiff; // declared below

        // try to distribute points as equally as possible
        if (lvl <= 20) {
            pointsDiff = Array(lvl).fill(1);
            counter = lvl;
        } else {
            pointsDiff = Array(20).fill(Math.floor(lvl / 19));
            remainder = lvl - pointsDiff[0] * 19;
            pointsDiff[0] = remainder;
        } // end of if level point is greater than 20


        // counter starts 30 because 1 sec is a delay
        const animPointsDelay = setInterval(() => {
            if (counter > 20) {
                counter--; // just wait
            }
            if (counter > 0 && counter <= 20) {
                tot += pointsDiff[counter - 1] || 0;
                lvl -= pointsDiff[counter - 1] || 0;
                totEl.html(tot);
                lvlEl.html(lvl);
                counter--;
            } // while there are still points to increment / decrement
            if (counter <= 0) {
                clearInterval(animPointsDelay);
                $("#end-of-level-stat-txt-level").remove();

                $("#level-stat__level-points").remove();

                $("#level-stat__ok-btn")
                    .show()
                    .on("click", () => {
                        $(".end-of-level-stat").remove();

                        rewardUser(); // show reward gem if earned any
                    }); // end of end of level stat ok button click

                app.game_total_points += app.game_level_points;
                app.game_level_points = 0;

                // reset level-points
                const lvlPts = $(".game-board__level-points")
                    .html()
                    .replace(/\d+/, "0");

                $(".game-board__level-points").html(lvlPts);

                // update total points
                const totPts = $(".game-board__total-points")
                    .html()
                    .replace(/\d+/, tot); // the new total earned after a level completition
                $(".game-board__total-points").html(totPts);
                setStorage("game_total_points", app.game_total_points);
            } // escape anim
        }, 100); // end of animPointsDelay
    } // end of if level assignment has been completed

    setLevelMax();
} // end of showLevelStats



function rewardUser() {
    // if you have had extra flowers collected apart from the level requirement
    // user recieves reward gems:
    //      - > 5 extra, divide the numbers by five eg (12 = 5 + 5 + 2) 
    //      - every 5 extra: reward is a diamond
    //      - 4 extra: reward is an T6
    //      - 3 extra: reward is a I5CR or I4V
    //      - 2 extra: reward is a IX or T5
    //      - 1 extra: reward is I4H or L51 or L52 
    const extraFlowers = app.flowers - levels[app.currentLevel - 1].flowersToCompleteTheLevel;

    if (extraFlowers > 0) {
        const // divvy up the rewards between diamonds and flowers and set up function vars
            diamonds = Math.floor(extraFlowers / 5),                                // number of diamonds recieved
            rest = extraFlowers - (5 * diamonds),                                   // any left less than 5
            rewardsArr = [],                                                        // format is identical to inventory, so inventory arr can be pushed easyly
            fruitRange = levels[app.currentLevel - 1].fruitVariationNumber,         // don't give user fruit out of level range
            fruitArr = [...Array(fruitRange).keys()].map(f => ++f),                 // at the beggining of the level progress higher fruits won't be really usable
            randomArrayElement = arr => arr[Math.floor(Math.random() * arr.length)],// choose a random element from an array
            fruit = randomArrayElement(fruitArr);                                   // the chosen fruit


        // build up rewards array

        // add diamonds
        for (let i = 0; i < diamonds; i++) {
            rewardsArr.push("*");
        } // end of for diamonds

        // set the rest of the rewards
        switch (rest) {
            case 4: { rewardsArr.push(fruit + "-T6"); break; }
            case 3: { rewardsArr.push(fruit + "-" + randomArrayElement(["I5CR", "I4V"])); break; }
            case 2: { rewardsArr.push(fruit + "-" + randomArrayElement(["I5X", "T5"])); break; }
            case 1: { rewardsArr.push(fruit + "-" + randomArrayElement(["I4H", "L51", "L52"])); break; }
        } // end of swith rest

        // add values to inventory
        rewardsArr.forEach(rew => app.inventory.unshift(rew));

        // update storage
        setStorage("inventory", app.inventory);

        // give a message about the newly recieved rewards gem(s)
        const
            rewardMsgDiv = document.createElement("div"),
            gemDiv = document.createElement("div"),
            okBtn = document.createElement("button"),
            pluralS = n => n > 1 ? `s` : ``;     // weather message has gem / gems

        // add gem container
        $(gemDiv).addClass("reward-gem-container");

        // greate gems
        const img = {
            "1": app.images.apple,
            "2": app.images.orange,
            "3": app.images.peach,
            "4": app.images.strawberry,
            "5": app.images.plum,
            "6": app.images.lime,
            "7": app.images.kiwi,
            "8": app.images.blood_orange,
            "9": app.images.lemon,
            "*": app.images.diamond,
        } // end of img object declaration    

        // add OK button
        $(okBtn)
            .addClass("end-of-level-ok-btn")
            .html("Thanks!")
            .on("click", () => { $(".reward-div").remove(); });

        $(rewardMsgDiv)
            .addClass("levelHasNotBeenCompletedDiv reward-div")  // level... class matches our needs here
            .html(`<div>You collected ${extraFlowers} more flower${pluralS(extraFlowers)} than the level requirement.` +
                ` Find your reward gem${pluralS(rewardsArr.length)} in your inventory!</div>`)
            .append(gemDiv)
            .append(okBtn);

        // add div to level-menu as usual (only because it looks great)
        $(".level-menu")
            .remove(".reward-div") // remove in case it would get duplicated
            .append(rewardMsgDiv);

        $(rewardMsgDiv).show();


        // set gems picture and bonus divs
        rewardsArr.forEach((rew, rewInd) => {
            const
                [fruit, bonus] = rew.match(/[^-]+/g)
            rewGem = document.createElement("div");

            // set bg pic and attr
            $(rewGem)
                .addClass("reward-gem reward-gem" + rewInd)
                .css("background-image", "url('" + img[fruit].src + "')");

            // create special gem
            $(gemDiv).append(rewGem);

            if (bonus) {
                createspecialGemDiv(null, bonus, ".reward-gem" + rewInd);
            } // end of if theres bonus
        }); // end of rewards forEach
    } // end of if there is extra flowers collected
} // end of rewardUser



/*
 
        GLOBAL APP VARIABLES
 
*/

var app = {
    "board": [],                 // the current game gems position
    "currentLevel": 0,
    "flowers": 0,                // the players collected flowers on the actual level
    "game_best_hint": false,
    "game_current_level_maxed": true, // if current level is maxed out user gets double points
    "game_interaction_enabled": true, // responsible for switching off mouse and touch events, while animating or searching for matches
    "game_interaction_locked": false, // keeps interaction locked while end-game is on
    "game_give_hint_at": 10,     // the num of secs a hint is given after no moves
    "game_hint_is_paused": false,
    "game_total_points": 0,      // points earned throughout the game
    "game_level_points": 0,      // points on the actual level
    "game_matches": [],          // some functions have no scope on matches so they reach the apps matches
    "game_max_points": [0],      // an array holding the best points user made on a particular level
    "game_is_on": false,
    "game_is_paused": false,
    "game_partial_points": 0,    // collects all points a turn makes, so it can be displayed together
    "game_time_from_last_hint": 0,
    "game_time_left": 0,         // we'll set the remaining time when level starts
    "game_turn_is_over": true,   // game is in the middle of a match turn
    "images": [],                // the preloaded pictures
    "inventory": [],             // all the bonus items you buy in the game
    "inventoryAt": 0,            // the item the inventory start to display from if there were more than 5 (5 places are available)
    "match_table_ind": 1,        // walkthrough match point table ind
    "shop_basket": {},           // {fruit, bonus, fast-hint, besthint, diamond}
    "shop_price": 0,             // the amount needs to be paid in the shop
    "valid_board_characters": ["X", "1", "2", "3", "4", "5", "6", "7", "8", "9", "#", "S", "M", "L", "A", "B", "C", "D", "E", "U", "*"],
    "visits": { total: 0, unique: 0 } // tracks visits, default in case, when app starts its set by backend
}; // end of app global object





function startLevel(level) {
    app.currentLevel = level;

    // arrange new layout
    $(".level-menu").hide();
    $("header")
        .removeClass("header--visible header-in")
        .addClass("header--hidden header-out");

    $(".main-menu-msg").remove(); // remove message if it was left open
    $(".game-board").show();

    // create game environment
    createGameBoard();
    createBoardArray(level - 1);
    displayBoard();
    addGameBoardEvents();

    // setup values and counters
    app.game_is_on = true;
    app.game_is_paused = false;
    app.game_time_left = levels[app.currentLevel - 1].time;
    app.game_level_points = 0;
    app.game_interaction_locked = false;
    app.game_interaction_enabled = true;
    app.flowers = 0;
    app.game_best_hint = false;
    app.game_give_hint_at = 10;
    app.game_current_level_maxed = app.game_max_points[app.currentLevel - 1] >= levels[app.currentLevel - 1].targetPoints;

    // reset flower counter
    $("#flower-counter").html(levels[app.currentLevel - 1].flowersToCompleteTheLevel);

    // reset points
    $(".game-board__total-points").html("$" + app.game_total_points);

    // set level target points
    const
        levelTarget = levels[app.currentLevel - 1].targetPoints,
        divTxt = $(".game-board__level-points").html().replace(/\/\d+/, "/" + levelTarget);

    $(".game-board__level-points").html(divTxt);

    // reset level-points
    $(".game-board__level-points")
        .html(
            $(".game-board__level-points")
                .html()
                .replace(/\d+/, "0")
        );


    // level timer
    displayTime(app.game_time_left); // prime timer


    // level timer is global therefore it can be stopped from outside of this function (restart / back)
    levelTimer = setInterval(() => {
        if (app.game_is_on && !app.game_is_paused) {
            // decrement time if it's greater than 0
            if (app.game_time_left > 0) {
                app.game_time_left--;
                displayTime(app.game_time_left);
            } // end of counting down
            else {
                clearInterval(levelTimer);
                // finish level if time is up
                // wait until interaction is enabled, aka all animations and match cicles are done
                const waitTilLevelIsDone = setInterval(() => {
                    if (app.game_interaction_enabled) {
                        clearInterval(waitTilLevelIsDone);
                        closeLevel();
                    } // end of if interaction to the board is enabled
                }, 100); // end of wait for match cycles and animations
            }
        } // end of if game is on and not paused
        if (!app.game_is_on) clearInterval(levelTimer);
    }, 1000);

    // hint timer
    const hintTimer = setInterval(() => {
        if (app.game_is_on && !app.game_is_paused && !app.game_hint_is_paused) {
            if (app.game_time_from_last_hint === app.game_give_hint_at) {
                app.game_time_from_last_hint = 0;
                giveHint();
                const hintClasses = ".hint-horizontal-left, .hint-horizontal-right, .hint-vertical-upper, .hint-vertical-lower";
                $(hintClasses).css("-webkit-animation-play-state", "running");
            } else {
                app.game_time_from_last_hint++;
            }
        } // end of if game is on and not paused and hint counter is enabled
        if (!app.game_is_on) clearInterval(hintTimer);
    }, 1000); // end of hintTimer

    // fill up inventory
    app.inventoryAt = 0;
    displayInventoryItems();
} // end of startLevel


// function reads app.inventory and fill inventory menu up accordingly
function displayInventoryItems() {
    const items = app.inventory, // all the items from the inventory
        inventoryAt = app.inventoryAt; // 

    // check if the inventory elements are correctly represented and haven't been compromised by any side effect
    if (!Array.isArray(items)) {
        throw Error("Inventory is invalid! It supposed to be an array.");
    } // end of if inventory is not an array
    else {
        items.forEach(i => {
            // check every inventory item if they are the right format
            // eg 1-I5CR where 1 is the fruit type and the rest is the bonus type
            //     - fruits can be 1 - 9
            //     - bounuses: I4H, I4V, T5, L51, L52, I5CR, I5X, T6, *

            if (i !== "*") {
                const [fruit, bonus] = i.match(/[^-]+/g); // divide item to fruit and bonus

                if (!fruit.match(/\b[1-9]\b/g)) {
                    throw Error("Inventory fruit is incorrect! ", fruit);
                } // end of if fruit is not a number 1 - 9 and its a single digit

                const validBonuses = ["I4H", "I4V", "T5", "L51", "L52", "I5CR", "I5X", "T6"];
                if (!validBonuses.find(valBonus => valBonus === bonus)) {
                    throw Error("Bonus is incorrect!", bonus);
                } // end of if bonus is not valid
            } // end of item is not a diamond (it has no fruit number)
        }); // end of item iteration
    } // end of if inventory is an array


    // update storage every time displayInventory is invoked
    setStorage("inventory", app.inventory);


    // add fruits and diamond imgs
    const img = {
        "1": app.images.apple,
        "2": app.images.orange,
        "3": app.images.peach,
        "4": app.images.strawberry,
        "5": app.images.plum,
        "6": app.images.lime,
        "7": app.images.kiwi,
        "8": app.images.blood_orange,
        "9": app.images.lemon,
        "*": app.images.diamond,
    } // end of img object declaration

    for (let i = 0; i < 5; i++) {
        const
            className = `.inventory-item${i + 1}-container `,
            elem = $(className),
            [fruit, bonus] = (items[i + inventoryAt] || " - ").match(/[^-]+/g);

        // represent fruit only if there is a corrisponding inventory element to it
        if (!items[i] || i + inventoryAt > items.length - 1) {
            elem.css("background-image", "none");
        } // end of if element is not present
        else {
            // add fruit / diamond background
            elem.css("background-image", "url('" + img[fruit].src + "')");
        } // end of if item is present

        // get rid of previous bonus divs
        $(className).empty();

        // add bonus divs if available
        if (bonus) {
            createspecialGemDiv(null, bonus, className);
        } // end of if theres bonus
    } // end of for 5 (inventory items)


    // check arrows if they are light theres still option to toggle
    // left
    if (app.inventoryAt > 0) {
        $(".game-board__inventory__menu__arrow--left").addClass("active");
    } else {
        $(".game-board__inventory__menu__arrow--left").removeClass("active");
    } // end of if inventory is at 0

    // right
    if (app.inventoryAt < app.inventory.length - 5) {
        $(".game-board__inventory__menu__arrow--right").addClass("active");
    } else {
        $(".game-board__inventory__menu__arrow--right").removeClass("active");
    } // end of if inventory is at the end 

    // create indicator lights
    $(".game-board__inventory__menu__indicator").empty(); // get rid of the old ones

    const indicAmount = Math.ceil(app.inventory.length / 5);

    for (i = 0; i < indicAmount; i++) {
        const indic = document.createElement("div");

        $(indic).css("width", ((100 / indicAmount) - 2) + "%");

        $(".game-board__inventory__menu__indicator").append(indic);

    } // end of for indicAmount

    // light the active indicator
    // take off active class from all indicators
    $(".game-board__inventory__menu__indicator")
        .children()
        .removeClass("active");

    // give active to the current one
    $(`.game-board__inventory__menu__indicator div:nth-child(${Math.ceil(app.inventoryAt / 5) + 1})`)
        .addClass("active");
} // end of displayInventoryItems


function createGameBoard() {
    const board = document.createElement("table"),
        tbody = document.createElement("tbody");

    // add rows
    for (r = 0; r < 11; r++) {
        const row = document.createElement("tr");

        // add picture holding cells and pic divs
        for (c = 0; c < 9; c++) {
            const picBox = document.createElement("td"),
                picDiv = document.createElement("div");

            picBox.id = `r${r}c${c}-box`;
            picDiv.id = `r${r}c${c}-pic`;

            $(picBox).addClass("game-board__cell-box");
            $(picDiv).addClass("game-board__cell-pic");

            $(picBox).append(picDiv);
            $(row).append(picBox);
        } // end of creating cells

        $(tbody).append(row);
        $(".game-board").append(board);
    } // end of adding rows

    $(board).addClass("game-board__table");
    $(board).append(tbody);
} // end of createGameBoard



function createBoardArray(level) {
    const board = levels[level]["blueprint"].map(row => [...row]);

    // check if level is crafted correctly

    if (board.length !== 11) {
        return Error("The length of game-board is incorrect, it must be 11, instead it is :" + board.length + "!");
    } // end of if board length is incorrect

    board.map((row, rowInd) => {
        if (row.length !== 9) {
            return Error(`Invalid length of row[${rowInd}]. It must be 9, instead it is ${row.length}!`);
        } // end of if length is incorrect

        row.map((cell, cellInd) => {
            if (!app.valid_board_characters.find(ch => ch === cell)) {
                return Error(`Invalid character (${cell}) at row ${rowInd} cell ${cellInd}!`);
            } // end of if cell is not a valid char
        }); // end of cell iteration
    }); // end of board row iteration

    app.board = board;
} // end of loadBoardArray



function displayBoard() {
    const imgMap = {
        "1": app.images.apple,
        "2": app.images.orange,
        "3": app.images.peach,
        "4": app.images.strawberry,
        "5": app.images.plum,
        "6": app.images.lime,
        "7": app.images.kiwi,
        "8": app.images.blood_orange,
        "9": app.images.lemon,
        "#": app.images.rock_wall,
        "S": app.images.stone_sm,
        "M": app.images.stone_md,
        "L": app.images.stone_lg,
        "A": app.images.flower1,
        "B": app.images.flower2,
        "C": app.images.flower3,
        "D": app.images.flower4,
        "E": app.images.flower5,
        "U": app.images.basket,
        "*": app.images.diamond,
    }; // end of imgMap


    // add the corrisponding icons to the board table
    for (r = 0; r < 11; r++) {
        for (c = 0; c < 9; c++) {

            // make random flowers when encounters char "F"
            if (app.board[r][c] === "F") {
                app.board[r][c] = "ABCDE"[Math.floor(Math.random() * 5)];
            } // end of if "F" random flower 

            // make random fruits when encounters char "."
            if (app.board[r][c] === ".") {
                let availableFruits = [...Array(levels[app.currentLevel - 1].fruitVariationNumber).keys()].map(el => ++el);

                // if the above two cells are already matching
                if ((app.board[r - 1] || [])[c] === (app.board[r - 2] || [])[c]) {
                    // take them out from the pool of choices
                    availableFruits = availableFruits.filter(fr => fr != (app.board[r - 1] || [])[c]);
                }

                // if the two cells on the left are already matching
                if ((app.board[r] || [])[c - 1] === (app.board[r] || [])[c - 2]) {
                    // take them out from the pool of choices
                    availableFruits = availableFruits.filter(fr => fr != (app.board[r] || [])[c - 1]);
                }

                app.board[r][c] = availableFruits[Math.floor(Math.random() * availableFruits.length)] + "";
            } // end of if random fruit


            const idName = `#r${r}c${c}-pic`;
            let char = app.board[r][c]; // holds the character

            // set wall sizes bigger
            if (char === "#") {
                $(idName).addClass("wall-size");
            } // end of if it's a wall 
            else {
                $(idName).removeClass("wall-size");
            } // end of if not a wall


            // spin flowers and diamonds
            if (["A", "B", "C", "D", "E", "*"].find(cell => cell === char)) {
                $(idName).addClass("spin-pic");
            } // end of if cell is spinning
            else {
                $(idName).removeClass("spin-pic");
            }

            // remove explosion class with delay
            const explosionDelay = setTimeout(() => {
                $(idName).removeClass("explosion");
                clearTimeout(explosionDelay);
            }, 500); // end of delay

            if (char === "X") {
                $(idName).css("background-image", "none");
            } else {
                $(idName).css("background-image", `url(${imgMap[char].src}`);
            } // end of if board value is not "0"
        } // end of cell iteration
    } // end of row iteration
} // end of displayBoard





// check if local storage is available
function localStorageIsAvailable() {
    try {
        const storage = window.localStorage;
        storage.setItem("test", "test");
        storage.removeItem("test");
        return true;
    } // end of try to set local storage key value pair
    catch (e) {
        return false;
    } // end of catch local storage test error
} // end of localStorageIsAvailable



// function set a key value pair in the storage
// arrays are presented
function setStorage(key, val) {
    if (!localStorageIsAvailable) return void (0); // quit function if localStorage is not available

    const value = JSON.stringify(val); // localStorage only accepts strings
    window.localStorage.setItem(key, value);
} // end of setStorage





// function loads app values to app obj
function setAppValuesFromLocalStorage() {
    // test local storage
    if (!localStorageIsAvailable) return void (0); // quit function if localStorage is not available

    const storage = window.localStorage;
    // information that is stored in localStorage :
    //     - game_total_points
    //     - game_max_points
    //     - inventory


    // check if localStorage has been set up --> if its not the first time the browser visits the page
    if (storage.getItem("game_total_points") === null ||
        storage.getItem("game_max_points") === null ||
        storage.getItem("inventory") === null) {
        setStorage("game_total_points", 0);
        setStorage("game_max_points", [0]);
        setStorage("inventory", []);

        offerWalkthrough();
    } // end of if local storage hasn't been set on the page
    else {
        app.game_total_points = Number(JSON.parse(storage.getItem("game_total_points")));
        app.game_max_points = JSON.parse(storage.getItem("game_max_points")).map(Number);
        app.inventory = JSON.parse(storage.getItem("inventory"));
    } // end of if local storage has been set
} // end of setAppValuesFromLocalStorage





// if browser has no localstorage set, offer a quick walkthrough
function offerWalkthrough() {
    const // create elements
        offerMsgDiv = document.createElement("div"),
        offerMsgInnerDiv = document.createElement("div"),
        offerMsgTextDiv = document.createElement("div"),
        offerMsgButtonsDiv = document.createElement("div"),
        offerMsgSkipBtn = document.createElement("button"),
        offerMsgOkBtn = document.createElement("button");


    // append elements into each other
    $(offerMsgTextDiv)
        .addClass("offer-msg-text")
        .html("Hi, it looks like this is your first time visiting this page!<br /><br />Let me offer you a quick walkthrough of the game-play in case you are not familiar with it.");

    $(offerMsgSkipBtn)
        .addClass("offer-msg-button")
        .attr("id", "offer-msg-skip-btn")
        .html("Skip")
        .on("click", () => { $(offerMsgDiv).remove(); });

    $(offerMsgOkBtn)
        .addClass("offer-msg-button")
        .attr("id", "offer-msg-ok-btn")
        .html("OK")
        .on("click", () => { $(offerMsgDiv).remove(); openWalkthrough(); });

    $(offerMsgButtonsDiv)
        .addClass("offer-msg-buttons-box")
        .append(offerMsgSkipBtn)
        .append(offerMsgOkBtn);

    $(offerMsgInnerDiv)
        .addClass("offer-msg-inner")
        .append(offerMsgTextDiv)
        .append(offerMsgButtonsDiv);

    $(offerMsgDiv)
        .addClass("offer-msg")
        .append(offerMsgInnerDiv);

    // add element to level-page (thematically has nothing to do with it, just its layout fits the design)
    $(".level-menu").append(offerMsgDiv);
} // end of offerWalkthrough





function openWalkthrough() {
    $(".walkthrough").show();

    $(".walkthrough__content")[0].scrollTop = 0;
    // get the height of the scrollbar thumb
    const
        contentHeight = $(".walkthrough__content")[0].scrollHeight,
        scrollbarHeight = Math.round($(".walkthrough__scrollbar")[0].getBoundingClientRect().height),
        thumbHeight = Math.round((scrollbarHeight / contentHeight) * 100);

    $("#scrollbar-thumb").css("height", thumbHeight + "%");
} // end of openWalkthrough





function closeAllMenuWindows() {
    $(".walkthrough,.about").hide();

    // close main menu
    $(".menu")
        .removeClass("menu-open")
        .addClass("menu-close");

    $(".menu__open-close-arrow")
        .addClass("arrow-close")
        .removeClass("arrow-open");

} // end of closeAllMenuWindows




function createWalkthroughAndAboutEvents() {
    let
        scrollBtnDown = false,
        scrollBarTop = 0,
        scrollBarHeight = 0,
        scrollBtnHeight = 0,
        scrollThumbHeight = 0,
        contentHeight = 0,
        contentScrollHeight = 0,
        startCursorY = 0,
        grabbedAtY = 0, // where the mouse grabbed the button
        percent = 0;


    $("#scrollbar-btn").on("mousedown touchstart", (event) => {
        // set values every time scroll is activated, in case page would have been resized
        scrollBtnTop = $("#scrollbar-btn")[0].getBoundingClientRect().top;
        scrollBarTop = $(".walkthrough__scrollbar")[0].getBoundingClientRect().top;
        scrollBarHeight = $(".walkthrough__scrollbar")[0].getBoundingClientRect().height;
        scrollBtnHeight = $("#scrollbar-btn")[0].getBoundingClientRect().height;
        scrollThumbHeight = $("#scrollbar-thumb")[0].getBoundingClientRect().height;
        contentScrollHeight = $(".walkthrough__content")[0].scrollHeight;
        contentHeight = $(".walkthrough__content")[0].getBoundingClientRect().height;

        scrollBtnDown = true;

        startCursorY = event.pageY || event.changedTouches[0].pageY;

        grabbedAtY = startCursorY - scrollBtnTop;
    }); // end of scrollbar down

    $(".walkthrough").on("mousemove touchmove", (event) => {
        event.preventDefault();

        if (scrollBtnDown) {
            const
                newCursorY = event.pageY || event.changedTouches[0].pageY,
                newY = newCursorY - scrollBarTop - grabbedAtY;

            // set ranges
            if (newY > 0 && newY <= scrollBarHeight - scrollBtnHeight) {
                // set new btn position
                $("#scrollbar-btn").css("top", newY + "px");

                // set percentage
                percent = ((newY / (scrollBarHeight - scrollBtnHeight)) * 100).toFixed(1);

                // set scroll thumbs position
                const newThumbPos = Math.floor(((scrollBarHeight - scrollThumbHeight) / 100) * percent);

                $("#scrollbar-thumb").css("bottom", newThumbPos + "px");

                // scroll content
                const newContentPos = Math.floor(((contentScrollHeight - contentHeight) / 100) * percent);
                $(".walkthrough__content")[0].scrollTop = newContentPos;
            } // end of if scroll is in ranges
        } // end of if scrollBtnDonw
    }); // end of scrollbar move

    $(".walkthrough").on("mouseup touchend", () => {
        scrollBtnDown = false;
    }); // end of scrollbar down

    $("#walkthrough-back-btn").on("click", () => {
        if (app.game_is_on) app.game_is_paused = false; // resume game, if user were playing

        $(".walkthrough").hide();
    }); // end of walkthrough back btn click

    $("#about-back-btn").on("click", () => {
        if (app.game_is_on) app.game_is_paused = false; // resume game, if user were playing

        $(".about").hide();
    }); // end of about back btn click



    // MATCH TABLE

    // sets the walkthrough matches / points tables tab and picture
    // table index starts with 1!!
    function setMatchTable() {
        // set tab
        $(".match-page-tab").removeClass("active");

        $(`#match-page-tab${app.match_table_ind}`).addClass("active");

        // set picture
        const matchNames = [`I3`, `I4H`, `I4V`, `O4`, `T5`, `L5`, `I5`, `T6`, `T7`],
            dir = "https://tschiboka.co.uk/projects/fruits_n_flowers_v2/images/walkthrough/";

        $(".table-picture").css("background-image", `url("${dir}matches-${matchNames[app.match_table_ind - 1]}.gif")`);

        // set points
        const matchPoints = [3, 5, 5, 5, 10, 10, 10, 25, 100];
        $(".table-match-points").html(matchPoints[app.match_table_ind - 1] + " points");

        // set bonus div content accordingly
        let bonusContent = "";
        switch (app.match_table_ind) {
            case 1: {
                bonusContent = "No bonus";
                break;
            } // end of case I3
            case 2: {
                bonusContent = `Bonus <img src='${dir}bonus-I4H.gif' alt='bonus' />`;
                break;
            } // end of case I4H
            case 3: {
                bonusContent = `Bonus <img src='${dir}bonus-I4V.gif' alt='bonus' />`;
                break;
            } // end of case I4V
            case 4: {
                bonusContent = "+5 second"
                break;
            } // end of case O4
            case 5: {
                bonusContent = `Bonus <img src='${dir}bonus-T5.gif' alt='bonus' />`;
                break;
            } // end of case T5
            case 6: {
                bonusContent = `<img src='${dir}bonus-L51.gif' alt='bonus' /> or <img src='${dir}bonus-L52.gif' alt='bonus' />`;
                break;
            } // end of case L5
            case 7: {
                bonusContent = `<img src='${dir}bonus-I5X.gif' alt='bonus' /> or <img src='${dir}bonus-I5CR.gif' alt='bonus' />`;
                break;
            } // end of case I5
            case 8: {
                bonusContent = `Bonus <img src='${dir}bonus-T6.gif' alt='bonus' />`;
                break;
            } // end of case T6
            case 9: {
                bonusContent = "Diamond <img src='https://tschiboka.co.uk/projects/fruits_n_flowers_v2/images/misc/diamond.png' alt='bonus' />";
            } // end of case T7
        } // end of switch match table index

        $(".table-match-bonuses").html(bonusContent);
    } // end of setMatchTable


    $("#match-table-prev-btn").on("click", () => {
        if (app.match_table_ind > 1) app.match_table_ind--;
        else app.match_table_ind = 9;
        setMatchTable();
    }); // end of match-table prev click

    $("#match-table-next-btn").on("click", () => {
        if (app.match_table_ind < 9) app.match_table_ind++;
        else app.match_table_ind = 1;
        setMatchTable();
    }); // end of match-table next click
} // end of createWalkthroughAndAboutEvents





function fullScreen() {
    const isFullScreen = window.innerWidth == screen.width && window.innerHeight == screen.height;

    if (window.innerHeight < 700 && !isFullScreen) {
        var elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
    } // end of if height is mobule size
} // end of fullScreen