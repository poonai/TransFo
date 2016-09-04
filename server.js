const net=require('net')
const kefir=require('kefir').Kefir;
const path=require('path')
const fs=require('fs')
var filePath="";
var server;
const init=function (path,clientIp,cb) {
  filePath=path;

  server=net.createServer(function (client) {
     splitedip=client.remoteAddress.split(':');
  //   if(splitedip[splitedip.length-1]==clientIp){
       cb(client)
    // }
    })
    server.listen(9123)

}
const streamReader=function (client,cb) {
  var out="";
  client.on('data',function (chunk) {
    console.log(chunk.toString());
  cb(JSON.parse(chunk.toString()))
  })
}
const writer=function (client,data) {
  client.write(JSON.stringify(data))
}
const fileInfo=function (cb) {
fs.stat(filePath,function (err,data) {
  name=path.basename(filePath)
  cb({size:data.size,name:name})
})
}
const sendFile=function (client) {
  size=0
  stream=fs.createReadStream(filePath)
  stream.on('data',function (chunk) {

       size+=chunk.length

        client.write(chunk)

    })
}
module.exports = {
  init:init,
  streamReader:streamReader,
  writer:writer,
  fileInfo:fileInfo,
  sendFile:sendFile
};
