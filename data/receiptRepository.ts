import { v4 as uuidv4 } from 'uuid';
import { ReceiptEntry } from "../types";

const receiptEntries: { [id: string]: ReceiptEntry; } = {}

const addReceiptEntry = (entry: ReceiptEntry): string => {
    const id = uuidv4()
    receiptEntries[id] = entry
    return id
}

const getReceiptEntry = (id: string): ReceiptEntry => {
    return receiptEntries[id]
}


export default {
    addReceiptEntry,
    getReceiptEntry
}