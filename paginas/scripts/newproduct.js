function search() {
    console.log("Pesquisando...");
    var searchbar = document.getElementById("searchbar");
    var clear = document.getElementById("clear");

    searchbar.addEventListener("focus", function() {
            searchbar.style.width = "70%";
            clear.style.display = "block";
    });
    searchbar.addEventListener("blur", function() {            searchbar.   style.width = "80%";
        clear.style.display = "none";
    });

}