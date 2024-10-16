import { Avatar } from 'antd';
import React from 'react'

const userBid = [
	{ name: "Arlene McCoy", time: "3 Minute ago", price: "100,000", profileImage: "/icons/user-profile.svg" },
	{ name: "Marvin McKinney", time: "10 Minute ago", price: "50,000", profileImage: "/icons/user-profile.svg" },
	{ name: "Albert Flores", time: "15 Minute ago", price: "20,000", profileImage: "/icons/user-profile.svg" },
	{ name: "Annette Black", time: "17 Minute ago", price: "100,000", profileImage: "/icons/user-profile.svg" },
	{ name: "Josua", time: "30 Minute ago", price: "50,000", profileImage: "/icons/user-profile.svg" },
];

const BidUserDisplay = () => {
	const latestUser = userBid[0]
	const users = userBid.slice(1)
  return (
		<div className="border border-primary rounded-xl overflow-hidden">
			<div className="px-6 py-4 bg-primary text-white 2xl:px-8 2xl:py-6">
				<div className="flex items-center">
					<div className="flex-shrink-0">
						<Avatar size={'large'} src={latestUser.profileImage}/>
					</div>
					<div className="flex-1 min-w-0 ms-4">
						<p className="text-white truncate">{latestUser.name}</p>
						<p className="text-sm text-zinc-100 truncate">{latestUser.time}</p>
					</div>
					<div className="inline-flex items-center text-lg text-white">
						+Rp. {latestUser.price}
					</div>
				</div>
			</div>
			<div className="px-6 h-[210px] overflow-y-auto 2xl:px-8">
				<ul role="list" className="divide-y divide-gray-200">
					{users.map((user, index) => (
						<li key={index} className="py-3 sm:py-4">
							<div className="flex items-center">
								<div className="flex-shrink-0">
									<Avatar src={user.profileImage} />
								</div>
								<div className="flex-1 min-w-0 ms-4">
									<p className="text-sm font-medium text-gray-900 truncate">
										{user.name}
									</p>
									<p className="text-xs text-gray-400 truncate">{user.time}</p>
								</div>
								<div className="inline-flex items-center text-base font-medium text-primary">
									+Rp. {user.price}
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default BidUserDisplay