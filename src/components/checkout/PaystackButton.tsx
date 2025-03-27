import React from "react";
import { PaystackButton } from "react-paystack";
import paystackLogo from "../../assets/paystack.png";

const PayStackButton = ({ amount, email, onSuccess }) => {
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

  return (
    <PaystackButton
      text=""
      className=""
      amount={amount}
      email={email}
      publicKey={publicKey}
      onSuccess={onSuccess}
    >
      <div
        className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-600 rounded-lg transition-all duration-300 ease-in-out 
                   hover:shadow-md hover:border-gray-500 hover:scale-105"
      >
        <img src={paystackLogo} alt="Pay with Paystack" className="w-24" />
      </div>
    </PaystackButton>
  );
};

export default PayStackButton;
