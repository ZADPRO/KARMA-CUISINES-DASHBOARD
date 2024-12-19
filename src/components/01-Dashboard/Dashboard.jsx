import "./Dashboard.css";

import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { Chart } from "primereact/chart";
import { useEffect, useRef, useState } from "react";
import { BaggageClaim, Coins, TriangleAlert, Undo2 } from "lucide-react";
import DashboardProducts from "../../Pages/DashboardProducts/DashboardProducts";

export default function Dashboard() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  const cardData = [
    {
      id: 1,
      title: "Orders",
      count: "24 new",
      description: "Orders count",
      icon: <BaggageClaim size={40} />,
    },
    {
      id: 2,
      title: "Revenue",
      count: "15 new",
      description: "Sales count",
      icon: <Coins size={40} />,
    },
    {
      id: 3,
      title: "Return Orders",
      count: "5 new",
      description: "Returns count",
      icon: <Undo2 size={40} />,
    },
    {
      id: 4,
      title: "Pending Orders",
      count: "3 new",
      description: "Pending count",
      icon: <TriangleAlert size={40} />,
    },
  ];

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          type: "line",
          label: "Dataset 1",
          borderColor: documentStyle.getPropertyValue("--blue-500"),
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          data: [50, 25, 12, 48, 56, 76, 42],
        },
        {
          type: "bar",
          label: "Dataset 2",
          backgroundColor: documentStyle.getPropertyValue("--green-500"),
          data: [21, 84, 24, 75, 37, 65, 34],
          borderColor: "white",
          borderWidth: 2,
        },
        {
          type: "bar",
          label: "Dataset 3",
          backgroundColor: documentStyle.getPropertyValue("--orange-500"),
          data: [41, 52, 24, 74, 23, 21, 32],
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  const menu1 = useRef(null);
  const menu2 = useRef(null);

  return (
    <div>
      <div className="primaryNav">
        <p>Dashboard</p>
        <p className="">Logged in as: Admin</p>
      </div>
      <div className="dashboardContxt">
        <div className="dashboardContents">
          {cardData.map((card) => (
            <div className="card" key={card.id}>
              <div className="cardTextContents">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <p>
                  <span>{card.count}</span> since last visit
                </p>
              </div>
              <div className="cardIcon">{card.icon}</div>
            </div>
          ))}
        </div>

        <div
          className="dashboardCont flex flex-wrap"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          {/* RECENT SALES & BEST SELLING PRODUCTS */}
          <div className="col-12 xl:col-6 dashboardAnalytics">
            <DashboardProducts />
            <div className="card mt-4">
              <div className="flex justify-content-between align-items-center mb-5">
                <h5>Best Selling Products</h5>
                <div>
                  <Button
                    type="button"
                    icon="pi pi-ellipsis-v"
                    rounded
                    text
                    className="p-button-plain"
                    onClick={(event) => menu1.current?.toggle(event)}
                  />
                  <Menu
                    ref={menu1}
                    popup
                    model={[
                      { label: "Add New", icon: "pi pi-fw pi-plus" },
                      { label: "Remove", icon: "pi pi-fw pi-minus" },
                    ]}
                  />
                </div>
              </div>
              <ul className="list-none p-0 m-0">
                <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                  <div>
                    <span className="text-900 font-medium mr-2 mb-1 md:mb-0">
                      Chicken Briyani
                    </span>
                    <div className="mt-1 text-600">Food</div>
                  </div>
                  <div className="mt-2 md:mt-0 flex align-items-center">
                    <div
                      className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                      style={{ blockSize: "8px" }}
                    >
                      <div
                        className="bg-orange-500 h-full"
                        style={{ inlineSize: "50%" }}
                      />
                    </div>
                    <span className="text-orange-500 ml-3 font-medium">
                      %50
                    </span>
                  </div>
                </li>
                <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                  <div>
                    <span className="text-900 font-medium mr-2 mb-1 md:mb-0">
                      Dhal & Grains
                    </span>
                    <div className="mt-1 text-600">Food</div>
                  </div>
                  <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                    <div
                      className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                      style={{ blockSize: "8px" }}
                    >
                      <div
                        className="bg-cyan-500 h-full"
                        style={{ inlineSize: "16%" }}
                      />
                    </div>
                    <span className="text-cyan-500 ml-3 font-medium">%16</span>
                  </div>
                </li>
                <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                  <div>
                    <span className="text-900 font-medium mr-2 mb-1 md:mb-0">
                      Parotta Combo
                    </span>
                    <div className="mt-1 text-600">Food</div>
                  </div>
                  <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                    <div
                      className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                      style={{ blockSize: "8px" }}
                    >
                      <div
                        className="bg-pink-500 h-full"
                        style={{ inlineSize: "67%" }}
                      />
                    </div>
                    <span className="text-pink-500 ml-3 font-medium">%67</span>
                  </div>
                </li>
                <li className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                  <div>
                    <span className="text-900 font-medium mr-2 mb-1 md:mb-0">
                      Thandhoori
                    </span>
                    <div className="mt-1 text-600">Food</div>
                  </div>
                  <div className="mt-2 md:mt-0 ml-0 md:ml-8 flex align-items-center">
                    <div
                      className="surface-300 border-round overflow-hidden w-10rem lg:w-6rem"
                      style={{ blockSize: "8px" }}
                    >
                      <div
                        className="bg-green-500 h-full"
                        style={{ inlineSize: "35%" }}
                      />
                    </div>
                    <span className="text-green-500 ml-3 font-medium">%35</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* SALES OVERVIEW AND NOTIFICATIONS */}
          <div className="col-12 xl:col-6 dashboardAnalytics">
            <div className="card">
              <h5>Sales Overview</h5>
              <Chart type="line" data={chartData} options={chartOptions} />{" "}
            </div>

            <div className="card mt-4">
              <div className="flex align-items-center justify-content-between mb-4">
                <h5>Notifications</h5>
                <div>
                  <Button
                    type="button"
                    icon="pi pi-ellipsis-v"
                    rounded
                    text
                    className="p-button-plain"
                    onClick={(event) => menu2.current?.toggle(event)}
                  />
                  <Menu
                    ref={menu2}
                    popup
                    model={[
                      { label: "Add New", icon: "pi pi-fw pi-plus" },
                      { label: "Remove", icon: "pi pi-fw pi-minus" },
                    ]}
                  />
                </div>
              </div>

              <span className="block text-600 font-medium mb-3">TODAY</span>
              <ul className="p-0 mx-0 mt-0 mb-4 list-none">
                <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                  <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                    <i className="pi pi-dollar text-xl text-blue-500" />
                  </div>
                  <span className="text-900 line-height-3">
                    Revenue Report
                    <span className="text-700">
                      {" "}
                      - Food, Ride, Mall{" "}
                      <span className="text-blue-500">
                        10 Verification Pending
                      </span>
                    </span>
                  </span>
                </li>
                <li className="flex align-items-center py-2">
                  <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-orange-100 border-circle mr-3 flex-shrink-0">
                    <i className="pi pi-download text-xl text-orange-500" />
                  </div>
                  <span className="text-700 line-height-3">
                    Revenue Report{" "}
                    <span className="text-blue-500 font-medium">
                      DD-MM-YYYY (Today)
                    </span>{" "}
                    has been initiated.
                  </span>
                </li>
              </ul>

              <span className="block text-600 font-medium mb-3">YESTERDAY</span>
              <ul className="p-0 m-0 list-none">
                <li className="flex align-items-center py-2 border-bottom-1 surface-border">
                  <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                    <i className="pi pi-dollar text-xl text-blue-500" />
                  </div>
                  <span className="text-900 line-height-3">
                    Revenue Report
                    <span className="text-700">
                      {" "}
                      - Food, Ride, Mall{" "}
                      <span className="text-blue-500">
                        3 Verification Pending
                      </span>
                    </span>
                  </span>
                </li>
                <li className="flex align-items-center py-2">
                  <div className="w-3rem h-3rem flex align-items-center justify-content-center bg-orange-100 border-circle mr-3 flex-shrink-0">
                    <i className="pi pi-download text-xl text-orange-500" />
                  </div>
                  <span className="text-700 line-height-3">
                    Revenue Report{" "}
                    <span className="text-blue-500 font-medium">
                      DD-MM-YYYY (Today)
                    </span>{" "}
                    has been initiated.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
