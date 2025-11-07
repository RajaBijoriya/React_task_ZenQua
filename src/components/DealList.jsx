import React, { useState } from "react";
import {
  IconFileAnalytics,
  IconNotes,
  IconSearch,
  IconX,
  IconChevronDown,
  IconChevronUp,
  IconArchive,
} from "@tabler/icons-react";
import { data as allDeals } from "../components/data";

const DealList = () => {
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showActive, setShowActive] = useState(false);
  const [openStages, setOpenStages] = useState({}); // <-- For toggle

  //  Filter logic
  const filteredDeals = allDeals.filter((d) => {
    const matchesSearch =
      d.client.toLowerCase().includes(search.toLowerCase()) ||
      d.name.toLowerCase().includes(search.toLowerCase());
    const withinDateRange =
      (!fromDate || new Date(d.date) >= new Date(fromDate)) &&
      (!toDate || new Date(d.date) <= new Date(toDate));
    const matchesActive = !showActive || d.stage === "Active";
    return matchesSearch && withinDateRange && matchesActive;
  });

  // Group deals by stage
  const grouped = filteredDeals.reduce((acc, deal) => {
    if (!acc[deal.stage]) acc[deal.stage] = [];
    acc[deal.stage].push(deal);
    return acc;
  }, {});


  //  Toggle open/close 
  const toggleStage = (stage) => {
    setOpenStages((prev) => ({
      ...prev,
      [stage]: !prev[stage],
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 sm:p-8 mt-6">
      {/* Header */}

      {/* Filters */}
      <div className="flex md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex gap-3 flex-wrap">
          <button className="px-4 py-2  border-gray-200 border rounded-lg bg-blue-50 text-blue-500 font-medium text-sm">
            My Deals
          </button>
          <button className="px-4 py-2  border-gray-200 border rounded-lg text-gray-600 text-sm">
            All Clients
          </button>
        </div>

        <div className="bg-blue-300 w-[500px]">

        </div>
        <div>
          <button
            onClick={() => {
              setFromDate("");
              setToDate("");
              setSearch("");
            }}
            className="flex items-center hover:text-red-300 text-red-500 text-sm">
            <IconX size={16} className="mr-1" /> Clear
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className=" items-center flex gap-8 mb-6">
          <h2 className="text-lg flex items-center  font-semibold text-gray-800">
            <IconFileAnalytics size={18} />
            Pipeline
          </h2>
          <h2 className="flex items-center">
            <IconNotes size={18} className="text-blue-500" />
            <span className="text-blue-500 font-medium">List</span>
          </h2>
          <h2>
            <span className="text-sm text-gray-500 ml-2">
              Total Deals: {filteredDeals.length}
            </span>
          </h2>
        </div>
        <div className="flex justify-center mb-6 items-center gap-3">
          <div className="relative">
            <IconSearch
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className=" border-gray-200 border pl-9 pr-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className=" border-gray-200 border px-3 py-2 rounded-md text-sm"
          />
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className=" border-gray-200 border px-3 py-2 rounded-md text-sm"
          />
          <button
            onClick={() => setShowActive(!showActive)}
            className={`px-4 py-2 flex gap-1 justify-center items-center  border-gray-200 border rounded-lg text-sm font-medium transition-all ${
              showActive
                ? "bg-green-100 text-green-500 border-green-300"
                : "text-gray-600 hover:bg-gray-100"
            }`}>
            <IconArchive
              className=" left-3 top-2.5 text-gray-600"
              size={18}
            />
            {showActive ? "Active Deals" : "Show Active"}
          </button>
        </div>
      </div>

      {/* Deals Table */}
      {Object.keys(grouped).length > 0 ? (
        Object.keys(grouped).map((stage, i) => {
          const isOpen = openStages[stage] ?? true; // Default open
          const colorClasses =
            stage === "Negotiating"
              ? "bg-yellow-50 text-yellow-700"
              : stage === "Kickedback"
              ? "bg-red-50 text-red-700"
              : stage === "Active"
              ? "bg-green-50 text-green-700"
              : "bg-gray-50 text-gray-700";

          return (
            <div
              key={i}
              className="mb-6 border-gray-200 border  rounded-xl overflow-hidden">
              {/* Stage Header */}
              <div
                onClick={() => toggleStage(stage)}
                className={`flex justify-between items-center px-4 py-3 font-medium text-sm sm:text-base cursor-pointer select-none ${colorClasses}`}>
                <div className="flex items-center gap-2">
                  {isOpen ? (
                    <IconChevronUp size={18} />
                  ) : (
                    <IconChevronDown size={18} />
                  )}
                  <span>{stage}</span>
                </div>
                <span>{grouped[stage].length} Deals</span>
              </div>

              {/* Deals Rows (collapsible) */}
              {isOpen && (
                <div className="divide-y animate-fadeIn">
                  {grouped[stage].map((deal, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-2  border-gray-200 border sm:grid-cols-6 items-center px-4 py-3 text-sm hover:bg-blue-50 transition">
                      <div className="font-medium text-gray-800">
                        {deal.client}
                      </div>
                      <div className="text-gray-600">{deal.name}</div>
                      <div className="text-gray-700">{deal.budget}</div>
                      <div className="text-gray-600">{deal.assignee}</div>
                      <div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            deal.stage === "Negotiating"
                              ? "bg-yellow-100 text-yellow-700"
                              : deal.stage === "Kickedback"
                              ? "bg-red-100 text-red-700"
                              : deal.stage === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}>
                          {deal.stage}
                        </span>
                      </div>
                      <div className="text-gray-500">{deal.date}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className="text-center py-6 text-gray-500 italic border rounded-lg">
          No deals found
        </div>
      )}
    </div>
  );
};

export default DealList;
