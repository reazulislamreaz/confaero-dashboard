import React from 'react';

import OverviewChart from './OverviewChart';
import RejectedProductsPage from './RecentUser';
import Cardd from './Card';
import AdminOverview from './AdminOverview';

const admin = false;

const DashboardHome = () => {
  return (
    <div>
      {admin ? (
        <AdminOverview />
      ) : (
        <>
          <Cardd />
          <OverviewChart />
          <RejectedProductsPage />
        </>
      )}
    </div>
  );
};

export default DashboardHome;
