const fs = require('fs');

fs.readFile('cadet-list.txt', 'utf8', function (err, data) {
    if (err) throw err;

    // create array where each element corresponds to a line of text
    let cadetList = data.split('\n').filter(cadet => cadet !== "");

    // read pairs-list.txt
    fs.readFile('pairs-list.txt', 'utf8', function (err, pairsData) {
        if (err) throw err;

        // create array where each element corresponds to a line of text in pairs-list.txt
        let previousPairs = pairsData.split('\n');

        // iterate through cadetList to create pairs
        let newPairs = createPairs(cadetList, previousPairs);

        // write pairs to pairs-list.txt file
        let newData = newPairs.map(pair => pair.join(',')).join('\n');

        console.dir(newPairs);

        if (cadetList.length % 2 === 0) {
            console.log('cadet-list is pair');

            if ((newPairs.length * 2) !== cadetList.length) {
                console.log('this is newPairs length times 2', (newPairs.length * 2))
                console.log('this is newPairs length', (newPairs.length))
                console.log('this is cadetList length', cadetList.length)
                console.log("Possible pairs exhausted.... ")
                return;
            }

        }

        /*         if (newPairs.length * 4 + 1 !== cadetList.length) {
                    console.log('this is newPairs length', newPairs.length)
                    console.log('this is cadetList length', cadetList.length)
                    console.log("Possible pairs exhausted.... ")
                    return;
                } */

        fs.appendFile('pairs-list.txt', '\n' + newData + '\n', 'utf8', function (err) {

            if (err) throw err;

            console.log('The file has been saved!');
        });
    });
});

function shuffleCadetList(cadetList) {
    for (let i = cadetList.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [cadetList[i], cadetList[j]] = [cadetList[j], cadetList[i]];
    }

    return cadetList;
}

function createPairs(cadetList, previousPairs) {

    let usedElements = [];
    let newPairs = [];
    let shuffledCadets = shuffleCadetList(cadetList);

    //console.log(shuffledCadets);

    for (let i = 0; i < shuffledCadets.length; i++) {
        console.log('this is shuffled cadets',shuffledCadets);


        for (let j = i + 1; j < shuffledCadets.length; j++) {
            console.log(shuffledCadets[i], 'first cadet of pair')
            console.log(shuffledCadets[i], 'first cadet of pair')

            if (!usedElements.includes(shuffledCadets[i]) && !usedElements.includes(shuffledCadets[j])) {

                let newPair = `${shuffledCadets[i]},${shuffledCadets[j]}`;
                let newPair2 = `${shuffledCadets[j]},${shuffledCadets[i]}`;

                if (!previousPairs.includes(newPair) && !previousPairs.includes(newPair2)) {

                    newPairs.push([shuffledCadets[i], shuffledCadets[j]]);

                    usedElements.push(shuffledCadets[i]);
                    usedElements.push(shuffledCadets[j]);
                    break;
                }

                continue;


            }
        }
    }

    return newPairs;

}

