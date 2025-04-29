import React from "react";

const QuoteSection = () => {
  return (
    <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto my-12 shadow-2xl">
      {/* Steps Section */}
      <div className="bg-[#185F95] text-white p-8 w-full md:w-[40%] space-y-8">
        {[
          {
            title: "Welcome to the ERPP.",
            text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
          },
          {
            title: "Submit your Demorage & Freight Request with NSC.",
            text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
          },
          {
            title: "Get started.",
            text: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
          },
        ].map((step, idx) => (
          <div key={idx} className="flex items-start gap-4">
            <div className="w-8 h-8 p-6 text-2xl border-2 border-white rounded-full flex items-center justify-center text-white font-semibold">
              {idx + 1}
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-xl md:text-3xl">{step.title}</h3>
              <p className="text-sm mt-1">{step.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quote Form */}
      <div className="bg-white p-8 w-full md:w-[60%]">
        <h2 className="text-xl font-bold text-[#185F95] mb-6">Get a freight quote</h2>
        <form className="space-y-4">
          <div className="flex gap-4">
            <input type="text" placeholder="First name" className="input" />
            <input type="text" placeholder="Last name" className="input" />
          </div>
          <div className="flex gap-4">
            <input type="email" placeholder="Email" className="input" />
            <input type="tel" placeholder="Phone" className="input" />
          </div>
          <input type="text" placeholder="Street address" className="input w-full" />
          <div className="flex gap-4">
            <input type="text" placeholder="City" className="input" />
            <input type="text" placeholder="State" className="input" />
            <input type="text" placeholder="Zip code" className="input" />
          </div>
          <select className="input w-full">
            <option>Service type</option>
          </select>
          <div className="flex gap-4">
            <input type="text" placeholder="Origin city" className="input" />
            <input type="text" placeholder="Destination city" className="input" />
          </div>
          <textarea placeholder="Shipment details" className="input w-full min-h-20 " />
          <button
            type="submit"
            className="bg-[#185F95] text-white px-6 py-4  hover:bg-[#124873]"
          >
            Request a quote
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuoteSection;
