import express from 'express';

import { createTip, getAllTips, deleteTip, updateTip } from './tipController.js';
import * as validators from "./tipValidator.js";
import { validation } from "../../middleware/validation.js";
const router = express.Router();

router.post('/addNewTip', validation(validators.tipSchema), createTip);
router.get('/getAllTips', getAllTips);
router.delete('/deleteTip:id', deleteTip);
router.put('/updateTip:id', updateTip);

export default router;