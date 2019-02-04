var socket = io();
var Stop = false;    
var data={
    name:'',
    minutes:0
};
var minutes = 30;
var HasAccount = false;
var clicked = false;
function ClickedStart(){
if(!clicked){
    clicked = true;
var name = document.getElementById('name').value;
socket.emit("Find",name);
socket.on('Found',function(docs){
    
    console.log(docs.length);
    if(docs.length > 0){
        
        name = docs[0].Name;
        minutes = 30 - docs[0].Time;
        HasAccount = true;
    }
  
    if(name != ""){
            document.getElementById('Time').innerHTML =
        minutes+'' + ":" + 0;
        startTimer();

        function startTimer() {
            
                var presentTime = document.getElementById('Time').innerHTML;
                var timeArray = presentTime.split(/[:]+/);
                var m = timeArray[0];
                if(Stop && !HasAccount){
                    data.name = name;
                    data.minutes = 30 - m;
                    socket.emit('Stop',data);
                    location.replace('/');
                }
                if(Stop && HasAccount){
                    data.name = name;
                    data.minutes = 30 - m;
                    socket.emit('Stop2',data);
                    location.replace('/');
                }
                
                var s = checkSecond((timeArray[1] - 1));
                if(s==59){m=m-1}
                document.getElementById('Time').innerHTML =
                    m + ":" + s;
                    
                    setTimeout(startTimer, 1000);
                
        }

        function checkSecond(sec) {
        if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
        if (sec < 0) {sec = "59"};
        return sec;
        }
    }
      
        console.log(docs);
    });
}
}
function ClickedStop(){
    Stop = true;
}