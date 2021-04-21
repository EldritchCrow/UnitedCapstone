function getRandomBagImage() {
    let bagImages = [
        'img/book-bag.jpg',
        'img/diaper-bag.jpg',
        'img/military-bag.jpg',
        'img/paper-bag.jpg',
        'img/red-bag.jpg',
    ];
    return bagImages[Math.floor(Math.random() * bagImages.length)];
}

function getRandomBagColor() {
    let bagColors = [
        'Red',
        'Black',
        'Tan',
        'White',
        'Green',
    ];
    return bagColors[Math.floor(Math.random() * bagColors.length)];
}

function getRandomBagType() {
    return '05 Horizontal Design Suitcase Expandable';
}

function getRandomBagTag() {
    let t = 'ABCDEF1234567890';
    let s = '';
    while (s.length < 10) {
        s += t[Math.floor(Math.random() * t.length)];
    }
    return s;
}

function createRandomBagElement(options) {
    options = options || {};
    return $.create({
        tag: 'div', class: 'bag', content: [
            { tag: 'img', class: 'image', src: options.image || getRandomBagImage() },
            { class: 'color', content: options.color || getRandomBagColor() },
            { class: 'tag', content: options.tag || getRandomBagTag() },
            { tag: 'img', class: 'arrow', src: 'img/arrow.png' },
        ]
    });
}
