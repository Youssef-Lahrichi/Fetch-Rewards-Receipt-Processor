import z from 'zod'
import { Receipt } from './types';

const castToNumber = z.preprocess((val) => Number(val), z.number());

const itemSchema = z.object({
    shortDescription: z.string(),
    price: castToNumber
})

const receiptSchema = z.object({
    retailer: z.string(),
    purchaseDate: z.coerce.date(),
    purchaseTime: z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/),
    items: z.array(itemSchema),
    total: castToNumber
})

export const toReceipt = (object: unknown): Receipt => receiptSchema.parse(object)