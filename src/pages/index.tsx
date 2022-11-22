import {
	Box,
	Center,
	Grid,
	GridItem as ChakraGridItem,
	ResponsiveValue,
} from "@chakra-ui/react";
import { Button, Card, CardBody, CardHeader, CardTitle } from "@saas-ui/react";
import { ReactNode, useState } from "react";
import {
	LineChart,
	Line,
	BarChart,
	Bar,
	CartesianGrid,
	Legend,
	Tooltip,
	XAxis,
	YAxis,
	Brush,
	ResponsiveContainer,
	Rectangle,
} from "recharts";
import { PlusIcon } from "../components/atoms/icons";
const dataSet = require("../../public/us-sales.json");

const GridItem = ({
	type,
	title = "Auto-generated ✨",
	isSelected = false,
	colSpan,
	children,
}: {
	type: "empty" | "line" | "bar";
	title?: string;
	isSelected?: boolean;
	colSpan?: ResponsiveValue<number | "auto"> | undefined;
	children: ReactNode;
}) => {
	return (
		<ChakraGridItem
			as={Card}
			isHoverable
			colSpan={colSpan}
			variant={type == "empty" ? "outline" : "shadow"}
			borderColor={isSelected ? "primary.500" : "inherit"}
		>
			{type !== "empty" && (
				<CardHeader>
					<CardTitle fontSize='xl'>{title}</CardTitle>
				</CardHeader>
			)}
			<CardBody>{children}</CardBody>
		</ChakraGridItem>
	);
};

interface CommonProps {
	colSpan?: ResponsiveValue<number | "auto"> | undefined;
	title?: string;
}

type ConditionalProps =
	| {
			type: "line" | "bar";
			xAxisDataKey: string;
			yAxisDataKey: string;
			dataSource: string;
			data: any[];
	  }
	| {
			type: "empty";
	  };

export type DashboardItem = CommonProps & ConditionalProps;

export default function Home() {
	const [selectedItem, setSelectedItem] = useState<DashboardItem | null>();
	const dashboardItems: DashboardItem[] = [
		{
			type: "line",
			colSpan: 2,
			dataSource: "us-sales.json",
			data: dataSet.slice(0, 19),
			xAxisDataKey: "order_date",
			yAxisDataKey: "value",
		},
		{ type: "empty", colSpan: 2 },
		{
			type: "bar",
			colSpan: 4,
			dataSource: "us-sales.json",
			data: dataSet.slice(0, 19),
			xAxisDataKey: "order_date",
			yAxisDataKey: "value",
		},
		{ type: "empty" },
	];

	return (
		<>
			<Grid templateColumns='repeat(4, 1fr)' gap={4}>
				{dashboardItems.map((item, index) => {
					switch (item.type) {
						case "empty":
							return (
								<GridItem key={index} {...item}>
									<Center minH={350} w='100%'>
										<Button leftIcon={<PlusIcon />} variant='ghost'>
											Add widget
										</Button>
									</Center>
								</GridItem>
							);
						case "line":
							return (
								<GridItem key={index} {...item}>
									<ResponsiveContainer width='100%' height={290}>
										<LineChart
											data={item.data}
											margin={{
												top: 5,
												right: 30,
												left: 20,
												bottom: 5,
											}}
										>
											<CartesianGrid strokeDasharray='3 3' stroke='#8884d8' />
											<XAxis dataKey={item.xAxisDataKey} />
											<YAxis />
											<Tooltip />
											<Legend />
											<Line
												type='monotoneX'
												dataKey={item.yAxisDataKey}
												stroke='#8884d8'
												dot={false}
												strokeWidth={2}
											/>
										</LineChart>
									</ResponsiveContainer>
								</GridItem>
							);
						case "bar":
							return (
								<GridItem key={index} {...item}>
									<ResponsiveContainer width='100%' height={290}>
										<BarChart
											data={item.data}
											margin={{
												top: 5,
												right: 30,
												left: 20,
												bottom: 5,
											}}
										>
											{/* <CartesianGrid strokeDasharray='3 3' /> */}
											<XAxis dataKey={item.xAxisDataKey} />
											<YAxis />
											<Tooltip cursor={{ fill: "transparent" }} />
											<Legend />
											<Bar
												shape={<Rectangle radius={[8, 8, 0, 0]} />}
												dataKey={item.yAxisDataKey}
												fill='#8884d8'
											/>
										</BarChart>
									</ResponsiveContainer>
								</GridItem>
							);
					}
				})}
			</Grid>
		</>
	);
}
