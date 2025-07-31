import React, { useEffect, useState } from "react";
import axios from "axios";
import DashBoardSidebar from "../Components/DashBoardSidebar";
import DashboardHeader from "../Components/DashboardHeader";
import DashBoardNavbar from "../Components/DashBoardNavbar";

function DashboardCustomer() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("https://freshcart1-backend.vercel.app/signup").then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <DashBoardSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <DashboardHeader />

        {/* Title and Add Button */}
        <DashBoardNavbar />

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b bg-gray-100">
              <tr>
                <th className="px-4 py-2 font-semibold">Name</th>
                <th className="px-4 py-2 font-semibold">Email</th>
                <th className="px-4 py-2 font-semibold">Purchase Date</th>
                <th className="px-4 py-2 font-semibold">Phone</th>
                <th className="px-4 py-2 font-semibold">Spent</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 flex items-center gap-2">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={`https://randomuser.me/api/portraits/lego/${index}.jpg`}
                      alt="avatar"
                    />
                    {user.firstname} {user.lastname}
                  </td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">27 April, 2023 at 2:47pm</td>
                  <td className="px-4 py-2">{user.phone || "-"}</td>
                  <td className="px-4 py-2">${user.spent || (20 + index * 10)}.00</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCustomer;
