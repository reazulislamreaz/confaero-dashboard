import React from "react";

import OverviewChart from "./OverviewChart";
import RejectedProductsPage from "./RecentUser";
import Cardd from './EventHeader';
import AdminOverview from "./AdminOverview";
import { useGetEventQuery } from "../../redux/features/eventSlice/eventSlice";
import { useIsAdmin } from "../../hooks/useUserRole";
import { useSelectedEvent } from "../../hooks/useSelectedEvent";

const DashboardHome = () => {
  const isAdmin = useIsAdmin();

  const { data: eventResponse } = useGetEventQuery();
  

  const { eventId, setEvent } = useSelectedEvent();
  console.log(eventId);

  const event = eventResponse?.data;
  console.log(event);

  React.useEffect(() => {
    if (event && !eventId) setEvent(event);
  }, [event, eventId, setEvent]);

  return (
    <div>
      {isAdmin ? (
        <AdminOverview />
      ) : (
        <>
          <Cardd eventId={eventId} />
          <OverviewChart eventId={eventId} />
          <RejectedProductsPage eventId={eventId} />
        </>
      )}
    </div>
  );
};

export default DashboardHome;
