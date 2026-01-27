import React from 'react';
import OverviewChart from './OverviewChart';
import RejectedProductsPage from './RecentUser';
import Cardd from './Card';

const EventOverview = () => {
    return (
        <div>
          <Cardd />
          <OverviewChart />
          <RejectedProductsPage />
        </div>
    );
};

export default EventOverview;