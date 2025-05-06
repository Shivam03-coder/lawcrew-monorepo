import CustomerReview from "@/features/home/customer-review";
import Goal from "@/features/home/goals";
import Hero from "@/features/home/hero";
import Payment from "@/features/home/payment";
import Solution from "@/features/home/solution";
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
