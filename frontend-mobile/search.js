$('#search-submit').addEventListener('click', async () => {
    let iata = $('#iata-code').value;
    let result = await fetch('https://427sweywdc.execute-api.us-east-2.amazonaws.com/test/dead-simple-search', {
        method: 'POST',
        body: JSON.stringify({
            aiType: getAIBagCode(iata)
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    let response = await result.json();
    response = response.results.map(bag => {
        bag.iata = getIATABagCode(bag.type);
        return bag;
    });
    console.log('repsonse', response);
    // let result = fetch('https://example.tld/dead-simple-search', {
    //     method: 'POST',
    //     body: JSON.stringify(data),
    //     headers: { 'Content-Type': 'application/json' }
    // });
    // let response = await result.json();
    // // response = [ tag, image, color, type ]
    // Random, placeholder way
    // let response = [];
    // for (let i = 0; i < 20; ++i) {
    //     // let image = getRandomBagImage();
    //     // let color = getRandomBagColor();
    //     // let type = iata;
    //     // response.push({ tag, image, color, iata: type });
    //     let bag = getRandomClassifiedBag();
    //     console.log(bag, bag.iata, iata);
    //     if (bag.iata == iata) {
    //         response.push(bag);
    //     }
    // }
    console.log('response', response);
    $.clearChildren($('#search-list'));
    for (let bag of response) {
        let element = createBagElement(bag);
        $('#search-list').appendChild(element);
    }

});