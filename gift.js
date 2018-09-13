//create my topics array
var topics = ["Dallas Cowboys", "Greenbay Packers", "Detroit Lions", "Los Angeles Rams", "Seattle Seahawks", "Denver Broncos", "Atlanta Falcons", "Pittsburgh Steelers", "New Orleans Saints", "Arizona Cardinals"];
console.log(topics)


function displayButtons(){
    $("#buttons").empty()
    for (i = 0; i < topics.length; i++) {
        var buttonElement = $("<button>").attr("class", "nfl-team-button").attr("data-value", topics[i]).html(topics[i]);
        $("#buttons").append(buttonElement);
    }
}
displayButtons();





//creating on click function--button. created a delegated event
$(document).on("click", ".nfl-team-button", function () {
    var team = $(this).attr("data-value");
    //alert(team);
    // Call the API function here in pass in "team"
    lookUp(team);
});

function lookUp(team) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + team + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response.data);
            // This is where your code goes to display the GIFs
            $("#root").empty();
            for (i = 0; i < response.data.length; i++) {
                var gifImage = $("<img>")
                gifImage.attr("src", response.data[i].images.fixed_height_still.url);
                gifImage.attr("still", response.data[i].images.fixed_height_still.url);
                gifImage.attr("animated", response.data[i].images.fixed_height.url);
                gifImage.attr("state", "still");
                gifImage.attr("class", "giphyImages");
                var rating = $("<h2>").text("Rated: " + response.data[i].rating)
                console.log(response.data[i].rating)
                var title = $("<h2>").text("Title: " + response.data[i].title)
                $("#root").append(gifImage);
                $("#root").append(rating);
                $("#root").append(title);
                
            }

        });
}
//create on click function to animate still giphy images and vice versa
$(document).on("click", ".giphyImages", function(){
    var state = $(this).attr("state")
    var still = $(this).attr("still")
    var animated = $(this).attr("animated")
   if(state === "still"){
       $(this).attr("src", animated)
       $(this).attr("state", "animated")
   }else {
    $(this).attr("src", still)
    $(this).attr("state", "still")
   }

    console.log("works")
})
//listens to form event of submit. This gives ability to use html.5 form validation such as required.
$("#new-button-form").on("submit", function(event){
    event.preventDefault()
    var newButton = $("#new-button-text").val().trim()
    console.log(newButton)
    topics.push(newButton)
    displayButtons();
})
