import React from 'react';
import OverviewChart from './OverviewChart';
import RejectedProductsPage from './RecentUser';
import Cardd from './EventHeader';
import { useParams } from 'react-router-dom';

const EventOverview = () => {
    const {id} = useParams();
    return (
        <div>
          <Cardd eventId={id} />
          <OverviewChart eventId={id} />
          <RejectedProductsPage eventId={id} />
        </div>
    );
};

export default EventOverview;