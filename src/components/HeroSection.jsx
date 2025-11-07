import React from "react";
import heroImg from "../assets/hero_image.png";

const HeroSection = () => {
  return (
    <section className="flex flex-col lg:flex-row justify-between items-center  rounded-3xl  p-6 sm:p-10 mb-10">
      <div className="max-w-xl text-center lg:text-left space-y-4">
        <p className="text-gray-600 text-sm sm:text-base font-semibold">
          Welcome!
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800">
          Manage your <span className="text-blue-600">Deals</span>
        </h1>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto">
          Get Started
        </button>
      </div>

      <div className="mt-10 lg:mt-0 flex justify-center">
        <img
          src={heroImg}
          alt="CRM Illustration"
          className="w-56 sm:w-72 md:w-80 lg:w-[420px] max-w-full h-auto object-contain"
        />
      </div>
    </section>
  );
};

export default HeroSection;
