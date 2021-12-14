const { app, BrowserWindow, screen } = require('electron')
const size = 16;

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

const createWindows = (display, l, c) => {

    const { x, y, width, height } = display.bounds

    const win = new BrowserWindow({
        ...defaults,
        x: x + l * (width - size),
        y: y + c * (height - size)
    })
    win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
    win.setIgnoreMouseEvents(true)
    win.setSkipTaskbar(true);
    win.setAlwaysOnTop(true, "normal");
    win.setFullScreenable(true);
    win.setMinimizable(false);
    win.loadFile('index' + l + c + '.html')

    setInterval(() => { win.moveTop(); }, 200);
}

app.whenReady().then(() => {
    const displays = screen.getAllDisplays();
    for (const display of displays) {
        createWindows(display, 0, 0)
        createWindows(display, 1, 0)
        createWindows(display, 0, 1)
        createWindows(display, 1, 1)
    }
})