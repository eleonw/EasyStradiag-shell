const { remote } = require('electron');

const { dialog, BrowserWindow } = remote;

let paraWin = new BrowserWindow({
    width: 600,
    height: 500,
    center: true,
    resizable: false,
    minimizable: false,
    maximizable: false,
    fullscreen: false,

    // frame: false,

    parent: remote.getCurrentWindow(),

    title: '测试参数设置',
    icon: 'logos/logo.ico',

    autoHideMenuBar: true,

    show: false,
});

let infoWin = new BrowserWindow({
    width: 600,
    height: 500,
    center: true,
    resizable: false,
    minimizable: false,
    maximizable: false,
    fullscreen: false,

    // frame: false,

    parent: remote.getCurrentWindow(),

    title: '基本信息填写',
    icon: 'logos/logo.ico',

    autoHideMenuBar: true,

    show: false,
});

function maskon() {
    $("#mask").removeAttr("hidden");
}

function openInfoWin() {
    infoWin.loadFile('ui_dev/info.html');
    infoWin.show();
}

function openParaWin(testName) {
    paraWin.loadFile('./ui_dev/test_paras/' + testName + '.html');
    paraWin.show();
    // infoWin.loadFile('ui_dev/test_paras/firstpos.html');
}

function openWorkingDirDialg() {
    maskon();
    dialog.showOpenDialogSync({
        title: '请选择工作路径',
        properties: ['openDirectory', 'promptToCreate']
    })
}

// openWorkingDirDialg();

// openInfoWin();
openParaWin('firstpos');