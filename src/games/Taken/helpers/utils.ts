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

export const getField = (n: number): Array<TileModel> => {
    const aboba = randomSubarray(range(n * n - 1));
    return [...aboba.map((e, i) => {
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
