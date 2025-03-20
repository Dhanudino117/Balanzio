const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Account = require("./models/Account");

dotenv.config();

const sampleData = [
    {
      accountHolderName: "Amit Sharma",
      accountNumber: "12345678901",
      ifscCode: "IDIB000A001",
      balance: 30000,
      currency: "INR",
      monthlyBudget: 10000,
      transactions: [
        { 
          date: "2025-02-19T00:00:00Z", 
          amount: 300, 
          description: "Amazon", 
          type: "debit", 
          category: "",      
          mode: "UPI" 
        },
        { 
          date: "2025-02-22T00:00:00Z", 
          amount: 150, 
          description: "Best Buy", 
          type: "debit", 
          category: "",    
          mode: "Bank Transfer" 
        },
        { 
          date: "2025-02-25T00:00:00Z", 
          amount: 200, 
          description: "Dhanush R", 
          type: "debit", 
          category: "",     
          mode: "UPI" 
        },
        { 
          date: "2025-02-28T00:00:00Z", 
          amount: 500, 
          description: "Santhosh R", 
          type: "debit", 
          category: "",     
          mode: "Bank Transfer" 
        },
        { 
          date: "2025-03-01T00:00:00Z", 
          amount: 2000, 
          description: "Alliance University", 
          type: "credit", 
          category: "",      
          mode: "Bank Transfer" 
        },
        { 
          date: "2025-03-04T00:00:00Z", 
          amount: 100, 
          description: "Grand Cinemas", 
          type: "debit", 
          category: "",   
          mode: "UPI" 
        },
        { 
          date: "2025-03-07T00:00:00Z", 
          amount: 300, 
          description: "BMTC ", 
          type: "debit", 
          category: "",     
          mode: "Bank Transfer" 
        },
        { 
          date: "2025-03-10T00:00:00Z", 
          amount: 400, 
          description: " Vikranth S ", 
          type: "debit", 
          category: "",   
          mode: "UPI" 
        },
        { 
          date: "2025-03-13T00:00:00Z", 
          amount: 200, 
          description: " Gautham G", 
          type: "debit", 
          category: " ", 
          mode: "Bank Transfer" 
        },
        { 
          date: "2025-03-14T00:00:00Z", 
          amount: 150, 
          description: "Suji Textiles", 
          type: "debit", 
          category: "",    
          mode: "Bank Transfer" 
        },
        { 
          date: "2025-03-15T00:00:00Z", 
          amount: 100, 
          description: "G-Mart", 
          type: "debit", 
          category: "",
          mode: "UPI" 
        },
        { 
          date: "2025-03-16T00:00:00Z", 
          amount: 500, 
          description: "Amazon", 
          type: "debit", 
          category: "",      
          mode: "UPI" 
        },
        { 
          date: "2025-03-17T00:00:00Z", 
          amount: 80, 
          description: "Starbucks", 
          type: "debit", 
          category: "",   
          mode: "UPI" 
        },
        { 
          date: "2025-03-18T00:00:00Z", 
          amount: 250, 
          description: "Mandy S", 
          type: "debit", 
          category: "",      
          mode: "Bank Transfer" 
        },
        { 
          date: "2025-03-19T00:00:00Z", 
          amount: 120, 
          description: "Joel R", 
          type: "debit", 
          category: "",   
          mode: "UPI" 
        }
      ],
      status: "active",
      lastUpdated: "2025-03-19T16:07:00Z",
      password: "amit123"
    },



    {
      accountHolderName: "Priya Patel",
      accountNumber: "23456789012",
      ifscCode: "IDIB000A002",
      balance: 50000,
      currency: "INR",
      monthlyBudget: 15000,
      transactions: [
        { 
          date: "2025-02-20T00:00:00Z", 
          amount: 400, 
          description: "Grocery", 
          type: "debit", 
          category: "Amazon",     
          mode: "UPI" 
        },
        { 
          date: "2025-02-23T00:00:00Z", 
          amount: 200, 
          description: "Electricity bill", 
          type: "debit", 
          category: "Costco",      // replaced Utilities with Costco
          mode: "Bank Transfer" 
        },
        { 
          date: "2025-02-26T00:00:00Z", 
          amount: 300, 
          description: "Restaurant", 
          type: "debit", 
          category: "Walmart",     // replaced Food with Walmart
          mode: "UPI" 
        },
        { 
          date: "2025-03-01T00:00:00Z", 
          amount: 3000, 
          description: "Salary", 
          type: "credit", 
          category: "Salary",      // left as Salary
          mode: "Bank Transfer" 
        },
        { 
          date: "2025-03-05T00:00:00Z", 
          amount: 150, 
          description: "Movie ticket", 
          type: "debit", 
          category: "Regal Cinemas",   // replaced Entertainment with Regal Cinemas
          mode: "UPI" 
        },
        { 
          date: "2025-03-08T00:00:00Z", 
          amount: 400, 
          description: "Fuel", 
          type: "debit", 
          category: "Shell",       // replaced Transportation with Shell
          mode: "Bank Transfer" 
        },
        { 
          date: "2025-03-11T00:00:00Z", 
          amount: 500, 
          description: "Shopping", 
          type: "debit", 
          category: "Target",      // replaced Shopping with Target
          mode: "UPI" 
        },
        { 
          date: "2025-03-13T00:00:00Z", 
          amount: 180, 
          description: "Water bill", 
          type: "debit", 
          category: "Utility Co",  // replaced Utilities with Utility Co
          mode: "Bank Transfer" 
        },
        { 
          date: "2025-03-14T00:00:00Z", 
          amount: 120, 
          description: "Bus fare", 
          type: "debit", 
          category: "City Transit",// replaced Transportation with City Transit
          mode: "UPI" 
        },
        { 
          date: "2025-03-15T00:00:00Z", 
          amount: 200, 
          description: "Internet bill", 
          type: "debit", 
          category: "Best Buy",    // replaced Utilities with Best Buy
          mode: "Bank Transfer" 
        },
        { 
          date: "2025-03-16T00:00:00Z", 
          amount: 80, 
          description: "Coffee", 
          type: "debit", 
          category: "Starbucks",   // replaced Food with Starbucks
          mode: "UPI" 
        },
        { 
          date: "2025-03-17T00:00:00Z", 
          amount: 250, 
          description: "Clothes", 
          type: "debit", 
          category: "Macy's",      // replaced Shopping with Macy's
          mode: "Bank Transfer" 
        },
        { 
          date: "2025-03-18T00:00:00Z", 
          amount: 100, 
          description: "Phone bill", 
          type: "debit", 
          category: "Verizon",     // replaced Utilities with Verizon
          mode: "Bank Transfer" 
        },
        { 
          date: "2025-03-19T00:00:00Z", 
          amount: 60, 
          description: "Snacks", 
          type: "debit", 
          category: "7-Eleven",    // replaced Food with 7-Eleven
          mode: "UPI" 
        },
        { 
          date: "2025-03-19T00:00:00Z", 
          amount: 150, 
          description: "Grocery", 
          type: "debit", 
          category: "Amazon",      // replaced Food with Amazon
          mode: "UPI" 
        }
      ],
      status: "active",
      lastUpdated: "2025-03-19T16:07:00Z",
      password: "priya456"
    },
    // Include the rest of your sample accounts here (Rahul Mehta, Sneha Gupta, Vikas Singh)
  ];
  

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding");

    // Clear existing data (optional, be careful with this in production!)
    await Account.deleteMany({});
    console.log("Old data removed");

    // Insert sample data
    await Account.insertMany(sampleData);
    console.log("Data seeded successfully");

    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDB();
