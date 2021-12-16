const firebaseConfig = {
      apiKey: "AIzaSyBM0Dfdv2ti_mWyI82KwplGuTnAT3SfF0g",
      authDomain: "kitter-29265.firebaseapp.com",
      databaseURL: "https://kitter-29265-default-rtdb.firebaseio.com",
      projectId: "kitter-29265",
      storageBucket: "kitter-29265.appspot.com",
      messagingSenderId: "102170593149",
      appId: "1:102170593149:web:e9cf83f06684aeff2d2e14"
    };

     firebase.initializeApp(firebaseConfig);
     user_name=localStorage.getItem("user_name");
     document.getElementById("user_name").innerHTML="Welcome"+user_name;
     function add_room ()
     {
     room_name = document.getElementById("room_name").value;
     firebase.database().ref("/").child(room_name).update({purpose : "adding room name"});
     localStorage.setItem("room_name", room_name);
     window.location ="kwitter_page.html";
     }

     function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
      room_names = childKey;
      console.log(room_names);
      row ="<div class='room_name' id="+room_names+" onclick='redirectToRoomName(this.id)' >#"+ room_names +"</div><hr>";
      document.getElementById("output").innerHTML += row;

      });});}
getData();
function redirectToRoomName(name)
{
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location ="kwitter_page.html";
}
function Logout()
{
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}