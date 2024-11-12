"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "#/components/ui/chart";

export const description = "A bar chart with a label";

const chartData = [
	{ month: "January", desktop: 186 },
	{ month: "February", desktop: 305 },
	{ month: "March", desktop: 237 },
	{ month: "April", desktop: 73 },
	{ month: "May", desktop: 209 },
	{ month: "June", desktop: 214 },
	{ month: "July", desktop: 186 },
	{ month: "August", desktop: 305 },
	{ month: "September", desktop: 237 },
	{ month: "October", desktop: 73 },
	{ month: "November", desktop: 209 },
	{ month: "December", desktop: 214 },
];

const chartConfig = {
	desktop: {
		label: "Sales",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig;

export default function Charts() {
	return (
		<Card className="border border-zinc-300 rounded-lg h-full">
			<CardHeader>
				<CardTitle>Overview</CardTitle>
				<CardDescription>January - Desember 2024</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart
						accessibilityLayer
						data={chartData}
						margin={{
							top: 20,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
							<LabelList
								position="top"
								offset={12}
								className="fill-foreground"
								fontSize={12}
							/>
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
