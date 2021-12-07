const { dialog } = require('electron').remote;

dialog.showOpenDialog({
    title: '请选择工作目录',
})