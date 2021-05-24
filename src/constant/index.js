export const PER_BLOCK = 1000;
export const ANNUAL_BLOCK = (365 * 86400) / 13; // approximation of 13 sec/block
export const TOTAL_POOL_WEIGHT = 14; // sum of weight
export const ANNUAL_REWARD = ANNUAL_BLOCK * PER_BLOCK;
export const PER_POOL_UNIT = ANNUAL_REWARD / TOTAL_POOL_WEIGHT;
