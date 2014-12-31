var b;
var f;
var state = 0; 
var rowCounter = 0;
//var numUsers = 0;
var ref = new Firebase("https://leagueon.firebaseio.com/");

//facebook SDK setuup
// This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '322256697965279',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.1' // use version 2.1
  });

  // Now that we've initialized the JavaScript SDK, we call 
  // FB.getLoginStatus().  This function gets the state of the
  // person visiting this page and can return one of three states to
  // the callback you provide.  They can be:
  //
  // 1. Logged into your app ('connected')
  // 2. Logged into Facebook, but not your app ('not_authorized')
  // 3. Not logged into Facebook and can't tell if they are logged into
  //    your app or not.
  //
  // These three cases are handled in the callback function.

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }
//



function navigateHome(){
   window.location.href = "index.html";     
}

function navigateThank(){
    window.location.assign("aftersubmit.html")
}

function tableDecision(Counter){
    var even = "even";
    var odd = "odd";
    if (Counter%2 == 0){
        return even;
    }
    if (Counter%2 != 0){
        return odd;
    }
}

function stateShow(currentState){
    if (currentState == 1){
        $("#requestForm1").remove();
        $("#requestForm2").remove();
        $("#availableTable").remove();
    }
    if (currentState == 3){
        $("#newsummoner1").remove();
        $("#newsummoner2").remove();
        $("#availableTable").remove();
    }
    if (currentState == 4){
        $("#requestForm1").remove();
        $("#requestForm2").remove();
        $("#newsummoner1").remove();
        $("#newsummoner2").remove();
    }
}

function newsubmitPressed(){
    
    var summonerID = (document.getElementById("sumid")).value;

    for (i = 8; i < 30; i += 3){
        var tierCheck = document.getElementById("newsummoner1").childNodes[i].checked; //boolean value of tier selected   
        if (tierCheck == true){
            var tierResult =  document.getElementById("newsummoner1").childNodes[i].id;//resulted tier
        }
    }
    for (i = 2; i < 15; i += 3){
        var posCheck = document.getElementById("newsummoner2").childNodes[i].checked;
        if (posCheck == true ){
            var posResult = document.getElementById("newsummoner2").childNodes[i].id;
        }
    }
    
    var bestChampionList = (document.getElementById("newtextarea")).value;
    
    ref.child("NewSummoners").child(summonerID).set({
        "Name": summonerID,
        "Tier": tierResult,
        "Position": posResult, 
        "Champions": bestChampionList
    });
    //navigateThank();
}

function formsubmitPressed(){
    
    var summonerID = document.getElementById("requestForm1").childNodes[3].value;
    
    
    for (i = 8; i < 30; i += 3){
        var tierCheck = document.getElementById("requestForm1").childNodes[i].checked; //boolean value of tier selected   
        if (tierCheck == true){
            var tierResult =  document.getElementById("requestForm1").childNodes[i].id;//resulted tier
        }
    }
    for (i = 2; i < 15; i += 3){
        var posCheck = document.getElementById("requestForm2").childNodes[i].checked;
        if (posCheck == true ){
            var posResult = document.getElementById("requestForm2").childNodes[i].id;
        }
    }
    //22
    
    var note = (document.getElementById("formtextarea")).value;
    
    ref.child("Requests").child(summonerID).set({
        "Name": summonerID,
        "Tier": tierResult,
        "Position": posResult,
        "Notes": note
    });
}

function findPressed(){ //Leaguers Request
    
}



function listPressed(){//Availble Leaguers
    state = 4;
    stateShow(state);
    
    var summoners = new Firebase("https://leagueon.firebaseio.com/NewSummoners/");
    
    summoners.once('value', function(snap){
        //window.console.log(data.T);
        
        b = document.createElement("table");
        b.setAttribute("class","available");
        b.setAttribute("id", "availableTable");

        f = document.createElement("tr");
        var u = document.createElement("th");
        var text = document.createTextNode("Summoner Name");
        u.appendChild(text);
        f.appendChild(u);
        u = document.createElement("th");
        text = document.createTextNode("Tier");
        u.appendChild(text);
        f.appendChild(u);
        u = document.createElement("th");
        text = document.createTextNode("Preferred Position");
        u.appendChild(text);
        f.appendChild(u);
        u = document.createElement("th");
        text = document.createTextNode("Best Champions");
        u.appendChild(text);
        f.appendChild(u);
        b.appendChild(f);
        ///*
        snap.forEach(function(snapshot){
            var childData = snapshot.val();
        
            f = document.createElement("tr");
            f.setAttribute("class", tableDecision(rowCounter));
            u = document.createElement("td");
            text = document.createTextNode(childData.Name);
            u.appendChild(text);
            f.appendChild(u);

            u = document.createElement("td");
            text = document.createTextNode(childData.Tier);
            u.appendChild(text);
            f.appendChild(u);

            u = document.createElement("td");
            text = document.createTextNode(childData.Position);
            u.appendChild(text);
            f.appendChild(u);

            u = document.createElement("td");
            text = document.createTextNode(childData.Champions);
            u.appendChild(text);
            f.appendChild(u);

            b.appendChild(f);
            rowCounter++;
        });
        //*/
        document.body.appendChild(b);
    });
    
   
} 

