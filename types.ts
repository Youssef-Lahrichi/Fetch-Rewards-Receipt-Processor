export interface Item {
    shortDescription: string;
    price: number;
}

export interface Receipt {
    retailer: string;
    purchaseDate: Date;
    purchaseTime: string;
    items: Item[];
    total: number;
}

export interface IdEntry {
    id: string;
}

export interface ReceiptEntry {
    points: number;
}