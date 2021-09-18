import { getField } from './utils';

/**
 * Generate a level of a given size
 * @param {Number} size The total size of the level, must be a perfect square
 * @returns {Object} TileSet object representing the level
 */

const gameFactory = (size: number) => {

    if (size < 3 || size > 10) {
        throw new Error(`Cannot generate level of size: <${size}>`);
    }

    return getField(size);
};

export { gameFactory }