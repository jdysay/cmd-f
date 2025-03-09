import React from "react";
import Navbar from "../components/navbar"; 
import "../css/Homepage.css";


function Mission() {
  return (
    <div className="min-h-screen bg-[#FDEBE5] text-gray-800">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-12 mt-12">
        <h1 className="text-custom-purple text-5xl m-16 font-[Caprasimo]">Our Mission</h1>

        <section className="mb-8 text-custom-purple">
          <h2 className="text-2xl font-semibold">Empowering Canadians, One Purchase at a Time</h2>
          <p className="text-lg mt-4">
            Imagine starting your day with a cold, refreshing glass of orange juice—only to find it 
            costs 25% more due to tariffs. Why should Canadian consumers bear the burden of decisions 
            made far from home?
          </p>
          <p className="text-lg mt-4 text-custom-purple">
            Canada and the U.S. are locked in a tariff-driven trade war, disrupting deeply linked 
            economies and driving up consumer costs. Meanwhile, local businesses in Canada struggle 
            to reach the very consumers who want to support them. That’s why we’ve made it our 
            mission to <span className="font-bold">#AccelerateAction</span> and create <span className="font-bold">Maple Market</span>.
          </p>
        </section>

        <section className="mb-8 text-custom-purple" >
          <h2 className="text-2xl font-semibold">What is Maple Market?</h2>
          <p className="text-lg mt-4">
            Maple Market is a digital platform designed to <span className="font-bold">connect Canadian 
            businesses with local consumers</span>. Built with <span className="font-bold">modern web technologies</span>, our 
            platform makes it easy for businesses to <span className="font-bold">sign up, create profiles, and 
            showcase their products</span>.
          </p>
          <p className="text-lg mt-4 text-custom-purple">
            For consumers, we provide an <span className="font-bold">intuitive search experience</span> powered by fast 
            indexing, ensuring quick access to Canadian-made products. Whether you're looking for 
            locally crafted goods or everyday essentials, Maple Market helps you shop 
            <span className="font-bold"> smarter and more locally</span>.
          </p>
        </section>

        <section className="mb-8 text-custom-purple">
          <h2 className="text-2xl font-semibold">How It Works</h2>
          <p className="text-lg mt-4 text-custom-purple">
            Behind the scenes, Maple Market leverages a <span className="font-bold">scalable database</span> to organize 
            business information and product listings efficiently. We prioritize <span className="font-bold">
            secure authentication</span> to protect both businesses and consumers, ensuring a 
            <span className="font-bold"> trusted marketplace</span> for all.
          </p>
        </section>

        <section className="mb-8 text-custom-purple">
          <h2 className="text-2xl font-semibold">Built for Performance</h2>
          <ul className="list-disc list-inside text-lg mt-4">
            <li><span className="font-bold">Real-time updates</span> for a seamless shopping experience</li>
            <li><span className="font-bold">A responsive design</span> that works across all devices</li>
            <li><span className="font-bold">Speed and efficiency</span>, making it easier than ever to <span className="font-bold">#BuyCanadian</span></li>
          </ul>
        </section>

        <p className="text-lg font-semibold text-center mt-8 text-custom-purple">
          At <span className="font-bold">Maple Market</span>, we’re more than just a marketplace—we’re a movement. 
          By choosing local, we strengthen Canadian businesses, support our economy, and build a future 
          where shopping Canadian is the <span className="font-bold">smartest choice</span>.
        </p>
      </div>
    </div>
  );
}

export default Mission;
