$('#dead-simple-search-submit').addEventListener('click', async () => {
    let text = $('#dead-simple-search').value;
    let data = { text };
    // let result = fetch('https://dummy.dummy.dummy/dead-simple-search', {
    //     method: 'POST',
    //     body: JSON.stringify(data),
    //     headers: { 'Content-Type': 'application/json' }
    // });
    // let response = await result.json();
    // // response = [ tag, image, color, type ]
    // Random, placeholder way
    let response = [];
    for (let i = 0; i < 5; ++i) {
        let tag = getRandomBagTag();
        let image = getRandomBagImage();
        let color = getRandomBagColor();
        let type = getRandomBagType();
        response.push({ tag, image, color, type });
    }
    $.clearChildren($('#search-list'));
    for (let bag of response) {
        let element = createRandomBagElement(bag);
        $('#search-list').appendChild(element);
    }

})

for (let i = 0; i < 12; ++i) {
    let bagElement = createRandomBagElement({ color: 'Red' });

    $('#search-list').appendChild(bagElement);
}