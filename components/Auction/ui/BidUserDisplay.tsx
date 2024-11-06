import { Avatar, Empty } from "antd";
import React from "react";
import dayjs from "dayjs";
import { User } from "lucide-react";

import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const BidUserDisplay = ({
  participant,
  user,
}: {
  participant: BidParticipant[];
  user: User;
}) => {
  return (
    <div className="overflow-hidden border border-primary rounded-xl">
      {participant.length > 0 ? (
        <>
          <div className="px-6 py-4 text-white bg-primary 2xl:px-8 2xl:py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Avatar size="large" icon={<User />} />
              </div>
              <div className="flex-1 min-w-0 ms-4">
                <p className="text-white truncate">
                  {participant[0].user.name}{" "}
                  {participant[0].user.email == user.email && "(You)"}
                </p>
                <p className="text-sm truncate text-zinc-100">
                  {dayjs(participant[0].updatedAt).fromNow()}
                </p>
              </div>
              <div className="inline-flex items-center text-lg text-white">
                Rp {participant[0].amount.toLocaleString("id-ID")}
              </div>
            </div>
          </div>
          <div className="px-6 h-[210px] overflow-y-auto 2xl:px-8">
            <ul role="list" className="divide-y divide-gray-200">
              {participant.slice(1).map((participant) => (
                <li key={participant.id} className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Avatar icon={<User />} />
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {participant.user.name}{" "}
                        {participant.user.email == user.email && "(You)"}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {dayjs(participant.updatedAt).fromNow()}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-medium text-primary">
                      Rp {participant.amount.toLocaleString("id-ID")}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div className="px-6 h-[210px] overflow-y-auto 2xl:px-8 flex justify-center items-center">
          <Empty description="No Bidders Yet" />
        </div>
      )}

      {/* Remaining Bids Section */}
    </div>
  );
};

export default BidUserDisplay;
