import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

export const LineComponent = ({
	data,
	xAxisDataKey,
	yAxisDataKey,
}: {
	data: any[];
	xAxisDataKey: string;
	yAxisDataKey: string;
}) => {
	return (
		<LineChart data={data}>
			<CartesianGrid strokeDasharray='3 3' />
			<XAxis dataKey={xAxisDataKey} />
			<YAxis />
			<Tooltip />
			<Legend />
			<Line type='monotone' dataKey={yAxisDataKey} stroke='#8884d8' />
		</LineChart>
	);
};
