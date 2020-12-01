import React, { FormEvent } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { PaymentMethod } from "@stripe/stripe-js";
import PaymentAPI from '../api/payment';
import { CartItems, PaymentConfirmation } from '../models/payment';
import { useTranslation } from 'react-i18next';

interface StripeFormProps {
  onSubmit: () => void,
  onSuccess: (paymentMethod: PaymentMethod) => void,
  onError: (message: string) => void,
  className?: string,
  processPayment?: boolean,
  cartItems?: CartItems
}

/**
 * A form component to collect the credit card details and to create the payment method on Stripe.
 * The form validation button must be created elsewhere, using the attribute form="stripe-form".
 */
export const StripeForm: React.FC<StripeFormProps> = ({ onSubmit, onSuccess, onError, children, className, processPayment , cartItems}) => {

  const { t } = useTranslation('shared');

  const stripe = useStripe();
  const elements = useElements();

  /**
   * Handle the submission of the form. Depending on the configuration, it will create the payment method on Stripe,
   * or it will process a payment with the inputted card.
   */
  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    onSubmit();

    // Stripe.js has not loaded yet
    if (!stripe || !elements) { return; }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      onError(error.message);
    } else {
      if (processPayment) {
        // process the full payment pipeline, including SCA validation
        const res = await PaymentAPI.confirm(paymentMethod.id, cartItems);
        await handleServerConfirmation(res, paymentMethod);
      } else {
        // we don't want to process the payment, only return the payment method
        onSuccess(paymentMethod);
      }
    }
  }

  /**
   * Process the server response about the Strong-customer authentication (SCA)
   */
  const handleServerConfirmation = async (response: PaymentConfirmation, paymentMethod: PaymentMethod) => {
    if (response.error) {
      if (response.error.statusText) {
        onError(response.error.statusText);
      } else {
        onError(`${t('app.shared.messages.payment_card_error')} ${response.error}`);
      }
    } else if (response.requires_action) {
      // Use Stripe.js to handle required card action
      const result = await stripe.handleCardAction(response.payment_intent_client_secret);
      if (result.error) {
        onError(result.error.message);
      } else {
        // The card action has been handled
        // The PaymentIntent can be confirmed again on the server
        try {
          const confirmation = await PaymentAPI.confirm(result.paymentIntent.id, cartItems);
          await handleServerConfirmation(confirmation, paymentMethod);
        } catch (e) {
          onError(e);
        }
      }
    } else {
      onSuccess(paymentMethod);
    }
  }


  /**
   * Options for the Stripe's card input
   */
  const cardOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': { color: '#aab7c4' }
      },
      invalid: {
        color: '#9e2146',
        iconColor: '#9e2146'
      },
    },
    hidePostalCode: true
  };

  return (
    <form onSubmit={handleSubmit} id="stripe-form" className={className}>
      <CardElement options={cardOptions} />
      {children}
    </form>
  );
}
