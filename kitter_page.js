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
   room_name=localStorage.getItem("room_name"); 
   
   function send()
   {
       msg = document.getElementById("msg").value;
       firebase.database().ref(room_name).push({
           name:user_name,
           message:msg,
           like:0
       });
       document.getElementById("msg").value="";
   }

   function Logout()
   {
       localStorage.removeItem("user_name");
       localStorage.removeItem("room_name");
       window.location = "index.html";
   }
   function getData() 
   { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
        firebase_message_id = childKey; 
        message_data = childData;
        console.log(firebase_message_id);
        console.log(message_data);
        n1= message_data ['name'];
        message = message_data ["message"];
        like = message_data ['like'];
        nwt = "<h4>"+ n1 +"<img class='user_tick' src= 'tick.png'></h4>";
        mwt = "<h4 class='message_h4'>" + message + "</h4>";
        like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updatelike(this.id)'>"; 
        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>like: "+ like +"</span></button><hr>";
        row = nwt + mwt + like_button + span_with_tag;
        document.getElementById("output").innerHTML+= row;
   }}); }); }

   getData();

   function updatelike(message_id)
   {
       console.log("clicked on like button -" + message_id );
       likes = document.getElementById(message_id).value;
       update_likes = Number(likes) +1;
       console.log(update_likes);

       firebase.database().ref(room_name).child(message_id).update({
           like : update_likes
       });
    }