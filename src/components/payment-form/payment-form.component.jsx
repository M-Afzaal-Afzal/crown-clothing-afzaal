import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FormContainer, PaymentButton, PaymentFormContainer } from "./payment-form.styles";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

export const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const user = useSelector(selectCurrentUser);

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e) => {
    e.preventDefault();

    console.log("payment handler called");

    if (!stripe || !elements) return;

    setIsProcessingPayment(true);

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ amount })
    }).then((res) => res.json());

    const {
      paymentIntent: { client_secret }
    } = response;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user ? user.displayName : "Guest"
        }
      }
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error);
    } else if (paymentResult.paymentIntent.status === "succeeded") {
      alert("Payment successful");
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment</h2>
        <CardElement />
        <PaymentButton isLoading={isProcessingPayment} type={"submit"} buttonType={"inverted"}>
          Pay now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};
