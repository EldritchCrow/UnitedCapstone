function getIATABagCodeName(iataCode) {
    let mapping = {
        "01": "01 Horizontal Design Hard Shell",
        "02": "02 Upright Design",
        "03": "03 Horizontal Design Suitcase Non-Expandable",
        "05": "05 Horizontal Design Suitcase Expandable",
        "06": "06 Briefcase",
        "07": "07 Document Case",
        "08": "08 Military Style Bag",
        "09": "09 Plastic / Laundry Bag",
        "10": "10 Box",
        "12": "12 Storage Container",
        "20": "20 Garment Bag/Suit Carrier",
        "22": "22 Upright Design, Soft Material",
        "22D": "22D Upright Design, Soft and Hard Materials",
        "22R": "22R Upright Design, Hard Material",
        "23": "23 Horizontal Design Suitcase",
        "25": "25 Duffel/Sport Bag",
        "26": "26 Laptop/Overnight Bag",
        "27": "27 Storage Container",
        "28": "28 Matted Woven Bag",
        "29": "29 Backpack/Rucksack",
        "99": "99 Other Miscellaneous Article",
    };
    return mapping[iataCode];
}

function getIATABagCode(aiCode) {
    aiCode = '' + aiCode;
    let mapping = {
        "01": "01",
        "02": "02",
        "03": "03",
        "05": "06",
        "06": "07",
        "07": "08",
        "08": "09",
        "09": "10",
        "10": "12",
        "11": "20",
        "12": "22",
        "13": "22D",
        "14": "22R",
        "15": "23",
        "16": "25",
        "17": "26",
        "18": "27",
        "19": "28",
        "20": "29",
        "21": "99"
    };
    return mapping[aiCode];
}

function getAIBagCode(iataCode) {
    iataCode = '' + iataCode;
    let mapping = {
        "01": "01",
        "02": "02",
        "03": "03",
        "06": "05",
        "07": "06",
        "08": "07",
        "09": "08",
        "10": "09",
        "12": "10",
        "20": "11",
        "22": "12",
        "22D": "13",
        "22R": "14",
        "23": "15",
        "25": "16",
        "26": "17",
        "27": "18",
        "28": "19",
        "29": "20",
        "99": "21"
    };
    return mapping[iataCode];
}

