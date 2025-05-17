import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Quote } from "lucide-react";
import { Marquee } from "@/components/magicui/marquee";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import SectionHeader from "./section-header";

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
  {
    name: "Alice",
    username: "@alice",
    body: "Incredible! This is exactly what I needed for my business. Highly recommend.",
    img: "https://avatar.vercel.sh/alice",
  },
  {
    name: "Bob",
    username: "@bob",
    body: "The best experience I've had with any product. This is a game changer.",
    img: "https://avatar.vercel.sh/bob",
  },
];

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <Card className="card relative flex w-64 transform flex-col rounded-lg p-4 shadow-md transition-transform hover:scale-105">
      <CardHeader className="flex flex-row items-center gap-2">
        <Avatar className="flex-shrink-0">
          <AvatarImage src={img} alt={name} className="rounded-full" />
        </Avatar>
        <div className="flex flex-col">
          <CardTitle className="textDark text-sm font-semibold">
            {name}
          </CardTitle>
          <CardDescription className="text-xs font-medium text-gray-600 dark:text-slate-200">
            {username}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <blockquote className="textDark mt-2 font-inter text-sm font-semibold">
          <Quote className="mr-2 inline-block" /> {body}
        </blockquote>
      </CardContent>
    </Card>
  );
};

function CustomerReview() {
  return (
    <section className="col-span-full w-full">
      <SectionHeader
        title="What Our Customers Say About Us ?"
        description="Our legal management tool has helped countless businesses streamline their operations, stay compliant, and improve efficiency. Here's what our customers have to say about how our solutions have transformed their workflow."
        className="w-[50%] pb-3 text-center dark:text-white"
      />

      <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s]">
          {reviews.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>

        {/* Gradient overlay for better readability */}
        <div className="dark:via-background pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-gray-900 dark:to-transparent" />
        <div className="dark:via-background pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-gray-900 dark:to-transparent" />
      </div>
    </section>
  );
}

export default CustomerReview;
