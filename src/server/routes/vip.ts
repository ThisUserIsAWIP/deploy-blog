import * as express from 'express';
import Stripe from 'stripe';
import config from '../config';
import db from '../db';
import { tokenCheck } from '../middlewares/auth.mw';
let router = express.Router()

const stripe = new Stripe(config.stripe.secret, { apiVersion: '2020-08-27' });

router.post('/', tokenCheck, async (req, res) => {
const paymentMethod = req.body.paymentMethod;
const amount = req.body.amount;
     try {
        const paymentFulfilled = await stripe.paymentIntents.create({
            currency: 'usd',
            amount: Number(amount) * 100,
            payment_method: paymentMethod.id,
            confirm: true
        });
        res.json(paymentFulfilled);
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'server error, check the logs' })
    }
});

export default router;