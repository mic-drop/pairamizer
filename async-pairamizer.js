const fs = require('fs');

function makePairs() {

    //read cadet-list file and create array where each element is a cadet name
    const cadetList = fs.readFileSync('cadet-list.txt', 'utf8').split('\n').filter(cadet => cadet !== '');

    console.log('this is cadetList', cadetList);


    //read cadet-list file of made pairs and create array where each element is a pair of previous names
    const madePairs = fs.readFileSync('pairs-list.txt', 'utf8').split('\n').filter(pair => pair !== '');

    console.log('this is pairs-list BEFORE', madePairs);

    if (cadetList.length % 2 !== 0) {
        cadetList.push('ODD ONE OUT')
    }

    //create brand new pairs
    const newPairs = createPairs(cadetList, madePairs);

    console.log('this is new pairs', newPairs);

    if (newPairs.length === 0) {
        console.log('Possible pairs exhausted');
        return;
    }
    //create new string of new pairs
    const newPairsString = newPairs.map(pair => pair.join(',')).join('\n');

    //If this prints, something went wrong
    if (newPairs.length != cadetList.length / 2) {

        console.log("Something shitty happened...")
        return;
    }

    //append string pairs to pairs-list file
    fs.appendFileSync('pairs-list.txt', '\n' + newPairsString + '\n', 'utf8');

    //read pairs-list file and create array where each element is a pair
    const madePairsAfter = fs.readFileSync('pairs-list.txt', 'utf8').split('\n').filter(pair => pair !== '');

    console.log('this is pairs-list AFTER', madePairsAfter);




}

makePairs();

function createPairs(cadetList, previousPairs) {

    let usedElements = [];
    let newPairs = [];
    let shuffledCadets = shuffleCadetList(cadetList);

    console.log('This is cadet list after shuffle', shuffledCadets);

    for (let i = 0; i < shuffledCadets.length; i++) {
        console.log('making pair for ' + shuffledCadets[i]);

        if (usedElements.includes(shuffledCadets[i])) {
            console.log(shuffledCadets[i] + " was already used");
            console.log('Skipping to next cadet.....');
            continue;
        }

        for (let j = i + 1; j < shuffledCadets.length; j++) {
            console.log('Trying to pair ' + shuffledCadets[i] + ' with ' + shuffledCadets[j]);

            if (usedElements.includes(shuffledCadets[j])) {
                console.log(shuffledCadets[j] + " was already used");
                console.log('Skipping to next cadet.....');
                continue;

            }

            if (!usedElements.includes(shuffledCadets[i]) && !usedElements.includes(shuffledCadets[j])) {

                let newPair = `${shuffledCadets[i]},${shuffledCadets[j]}`;
                let newPair2 = `${shuffledCadets[j]},${shuffledCadets[i]}`;

                if (!previousPairs.includes(newPair) && !previousPairs.includes(newPair2)) {

                    newPairs.push([shuffledCadets[i], shuffledCadets[j]]);

                    usedElements.push(shuffledCadets[i]);
                    usedElements.push(shuffledCadets[j]);
                    console.log('paired ' + shuffledCadets[i] + ' with ' + shuffledCadets[j]);
                    break;
                }

                console.log('Pair ' + shuffledCadets[i] + ' && ' + shuffledCadets[j] + ' already exists');

                continue;
            }
        }
    }

    return newPairs;

}

function shuffleCadetList(cadetList) {
    for (let i = cadetList.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [cadetList[i], cadetList[j]] = [cadetList[j], cadetList[i]];
    }

    return cadetList;
}
