import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import SiteLayout from "@/components/layout/SiteLayout";
import PageBanner from "@/components/layout/PageBanner";
import { api } from "@/lib/api";

export default function PaymentResponse() {
  const [location] = useLocation();
  const [status, setStatus] = useState("verifying");
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      // In a real SBIePay flow, the response comes via POST.
      // If SBIePay redirects with a GET query param instead, we read it here.
      const params = new URLSearchParams(window.location.search);
      const encData = params.get("encData"); // Typical SBIePay response field

      if (!encData) {
        setStatus("error");
        return;
      }

      try {
        const { data, error } = await api.payment.decryptResponse(encData);

        if (error) throw error;

        setDetails(data);
        if (data.status === "SUCCESS") {
          setStatus("success");
        } else {
          setStatus("failed");
        }
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    };

    verifyPayment();
  }, []);

  return (
    <SiteLayout>
      <PageBanner title="Payment Status" crumbs={[{ label: "Payment Status" }]} />
      <div className="container mx-auto max-w-4xl py-20 px-4 text-center">
        {status === "verifying" && <h2 className="text-2xl font-bold">Verifying your payment...</h2>}

        {status === "success" && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-10 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Payment Successful!</h2>
            <p className="text-lg mb-6">Your transaction ID: <span className="font-mono font-bold">{details?.transactionId}</span></p>
            <button
              onClick={() => window.location.href = "/application-form"}
              className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700"
            >
              Proceed to Application Form
            </button>
          </div>
        )}

        {status === "failed" && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-10 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Payment Failed</h2>
            <p className="text-lg mb-6">Something went wrong with the transaction. Please try again.</p>
            <button
              onClick={() => window.location.href = "/fee-payment"}
              className="bg-red-600 text-white px-8 py-3 rounded-md hover:bg-red-700"
            >
              Go Back to Payment Page
            </button>
          </div>
        )}

        {status === "error" && (
          <div className="py-10">
            <h2 className="text-2xl font-bold text-gray-600">No payment data found or session expired.</h2>
            <button onClick={() => window.location.href = "/fee-payment"} className="mt-4 text-blue-600 underline">
              Try again
            </button>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
