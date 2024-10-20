import React, { useEffect, useState } from "react";

const Plans = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center pb-10">
      {/* Background Section */}
      <div
        className="bg-cover bg-center bg-no-repeat h-full w-full absolute top-0 left-0"
        style={{ backgroundImage: "url('care2.png')", opacity: 0.3 }}
      ></div>

      {/* Cards Section */}
      <div className="flex flex-wrap max-md:flex-col justify-center items-center w-full mt-24 px-4 md:px-10 lg:px-20 gap-6 md:gap-8 lg:gap-10">
        {/* Basic Plan */}
        <div
          className={`bg-custom-gradient-8 p-6 rounded-lg shadow-lg z-10 transition-all cursor-pointer duration-1000 ease-out
            ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
          `}
          style={{
            minWidth: "300px",
            maxWidth: "350px",
            minHeight: "500px",
          }}
        >
          <h3 className="text-xl font-bold text-red-600 mb-4">
            Empower <span className="font-normal">Basic</span>
          </h3>
          <p className="text-3xl font-semibold mb-4">₹199/month</p>
          <p className="text-sm text-gray-600 mb-6">
            *Prices shown are for prepaid annual plans only
          </p>
          <button className="bg-red-500 text-white py-2 px-4 rounded-lg mb-6 w-full">
            Request callback
          </button>
          <h4 className="text-lg font-semibold mb-4">Key Features</h4>
          <ul className="text-sm space-y-2 text-black font-serif">
            <li>✓ 24/7 Emergency Coordination Access</li>
            <li>✓ Senior Help Desk For Lab Tests & Deliveries</li>
            <li>✓ Access To Verified Healthcare Professionals</li>
            <li>✓ Support For Local & International Travel</li>
            <li>✓ Expert Talks On Diet, Health & Wellness</li>
          </ul>
        </div>

        {/* Advanced Plan */}
        <div
          className={`bg-light-gradient-6 p-6 rounded-lg shadow-lg z-10 transition-all cursor-pointer duration-1000 ease-out
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
          `}
          style={{
            minWidth: "300px",
            maxWidth: "350px",
            minHeight: "500px",
          }}
        >
          <h3 className="text-xl font-bold text-red-600 mb-4">
            Empower <span className="font-normal">Advanced</span>
          </h3>
          <p className="text-3xl font-semibold mb-4">₹799/month</p>
          <p className="text-sm text-gray-600 mb-6">
            *Prices shown are for prepaid annual plans only
          </p>
          <button className="bg-red-500 text-white py-2 px-4 rounded-lg mb-6 w-full">
            Request callback
          </button>
          <h4 className="text-lg font-semibold mb-4">Key Features</h4>
          <ul className="text-sm space-y-2 text-black font-serif">
            <li>✓ BLS Emergency Ambulance Coverage (One Per Year)</li>
            <li>✓ Access To Doctor On Call During Emergencies</li>
            <li>✓ Weekly Wellness Check-In Calls</li>
            <li>✓ Regular Care Updates To Family</li>
            <li>✓ Annual Lab Tests For 58 Health Parameters</li>
            <li>✓ All Services Included In Basic Plan</li>
          </ul>
        </div>

        {/* Premium Plan */}
        <div
          className={`bg-custom-gradient-9 p-6 rounded-lg shadow-lg z-10 transition-all cursor-pointer duration-1000 ease-out
            ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
          `}
          style={{
            minWidth: "300px",
            maxWidth: "350px",
            minHeight: "500px",
          }}
        >
          <h3 className="text-xl font-bold text-red-600 mb-4">
            Empower <span className="font-normal">Premium</span>
          </h3>
          <p className="text-3xl font-semibold mb-4">₹2299/month</p>
          <p className="text-sm text-gray-600 mb-6">
            *Prices shown are for prepaid annual plans only
          </p>
          <button className="bg-red-500 text-white py-2 px-4 rounded-lg mb-6 w-full">
            Request callback
          </button>
          <h4 className="text-lg font-semibold mb-4">Key Features</h4>
          <ul className="text-sm space-y-2 text-black font-serif">
            <li>✓ Unlimited BLS Emergency Ambulance Coverage</li>
            <li>✓ Unlimited Doctor Access During Emergencies</li>
            <li>✓ Weekly Wellness Check-In Calls </li>
            <li>✓ Family Care Updates</li>
            <li>✓ Annual Lab Tests For 72 Health Parameters</li>
            <li>✓ All Services Included In Basic Plan</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Plans;
