import * as React from 'react';
import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { apiService } from './utils/apiService';
const Vip = (props: VipProps) => {
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                name: name,
            }
        })
        if (error) {
            console.log('error: ', error);
        } else {
            console.log('paymentMethod: ', paymentMethod)

            // const vipSubmit = {amount, paymentMethod}

            const fulfilled = await apiService('/api/vip', 'POST', {
                amount: amount,
                paymentMethod: paymentMethod
            });

            

            console.log(fulfilled);
        }
    }

    return (
        <>
            <main className="container">
                <section className="row mt-5 justify-content-center">
                    <div className="col-md-6">
                        <form className="form-group p-3 border rounded-lg">
                            <input className="form-control" value={name} onChange={e => setName(e.target.value)}/>
                            <input className="form-control" value={amount} onChange={e => setAmount(e.target.value)}/>
                            <CardElement className="form-control"/>
                            <button onClick={handleSubmit} className="btn btn-primary">Support the platform</button>
                        </form>
                    </div>
                </section>
            </main>
        </>
    );
};

interface VipProps {}

export default Vip;