import { useLocation, useParams } from "react-router";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";


// ✅ Load Stripe instance outside the component
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Key);

// ✅ Custom Checkout Form (inline)
const CheckoutForm = ({ slotId, selectedPackage }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    try {
      // 1. Create payment intent on server
      const res = await axios.post("http://localhost:3000/create-payment-intent", {
        slotId,
        package: selectedPackage,
      });

      const { clientSecret } = res.data;

      // 2. Confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          setSucceeded(true);
        }
      }
    } catch (err) {
      console.error(err);
      setError("Payment failed");
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-6">
      <CardElement className="p-4 border rounded" />
      {error && <p className="text-red-500">{error}</p>}
      {succeeded ? (
        <p className="text-green-600 font-bold">Payment succeeded!</p>
      ) : (
        <button
          type="submit"
          disabled={!stripe || processing}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          {processing ? "Processing..." : "Pay Now"}
        </button>
      )}
    </form>
  );
};

// ✅ Main Payment Page
const PaymentPage = () => {
  const { slotId } = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const selectedPackage = query.get("package");

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-3xl font-semibold mb-4 text-center">Complete Your Payment</h2>
      <p className="text-center mb-6">Slot ID: <strong>{slotId}</strong></p>
      <p className="text-center mb-6">Selected Package: <strong>{selectedPackage}</strong></p>

      <Elements stripe={stripePromise}>
        <CheckoutForm slotId={slotId} selectedPackage={selectedPackage} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
