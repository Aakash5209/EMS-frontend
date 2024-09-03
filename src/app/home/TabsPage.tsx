// src/app/home/TabsPage.tsx

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const TabsPage = () => {
  const router = useRouter();
  const [tab, setTab] = useState<string>("user");

  useEffect(() => {
    // Initialize tab from URL or localStorage
    const query = new URLSearchParams(window.location.search);
    const activeTab = query.get('tab') || localStorage.getItem("activeTab") || "user";
    setTab(activeTab);
  }, []);

  const handleTabChange = (newTab: string) => {
    setTab(newTab);
    localStorage.setItem("activeTab", newTab); // Persist tab state
    router.push(`?tab=${newTab}`); // Update URL
  };

  return (
    <div>
      <button onClick={() => handleTabChange("user")}>User</button>
      <button onClick={() => handleTabChange("salary")}>Salary</button>
      <button onClick={() => handleTabChange("approval")}>Approval</button>

      {tab === "user" && <div>User Content</div>}
      {tab === "salary" && <div>Salary Content</div>}
      {tab === "approval" && <div>Approval Content</div>}
    </div>
  );
};

export default TabsPage;
