import CustomerReview from "@/components/pages/_home/customer-review";
import Goal from "@/components/pages/_home/goals";
import Hero from "@/components/pages/_home/hero";
import Payment from "@/components/pages/_home/payment";
import Solution from "@/components/pages/_home/solution";
import Footer from "@/components/shared/footer";

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
