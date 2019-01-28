//Declaring Global Variables
var colors = [
    "Aqua ",
    "Black ",
    "Blue ",
    "BlueViolet ",
    "Brown ",
    "BurlyWood ",
    "Chocolate ",
    "Coral ",
    "Crimson ",
    "Cyan ",
    "DarkBlue ",
    "DarkCyan ",
    "DarkGoldenRod ",
    "DarkGray ",
    "DarkGrey ",
    "DarkGreen ",
    "DarkKhaki ",
    "DarkMagenta ",
    "DarkOliveGreen ",
    "DarkOrange ",
    "DarkOrchid ",
    "DarkRed ",
    "DarkSalmon ",
    "DarkSeaGreen ",
    "DarkSlateBlue ",
    "DarkSlateGray ",
    "DarkSlateGrey ",
    "DarkTurquoise ",
    "DarkViolet ",
    "DeepPink ",
    "DeepSkyBlue ",
    "DimGray ",
    "DimGrey ",
    "DodgerBlue ",
    "FireBrick ",
    "ForestGreen ",
    "Fuchsia ",
    "Gold ",
    "GoldenRod ",
    "Gray ",
    "Grey ",
    "Green ",
    "GreenYellow ",
    "HotPink ",
    "IndianRed  ",
    "Indigo  ",
    "LawnGreen ",
    "Lime ",
    "LimeGreen ",
    "Magenta ",
    "Maroon ",
    "MediumAquaMarine ",
    "MediumBlue ",
    "MediumOrchid ",
    "MediumPurple ",
    "MediumSeaGreen ",
    "MediumSlateBlue ",
    "MediumSpringGreen ",
    "MediumTurquoise ",
    "MediumVioletRed ",
    "MidnightBlue ",
    "MistyRose ",
    "Navy ",
    "Olive ",
    "OliveDrab ",
    "Orange ",
    "OrangeRed ",
    "Orchid ",
    "PeachPuff ",
    "Peru ",
    "Pink ",
    "Plum ",
    "PowderBlue ",
    "Purple ",
    "RebeccaPurple ",
    "Red ",
    "RosyBrown ",
    "RoyalBlue ",
    "SaddleBrown ",
    "Salmon ",
    "SandyBrown ",
    "SeaGreen ",
    "Sienna ",
    "SpringGreen ",
    "SteelBlue ",
    "Teal ",
    "Thistle ",
    "Tomato ",
    "Turquoise ",
    "Violet ",
];

var favs = [];
var count = 1;
var characters = [
    "Michael",
    "Jim",
    "Pam",
    "Dwight",
    "Kevin",
    "Angela",
    "Creed",
    "Kelly",
    "Toby",
    "Andy"
];
var fav;
var possibleCharacters = [
    "Michael",
    "Dwight",
    "Jim",
    "Pam",
    "Ryan",
    "Andy",
    "Robert",
    "Jan",
    "Roy",
    "Stanley",
    "Kevin",
    "Meredith",
    "Angela",
    "Oscar",
    "Phyllis",
    "Kelly",
    "Toby",
    "Creed",
    "Darryl",
    "Holly",
    "Erin",
    "Gabe",
    "Nellie",
    "Clark",
    "Pete",
    "Todd",
    "David",
    "Karen",
    "Charles",
    "Kendal",
    "Jo",
    "Nate",
    "Deangelo",
    "Val",
    "Cathy"
];

var queryURL = "https://api.giphy.com/v1/gifs/search?q=";
var limit = "&limit=" + count * 10;
var key = "&api_key=Sj8itsmyy2O1oDYfTfWf2p2tyv3VvYiA";

//pulling in saved favorites
function loadFavorites() {
    var favsArr = localStorage.getItem("favs");
    favsArr = favsArr.split(",");
    favs = favsArr;
    if (!Array.isArray(favsArr)) {
        favsArr = [];
    }
    for (var k = 0; k < favsArr.length; k++) {
        var favoritoDiv = $("<div>");
        var favoritoImg = $("<img>").attr("src", favsArr[k]);
        favoritoDiv.append(favoritoImg);
        favoritoDiv.attr("data-search", favsArr[k]);
        favoritoDiv.addClass("favorito");
        $("#favgif").prepend(favoritoDiv);
        if (favsArr[k] !== "") {
            fav++;
        }
    }
}

//Display number of favorites
function updateFavCount() {
    $("#fav").html("<br><h2>You have " + fav + " favorites: <br><br><br>");
    $("#fav").hide();
}

//On Load Function
$(document).ready(function() {
    loadButtons();
    fav = 0;
    loadFavorites();
    updateFavCount();
});

