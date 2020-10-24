var limitWarningEl = document.querySelector("#limit-warning");
var issueContainerEl = document.querySelector("#issue-container");


var repoNameEl = document.querySelector("#repo-name");
var getRepoIssues = function (repo) {

    var apiUrl = "http://api.github.com/repos/" + repo + "/issues?direction=asc";


    fetch(apiUrl).then(function (response) {
        // request was successful
        if (response.ok) {
            response.json().then(function (data) {
                //pass response data to dom function
                displayIssues(data);

                //check if api has paginated issues
                if (response.headers.get("Link")) {
                    displayWarning(repo);
                }
            });
        }
        else {
            //if not successful, redirect to homepage
            document.location.replace("./index.html");
        }

    });
};



var displayIssues = function (issues) {
    if (issueContainerEl.length === 0) {
        issueContainerEl.textContent = "this repo has no open isues!";
        return;
    }
    for (var i = 0; i < issues.length; i++) {
        // create a link element totake users to the issue on github
        varissueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center ";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");
        issueContainerEl.appendChild(issueEl);
    }
    //ceate span to hold issue title
    var titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;

    //append to container
    issueEl.appendChild(titleEl);

    //create a type element
    var typeEl = document.createElement("span");

    //check if issue is an actual issue or a pull request
    if (issues[i].pull_request) {
        typeEl.textContent = "(pull request)";
    } else {
        typeEl.textContent = "(issue)";

    }

    //append tocontainer
    issueEl.appendChild(typeEl);
};

var displayWarning = function(repo) {
    //add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit";

    var linkEl = document.creaateElement("a");
    linkEl.textContent = "see More Issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" +repo+ "/issues");
    linkEl.setAttribute("target", "_blank");

    // append to warning container
    limitWarningEl.appendChild(linkEl);
};


console.log(repoName);
var getRepoName = function(){
    var queryString = document.location.search;
    var repoName = querystring.split("=")[1];
   if(repoName){
       repoNameEl.textContent = repoName;
        getRepoIssues(repoName);
   }
   else{
       document.location.replace("./index.html");
   }

};
getRepoName();