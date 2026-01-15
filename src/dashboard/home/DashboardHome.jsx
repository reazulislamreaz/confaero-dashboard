import React from 'react';
 
import OverviewChart from './OverviewChart';
import RejectedProductsPage from './RecentUser'; 
import Cardd from './Card';
 
 
 

const DashboardHome = () => {
 
    return (
        <div>
             <Cardd />
             <OverviewChart />
             <RejectedProductsPage />
        </div>
    );
};

export default DashboardHome;