//Adding new button
function add() {
    if (
        possibleCharacters.indexOf($("#val").val()) >= 1 &&
        characters.indexOf($("#val").val()) <= 0
    ) {
        $("#buttons").html = "";
        characters.push($("#val").val());
        loadButtons();
        heartClick();
    } else {
        alert("Sorry, that person doesn't work here.");
    }
}

//Loading Buttons
function loadButtons() {
    $("#buttons").empty();
    for (var i = 0; i < characters.length; i++) {
        var rand = Math.floor(Math.random() * colors.length);

        var searchValue = characters[i];
        var newButton = $("<button>").text(searchValue);
        newButton.addClass("but");
        newButton.css("background-color", colors[rand]);
        rand = Math.floor(Math.random() * colors.length + 1);
        newButton.css("border-color", colors[rand]);
        $("#buttons").append(newButton);
        newButton.addClass("gifbut");
    }
    buttonClick();
}

//adding click event to buttons
function buttonClick() {
    $(document).on("click", ".gifbut", function() {
        $("#gifs").empty();
        var char = $(this).text();
        var query = queryURL + char + "_the_office" + key + limit;

        $.ajax({ url: query, method: "GET" }).then(function(response) {
            for (
                var j = response.data.length - 10;
                j < response.data.length;
                j++
            ) {
                var imgURL = response.data[j].images.original_still.url;
                var emptyHeart = $("<img>");
                emptyHeart.addClass("gifHeart");
                emptyHeart.attr("src", "./assests/Images/660465.png");
                emptyHeart.attr(
                    "data-img",
                    response.data[j].images.original.url
                );
                var image = $("<img>").attr("src", imgURL);

                var ig = $("<div>");
                $("#gifs").append(emptyHeart);
                ig.text("Rating: " + response.data[j].rating);
                var image = $("<img>").attr("src", imgURL);
                image.attr("src", imgURL);
                emptyHeart.attr(
                    "data-url",
                    response.data[j].images.original.url
                );
                ig.html(
                    " <br> Title: '" +
                        response.data[j].title +
                        "'<br>Rating: " +
                        response.data[j].rating.toUpperCase() +
                        "<br>"
                );
                ig.prepend(emptyHeart);
                ig.prepend("<br>");

                ig.prepend(image);
                var nb = $("<button>");
                var li = $("<a>").text("Go to URL");
                li.attr("href", response.data[j].images.original.url);
                li.attr("class", "imgURL");
                li.attr("download", "");
                nb.append(li);
                ig.addClass("ig");
                var rand = Math.floor(Math.random() * colors.length + 1);
                ig.css("background-color", colors[rand]);

                $("#gifs").prepend(ig);
                image.attr(
                    "data-dynamic",
                    response.data[j].images.original.url
                );
                image.attr(
                    "class",
                    "imgURL"
                );

                image.attr(
                    "data-static",
                    response.data[j].images.original_still.url
                );
                image.attr(
                    "class",
                    "imgURL"
                );
                image.attr(
                    "data-static",
                    response.data[j].images.original_still.url
                );
                image.attr(
                    "class",
                    "imgURL"
                );

                if (favs.indexOf(emptyHeart.attr("data-img")) >= 0) {
                    emptyHeart.attr("src", "./assests/Images/291212.png");
                }

                image.on("click", function() {
                    if ($(this).attr("src") === $(this).attr("data-dynamic")) {
                        $(this).attr("src", $(this).attr("data-static"));
                    } else {
                        $(this).attr("src", $(this).attr("data-dynamic"));
                        "dynamic " + $(this).attr("data-dynamic");
                    }
                });
            }
        });
    });
    heartClick();
}

//Favorite heart click event

function heartClick() {
    $(document).on("click", ".gifHeart", function() {
        if ($(this).attr("src") == "./assests/Images/660465.png") {
            fav++;
            updateFavCount();
            $(this).attr("src", "./assests/Images/291212.png");
            favs.push($(this).attr("data-url"));
            localStorage.setItem("favs", favs.join());
            $("#favgif").empty();
            loadFavorites();
        } else {
            fav--;
            updateFavCount();
            $(this).attr("src", "./assests/Images/660465.png");
            var search = $(this).attr("data-url");
            var remove = $('[data-search = "' + search + '"]');
            var removeurl = remove.attr("data-search");
            var taskIndex = favs.indexOf(removeurl);
            if (taskIndex !== -1) {
                favs.splice(taskIndex, 1);
            }
            remove.hide();

            localStorage.setItem("favs", favs.join());
        }
    });
}
