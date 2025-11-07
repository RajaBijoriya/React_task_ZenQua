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
  const [openStages, setOpenStages] = useState({});

  // Filter Logic
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

  // Group by Stage
  const grouped = filteredDeals.reduce((acc, deal) => {
    if (!acc[deal.stage]) acc[deal.stage] = [];
    acc[deal.stage].push(deal);
    return acc;
  }, {});

  const toggleStage = (stage) => {
    setOpenStages((prev) => ({
      ...prev,
      [stage]: !prev[stage],
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 sm:p-6 md:p-8 mt-6 w-full max-w-7xl mx-auto">
      {/* Top Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex gap-3 flex-wrap">
          <button className="px-4 py-2 border border-gray-200 rounded-lg bg-blue-50 text-blue-500 font-medium text-sm hover:bg-blue-100 transition">
            My Deals
          </button>
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 text-sm hover:bg-gray-100 transition">
            All Clients
          </button>
        </div>

        <button
          onClick={() => {
            setFromDate("");
            setToDate("");
            setSearch("");
          }}
          className="flex items-center justify-center hover:text-red-300 text-red-500 text-sm font-medium">
          <IconX size={16} className="mr-1" /> Clear Filters
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between mb-6 items-start sm:items-center gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-lg flex items-center gap-2 font-semibold text-gray-800">
            <IconFileAnalytics size={18} />
            Pipeline
          </h2>
          <h2 className="flex items-center gap-1 text-blue-500 font-medium">
            <IconNotes size={18} />
            List
          </h2>
          <span className="text-sm text-gray-500 ml-2">
            Total Deals: {filteredDeals.length}
          </span>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative w-full sm:w-44 md:w-56">
            <IconSearch
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-200 pl-9 pr-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border border-gray-200 px-3 py-2 rounded-md text-sm w-full sm:w-auto"
          />
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border border-gray-200 px-3 py-2 rounded-md text-sm w-full sm:w-auto"
          />

          <button
            onClick={() => setShowActive(!showActive)}
            className={`px-4 py-2 flex gap-1 items-center justify-center border border-gray-200 rounded-lg text-sm font-medium transition-all w-full sm:w-auto ${
              showActive
                ? "bg-green-100 text-green-500 border-green-300"
                : "text-gray-600 hover:bg-gray-100"
            }`}>
            <IconArchive size={18} />
            {showActive ? "Active Deals" : "Show Active"}
          </button>
        </div>
      </div>

      {/* Deals List */}
      {Object.keys(grouped).length > 0 ? (
        Object.keys(grouped).map((stage, i) => {
          const isOpen = openStages[stage] ?? true;
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
              className="mb-6 border border-gray-200 rounded-xl overflow-hidden">
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

              {/* Deals Rows */}
              {isOpen && (
                <div className="divide-y   animate-fadeIn">
                  {grouped[stage].map((deal, index) => (
                    <div
                      key={index}
                      className="grid border border-gray-200 grid-cols-2 sm:grid-cols-6 items-center px-4 py-3 text-sm hover:bg-blue-50 transition">
                      <div className="font-medium text-gray-800 truncate">
                        {deal.client}
                      </div>
                      <div className="text-gray-600 truncate">{deal.name}</div>
                      <div className="text-gray-700 hidden sm:block">
                        {deal.budget}
                      </div>
                      <div className="text-gray-600 hidden md:block">
                        {deal.assignee}
                      </div>
                      <div className="hidden sm:block">
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
                      <div className="text-gray-500 text-xs sm:text-sm text-right">
                        {deal.date}
                      </div>
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
