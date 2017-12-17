//Mr. Snow on Youtube. Use the Twitch.tv JSON API Part 2
//TODO: Add images from DataI, make columns.

//'https://wind-bow.gomix.me/twitch-api/' + type + '/' + name + '?callback=?'

$(function(){
  
  var streams = ["freecodecamp","test_channel","ESL_SC2"];
 
  //Displays if user is Online or Offline
  $.getJSON('https://wind-bow.gomix.me/twitch-api/streams/ESL_SC2?callback=?').done(function(data){
    //console.log(data);
    if(data.stream === null){
      $('#fcc').html(' is offline');
    }else{
      $('#fcc').html(' is ONLINE!');
    } // if/else statement
  }); //getJSON call
  
  for(var i=0; i < streams.length; i++){

    $.ajax({
      type: 'GET',
      dataType: "json",
      url: 'https://wind-bow.gomix.me/twitch-api/channels/' + streams[i] + '?callback=?',
      //The I in dataI represents where you are in the For Loop
      //Below is a nested API call. Watch video #3 for the explanation.
      success: function(dataI){
        //console.log(dataI);
        $.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + dataI.name + '?callback=?').done(function(data2){
          //console.log(data2);
          //this slice will show the names available by pulling data from... console.log?
          var name = data2._links.self.slice(37);
          //console.log(name);
          if(data2.stream === null){
           //video 4 covers this part
            //use <br> to drop the line down since you are appending.
           $('#user').append('<a target = "blank" href ="https:www.//www.twitch.tv/' + name + '">'+ name +'</a><br>');
            $('#status').append('offline<br>')
            $('#game').append('N/A<br>')
          }else{
           $('#user').append('<a target = "blank" href ="https:www.//www.twitch.tv/' + name + '">'+ name +'</a><br>');
            $('#status').append('ONLINE!<br>')
            $('#game').append(+data2.stream.game + '<br>');
    } // if/else statement
  }); //getJSON call
        
      }, //dataI function
      error: function(err){
        alert("Error: User not Found");
        
        $('#user').append('Invalid User<br>');
        $('#status').append('Not Found<br>')
        $('#game').append('N/A<br>')
        
      }
    }); //ajax call
    
}; //for loop
}); //$function