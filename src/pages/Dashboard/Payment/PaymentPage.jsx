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
      <div className="bg-gray-50 rounded-lg p-6 mb-8 shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-center">Payment Summary</h3>
        <div className="text-gray-700">
          <p><strong>Trainer:</strong> {trainer.name}</p>
          <p><strong>Slot:</strong> {slot.slotName} ({slot.slotTime})</p>
          <p><strong>Class:</strong> {slot.className}</p>
          <p><strong>Package:</strong> {selectedPackage}</p>
          <p><strong>Price:</strong> <span className="text-[#f34e3a]">${amountMap[selectedPackage] / 100}</span></p>
          <p><strong>Your Name:</strong> {user.displayName}</p>
          <p><strong>Your Email:</strong> {user.email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <CardElement className="p-4 border rounded-lg bg-white shadow-md" />
        {error && <p className="text-red-500 text-center">{error}</p>}
        {succeeded ? (
          <p className="text-green-600 font-bold mt-4 text-center">✅ Payment succeeded!</p>
        ) : (
          <button
            type="submit"
            disabled={!stripe || processing}
            className="w-full py-3 bg-[#f34e3a] text-white rounded-lg hover:bg-[#e03a2d] transition-all duration-300 font-semibold"
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

  if (!slot || !trainer || !user) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-semibold text-center mb-6 text-[#f34e3a]">
        Complete Your Payment
      </h2>

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
