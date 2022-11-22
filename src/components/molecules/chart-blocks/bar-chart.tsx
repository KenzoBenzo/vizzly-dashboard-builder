import { useToken } from "@chakra-ui/react";
import React from "react";
import {
	CartesianGrid,
	Legend,
	Bar,
	BarChart as RechartBar,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
	Rectangle,
} from "recharts";

export const BarChart = ({
	data,
	xAxisDataKey,
	yAxisDataKey,
}: {
	data: any[];
	xAxisDataKey: string;
	yAxisDataKey: string;
}) => {
	const [primary300] = useToken("colors", ["primary.300"]);
	return (
		<ResponsiveContainer width='100%' height={290}>
			<RechartBar
				data={data}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5,
				}}
			>
				<CartesianGrid
					strokeDasharray='3 3'
					stroke='var(--chakra-colors-chakra-border-color)'
				/>
				<XAxis
					dataKey={xAxisDataKey}
					stroke='var(--chakra-colors-chakra-placeholder-color)'
				/>
				<YAxis stroke='var(--chakra-colors-chakra-placeholder-color)' />
				<Tooltip cursor={{ fill: "transparent" }} />
				<Legend />
				<Bar
					dataKey={yAxisDataKey}
					fill={primary300}
					shape={<Rectangle radius={[8, 8, 0, 0]} />}
				/>
			</RechartBar>
		</ResponsiveContainer>
	);
};
