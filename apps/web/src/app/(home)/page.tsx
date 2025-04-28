import CustomerReview from "@/components/_home/customer-review";
import Footer from "@/components/_home/footer";
import Goal from "@/components/_home/goals";
import Hero from "@/components/_home/hero";
import Payment from "@/components/_home/payment";
import Solution from "@/components/_home/solution";

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
