import CustomerReview from "@/app/(home)/customer-review";
import Hero from "./hero";
import Solution from "./solution";
import Goal from "./goals";
import Payment from "./payment";
import Footer from "./footer";

function Home() {
  return (
    <div className="min-h-screen dark:bg-primary">
      <section className="container mx-auto px-6 py-16 md:py-24">
        <Hero />
        <Solution />
        <Goal />
        <CustomerReview />
        <Payment />
      </section>
      <Footer />
    </div>
  );
}

export default Home;
