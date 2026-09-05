import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  BarController,
  ArcElement
} from "chart.js";

import { Line, Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  BarController,
  ArcElement
);

function App() {
  const exportReport = () => {
  const csvContent = [
    ["Date", "Product", "Category", "Quantity", "Revenue", "Profit"],
    ...filteredSales.map((item) => [
      item.sale_date,
      item.product,
      item.category,
      item.quantity,
      item.revenue,
      item.profit,
    ]),
  ]
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "sales-report.csv";
  link.click();

  URL.revokeObjectURL(url);
};

  const [sales, setSales] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredSales =
  selectedCategory === "All"
    ? sales
    : sales.filter((item) => item.category === selectedCategory);

  useEffect(() => {
  fetch("http://localhost:5000/api/sales")
    .then((response) => response.json())
    .then((data) => {
      setSales(data);
      console.log(data);
    })
    .catch((error) => {
      console.error("Error fetching sales data:", error);
    });
}, []);

  const revenueData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Revenue",
      data: [
        filteredSales
          .filter((item) => item.sale_date.startsWith("2026-01"))
          .reduce((total, item) => total + Number(item.revenue), 0),

        filteredSales
          .filter((item) => item.sale_date.startsWith("2026-02"))
          .reduce((total, item) => total + Number(item.revenue), 0),

        filteredSales
          .filter((item) => item.sale_date.startsWith("2026-03"))
          .reduce((total, item) => total + Number(item.revenue), 0),

        filteredSales
          .filter((item) => item.sale_date.startsWith("2026-04"))
          .reduce((total, item) => total + Number(item.revenue), 0),

        filteredSales
          .filter((item) => item.sale_date.startsWith("2026-05"))
          .reduce((total, item) => total + Number(item.revenue), 0),

        filteredSales
          .filter((item) => item.sale_date.startsWith("2026-06"))
          .reduce((total, item) => total + Number(item.revenue), 0),
      ],
      borderWidth: 3,
    },
  ],
};

  const categoryRevenue = {
  labels:
    selectedCategory === "All"
      ? ["Electronics", "Furniture"]
      : [selectedCategory],

  datasets: [
    {
      label: "Revenue",
      data:
        selectedCategory === "All"
          ? [
              filteredSales
                .filter((item) => item.category === "Electronics")
                .reduce(
                  (total, item) => total + Number(item.revenue),
                  0
                ),

              filteredSales
                .filter((item) => item.category === "Furniture")
                .reduce(
                  (total, item) => total + Number(item.revenue),
                  0
                ),
            ]
          : [
              filteredSales.reduce(
                (total, item) => total + Number(item.revenue),
                0
              ),
            ],

      backgroundColor: ["#36A2EB", "#FF6384"],
      borderWidth: 1,
    },
  ],
};

  const categoryOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Revenue by Category",
    },
  },
};

  const productRevenue = {
  labels: ["Laptop", "Smartphone", "Headphones", "Office Chair", "Keyboard", "Desk"],
  datasets: [
    {
      label: "Revenue",
      data: [
        filteredSales
          .filter((item) => item.product === "Laptop")
          .reduce((total, item) => total + Number(item.revenue), 0),

        filteredSales
          .filter((item) => item.product === "Smartphone")
          .reduce((total, item) => total + Number(item.revenue), 0),

        filteredSales
          .filter((item) => item.product === "Headphones")
          .reduce((total, item) => total + Number(item.revenue), 0),

        filteredSales
          .filter((item) => item.product === "Office Chair")
          .reduce((total, item) => total + Number(item.revenue), 0),

        filteredSales
          .filter((item) => item.product === "Keyboard")
          .reduce((total, item) => total + Number(item.revenue), 0),

        filteredSales
          .filter((item) => item.product === "Desk")
          .reduce((total, item) => total + Number(item.revenue), 0),
      ],
      backgroundColor: "#36A2EB",
      borderWidth: 1,
    },
  ],
};

const productOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Revenue by Product",
    },
  },
};

  const revenueProfitData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Revenue",
      data: [1, 2, 3, 4, 5, 6].map((month) =>
        filteredSales
          .filter(
            (item) =>
              item.sale_date.startsWith(`2026-${String(month).padStart(2, "0")}`)
          )
          .reduce((total, item) => total + Number(item.revenue), 0)
      ),
      backgroundColor: "#38BDF8",
      borderColor: "#38BDF8",
      borderWidth: 2,
    },
    {
      label: "Profit",
      data: [1, 2, 3, 4, 5, 6].map((month) =>
        filteredSales
          .filter(
            (item) =>
              item.sale_date.startsWith(`2026-${String(month).padStart(2, "0")}`)
          )
          .reduce((total, item) => total + Number(item.profit), 0)
      ),
      backgroundColor: "#A78BFA",
      borderColor: "#A78BFA",
      borderWidth: 2,
    },
  ],
};

const revenueProfitOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Revenue vs Profit",
    },
  },
};

  const revenueDistribution = {
  labels:
    selectedCategory === "All"
      ? ["Electronics", "Furniture"]
      : [selectedCategory],

  datasets: [
    {
      label: "Revenue",
      data:
        selectedCategory === "All"
          ? [
              filteredSales
                .filter((item) => item.category === "Electronics")
                .reduce(
                  (total, item) => total + Number(item.revenue),
                  0
                ),

              filteredSales
                .filter((item) => item.category === "Furniture")
                .reduce(
                  (total, item) => total + Number(item.revenue),
                  0
                ),
            ]
          : [
              filteredSales.reduce(
                (total, item) => total + Number(item.revenue),
                0
              ),
            ],

      backgroundColor: ["#38BDF8", "#A78BFA"],
      borderWidth: 2,
    },
  ],
};

const revenueDistributionOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "Revenue Distribution",
    },
  },
};

  const revenueOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: "Monthly Revenue",
      },
    },
  };

  return (
    <div className="dashboard">
      <header>
        <h1>Business Intelligence Dashboard</h1>
        <p>Monitor your business performance in one place.</p>
      </header>

      <div className="filter-container">
  <label>Category: </label>

  <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
  >
    <option value="All">All Categories</option>
    <option value="Electronics">Electronics</option>
    <option value="Furniture">Furniture</option>
  </select>

  <button onClick={() => setSelectedCategory("All")}>
  Reset Filter
</button>
    <button onClick={exportReport}>Export Report</button>
</div>

      

      <div className="kpi-container">
        <div className="kpi-card">
          <h3>Total Revenue</h3>
          <h2>₹{filteredSales.reduce((total, item) => total + Number(item.revenue), 0).toLocaleString("en-IN")}</h2>
          <p>+12.5% this month</p>
        </div>

        <div className="kpi-card">
          <h3>Total Profit</h3>
          <h2>₹{filteredSales.reduce((total, item) => total + Number(item.profit), 0).toLocaleString("en-IN")}</h2>
          <p>+8.2% this month</p>
        </div>

        <div className="kpi-card">
          <h3>Total Units Sold</h3>
<h2>
  {filteredSales
    .reduce((total, item) => total + Number(item.quantity), 0)
    .toLocaleString("en-IN")}
</h2>
          <p>+15.4% this month</p>
        </div>

        <div className="kpi-card">
  <h3>Total Products</h3>
  <h2>{new Set(filteredSales.map((item) => item.product)).size}</h2>
  <p>Across all categories</p>
</div>
      </div>

      <div className="table-container">
  <h2>Sales Data</h2>

  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Product</th>
        <th>Category</th>
        <th>Quantity</th>
        <th>Revenue</th>
        <th>Profit</th>
      </tr>
    </thead>

    <tbody>
      {filteredSales.map((item) => (
        <tr key={item.id}>
          <td>{item.sale_date}</td>
          <td>{item.product}</td>
          <td>{item.category}</td>
          <td>{item.quantity}</td>
          <td className="revenue-cell">
  ₹{Number(item.revenue).toLocaleString("en-IN")}
</td>

<td className="profit-cell">
  ₹{Number(item.profit).toLocaleString("en-IN")}
</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      <div className="chart-container">
        <Bar data={categoryRevenue} options={categoryOptions} />
      </div>

      <div className="chart-container">
  <Bar data={productRevenue} options={productOptions} />
</div>

      <div className="chart-container">
  <Bar data={revenueProfitData} options={revenueProfitOptions} />
</div>
    </div>
  );
}

export default App;