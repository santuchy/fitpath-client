import { useLocation, useParams } from "react-router";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from './../../../context/AuthContext';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Key);


// ✅ CheckoutForm Component
const CheckoutForm = ({ slot, trainer, selectedPackage, user }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const amountMap = {
    basic: 1000,
    standard: 5000,
    premium: 10000,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    try {
      const res = await axios.post("http://localhost:3000/create-payment-intent", {
        slotId: slot._id,
        package: selectedPackage,
      });

      const { clientSecret } = res.data;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setSucceeded(true);

        // ✅ Save payment info to DB
        const paymentInfo = {
          slotId: slot._id,
          className: slot.className,
          slotName: slot.slotName,
          package: selectedPackage,
          price: amountMap[selectedPackage],
          trainerName: trainer.name,
          trainerEmail: trainer.email,
          userName: user.displayName,
          userEmail: user.email,
          date: new Date().toISOString(),
        };

        await axios.post("http://localhost:3000/payments", paymentInfo);
      }
    } catch (err) {
      console.error(err);
      setError("Payment failed");
    }
    setProcessing(false);
  };

  return (
    <>
      <div className="bg-gray-100 rounded p-4 mb-6">
        <h3 className="text-xl font-semibold mb-2">Payment Summary</h3>
        <p><strong>Trainer Name:</strong> {trainer.name}</p>
        <p><strong>Slot Name:</strong> {slot.slotName} ({slot.slotTime})</p>
        <p><strong>Class:</strong> {slot.className}</p>
        <p><strong>Package:</strong> {selectedPackage}</p>
        <p><strong>Price:</strong> ${amountMap[selectedPackage] / 100}</p>
        <p><strong>Your Name:</strong> {user.displayName}</p>
        <p><strong>Your Email:</strong> {user.email}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <CardElement className="p-4 border rounded bg-white" />
        {error && <p className="text-red-500">{error}</p>}
        {succeeded ? (
          <p className="text-green-600 font-bold mt-4">✅ Payment succeeded!</p>
        ) : (
          <button
            type="submit"
            disabled={!stripe || processing}
            className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {processing ? "Processing..." : "Pay Now"}
          </button>
        )}
      </form>
    </>
  );
};

// ✅ Main PaymentPage Component
const PaymentPage = () => {
  const { slotId } = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const selectedPackage = query.get("package");
  const { user } = useContext(AuthContext);

  const [slot, setSlot] = useState(null);
  const [trainer, setTrainer] = useState(null);

  useEffect(() => {
    // Fetch slot and trainer
    axios.get(`http://localhost:3000/slots/${slotId}`).then((res) => {
      setSlot(res.data);
      return axios.get(`http://localhost:3000/trainers/${res.data.trainerEmail}`);
    }).then((res) => setTrainer(res.data));
  }, [slotId]);

  if (!slot || !trainer || !user) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h2 className="text-3xl font-semibold text-center mb-6">Complete Your Payment</h2>

      <Elements stripe={stripePromise}>
        <CheckoutForm
          slot={slot}
          trainer={trainer}
          selectedPackage={selectedPackage}
          user={user}
        />
      </Elements>
    </div>
  );
};

export default PaymentPage;
