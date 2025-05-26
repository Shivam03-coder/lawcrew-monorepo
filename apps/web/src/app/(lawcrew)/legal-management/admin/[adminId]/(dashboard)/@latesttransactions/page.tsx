import Image from "next/image";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NoData from "@/components/shared/no-data";

const latestTransactions = [
  {
    id: 1,
    title: "Subscription Renewal",
    badge: "John Doe",
    image:
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 1400,
  },
  {
    id: 2,
    title: "Payment for Services",
    badge: "Jane Smith",
    image:
      "https://images.pexels.com/photos/4969918/pexels-photo-4969918.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 2100,
  },
  {
    id: 3,
    title: "Subscription Renewal",
    badge: "Michael Johnson",
    image:
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 1300,
  },
  {
    id: 4,
    title: "Payment for Services",
    badge: "Lily Adams",
    image:
      "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 2500,
  },
  {
    id: 5,
    title: "Subscription Renewal",
    badge: "Sam Brown",
    image:
      "https://images.pexels.com/photos/1680175/pexels-photo-1680175.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 1400,
  },
  {
    id: 6,
    title: "Subscription Renewal",
    badge: "Sam Brown",
    image:
      "https://images.pexels.com/photos/1680175/pexels-photo-1680175.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 1400,
  },
  {
    id: 7,
    title: "Subscription Renewal",
    badge: "Sam Brown",
    image:
      "https://images.pexels.com/photos/1680175/pexels-photo-1680175.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 1400,
  },
];

const LatestTransactions = () => {
  return (
    <div className="fontin h-[470px] overflow-scroll">
      <h1 className="mb-6 font-inter text-base font-semibold">
        Latest Transactions
      </h1>
      <div className="flex flex-col gap-2">
        {latestTransactions.length !== 0 ? (
          <NoData message="No Transactions Found" />
        ) : (
          latestTransactions.map((item) => (
            <Card
              key={item.id}
              className="flex items-center justify-between gap-4 p-3 shadow-inner"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="border bg-primary uppercase text-secondary">
                  {item.title.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <CardContent className="flex-1 p-0 text-justify">
                <h5 className="text-sm font-medium">{item.title}</h5>
                <Badge className="text-xs font-medium text-primary/80">
                  {item.badge}
                </Badge>
              </CardContent>
              <CardFooter className="p-0">{item.count / 1000}K</CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default LatestTransactions;
