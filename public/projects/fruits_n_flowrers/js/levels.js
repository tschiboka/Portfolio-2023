/*
 
        LEVELS
 
*/

/* 
 * Each level object consist :
 *     - blueprint: array of 11 strings with 9 chars
 *         - "X"       : transparent (when matches found) <-- not in use when designing level
 *         - "1" - "9" : cell is different fruits
 *         - "."       : any random fruits
 *         - "A" - "E" : cell is one of the flowers
 *         - "F"       : any random flower
 *         - "S, M, L" : cell is stone small medium large (breakable)
 *         - "#"       : cell is wall (unbreakable)
 *         - "U"       : cell is basket
 *         - "*"       : diamonds 
 *         
 *     - fruitVariationNumber : determine the number of the possible randomly
 *         created fruits [5 - 9] 
 * 
 *     - minimumFlowersOnBoard : will help to generate new flowers when board starts to run out of flowers
 * 
 *     - flowersToCompleteLevel : > 0
 * 
 *     - targetPoints : the secondary goal of the game is to max out a level, so next time it will be giving 
 *       double the amount of points. 
 * 
 *     - time : in sec-s eg: 180 --> 3 mins
 * 
 */




/*
 
   SAMPLE

   // level 0
   {
       "blueprint": [
           ".........",
           ".........",
           ".........",
           ".........",
           ".........",
           ".........",
           ".........",
           ".........",
           ".........",
           ".........",
           ".........",
       ],
       "fruitVariationNumber": 0,
       "minimumFlowersOnBoard": 0,
       "flowersToCompleteTheLevel": 0,
       "targetPoints": 0,
       "time": 0,
   },

 
 
 
 
 
 
*/
var levels = [
    // level 1
    {
        "blueprint": [
            "....F....",
            ".........",
            "..SMLMS..",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "S.......S",
            "U#######U",
        ],
        "fruitVariationNumber": 5,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 5000,
        "time": 180,
    },




    // level 2
    {
        "blueprint": [
            "...F.F...",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "#...S...#",
            "#...M...#",
            "####U####",
        ],
        "fruitVariationNumber": 5,
        "minimumFlowersOnBoard": 2,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 7000,
        "time": 240,
    },



    // level 3
    {
        "blueprint": [
            "....F....",
            "..#...#..",
            ".#..#..#.",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "####U####",
        ],
        "fruitVariationNumber": 5,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 5000,
        "time": 180,
    },



    // level 4
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "..SMLMS..",
            "####U####",
        ],
        "fruitVariationNumber": 5,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 1000,
        "time": 60,
    },


    // level 5 
    {
        "blueprint": [
            "F.......F",
            "SSSSSSSSS",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "#U#####U#",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 1000,
        "time": 120,
    },



    // level 6
    {
        "blueprint": [
            "..#FFF#..",
            "...###...",
            "....#....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "....S....",
            "...SSS...",
            "..S#U#S..",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 3,
        "flowersToCompleteTheLevel": 4,
        "targetPoints": 1200,
        "time": 180,
    },



    // level 7
    {
        "blueprint": [
            "..FFFFF..",
            "...###...",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "####U####",
        ],
        "fruitVariationNumber": 5,
        "minimumFlowersOnBoard": 5,
        "flowersToCompleteTheLevel": 20,
        "targetPoints": 4000,
        "time": 300,
    },



    // level 8 
    {
        "blueprint": [
            "....F....",
            ".........",
            "LLL###LLL",
            ".........",
            ".........",
            ".........",
            ".........",
            "....L....",
            "..SMLMS..",
            "SSMMLMMSS",
            "#U#####U#",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 1500,
        "time": 180,
    },



    // level 9 
    {
        "blueprint": [
            "...F.F...",
            "...L*L...",
            "...MMM...",
            "....S....",
            ".........",
            ".........",
            ".........",
            "U.......U",
            "#.......#",
            "#.......#",
            "#.......#",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 2,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 1200,
        "time": 180,
    },



    // level 10
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "..S...S..",
            ".#U#.#U#.",
            ".###.###.",
            ".........",
            ".........",
        ],
        "fruitVariationNumber": 8,
        "minimumFlowersOnBoard": 3,
        "flowersToCompleteTheLevel": 4,
        "targetPoints": 1200,
        "time": 180,
    },



    // level 11
    {
        "blueprint": [
            "......##F",
            ".......##",
            "........#",
            ".........",
            ".........",
            ".........",
            "S........",
            "MS.......",
            "LMS......",
            "LLMS.....",
            "ULLMS....",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 2000,
        "time": 240,
    },


    // level 12
    {
        "blueprint": [
            "F...#...F",
            "....#....",
            "....#....",
            "....#....",
            "....#....",
            "....#....",
            "....#....",
            "....#....",
            "....#....",
            "....#....",
            "###U#U###",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 1500,
        "time": 300,
    },



    // level 13
    {
        "blueprint": [
            "F...F...F",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "....U....",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 3,
        "flowersToCompleteTheLevel": 10,
        "targetPoints": 5000,
        "time": 180,
    },



    // level 14
    {
        "blueprint": [
            "####F####",
            "###...###",
            "##.....##",
            "##.....##",
            "##.....##",
            "##.....##",
            "##.....##",
            "##.....##",
            "##.....##",
            "###...###",
            "####U####",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 8,
        "targetPoints": 2000,
        "time": 300,
    },


    // level 15
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "...###...",
            "....S....",
            "...SUS...",
            "...###...",
            "...###...",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 3,
        "targetPoints": 2400,
        "time": 210,
    },




    // level 16
    {
        "blueprint": [
            "F...F...F",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "......###",
            "......LLL",
            "......LLL",
            "########U",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 3,
        "flowersToCompleteTheLevel": 3,
        "targetPoints": 2000,
        "time": 120,
    },



    // level 17
    {
        "blueprint": [
            "........F",
            ".........",
            "L........",
            "#L.......",
            "#L.......",
            "#L.......",
            "##L......",
            "###L.....",
            "##LL.....",
            "LLLL.....",
            "U##L.....",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 2500,
        "time": 250,
    },


    // level 18
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "####.####",
            "####.####",
            "####.####",
            "####U####",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 1500,
        "time": 120,
    },



    // level 19
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "LLLLLLLLL",
            "UUUUUUUUU",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 3,
        "targetPoints": 3000,
        "time": 190,
    },



    // level 20
    {
        "blueprint": [
            ".......FF",
            "#........",
            "#........",
            "##.......",
            "###......",
            "LL.......",
            "UL.......",
            "##.......",
            "#........",
            "#........",
            "#........",
        ],
        "fruitVariationNumber": 8,
        "minimumFlowersOnBoard": 2,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 1700,
        "time": 160,
    },



    // level 21
    {
        "blueprint": [
            "........F",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "....#####",
            "....SMMLL",
            "########U",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 1500,
        "time": 180,
    },



    // level 22
    {
        "blueprint": [
            "....F....",
            "....F....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".#######.",
            "..SMLMS..",
            "####U####",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 2,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 3700,
        "time": 120,
    },


    // level 23
    {
        "blueprint": [
            "...FFF...",
            "###...###",
            "...LLL...",
            "...###...",
            ".........",
            ".........",
            "###......",
            ".........",
            "....###..",
            ".....L...",
            "...#U####",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 3,
        "flowersToCompleteTheLevel": 3,
        "targetPoints": 2200,
        "time": 180,
    },



    // level 24
    {
        "blueprint": [
            "..F...F..",
            "...F.F...",
            "....F....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "....U....",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 5,
        "flowersToCompleteTheLevel": 12,
        "targetPoints": 3300,
        "time": 90,
    },



    // level 25
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "....L....",
            "...LLL...",
            ".LLLLLLL.",
            "LLLLULLLL",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 3,
        "targetPoints": 2800,
        "time": 150,
    },


    // level 26
    {
        "blueprint": [
            "####F####",
            "##.....##",
            "#.......#",
            "#.......#",
            "##.....##",
            "#########",
            "##.....##",
            "#.......#",
            "#.......#",
            "##.....##",
            "####U####",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 1800,
        "time": 60,
    },



    // level 27
    {
        "blueprint": [
            "...F.F...",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "#.......#",
            "##.....##",
            "###...###",
            "####U####",
        ],
        "fruitVariationNumber": 5,
        "minimumFlowersOnBoard": 2,
        "flowersToCompleteTheLevel": 10,
        "targetPoints": 9000,
        "time": 300,
    },

    // level 28
    {
        "blueprint": [
            "...F.F...",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "#SSSSSSS#",
            "##MMMMM##",
            "###LLL###",
            "####U####",
        ],
        "fruitVariationNumber": 5,
        "minimumFlowersOnBoard": 2,
        "flowersToCompleteTheLevel": 3,
        "targetPoints": 3000,
        "time": 300,
    },



    // level 29
    {
        "blueprint": [
            "####F####",
            "###...###",
            "##.....##",
            "##.....##",
            "##.....##",
            "##..*..##",
            "##.....##",
            "##.....##",
            "##.....##",
            "###...###",
            "####U####",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 1300,
        "time": 150,
    },


    // level 30
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "SSSSSSSSS",
            "S*SS*SS*S",
            "SSSSSSSSS",
            "####U####",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 8500,
        "time": 180,
    },



    // level 31
    {
        "blueprint": [
            "....F....",
            "....#....",
            "....#....",
            "....#....",
            "....#....",
            "....#....",
            "....#....",
            "....#....",
            "....#....",
            "L...#...L",
            "U#######U",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 2000,
        "time": 210,
    },


    // level 32
    {
        "blueprint": [
            "F.......F",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "....#....",
            "...#.#...",
            "..#...#..",
            "S..#U#..S",
            "*S..#..S*",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 2,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 5100,
        "time": 120,
    },



    // level 33
    {
        "blueprint": [
            "...F#F...",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "..#...#..",
            "..#.S.#..",
            "..#LML#..",
            "..##U##..",
        ],
        "fruitVariationNumber": 8,
        "minimumFlowersOnBoard": 2,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 1800,
        "time": 260,
    },


    // level 34
    {
        "blueprint": [
            "F...F...F",
            ".........",
            ".........",
            ".........",
            "#.......#",
            "M.......M",
            "L.......L",
            "U.......U",
            "#...M...#",
            "*..LLL..*",
            "####U####",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 3,
        "flowersToCompleteTheLevel": 3,
        "targetPoints": 1200,
        "time": 90,
    },


    // level 35
    {
        "blueprint": [
            "FFFFFFFFF",
            "...***...",
            ".........",
            ".........",
            ".........",
            "LLLLLLLLL",
            ".........",
            "MMMMMMMMM",
            ".........",
            "SSSSSSSSS",
            "UUUUUUUUU",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 9,
        "flowersToCompleteTheLevel": 15,
        "targetPoints": 5000,
        "time": 180,
    },



    // level 36
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "...#U#...",
            "LL#####LL",
            "*#######*",
            "#########",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 3,
        "targetPoints": 2500,
        "time": 90,
    },


    // level 37
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".MSMSMSM.",
            "#S#S#S#S#",
            "###U#U###",
        ],
        "fruitVariationNumber": 8,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 2000,
        "time": 120,
    },



    // level 38
    {
        "blueprint": [
            ".........",
            ".........",
            ".F.......",
            "..#####..",
            "..#......",
            "..#......",
            "..#......",
            "..#..U#..",
            "..#####..",
            ".........",
            ".........",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 2,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 1800,
        "time": 90,
    },



    // level 39
    {
        "blueprint": [
            "##..F..##",
            "##.....##",
            "##.....##",
            "##.....##",
            "##.....##",
            "##.....##",
            "##.....##",
            "##.....##",
            "##.....##",
            "##.....##",
            "####U####",
        ],
        "fruitVariationNumber": 5,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 5,
        "targetPoints": 9999,
        "time": 300,
    },



    // level 40
    {
        "blueprint": [
            "F........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "L########",
            "LLLLLLLLL",
            "########U",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 2000,
        "time": 210,
    },



    // level 41
    {
        "blueprint": [
            "..F.F.F..",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".U.U.U.U.",
            ".#.#.#.#.",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 3,
        "flowersToCompleteTheLevel": 3,
        "targetPoints": 2500,
        "time": 120,
    },



    // level 42
    {
        "blueprint": [
            "F........",
            "........#",
            "........#",
            "........#",
            "........#",
            "........#",
            "........#",
            ".....####",
            ".....M...",
            ".....###M",
            ".....###U",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 1600,
        "time": 120,
    },




    // level 43
    {
        "blueprint": [
            "F...F...F",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "LU#####UL",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 3,
        "flowersToCompleteTheLevel": 6,
        "targetPoints": 4000,
        "time": 210,
    },



    // level 44
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            ".........",
            "...###...",
            ".........",
            ".........",
            ".........",
            ".........",
            "SSSSSSSSS",
            "UUUUUUUUU",
        ],
        "fruitVariationNumber": 9,
        "minimumFlowersOnBoard": 3,
        "flowersToCompleteTheLevel": 4,
        "targetPoints": 1800,
        "time": 180,
    },



    // level 45
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "###LLL###",
            "###LLL###",
            "####U####",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 2000,
        "time": 240,
    },



    // level 46
    {
        "blueprint": [
            ".F.F.F.F.",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "#S#S#S#S#",
            "#M#M#M#M#",
            "#L#L#L#L#",
            "#U#U#U#U#",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 4,
        "flowersToCompleteTheLevel": 4,
        "targetPoints": 2000,
        "time": 210,
    },





    // level 47
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".#L#.#L#.",
            ".#*#.#*#.",
            ".###.###.",
            ".........",
            "####U####",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 3,
        "targetPoints": 4000,
        "time": 180,
    },





    // level 48
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "####U####",
        ],
        "fruitVariationNumber": 5,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 9999,
        "time": 180,
    },




    // level 49
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "..SMLMS..",
            "..#####..",
            ".........",
            "..##U##..",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 5000,
        "time": 180,
    },




    // level 50
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "...###...",
            "...#L#...",
            "...#U#...",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 1600,
        "time": 120,
    },




    // level 51
    {
        "blueprint": [
            "F........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "........M",
            ".......ML",
            "......MLL",
            ".....MLLU",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 1400,
        "time": 150,
    },


    // level 52
    {
        "blueprint": [
            ".F.....F.",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "....U....",
        ],
        "fruitVariationNumber": 9,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 1500,
        "time": 150,
    },





    // level 53
    {
        "blueprint": [
            "F.......F",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "....#....",
            "..#U#U#..",
            "..#####..",
            "..#####..",
        ],
        "fruitVariationNumber": 9,
        "minimumFlowersOnBoard": 2,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 1200,
        "time": 120,
    },



    // level 54
    {
        "blueprint": [
            "#########",
            "#########",
            "####F####",
            "#.......#",
            "#.......#",
            "#.......#",
            "#.......#",
            "#.......#",
            "####U####",
            "#########",
            "#########",
        ],
        "fruitVariationNumber": 5,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 4,
        "targetPoints": 2500,
        "time": 120,
    },



    // level 55
    {
        "blueprint": [
            "....F....",
            "#LL###LL#",
            ".SS###SS.",
            ".........",
            ".........",
            ".........",
            ".........",
            "###.M.###",
            "##.....##",
            "#.......#",
            "####U####",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 3,
        "targetPoints": 1800,
        "time": 120,
    },


    // level 56
    {
        "blueprint": [
            "........F",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "SMSM#####",
            "....#...#",
            "....#...#",
            "U########",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 2200,
        "time": 120,
    },


    // level 57
    {
        "blueprint": [
            "F####....",
            "#####....",
            "#####....",
            "#####....",
            ".........",
            ".........",
            ".........",
            "U########",
            "#########",
            "#########",
            "#########",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 1200,
        "time": 120,
    },



    // level 58
    {
        "blueprint": [
            "####F####",
            ".........",
            "SSSSSSSSS",
            ".........",
            ".........",
            "MMMMMMMMM",
            "#########",
            "..#####..",
            ".........",
            ".........",
            "####U####",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 1000,
        "time": 180,
    },



    // level 59
    {
        "blueprint": [
            "########F",
            ".........",
            ".........",
            "...######",
            "...######",
            "...######",
            ".........",
            "###......",
            "###......",
            "###......",
            "###U#####",
        ],
        "fruitVariationNumber": 5,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 1500,
        "time": 180,
    },


    // level 60
    {
        "blueprint": [
            "....F....",
            "###SSS###",
            "MMMM#MMMM",
            ".........",
            ".........",
            "....#....",
            "...###...",
            "....#....",
            ".........",
            "...LLL...",
            "####U####",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 3000,
        "time": 240,
    },


    // level 61
    {
        "blueprint": [
            "#########",
            "#######.F",
            "#####...L",
            "###......",
            "#........",
            "........#",
            ".......##",
            ".....####",
            "M..######",
            "U########",
            "#########",
        ],
        "fruitVariationNumber": 5,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 1500,
        "time": 120,
    },



    // level 62
    {
        "blueprint": [
            "F..###..F",
            "...###...",
            "...###...",
            "...###...",
            "...###...",
            "#########",
            "##.....##",
            ".........",
            ".........",
            "..SMLMS..",
            "..##U##..",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 2,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 1200,
        "time": 180,
    },


    // level 63
    {
        "blueprint": [
            "####F####",
            "###SMS###",
            "##.....##",
            "#.......#",
            "S.......S",
            "M.......M",
            "S.......S",
            "#.......#",
            "##.....##",
            "###SMS###",
            "####U####",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 1400,
        "time": 150,
    },



    // level 64
    {
        "blueprint": [
            "###.F.###",
            "#LL...LL#",
            "#L.....L#",
            ".........",
            ".........",
            ".........",
            ".........",
            "....S....",
            "...MMM...",
            "..LLLLL..",
            "####U####",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 3,
        "targetPoints": 1800,
        "time": 300,
    },




    // level 65
    {
        "blueprint": [
            "....F....",
            "...LLL...",
            "..LLLLL..",
            "..LLLLL..",
            "...LLL...",
            "....L....",
            ".........",
            ".........",
            ".........",
            "LMSMLMSML",
            "U###U###U",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 2000,
        "time": 180,
    },




    // level 66
    {
        "blueprint": [
            "#...L...#",
            "...LFL...",
            "....L....",
            "L.......L",
            "LL.....LL",
            "L.......L",
            ".........",
            "....L....",
            "...LLL...",
            "#...L...#",
            "####U####",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 5,
        "targetPoints": 2500,
        "time": 180,
    },



    // level 67
    {
        "blueprint": [
            "F.......F",
            ".........",
            ".........",
            ".........",
            ".........",
            "....U....",
            "....#....",
            "...###...",
            "..#####..",
            ".#######.",
            "#########",
        ],
        "fruitVariationNumber": 8,
        "minimumFlowersOnBoard": 2,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 1000,
        "time": 60,
    },



    // level 68
    {
        "blueprint": [
            "####F####",
            ".........",
            "SSS...LLL",
            "MMM...MMM",
            "LLL...SSS",
            "LLL...SSS",
            "MMM...MMM",
            "SSS...LLL",
            ".........",
            ".........",
            "####U####",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 3000,
        "time": 180,
    },




    // level 69
    {
        "blueprint": [
            "....F....",
            ".LL...LL.",
            "L....L..L",
            "LLL..L..L",
            "L..L..LLL",
            "L..L....L",
            ".LL...LL.",
            ".........",
            ".........",
            ".........",
            "####U####",
        ],
        "fruitVariationNumber": 8,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 2000,
        "time": 300,
    },






    // level 70
    {
        "blueprint": [
            "F.......#",
            ".......##",
            "......##.",
            ".....##..",
            "....##...",
            "...##....",
            "..##.....",
            ".##......",
            "##.......",
            "#........",
            "........U",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 2000,
        "time": 145,
    },




    // level 71
    {
        "blueprint": [
            "....F....",
            ".MSMSMSM.",
            ".S.....S.",
            ".M.###.M.",
            ".S.#*#.S.",
            ".M.#*#.M.",
            ".S.###.S.",
            ".M.....M.",
            ".SMSMSMS.",
            ".........",
            "####U####",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 8000,
        "time": 170,
    },



    // level 72
    {
        "blueprint": [
            "....F....",
            ".........",
            "....*....",
            "....*....",
            ".........",
            "#LLLLLLL#",
            "##LLLLL##",
            "###LLL###",
            "####L####",
            "####U####",
            "#########",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 6000,
        "time": 300,
    },



    // level 73
    {
        "blueprint": [
            "....F....",
            "..MMMMM..",
            ".M.....M.",
            ".M.S.S.M.",
            ".M.....M.",
            "..MSSSM..",
            "..MSSSM..",
            "...LLL...",
            ".........",
            ".........",
            "...#U#...",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 4,
        "targetPoints": 1300,
        "time": 160,
    },



    // level 74
    {
        "blueprint": [
            "F.......F",
            ".LLLLLL..",
            "......L..",
            ".....L...",
            ".....L...",
            "....L....",
            "...L.....",
            "..L......",
            "..L......",
            ".........",
            "LLLLULLLL",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 2,
        "flowersToCompleteTheLevel": 4,
        "targetPoints": 3000,
        "time": 180,
    },



    // level 75
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            ".........",
            "#########",
            "#...#...#",
            "#...#...#",
            "#...#...#",
            "#...#...#",
            "#...#...#",
            "##U###U##",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 1800,
        "time": 180,
    },




    // level 76
    {
        "blueprint": [
            "........F",
            ".........",
            "........#",
            ".........",
            ".......##",
            ".........",
            "......###",
            ".........",
            ".....####",
            "........L",
            ".....LLLU",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 1800,
        "time": 160,
    },




    // level 77
    {
        "blueprint": [
            "F...#...F",
            "....#....",
            "....#....",
            "....#....",
            "....#....",
            "....#....",
            "....#....",
            "....#....",
            "#SSS#SSS#",
            "##S###S##",
            "##U###U##",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 2,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 4600,
        "time": 240,
    },



    // level 78
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "....#....",
            "...###...",
            "..#####..",
            ".LLL*LLL.",
            "####U####",
        ],
        "fruitVariationNumber": 8,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 4000,
        "time": 240,
    },



    // level 79
    {
        "blueprint": [
            "....F....",
            ".........",
            "#.......#",
            "#.......#",
            "#.......#",
            "#.......#",
            "#.......#",
            "####U####",
            ".........",
            "....L....",
            "...L*L...",
        ],
        "fruitVariationNumber": 8,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 3,
        "targetPoints": 6000,
        "time": 300,
    },



    // level 80
    {
        "blueprint": [
            ".........",
            "....L....",
            "....U....",
            "....#....",
            "F...#...F",
            "....#....",
            "....#....",
            "....L....",
            "....U....",
            "....#....",
            "....#....",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 2,
        "flowersToCompleteTheLevel": 8,
        "targetPoints": 3500,
        "time": 180,
    },




    // level 81
    {
        "blueprint": [
            "....F....",
            ".........",
            "LMLMLMLML",
            "M*ML*LM*M",
            "LMLMLMLML",
            ".........",
            ".........",
            ".........",
            "....L....",
            "..##U##..",
            "#########",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 3,
        "targetPoints": 10000,
        "time": 300,
    },



    // level 82
    {
        "blueprint": [
            "....F....",
            ".L.....L.",
            ".L..L..L.",
            ".L..L..L.",
            ".L..L..L.",
            "....L....",
            ".........",
            "....*....",
            "....L....",
            "....L....",
            "####U####",
        ],
        "fruitVariationNumber": 8,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 6000,
        "time": 180,
    },




    // level 83
    {
        "blueprint": [
            "....F....",
            ".L.L.L.L.",
            "..L...L..",
            ".L.L.L.L.",
            ".........",
            ".........",
            "..S.S.S..",
            "...S.S...",
            "..S.S.S..",
            ".........",
            "....U....",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 3,
        "targetPoints": 2000,
        "time": 200,
    },



    // level 84
    {
        "blueprint": [
            "F...F...F",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "SMSMSMSMS",
            "MSMSMSMSM",
            "LMLMLMLML",
            "####U####",
        ],
        "fruitVariationNumber": 8,
        "minimumFlowersOnBoard": 3,
        "flowersToCompleteTheLevel": 3,
        "targetPoints": 3000,
        "time": 300,
    },



    // level 85
    {
        "blueprint": [
            "SSSSFSSSS",
            "S.S.S.S.S",
            ".S.S.S.S.",
            "..S.S.S..",
            "...S.S...",
            "....S....",
            "...S.S...",
            "..S.S.S..",
            ".S.S.S.S.",
            "S.S.S.S.S",
            "SSSSUSSSS",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 1500,
        "time": 240,
    },



    // level 86
    {
        "blueprint": [
            "M.M.F.M.M",
            ".M.M.M.M.",
            "M.M.M.M.M",
            ".M.M.M.M.",
            "M.M.M.M.M",
            ".M.M.M.M.",
            "M.M.M.M.M",
            ".M.M.M.M.",
            "M.M.M.M.M",
            "*1112111*",
            "####U####",
        ],
        "fruitVariationNumber": 6,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 1200,
        "time": 300,
    },



    // level 87
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            "...***...",
            "MMMMMMMMM",
            "SSSSSSSSS",
            "MMMMMMMMM",
            "SSSS*SSSS",
            "MMMMMMMMM",
            "SSSSSSSSS",
            "####U####",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 10000,
        "time": 300,
    },



    // level 88
    {
        "blueprint": [
            "F...L...F",
            "...L.L...",
            "..L.#.L..",
            ".L.#*#.L.",
            "L.##.##.L",
            ".L.#*#.L.",
            "..L.#.L..",
            "...L.L...",
            "....L....",
            ".........",
            "####U####",
        ],
        "fruitVariationNumber": 7,
        "minimumFlowersOnBoard": 2,
        "flowersToCompleteTheLevel": 2,
        "targetPoints": 6000,
        "time": 300,
    },




    // level 89
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            "...###...",
            "...#.#...",
            "...#.#...",
            "...###...",
            ".........",
            ".........",
            "...LLL...",
            "####U####",
        ],
        "fruitVariationNumber": 8,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 1300,
        "time": 240,
    },




    // level 90
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            ".........",
            "...####..",
            ".........",
            "..####...",
            ".........",
            "S###L###S",
            ".........",
            "....U....",
        ],
        "fruitVariationNumber": 8,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 1900,
        "time": 200,
    },


    // level 91
    {
        "blueprint": [
            "#...F...#",
            "##.....##",
            ".##...##.",
            "..##.##..",
            "...###...",
            "...###...",
            "..##.##..",
            ".##...##.",
            "##.....##",
            "#.......#",
            "....U....",
        ],
        "fruitVariationNumber": 5,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 1500,
        "time": 180,
    },




    // level 92
    {
        "blueprint": [
            "...#F#...",
            "...###...",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "LLLLLLLLL",
            "MLLLLLLLM",
            "SMLLLLLMS",
            "####U####",
        ],
        "fruitVariationNumber": 9,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 2000,
        "time": 300,
    },




    // level 93
    {
        "blueprint": [
            "........F",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            ".........",
            "MLMLMLMLM",
            "#######LL",
            "LLLLLLLLL",
            "U########",
        ],
        "fruitVariationNumber": 9,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 2000,
        "time": 300,
    },



    // level 94
    {
        "blueprint": [
            "........F",
            "...LLL...",
            "..LL*LL..",
            ".LL...LL.",
            ".LL...LL.",
            ".LLLLLLL.",
            ".LL...LL.",
            ".LL...LL.",
            ".........",
            ".........",
            "U.......U",
        ],
        "fruitVariationNumber": 9,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 3000,
        "time": 300,
    },





    // level 95
    {
        "blueprint": [
            "........F",
            "..L...L..",
            ".LLL.LLL.",
            ".LLLLLLL.",
            "..LLLLL..",
            "...LLL...",
            "....L....",
            ".........",
            ".........",
            ".........",
            "####U####",
        ],
        "fruitVariationNumber": 9,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 2000,
        "time": 300,
    },




    // level 96
    {
        "blueprint": [
            "#........",
            "#........",
            "#........",
            "#........",
            "#####....",
            "FLLLL....",
            "#####....",
            "#........",
            "#.....LLL",
            "#.....LLL",
            "#.....LLU",
        ],
        "fruitVariationNumber": 9,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 2000,
        "time": 300,
    },




    // level 97
    {
        "blueprint": [
            "....F....",
            ".........",
            ".........",
            ".........",
            "....S....",
            "...SSS...",
            "..MMMMM..",
            ".LLLLLLL.",
            "....L....",
            "....L....",
            "....U....",
        ],
        "fruitVariationNumber": 9,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 2000,
        "time": 300,
    },





    // level 98
    {
        "blueprint": [
            "FLLLLLLLL",
            "117144844",
            "#........",
            "LLLLLLLLL",
            "LL*LLL*LL",
            "LLLL*LLLL",
            "LLLLLLLLL",
            "LL*LLL*LL",
            "LLLLLLLLL",
            "LLL***LLL",
            "LLLLLLLLU",
        ],
        "fruitVariationNumber": 9,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 10000,
        "time": 300,
    },




    // level 99
    {
        "blueprint": [
            "FLLLLLLLL",
            ".##....LL",
            "##....LLL",
            ".##....LL",
            "##....LLL",
            ".##....LL",
            "##....LLL",
            ".##....LL",
            "##....LLL",
            ".##....LL",
            "########U",
        ],
        "fruitVariationNumber": 9,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 2000,
        "time": 300,
    },




    // level 100
    {
        "blueprint": [
            "LLLL.LLLL",
            "FL.L.LL..",
            ".L.LLLLL.",
            ".L.L.LL..",
            ".L.L.LLLL",
            ".........",
            "LLLL.LLL.",
            "L..LLLL.L",
            "LL.LLLL.L",
            "L..L.LL.L",
            "LLLL.LLLU",
        ],
        "fruitVariationNumber": 9,
        "minimumFlowersOnBoard": 1,
        "flowersToCompleteTheLevel": 1,
        "targetPoints": 10000,
        "time": 300,
    },

];