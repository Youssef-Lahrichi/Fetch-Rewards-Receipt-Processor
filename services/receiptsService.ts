import receiptRepository from '../data/receiptRepository';
import { ReceiptEntry, Receipt, IdEntry } from '../types';

const getReceiptEntry = (id: string): ReceiptEntry => {
  return receiptRepository.getReceiptEntry(id);
};

const addReceipt = (receipt: Receipt) => {
    const entry = {"points": 0} as ReceiptEntry;

    for (const character of receipt.retailer) {
        if (character.match(/^[0-9a-zA-Z]+$/)) {
            entry.points += 1;
        }
    }

    for (const item of receipt.items) {
        if (item.shortDescription.trim().length % 3 === 0) {
            entry.points += Math.ceil(item.price * 0.2);
        }
    }

    const totalInCents = receipt.total * 100;
    if (totalInCents % 100 === 0) entry.points += 50;
    if (totalInCents % 25 === 0) entry.points += 25;

    if (receipt.purchaseDate.getDay() % 2 === 1) entry.points += 6;

    if (isBetweenTwoAndFourPM(receipt.purchaseTime)) entry.points += 10;

    if (receipt.items.length > 0) entry.points += Math.floor(receipt.items.length / 2) * 5;
    

    // const purchaseDate = new Date(receipt.purchaseDate)

    
    return {"id": receiptRepository.addReceiptEntry(entry)} as IdEntry;
};


const isBetweenTwoAndFourPM = (time: string): boolean => {
    const [hours, minutes] = time.split(":").map((value) => parseInt(value, 10));

    const totalMinutes = hours * 60 + minutes;

    const twoPM = 14 * 60; // 14:00
    const fourPM = 16 * 60; // 16:00

    return totalMinutes > twoPM && totalMinutes < fourPM;
};




export default {
  getReceiptEntry,
  addReceipt
};