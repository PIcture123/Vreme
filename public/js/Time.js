var socket = io();
var table = document.getElementById('information');
var IsItIn = false;
socket.emit('information');
socket.on('TimeList',function(docs){
    if(!IsItIn){
      console.log(IsItIn);
        for(var i=0;i<docs.length;i++){
          console.log(docs.length);
        var tr = document.createElement("TR");
        table.appendChild(tr);

        var tddata = document.createElement("TH");
        tddata.setAttribute("id","Name");
        var text = document.createTextNode(docs[i].Name);
        tddata.appendChild(text);
        tr.appendChild(tddata);



        var tddata = document.createElement("TH");
        tddata.setAttribute("id","Time");
        var text = document.createTextNode(docs[i].Time);
        tddata.appendChild(text);
        tr.appendChild(tddata);

      }
      IsItIn = true;
    }
  });
