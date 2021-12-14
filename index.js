const { app, BrowserWindow, screen } = require('electron')
const size = 10;

const defaults = {
    titleBarStyle: 'hidden',
    hasShadow: false,
    frame: false,
    transparent: true,
    resizable: false,
    roundedCorners: false,
    acceptFirstMouse: false,
    movable: false,
    useContentSize: false,
    width: size,
    height: size,
    type: 'toolbar'

}

const createWindow = (x, y) => {
    const primaryDisplay = screen.getPrimaryDisplay()
    const { width, height } = primaryDisplay.size

    const win = new BrowserWindow({ ...defaults, x: x * (width - size), y: y * (height - size) })
    win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });

    win.setIgnoreMouseEvents(true)
    win.setSkipTaskbar(true);
    win.setAlwaysOnTop(true, "normal");
    win.setFullScreenable(true);
    win.setMinimizable(false);
    win.loadFile('index' + x + y + '.html')

    setInterval(() => { win.moveTop(); }, 200);
}

app.whenReady().then(() => {


    createWindow(0, 0)
    createWindow(1, 0)
    createWindow(0, 1)
    createWindow(1, 1)
})