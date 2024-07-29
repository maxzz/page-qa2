// Brand

export enum Brand {
    dp = 'dp',
    hp = 'hp',
    de = 'de',
}

export const convBrand2Name = (v?: Brand): string =>
    v === Brand.dp
        ? 'HID'
        : v === Brand.hp
            ? 'HP'
            : v === Brand.de
                ? 'Dell'
                : '?';
