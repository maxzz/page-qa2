// Brand

export enum TBrand {
    dp = 'dp',
    hp = 'hp',
    de = 'de',
}

export const convTBrand2Name = (v?: TBrand): string =>
    v === TBrand.dp
        ? 'DP'
        : v === TBrand.hp
            ? 'HP'
            : v === TBrand.de
                ? 'Dell'
                : '?';
