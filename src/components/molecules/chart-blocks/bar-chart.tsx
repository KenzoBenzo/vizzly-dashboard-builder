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
	Brush,
} from "recharts";

export const BarChart = ({
	data,
	sliceData,
	xAxisDataKey,
	yAxisDataKey,
	features,
}: {
	data: any[];
	sliceData?: number;
	xAxisDataKey: string;
	yAxisDataKey: string;
	features?: {
		cartesianGrid?: boolean;
		legend?: boolean;
		tooltip?: boolean;
		brush?: boolean;
		borderRadius?: number;
		color?: string;
	};
}) => {
	const [primary300] = useToken("colors", ["primary.300"]);

	const borderRadius = features?.borderRadius || 0;
	return (
		<ResponsiveContainer width='100%' height={290}>
			<RechartBar
				data={sliceData ? data.slice(0, sliceData) : data}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5,
				}}
			>
				{features?.cartesianGrid && (
					<CartesianGrid
						strokeDasharray='3 3'
						stroke='var(--chakra-colors-chakra-border-color)'
					/>
				)}
				<XAxis
					dataKey={xAxisDataKey}
					stroke='var(--chakra-colors-chakra-placeholder-color)'
				/>
				<YAxis stroke='var(--chakra-colors-chakra-placeholder-color)' />
				{features?.tooltip && <Tooltip cursor={{ fill: "transparent" }} />}
				{features?.legend && <Legend />}
				{features?.brush && <Brush />}
				<Bar
					dataKey={yAxisDataKey}
					fill={features?.color || primary300}
					shape={<Rectangle radius={[borderRadius, borderRadius, 0, 0]} />}
				/>
			</RechartBar>
		</ResponsiveContainer>
	);
};
