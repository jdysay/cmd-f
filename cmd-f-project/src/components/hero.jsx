import React from "react";
import { Link } from "react-router-dom"; // React Router Link for routing


import { Button } from './button';

function Hero() {
  return (
    <div className="relative">
      <div className="absolute inset-0" />
      <div className="relative mx-auto max-w-5xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Maple Market
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Add description of maple market
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/browse">
              <Button size="lg" variant="solid" className="rounded-full">
                Something
              </Button>
            </Link>
            <Link to="/sell">
              <Button size="lg" variant="outline" className="rounded-full">
                Another
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
