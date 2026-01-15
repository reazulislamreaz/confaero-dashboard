import React from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io';

const Notification = () => {
    return (
        <div className='mt-8 mx-6'>
        <h1 className='font-semibold text-[30px]'>Notifications</h1> 

        <div className="mt-8 flex border rounded border-[#193664]] items-center w-full h-[85px]">
         <div> 
              <p className=""><IoMdNotificationsOutline className=" h-12 w-12 ml-4 border rounded-full p-2 border-[#193664] text-[#193664]]" />
              </p>
         </div>
         <div> 
              <p className="text-[18px] ml-8 font-medium text-[#333333]"> oh! very good well done <br /> <span className=''> admin </span></p>
              {/* <p className='text-[18px] ml-8 font-medium'>{notification?.createdAt?.split("T")[0] ? notification?.createdAt?.split("T")[0] : "N/A"}</p> */}
              <p className='text-[18px] ml-8 font-medium text-[#76b395]'>2 minute ago</p>
            
         </div> 
         </div>
     
        
  </div>
    );
};

export default Notification;