function formPressed(){ //leaguers request form
    
    state = 3; 
    stateShow(state);
    b = document.createElement("form");
    b.setAttribute("class", "left");
    b.setAttribute("id", "requestForm1");
    
    f = document.createTextNode("Summoner Name:");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    
    f = document.createElement("input");
    f.setAttribute("type", "text");
    f.setAttribute("class", "text");
    f.setAttribute("id","sumid");
    b.appendChild(f);
    
    f = document.createElement("br");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    f = document.createTextNode("Preferred Tier:");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    
    f = document.createElement("input");
    f.setAttribute("type","radio");
    f.setAttribute("name","tiertype");
    f.setAttribute("id","Challenger");
    b.appendChild(f);
    f = document.createTextNode("Challenger");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    
    f = document.createElement("input");
    f.setAttribute("type","radio");
    f.setAttribute("name","tiertype");
    f.setAttribute("id","Master");
    b.appendChild(f);
    f = document.createTextNode("Master");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    
    f = document.createElement("input");
    f.setAttribute("type","radio");
    f.setAttribute("name","tiertype");
    f.setAttribute("id","Diamond");
    b.appendChild(f);
    f = document.createTextNode("Diamond");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    
    f = document.createElement("input");
    f.setAttribute("type","radio");
    f.setAttribute("name","tiertype");
    f.setAttribute("id","Platinum");
    b.appendChild(f);
    f = document.createTextNode("Platinum");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    
    f = document.createElement("input");
    f.setAttribute("type","radio");
    f.setAttribute("name","tiertype");
    f.setAttribute("id","Gold");
    b.appendChild(f);
    f = document.createTextNode("Gold");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    
    f = document.createElement("input");
    f.setAttribute("type","radio");
    f.setAttribute("name","tiertype");
    f.setAttribute("id","Silver");
    b.appendChild(f);
    f = document.createTextNode("Silver");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    
    f = document.createElement("input");
    f.setAttribute("type","radio");
    f.setAttribute("name","tiertype");
    f.setAttribute("id","Bronze");
    b.appendChild(f);
    f = document.createTextNode("Bronze");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    
    f = document.createElement("input");
    f.setAttribute("type","radio");
    f.setAttribute("name","tiertype");
    f.setAttribute("id","Unranked");
    f.setAttribute("checked", "true");
    b.appendChild(f);
    f = document.createTextNode("Wood?(Unranked)");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    
    document.body.appendChild(b);
    
    b = document.createElement("form");
    b.setAttribute("class","right");
    b.setAttribute("id","requestForm2");
    
    f = document.createTextNode("Needs a Position at:");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    
    f = document.createElement("input");
    f.setAttribute("type", "radio");
    f.setAttribute("name","position type");
    f.setAttribute("id", "Top");
    b.appendChild(f);
    f = document.createTextNode("Top");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    
    f = document.createElement("input");
    f.setAttribute("type", "radio");
    f.setAttribute("name","position type");
    f.setAttribute("id", "Jungle");
    b.appendChild(f);
    f = document.createTextNode("Jungle");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    
    f = document.createElement("input");
    f.setAttribute("type", "radio");
    f.setAttribute("name","position type");
    f.setAttribute("id", "Mid");
    b.appendChild(f);
    f = document.createTextNode("Mid");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    
    f = document.createElement("input");
    f.setAttribute("type", "radio");
    f.setAttribute("name","position type");
    f.setAttribute("id", "AD Carry");
    b.appendChild(f);
    f = document.createTextNode("AD Carry");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    
    f = document.createElement("input");
    f.setAttribute("type", "radio");
    f.setAttribute("name","position type");
    f.setAttribute("id", "Support");
    b.appendChild(f);
    f = document.createTextNode("Support");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    
    f = document.createElement("br");
    b.appendChild(f);
    f = document.createTextNode("Notes:");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    
    f = document.createElement("textarea");
    f.setAttribute("rows", "5");
    f.setAttribute("cols", "23");
    f.setAttribute("id", "formtextarea");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    
    f = document.createElement("button");
    f.setAttribute("onclick", "formsubmitPressed()");
    f.setAttribute("class", "submit");
    f.setAttribute("id","formsubmibutton");
    var q = document.createTextNode("Submit");
    f.appendChild(q);
    b.appendChild(f);
    
    document.body.appendChild(b);
}

