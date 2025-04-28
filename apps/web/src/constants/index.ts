export const monthsOrder = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const RandomColor = () => {
  return `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0")}`;
};

export const categories = {
  INCOME: [
    "Salary",
    "Business",
    "Freelance",
    "Investments",
    "Interest Income",
    "Dividends",
    "Rental Income",
    "Gifts",
    "Refunds/Reimbursements",
    "Royalties",
    "Grants",
    "Bonuses",
    "Savings Withdrawals",
    "Others",
  ],
  EXPENSE: [
    "Groceries",
    "Restaurants",
    "Coffee Shops",
    "Rent",
    "Mortgage",
    "Utilities",
    "Maintenance",
    "Fuel",
    "Public Transport",
    "Car Maintenance",
    "Clothing",
    "Electronics",
    "Household Items",
    "Medical Bills",
    "Pharmacy",
    "Gym Memberships",
    "Movies",
    "Subscriptions",
    "Hobbies",
    "Flights",
    "Hotels",
    "Vacation Expenses",
    "Tuition Fees",
    "Books & Supplies",
    "Online Courses",
    "Health Insurance",
    "Car Insurance",
    "Life Insurance",
    "Personal Loans",
    "Credit Card Payments",
    "Mortgage EMIs",
    "Charity",
    "Personal Gifts",
    "Mutual Funds",
    "Fixed Deposits",
    "Stocks",
    "Pet Expenses",
    "Personal Care",
    "Others",
  ],
};

export const getCategoriesByType = (type: keyof typeof categories) => {
  return categories[type] || [];
};
