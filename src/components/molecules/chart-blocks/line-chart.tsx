import { useToken } from "@chakra-ui/react";
import {
	Brush,
	CartesianGrid,
	Legend,
	Line,
	LineChart as RechartLine,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

export const LineChart = ({
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
		dots?: boolean;
		color?: string;
	};
}) => {
	const [primary300] = useToken("colors", ["primary.300"]);
	return (
		<ResponsiveContainer width='100%' height={290}>
			<RechartLine
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
				{features?.tooltip && <Tooltip />}
				{features?.legend && <Legend />}
				{features?.brush && <Brush />}
				<Line
					type='monotoneX'
					dataKey={yAxisDataKey}
					stroke={features?.color || primary300}
					dot={features?.dots || false}
					strokeWidth={2}
				/>
			</RechartLine>
		</ResponsiveContainer>
	);
};
