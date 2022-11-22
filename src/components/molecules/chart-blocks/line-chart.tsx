import { useToken } from "@chakra-ui/react";
import {
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
			<RechartLine
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
				<Tooltip />
				<Legend />
				<Line
					type='monotoneX'
					dataKey={yAxisDataKey}
					stroke={primary300}
					dot={false}
					strokeWidth={2}
				/>
			</RechartLine>
		</ResponsiveContainer>
	);
};
