import express from 'express';
import z from 'zod';
import receiptsService from '../services/receiptsService';
import { ReceiptEntry } from '../types';
import { Request, Response } from 'express';
import { toReceipt } from '../utils';

interface IParam {
    id: string
}

const router = express.Router();

router.get('/:id/points', (req: Request<IParam>, res: Response<ReceiptEntry>) => {
    const { id } = req.params;
    res.json(receiptsService.getReceiptEntry(id));
});

router.post('/process', (_req, res) => {
  try {
    res.json(receiptsService.addReceipt(toReceipt(_req.body)));
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(500).send({ error: 'unknown error' });
    }
  }
});

export default router;