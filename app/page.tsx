import { Hero } from "@/components/sections/Hero";
import { AboutUs } from "@/components/sections/AboutUs";
import { DestinationGrid } from "@/components/sections/DestinationGrid";
import { HolidayTypes } from "@/components/sections/HolidayTypes";
import { FeaturedCircuits } from "@/components/sections/FeaturedCircuits";
import { RoutardReviews } from "@/components/sections/RoutardReviews";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutUs />
      <DestinationGrid />
      <HolidayTypes />
      <FeaturedCircuits />
      <RoutardReviews />
      <FinalCTA />
    </>
  );
}
