import React from 'react';

import OverviewChart from './OverviewChart';
import RejectedProductsPage from './RecentUser';
import Cardd from './Card';
import AdminOverview from './AdminOverview';
import { useGetEventQuery } from '../../redux/features/eventSlice/eventSlice';
import { useIsAdmin } from '../../hooks/useUserRole';

const DashboardHome = () => {
  const isAdmin = useIsAdmin();
  const { data: eventResponse, isLoading, isError } = useGetEventQuery();

  console.log(eventResponse)

  return (
    <div>
      {isAdmin ? (
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