function newPressed(){//new summoner 
    state = 1;
    stateShow(state);
    b = document.createElement("form");
    b.setAttribute("class", "left");
    b.setAttribute("id", "newsummoner1");
    
    f = document.createTextNode("Summoner Name:");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    
    f = document.createElement("input");
    f.setAttribute("type", "text");
    f.setAttribute("class", "text");
    f.setAttribute("id", "sumid");
    b.appendChild(f);
    
    f = document.createElement("br");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    f = document.createTextNode("Tier:");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    
    f = document.createElement("input");
    f.setAttribute("type","radio");
    f.setAttribute("name", "tiertype");
    f.setAttribute("id","Challenger");
    b.appendChild(f);
    f = document.createTextNode("Challenger");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    
    f = document.createElement("input");
    f.setAttribute("type","radio");
    f.setAttribute("name", "tiertype");
    f.setAttribute("id","Master");
    b.appendChild(f);
    f = document.createTextNode("Master");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    
    f = document.createElement("input");
    f.setAttribute("type","radio");
    f.setAttribute("name", "tiertype");
    f.setAttribute("id","Diamond");
    b.appendChild(f);
    f = document.createTextNode("Diamond");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    
    f = document.createElement("input");
    f.setAttribute("type","radio");
    f.setAttribute("name", "tiertype");
    f.setAttribute("id","Platinum");
    b.appendChild(f);
    f = document.createTextNode("Platinum");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    
    f = document.createElement("input");
    f.setAttribute("type","radio");
    f.setAttribute("name", "tiertype");
    f.setAttribute("id","Gold");
    b.appendChild(f);
    f = document.createTextNode("Gold");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    
    f = document.createElement("input");
    f.setAttribute("type","radio");
    f.setAttribute("name", "tiertype");
    f.setAttribute("id","Silver");
    b.appendChild(f);
    f = document.createTextNode("Silver");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    
    f = document.createElement("input");
    f.setAttribute("type","radio");
    f.setAttribute("name", "tiertype");
    f.setAttribute("id","Bronze");
    b.appendChild(f);
    f = document.createTextNode("Bronze");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    
    f = document.createElement("input");
    f.setAttribute("type","radio");
    f.setAttribute("name", "tiertype");
    f.setAttribute("id","Unranked");
    f.setAttribute("checked", "true");
    b.appendChild(f);
    f = document.createTextNode("Wood?(Unranked)");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    
    document.body.appendChild(b);
    
    b = document.createElement("form");
    b.setAttribute("class", "right");
    b.setAttribute("id", "newsummoner2");
    
    f = document.createTextNode("Preferred Position:");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    
    f = document.createElement("input");
    f.setAttribute("type", "radio");
    f.setAttribute("name" , "positiontype");
    f.setAttribute("id", "Top");
    b.appendChild(f);
    f = document.createTextNode("Top");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    
    f = document.createElement("input");
    f.setAttribute("type", "radio");
    f.setAttribute("name" , "positiontype");
    f.setAttribute("id", "Jungle");
    b.appendChild(f);
    f = document.createTextNode("Jungle");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    
    f = document.createElement("input");
    f.setAttribute("type", "radio");
    f.setAttribute("name" , "positiontype");
    f.setAttribute("id", "Mid");
    b.appendChild(f);
    f = document.createTextNode("Mid");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    
    f = document.createElement("input");
    f.setAttribute("type", "radio");
    f.setAttribute("name" , "positiontype");
    f.setAttribute("id", "AD Carry");
    b.appendChild(f);
    f = document.createTextNode("AD Carry");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    
    f = document.createElement("input");
    f.setAttribute("type", "radio");
    f.setAttribute("name" , "positiontype");
    f.setAttribute("id", "Support");
    b.appendChild(f);
    f = document.createTextNode("Support");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    
    f = document.createElement("br");
    b.appendChild(f);
    f = document.createTextNode("Best Champions:");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    
    f = document.createElement("textarea");
    f.setAttribute("rows", "5");
    f.setAttribute("cols", "23");
    f.setAttribute("id", "newtextarea");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    f = document.createElement("br");
    b.appendChild(f);
    
    f = document.createElement("button");
    f.setAttribute("onclick", "newsubmitPressed()");
    f.setAttribute("type", "submit");
    f.setAttribute("class", "submit");
    f.setAttribute("id", "newsubmitbutton");
    var q = document.createTextNode("Submit");
    f.appendChild(q);
    b.appendChild(f);
    
    document.body.appendChild(b);
}

//code for helptext show/hide
function newHelpershow(){
    $("#newhelpertext").show();
}
function newHelperhide(){
    $("#newhelpertext").hide();
}
            
function findHelpershow(){
    $("#findhelpertext").show();
}
function findHelperhide(){
    $("#findhelpertext").hide();
}
            
function formHelpershow(){
    $("#formhelpertext").show();
}
function formHelperhide(){
    $("#formhelpertext").hide();
}
            
function listHelpershow(){
    $("#listhelpertext").show();
}
function listHelperhide(){
    $("#listhelpertext").hide();
}
