const customLanguageMap = {
    en: {
        'header.navbar.menu.protocols': 'Protocols',
        'header.navbar.menu.close': 'Close',

        'footer.navbar.termofuse': 'terms of use',
        'footer.navbar.privacypolicy': 'privacy policy',
        'footer.navbar.DeFicontract': 'DeFi contract',
        'footer.navbar.contractaudit': 'Contract audit',

        'protocolScreen.header.userBalance': 'User Balance',
        'protocolScreen.header.tokenPrice': 'Token Price',
        'protocolScreen.header.totalSupply': ' Total Supply',
        'protocolScreen.header.buyInUniswap': 'Buy in uniswap',
        'protocolScreen.header.nextHalvingBlock': 'Next Halving block',
        'protocolScreen.header.nextHalvingTime': 'Next Halving time',

        'protocolScreen.controller.getLpToken': 'Get lp token',
        'protocolScreen.controller.wallet': 'Wallet',
        'protocolScreen.controller.stake': 'Stake',
        'protocolScreen.controller.approvalSpend': 'Approval spend',
        'protocolScreen.controller.locked': 'Locked',
    },
    jp: {
        'header.navbar.menu.protocols': 'プロトコル',
        'header.navbar.menu.close': 'Close',

        'footer.navbar.termofuse': '利用規約',
        'footer.navbar.privacypolicy': '個人情報保護方針',
        'footer.navbar.DeFicontract': 'ロジック契約',
        'footer.navbar.contractaudit': '契約の監査',

        'protocolScreen.header.userBalance': 'ユーザーバランス',
        'protocolScreen.header.tokenPrice': 'トークン価格',
        'protocolScreen.header.totalSupply': '総供給',
        'protocolScreen.header.buyInUniswap': 'ユニスワップで購入',
        'protocolScreen.header.nextHalvingBlock': '次の半分ブロック',
        'protocolScreen.header.nextHalvingTime': '次の半分の時間',

        'protocolScreen.controller.getLpToken': 'LPトークン獲得',
        'protocolScreen.controller.wallet': 'Wallet',
        'protocolScreen.controller.stake': 'Stake',
        'protocolScreen.controller.approvalSpend': '承認費用',
        'protocolScreen.controller.locked': 'ロック済み',
    },

    cn: {
        'header.navbar.menu.protocols': '协议',
        'header.navbar.menu.close': 'Close',

        'footer.navbar.termofuse': '使用条款',
        'footer.navbar.privacypolicy': '隐私政策',
        'footer.navbar.DeFicontract': 'DeFi合约',
        'footer.navbar.contractaudit': '合约审计',

        'protocolScreen.header.userBalance': '用户余额',
        'protocolScreen.header.tokenPrice': '代币价格',
        'protocolScreen.header.totalSupply': '发行总量',
        'protocolScreen.header.buyInUniswap': '在Uniswap上购买',
        'protocolScreen.header.nextHalvingBlock': '下一个减半区块',
        'protocolScreen.header.nextHalvingTime': '下次减半时间',

        'protocolScreen.controller.getLpToken': '获取LP代币',
        'protocolScreen.controller.wallet': 'Wallet',
        'protocolScreen.controller.stake': 'Stake',
        'protocolScreen.controller.approvalSpend': '批准支出',
        'protocolScreen.controller.locked': '未解锁',
    },
};

export const languageMap = {
    default: customLanguageMap.en,
    ...customLanguageMap,
};
