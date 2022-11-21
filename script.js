$(document).ready(function () {
  function saveData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      localStorage.setItem("Team-Data", this.responseText);
    };
    xhttp.open("GET", "data.json", true);
    xhttp.send();
  }
  saveData();
  $(".team-card img").bind("click", function (e) {
    $(".homepage").css("display", "none");
    $(".team-preview").css("display", "block");
    var getData = JSON.parse(localStorage.getItem("Team-Data"));
    getData.map(function (elem, i) {
      if (e.target.id == elem.Team_Id) {
        $(".team-preview .team-name-logo h2").text(elem.Team_Name);
        $(".team-preview .team-name-logo img").attr("src", elem.Team_icon);
        // console.log(elem.playerDetail);
        elem.playerDetail?.map(function (item, j) {
          $(`.players .card:nth-child(${j + 1}) .card-img-top`).attr(
            "src",
            item.photo
          );
          $(`.players .card:nth-child(${j + 1}) .card-body h5`).text(
            item.playerName
          );
          $(
            `.players .card:nth-child(${j + 1}) .card-body p:nth-child(1)`
          ).text(item.description);
          $(
            `.players .card:nth-child(${j + 1}) .card-body p:nth-child(2)`
          ).text("Team:" + " " + item.from);
          var playerDetailItem = item;
          //   console.log(playerDetailItem, j);
          $(`.player-card .show-player`).bind("click", function (event) {
            $(".team-preview").css("display", "none");
            $(".homepage").css("display", "none");
            $(".player-detail-page").css("display", "block");
            // console.log("clicked");
            if (event.target.id == item.id) {
              $(".player-detail-page .player-detail-main .player-pic img").attr(
                "src",
                item.photo
              );
              $(".player-data h4").text(item.playerName);
              $(".player-data p:nth-child(2)").text("Team: " + item.from);
              $(".player-data p:nth-child(3)").text(item.description);
              $(".player-data p:nth-child(4)").text(
                "Price: " + item.price + "Cr"
              );
            }
          });
        });
      }
    });
  });
  $(".navbar-nav .nav-item:nth-child(1) a").bind("click", function () {
    $(".homepage").css("display", "block");
    $(".player-detail-page").css("display", "none");
    $(".team-preview").css("display", "none");
  });
});

var selectForm = document.querySelector(".form");
function showForm(){
    if(selectForm.style.display == "block"){
        selectForm.style.display = "none";
    }else {
        selectForm.style.display = "block";
    }
    var name = document.querySelector("#name");
    var teamName = document.querySelector("#teamName");
    var playerId = document.querySelector("#playerId");
    var imageUrl = document.querySelector("#imageUrl");
    var mainData = JSON.parse(localStorage.getItem("Team-Data"));
    // console.log(mainData[0])
    // for(var i = 0; i < mainData.length; i++){
    //     // console.log(mainData[i])
    //     if()
    // }
    document.querySelector("#add").addEventListener("click", function () {
        localStorage.setItem("name", name.value);
        // console.log(name.value.length);
        localStorage.setItem("team-name", teamName.value);
        localStorage.setItem("id", playerId.value);
        localStorage.setItem("photo", imageUrl.value);
        // console.log(mainData[0].Team_Short_Code);
        if(name.value.length != 0 && teamName.value.length != 0 && playerId.value.length != 0 && imageUrl.value.length != 0){
            var nameData = localStorage.getItem("name");
            var teamNameData = localStorage.getItem("team-name");
            var photoData = localStorage.getItem("photo");
            // mainData.map(function (item, i){
                // console.log(item);
                // console.log("clicked");
                    // console.log(mainData[i])
                    
                
                // if(playerId.value == mainData[i].Team_Short_Code){
                    var element1 = document.createElement("div");
                    element1.classList.add("card");
                    element1.classList.add("player-card")
                    element1.setAttribute("style", "width:14rem");
                    var element11 = document.createElement("img");
                    element11.classList.add("card-img-top");
                    element11.classList.add("show-player");
                    element11.setAttribute("style", "height:150px");
                    var element12 = document.createElement("div");
                    element12.classList.add("card-body");
                    var element121 = document.createElement("h5");
                    element121.classList.add("card-title");
                    var element122 = document.createElement("p");
                    element122.classList.add("card-text");
                    var element123 = document.createElement("p");
                    element123.classList.add("team-name");
                    element12.appendChild(element121);
                    element12.appendChild(element122);
                    element12.appendChild(element123);
                    element1.appendChild(element11);
                    element1.appendChild(element12);
                    var mainDiv = document.querySelector(".players");
                    mainDiv.appendChild(element1);
                    element11.setAttribute("src", photoData)
                    element121.innerText = nameData;
                    element122.innerText = "Team: " + teamNameData;
                    // console.log(document.getElementsByClassName("players"));
                // }
            // })
        }
    })
}

var searchInputs = document.querySelector("#searchInput");
var listItems = document.querySelector(".listItem");
var playerList = document.querySelector("#listItem2");
function showListItems(){
    if(listItems.style.display == "block"){
        listItems.style.display = "none";
        // playerList.style.display = "none";
    }else {
        listItems.style.display = "block";
        // playerList.style.display = "block";
    }
    
}
function searchFun(){
    let filter = document.getElementById("searchInput").value.toUpperCase();
    let myList = document.getElementsByClassName("team-list-group");
    let myListItem = document.getElementsByClassName('team-list-item');
    if(playerList.style.display == "block"){
        playerList.style.display = "none";
    }else {
        playerList.style.display = "block";
    }

    for (var i = 0; i < myListItem.length; i++){
        var listText = myListItem[i].innerText;
        if(listText.toUpperCase().indexOf(filter) > -1){
            myListItem[i].style.display = "";
        }else {
            myListItem[i].style.display = "none";
        }

        var getData = JSON.parse(localStorage.getItem("Team-Data"));
    // console.log(getData);
    if(getData[i].Team_Short_Code == filter){
        getData[i].playerDetail.map(function(items,j){
            console.log(items.playerName);
            var selectLi = document.querySelector(`.player-list .player-list-item:nth-child(${j+1})`);
            selectLi.innerText = items.playerName;
        })
    }
    }
    
    
}

