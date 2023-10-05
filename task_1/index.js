import {encoded, translations} from './data.js'

console.log("Let's rock")
console.log(encoded, translations)

function decodeFields(encoded, translations) {
    const decodedList = encoded.map(item => {
        const decodedItem = {};
        for (const [key, value] of Object.entries(item)) {
            if (key.endsWith('Id') && key !== 'groupId' && key !== 'service' && key !== 'formatSize' && key !== 'ca') {
                decodedItem[key] = translations[value] || value;
            } else {
                decodedItem[key] = value;
            }
        }
        return decodedItem;
    });

    const uniqueIds = [...new Set(encoded.map(item => item.groupId))];

    return { decodedList, uniqueIds };
}

const { decodedList, uniqueIds } = decodeFields(encoded, translations);
console.log('Decoded')
console.log(decodedList);
console.log(uniqueIds);