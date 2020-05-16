// var animals = ["bear", "cat", "duck", "tiger","elephant", "rabbit", "wolf", "hourse"]

// // get animals variable in a tag matched with a button and append buttons index to html

// document.getElementById(animals);
var animals = ["bear", "cat", "duck", "tiger", "elephant", "rabbit", "wolf", "horse"];


renderButtons();
displayAnimalInfo();
gifStill();



function displayAnimalInfo() {



    $(".animalBtn").on("click", function () {
        var animal = $(this).data("search");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=ZhwJGcq4jvjAYEvclbztW3aiebLXiUQz&limit=10";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(response);







            var results = response.data;



            for (var i = 0; i < results.length; i++) {



                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                    var gifDiv = $("<div>");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);



                    var animalImage = $("<img>");

                    animalImage.attr("src", results[i].images.fixed_height.url);

                    gifDiv.append(p);
                    gifDiv.append(animalImage);


                    $("#gifs-appear-here").prepend(gifDiv);

                    
                }


            }


        });

    });

}

function renderButtons() {

    $("#buttons-appear-here").empty();

    for (var i = 0; i < animals.length; i++) {


        var animalBtn = $("<button>");




        animalBtn.attr("data-search", animals[i]);
        animalBtn.addClass("animalBtn btn btn-primary")




        animalBtn.text(animals[i]);


        $("#buttons-appear-here").prepend(animalBtn);

       
    }

}


$("#search-button").on("click", function (event) {
    event.preventDefault();

    var newAnimal = $("#search-term").val().trim();

    animals.push(newAnimal);

    renderButtons();
    displayAnimalInfo();

});

function gifStill (){

// had trouble getting this function to work the classes and attibutes were added but the functionality of still and animate weren't working 

    $("img").addClass("gif");

$(".gif").on("click", function() {

    

        
        var state = $(this).attr("data-state");
        
        if (state === "animate") {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }
      });

    }