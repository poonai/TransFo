const electron=require('electron')
const app=electron.app;
const browserWindow=electron.BrowserWindow;
const dialog=electron.dialog
const kefir=require('kefir').Kefir
var window;
var createMainWindow=function () {
  window=new browserWindow({width: 800, height: 600})
  window.loadURL('file://'+__dirname+'/main.html')
  window.webContents.openDevTools()

  window.on('closed',function () {

    window=null
  })
}
app.on('ready',createMainWindow)
