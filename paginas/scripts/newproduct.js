function search() {
    console.log("Pesquisando...");
    var searchbar = document.getElementById("searchbar");
    var clear = document.getElementById("clear");

    searchbar.addEventListener("click",() => {
            searchbar.style.width = "70%";
            clear.style.display = "block";
    });
    searchbar.addEventListener("blur", ()=> {
        searchbar.style.width = "80%";
        clear.style.display = "none";
    });

}

function mostraModal() {
    const modal = document.getElementById("modal-new");
    if(modal.style.display == "none"){
        modal.style.display = "flex";
    }
    else{
        modal.style.display = "none";
    }
}