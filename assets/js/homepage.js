var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

var getUserRepos = function (user) {
    //format the github api url
    var apiUrl = "https://api.github.com/users" + user + "/repos";

    if (getUserRepos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    //make a request to the url
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayRepos(data, user);
            });

        } else {
            alert("Error:" + response.statusText);
        }
    })
        .catch(function (error) {
            alert("Unable to connect toGitHub");
        });
   
}


var formSubmitHandler = function (event) {
    event.preventDefault();
    // get value from input element
    var username = nameInputEl.nodeValue.trim();

    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";

    } else {
        alert("please enter a GitHub username");
    }
};

userFormEl.addEventListener("submit", formSubmitHandler);
};