function getRandomClassifiedBag() {
    let classified = [
        { image: 'img/classified/0000.jpg', iata: '20', color: 'PU', },
        { image: 'img/classified/0001.jpg', iata: '22', color: 'BL', },
        { image: 'img/classified/0002.jpg', iata: '22D', color: 'BL', },
        { image: 'img/classified/0003.jpg', iata: '22', color: 'BL', },
        { image: 'img/classified/0004.jpg', iata: '22R', color: 'BL', },
        { image: 'img/classified/0005.jpg', iata: '22', color: 'BL', },
        { image: 'img/classified/0006.jpg', iata: '22R', color: 'BN', },
        { image: 'img/classified/0007.jpg', iata: '22', color: 'PU', },
        { image: 'img/classified/0008.jpg', iata: '22', color: 'BL', },
        { image: 'img/classified/0009.jpg', iata: '22R', color: 'YW', },
        { image: 'img/classified/0010.jpg', iata: '22R', color: 'BL', },
        { image: 'img/classified/0011.jpg', iata: '22', color: 'BL', },
        { image: 'img/classified/0012.jpg', iata: '22R', color: 'GY', },
        { image: 'img/classified/0013.jpg', iata: '22R', color: 'BL', },
        { image: 'img/classified/0014.jpg', iata: '22R', color: 'WT', },
        { image: 'img/classified/0015.jpg', iata: '23', color: 'GY', },
        { image: 'img/classified/0016.jpg', iata: '22', color: 'BL', },
        { image: 'img/classified/0017.jpg', iata: '27', color: 'BL', },
        { image: 'img/classified/0018.jpg', iata: '22R', color: 'PU', },
        { image: 'img/classified/0019.jpg', iata: '22R', color: 'RD', },
        { image: 'img/classified/0020.jpg', iata: '22R', color: 'GY', },
        { image: 'img/classified/0021.jpg', iata: '22D', color: 'RD', },
        { image: 'img/classified/0022.jpg', iata: '22R', color: 'GY', },
        { image: 'img/classified/0023.jpg', iata: '22R', color: 'BL', },
        { image: 'img/classified/0024.jpg', iata: '22R', color: 'GY', },
        { image: 'img/classified/0025.jpg', iata: '22R', color: 'BU', },
        { image: 'img/classified/0026.jpg', iata: '22R', color: 'GY', },
        { image: 'img/classified/0027.jpg', iata: '22', color: 'BL', },
        { image: 'img/classified/0028.jpg', iata: '22R', color: 'BL', },
        { image: 'img/classified/0029.jpg', iata: '22R', color: 'WT', },
        { image: 'img/classified/0030.jpg', iata: '22', color: 'YW', },
        { image: 'img/classified/0031.jpg', iata: '22R', color: 'BL', },
        { image: 'img/classified/0032.jpg', iata: '22R', color: 'RD', },
        { image: 'img/classified/0033.jpg', iata: '22R', color: 'WT', },
        { image: 'img/classified/0034.jpg', iata: '22', color: 'BL', },
        { image: 'img/classified/0035.jpg', iata: '22R', color: 'GY', },
        { image: 'img/classified/0036.jpg', iata: '22R', color: 'BL', },
        { image: 'img/classified/0037.jpg', iata: '22R', color: 'PU', },
        { image: 'img/classified/0038.jpg', iata: '22R', color: 'RD', },
        { image: 'img/classified/0039.jpg', iata: '22', color: 'BL', },
        { image: 'img/classified/0040.jpg', iata: '23', color: 'BL', },
        { image: 'img/classified/0041.jpg', iata: '08', color: 'GY', },
        { image: 'img/classified/0042.jpg', iata: '22', color: 'PR', },
        { image: 'img/classified/0043.jpg', iata: '10', color: 'RD', },
        { image: 'img/classified/0044.jpg', iata: '22R', color: 'BU', },
        { image: 'img/classified/0045.jpg', iata: '22R', color: 'PU', },
        { image: 'img/classified/0046.jpg', iata: '22R', color: 'BU', },
        { image: 'img/classified/0047.jpg', iata: '27', color: 'BL', },
        { image: 'img/classified/0048.jpg', iata: '22D', color: 'BL', },
        { image: 'img/classified/0049.jpg', iata: '22R', color: 'BU', },
        { image: 'img/classified/0050.jpg', iata: '22R', color: 'BL', },
        { image: 'img/classified/0051.jpg', iata: '22R', color: 'BN', },
        { image: 'img/classified/0052.jpg', iata: '22D', color: 'BL', },
        { image: 'img/classified/0053.jpg', iata: '22', color: 'BN', },
        { image: 'img/classified/0054.jpg', iata: '22R', color: 'WT', },
        { image: 'img/classified/0055.jpg', iata: '22', color: 'BL', },
        { image: 'img/classified/0056.jpg', iata: '22D', color: 'BU', },
        { image: 'img/classified/0057.jpg', iata: '23', color: 'BL', },
        { image: 'img/classified/0058.jpg', iata: '22', color: 'YW', },
        { image: 'img/classified/0059.jpg', iata: '22R', color: 'WT', },
        { image: 'img/classified/0060.jpg', iata: '22D', color: 'PU', },
        { image: 'img/classified/0061.jpg', iata: '22R', color: 'PU', },
        { image: 'img/classified/0062.jpg', iata: '22R', color: 'BN', },
        { image: 'img/classified/0063.jpg', iata: '22R', color: 'BL', },
        { image: 'img/classified/0064.jpg', iata: '22R', color: 'BL', },
        { image: 'img/classified/0065.jpg', iata: '22D', color: 'BL', },
        { image: 'img/classified/0066.jpg', iata: '10', color: 'YW', },
        { image: 'img/classified/0067.jpg', iata: '22', color: 'BL', },
        { image: 'img/classified/0068.jpg', iata: '22D', color: 'BL', },
        { image: 'img/classified/0069.jpg', iata: '22D', color: 'BU', },
        { image: 'img/classified/0070.jpg', iata: '22', color: 'BL', },
        { image: 'img/classified/0071.jpg', iata: '22R', color: 'BU', },
        { image: 'img/classified/0072.jpg', iata: '22R', color: 'BU', },
        { image: 'img/classified/0073.jpg', iata: '22', color: 'BN', },
        { image: 'img/classified/0074.jpg', iata: '23', color: 'BL', },
        { image: 'img/classified/0075.jpg', iata: '10', color: 'YW', },
        { image: 'img/classified/0076.jpg', iata: '27', color: 'BL', },
        { image: 'img/classified/0077.jpg', iata: '22R', color: 'GY', },
        { image: 'img/classified/0078.jpg', iata: '22R', color: 'PU', },
        { image: 'img/classified/0079.jpg', iata: '22R', color: 'GY', },
        { image: 'img/classified/0080.jpg', iata: '22R', color: 'BL', },
        { image: 'img/classified/0081.jpg', iata: '22R', color: 'GY', },
        { image: 'img/classified/0082.jpg', iata: '22R', color: 'BU', },
        { image: 'img/classified/0083.jpg', iata: '27', color: 'YW', },
        { image: 'img/classified/0084.jpg', iata: '10', color: 'YW', },
        { image: 'img/classified/0085.jpg', iata: '10', color: 'WT', },
        { image: 'img/classified/0086.jpg', iata: '22', color: 'BL', },
        { image: 'img/classified/0087.jpg', iata: '22R', color: 'BN', },
        { image: 'img/classified/0088.jpg', iata: '22R', color: 'PU', },
        { image: 'img/classified/0089.jpg', iata: '29', color: 'PU', },
        { image: 'img/classified/0090.jpg', iata: '22R', color: 'GN', },
        { image: 'img/classified/0091.jpg', iata: '27', color: 'YW', },
        { image: 'img/classified/0092.jpg', iata: '22D', color: 'BL', },
        { image: 'img/classified/0093.jpg', iata: '22', color: 'PU', },
        { image: 'img/classified/0094.jpg', iata: '22R', color: 'GY', },
        { image: 'img/classified/0095.jpg', iata: '22', color: 'BL', },
        { image: 'img/classified/0096.jpg', iata: '22R', color: 'GY', },
        { image: 'img/classified/0097.jpg', iata: '22D', color: 'BL', },
        { image: 'img/classified/0098.jpg', iata: '22R', color: 'PU', },
        { image: 'img/classified/0099.jpg', iata: '22R', color: 'PU', },
        { image: 'img/classified/0100.jpg', iata: '22R', color: 'GY', },
    ];
    return classified[Math.floor(Math.random() * classified.length)];
}

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

function getRandomBagIATA() {
    let n = Math.floor(Math.random(21)) + 1;
    return getIATABagCode(n);
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

function createBagElement(options) {
    options = options || {};
    return $.create({
        tag: 'div', class: 'bag', content: [
            { tag: 'img', class: 'image', src: options.image || getRandomBagImage() },
            { class: 'color', content: options.color || getRandomBagColor() },
            { class: 'iata', content: getIATABagCodeName(options.iata || getRandomBagIATA()) }
        ]
    });
}
