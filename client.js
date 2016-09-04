const net=require('net')
var client;
var init=function (ip) {
  client=new net.Socket
  client.connect(9123,ip)
}

var handshake=function () {
var handshake=1;
var name;
var final=[]
var size=0;
var finalsize=0
var fs=require('fs')

client.on('data',function (chunk) {

     if(handshake==1){
       //file size
        data=JSON.parse(chunk.toString())
        name=data.name;
        size=data.size
        dialog.showSaveDialog({defaultPath:name},function (fileName) {
       if (fileName === undefined){
            console.log("You didn't save the file");
            return;
       }else {
         name=fileName
         out=JSON.stringify({ack:true})//acknoleging
          client.write(out)
         handshake=2;
       }
       // fileName is a string that contains the path and filename created in the save file dialog.

       });

     }else if(handshake==2) {
       finalsize+=chunk.length
       console.log(finalsize);
             final.push(chunk)
             if(finalsize==size){
               handshake==3
               client.write(JSON.stringify({ack:false,final:true}))
             }
     }
  })
  client.on('end',function () {
    fs.writeFile(name,Buffer.concat(final),function (err) {
      if(err){
        console.log("something went wrong");
      }else {
        console.log("saved");
      }
    })
  })


}
module.exports={
  init:init,
  handshake:handshake
}
