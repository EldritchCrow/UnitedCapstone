function setPage(n) {
    let pages = $$$$($('#pages'), '.page');
    for (let i = 0; i < pages.length; ++i) {
        if (i == n - 1) {
            pages[i].style.width = '100vw';
            console.log('setting page to', pages[i]);
        } else {
            pages[i].style.width = '0';
        }
    }
}

$('#scan-button').addEventListener('click', () => {
    setPage(2);
});

$('#title').addEventListener('click', () => {
    setPage(1);
});

setPage(1);