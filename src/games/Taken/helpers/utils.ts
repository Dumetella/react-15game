import TileModel from '../model/TileModel';

/** 
 * Return an Array containing all numbers such that 0 = n <= length in
 * ascending order.
 * @param {Number} length Number of items in the resulting Array
 * @returns {Array} Array of numbers
 */
export const range = (length: number): Array<number> => {
    const res = [];
    for (let i = 1; i <= length; i++) {
        res.push(i);
    }
    return res;
};

/**
 * Get a shuffled array from an original array based on Durstenfeld shuffle algorithm.
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 * @param {Array} arr Input Array
 * @returns {Array} Resulting shuffle
 */

export const randomSubarray = (arr: Array<number>): Array<number> => {
    const shuffle = arr.slice();
    for (let i = shuffle.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffle[i], shuffle[j]] = [shuffle[j], shuffle[i]];
    }
    return shuffle.slice();
};

/**
 * 
 * Counting the total number of inversions in an array
 * @param {Array} shuffle Input Array of shuffled numbers
 * @returns {Number} Number of inversions in array
 */

const inversionCounter = (shuffle: Array<number>) => {
    let inversion_counter = 0;
    for (let i = 0; i < shuffle.length - 1; i++) {
        for (let j = i + 1; j < shuffle.length; j++) {
            if (shuffle[j] && shuffle[i] && shuffle[i] > shuffle[j]) {
                inversion_counter++;
            }
        }
    }
    return inversion_counter;
};

/**
 * Get a shuffled array from an original array based on Durstenfeld shuffle algorithm.
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 * @param {Number} n the length of the side of the playing field 
 * @returns {Array} Resulting array of tiles.
 */

export const getField = (n: number): Array<TileModel> => {

    const field = randomSubarray(range(n * n - 1));
    //Reduce the number of inversions by one so that the puzzle can be solved
    if (inversionCounter(field) % 2 !== 0) {
        const tile1 = field.indexOf(1);
        const tile2 = field.indexOf(2);
        [field[tile1], field[tile2]] = [field[tile2], field[tile1]];
    }
    console.log(inversionCounter(field));
    return [...field.map((e, i) => {
        return {
            x: i % n,
            y: Math.floor(i / n),
            value: e,
        };
    }), {
        x: n - 1,
        y: n - 1,
        value: -1,
    }];

};


