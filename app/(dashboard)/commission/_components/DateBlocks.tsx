import React from "react";

export type MeetingBlock = {
  id: string; // Unique identifier
  day: string; // Day of the week (e.g., "Пн", "Пт")
  date: string; // Date (e.g., "23", "20")
  title: string; // Meeting title and info
  time: string; // Time (e.g., "10:00")
  room: string; // Room number (e.g., "№4 каб.")
};

interface DateBlocksProps {
  meetings: MeetingBlock[];
}

const DateBlocks: React.FC<DateBlocksProps> = ({ meetings }) => {
  return (
    <div className="mx-4 py-2 px-2 flex flex-col gap-2">
      {meetings.map((meeting) => (
        <div key={meeting.id} className="flex gap-2 w-full px-2 py-2">
          <div className="flex flex-col justify-center items-center">
            <span className="text-xs">{meeting.day}</span>
            <span className="text-lg font-medium -mt-1">{meeting.date}</span>
          </div>
          <div className="rounded-xl  bg-[--primary-60] px-3 py-2 text-base text-white font-normal w-full flex overflow-ellipsis">
            {meeting.title} - {meeting.room} {meeting.time}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DateBlocks;
