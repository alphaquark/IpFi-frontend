// import ERC20ABI from '../abi/ERC20.abi.json';
import ChefABI from '../abi/Chef.abi.json';
import TokenABI from '../abi/Token.abi.json';
import UniSwapABI from '../abi/Uniswap.abi.json';
import BigNumber from 'bignumber.js';

export const Networks = {
    MainNet: 1,
    Ropsten: 3,
    Rinkeby: 4,
    Goerli: 5,
    Kovan: 42,
};

export const POOL_ICON = {
    usdc: require('../assets/1.png'),
    usdt: require('../assets/2.png'),
    eth: require('../assets/3.png'),
    aqt: require('../assets/4.png'),
    dai: require('../assets/5.png'),
};

export const POOL_LIST = [
    { id: 0, name: 'pool0', pool: 'eth/usdt', disabled: true },
    { id: 1, name: 'pool1', pool: 'eth/usdc', disabled: true },
    { id: 2, name: 'pool2', pool: 'aqt/eth', disabled: true, inVisible: true },
    { id: 3, name: 'pool3', pool: 'usdt/usdc', disabled: true, inVisible: true },
];

export const TOKENS_BY_NETWORK = {
    [Networks.Goerli]: {
        chef: {
            address: '0x79d754343434E940C1c97D7de5E13EA5DB56966C',
            name: 'Chef',
            abi: ChefABI,
        },
        token: {
            address: '0x184810c1F499B458DF6F1E8BbAb2979F4879Accc',
            name: 'Token',
            abi: TokenABI,
        },
        uni1: {
            id: -1,
            address: '0x8A1607DfF1d41B787BA9E65540921277B5880Ee7',
            name: 'eth/usdt',
            base: 'eth',
            target: 'usdt',
            uniswapUrl: '',
            abi: UniSwapABI,
        },
        uni2: {
            // 0x871bF2f9b02efc1eF5d57AcB51429C20e1BCedAD,
            id: -2,
            address: '0x2b30818f8f1c788583AE9cF3FA8dd3eE77603322',
            name: 'aqt/eth',
            base: 'aqt',
            target: 'eth',
            uniswapUrl: '',
            abi: UniSwapABI,
        },

        pool0: {
            id: 0,
            address: '0x0e04025C5122f3FCfA9a224870516cfc77e4d8eb',
            name: 'eth/usdt',
            base: 'eth',
            target: 'usdt',
            mul: 1,
            uniswapUrl: '',
            abi: UniSwapABI,
        },
        pool1: {
            id: 1,
            address: '0x8A1607DfF1d41B787BA9E65540921277B5880Ee7',
            name: 'eth/usdc',
            base: 'eth',
            target: 'usdc',
            mul: 1,
            uniswapUrl: '',
            abi: UniSwapABI,
        },
        pool2: {
            id: 2,
            address: '0x2b30818f8f1c788583AE9cF3FA8dd3eE77603322',
            name: 'aqt/eth',
            base: 'aqt',
            target: 'eth',
            mul: 1,
            uniswapUrl: '',
            abi: UniSwapABI,
        },
        pool3: {
            id: 3,
            address: '0x2b30818f8f1c788583AE9cF3FA8dd3eE77603322',
            name: 'aqt/eth',
            base: 'aqt',
            target: 'eth',
            mul: 1,
            uniswapUrl: '',
            abi: UniSwapABI,
        },
    },

    [Networks.MainNet]: {
        chef: {
            address: '0x809a6ca6BF615Dd8A64d921607eceC899172a4B3',
            name: 'Chef',
            abi: ChefABI,
        },
        token: {
            address: '0x8E6469c328d33956FE921Efd4179c604ad79d3C4',
            name: 'Token',
            abi: TokenABI,
        },
        uni1: {
            id: -1,
            address: '0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852',
            name: 'eth/usdt',
            base: 'eth',
            target: 'usdt',
            uniswapUrl:
                'https://app.uniswap.org/#/add/0xdAC17F958D2ee523a2206206994597C13D831ec7/ETH',
            abi: UniSwapABI,
        },
        uni2: {
            // 0x871bF2f9b02efc1eF5d57AcB51429C20e1BCedAD,
            id: -2,
            address: '0x871bF2f9b02efc1eF5d57AcB51429C20e1BCedAD',
            name: 'aqt/eth',
            base: 'aqt',
            target: 'eth',
            uniswapUrl: '',
            abi: UniSwapABI,
        },

        pool0: {
            id: 0,
            address: '0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852',
            name: 'eth/usdt',
            base: 'eth',
            target: 'usdt',
            mul: 1,
            uniswapUrl:
                'https://app.uniswap.org/#/add/0xdAC17F958D2ee523a2206206994597C13D831ec7/ETH',
            abi: UniSwapABI,
        },
        pool1: {
            id: 1,
            address: '0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc',
            name: 'eth/usdc',
            base: 'eth',
            target: 'usdc',
            mul: 1,
            uniswapUrl:
                'https://app.uniswap.org/#/add/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/ETH',
            abi: UniSwapABI,
        },

        pool2: {
            id: 2,
            address: '0x8e19172fD1D1Cbf2Bad64b738FC3806789D6597C',
            name: 'aqt/eth',
            base: 'aqt',
            target: 'eth',
            mul: 1,
            uniswapUrl: '',
            abi: UniSwapABI,
        },
        pool3: {
            id: 3,
            address: '0x3041CbD36888bECc7bbCBc0045E3B1f144466f5f',
            name: 'usdc/usdt',
            base: 'usdc',
            target: 'usdt',
            mul: 4,
            uniswapUrl:
                'https://app.uniswap.org/#/add/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/0xdAC17F958D2ee523a2206206994597C13D831ec7',
            abi: UniSwapABI,
        },
    },
};

export const getBalanceNumber = (balance, decimals = 18) => {
    const displayBalance = balance.dividedBy(new BigNumber(10).pow(decimals));
    return displayBalance.toNumber();
};

export const getDisplayBalance = (balance, decimals = 18) => {
    const displayBalance = balance.dividedBy(new BigNumber(10).pow(decimals));
    if (displayBalance.lt(1)) {
        return displayBalance.toPrecision(4);
    } else {
        return displayBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
};

export const getFullDisplayBalance = (balance, decimals = 18) => {
    return balance.dividedBy(new BigNumber(10).pow(decimals)).toFixed();
};

export const shorter = (str) => (str?.length > 8 ? str.slice(0, 6) + '...' + str.slice(-4) : str);

export const toFixedSpecial = (t, n) => {
    let str = t.toFixed(n);
    if (str.indexOf('e+') === -1) return str;

    str = str
        .replace('.', '')
        .split('e+')
        .reduce(function (p, b) {
            return p + Array(b - p.length + 2).join(0);
        });

    if (n > 0) str += '.' + Array(n + 1).join(0);

    return str;
};

export const numberWithCommas = (x) => {
    var values = x.toString().split('.');
    return (
        values[0].replace(/.(?=(?:.{3})+$)/g, '$&,') + (values.length === 2 ? '.' + values[1] : '')
    );
};
