import { Center, Grid } from "@chakra-ui/react";
import { Button } from "@saas-ui/react";
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
import { GridItem } from "../components/molecules/grid-item";
import { useEditorContext } from "../components/utils/editor-context";

export default function Home() {
	const { globalColumns, dashboardItems, itemSelected, setItemSelected } =
		useEditorContext();

	return (
		<>
			<Grid templateColumns={`repeat(${globalColumns}, 1fr)`} gap={4}>
				{dashboardItems.map((item, index) => {
					switch (item.type) {
						case "empty":
							return (
								<GridItem
									key={index}
									onClick={() => setItemSelected(item)}
									isSelected={
										itemSelected != undefined &&
										dashboardItems.findIndex(
											(element, index, array) =>
												element.type === itemSelected?.type &&
												element.title === itemSelected?.title &&
												element.colSpan === itemSelected?.colSpan
										) === index
									}
									{...item}
								>
									<Center minH={350} w='100%'>
										<Button leftIcon={<PlusIcon />} variant='ghost'>
											Add widget
										</Button>
									</Center>
								</GridItem>
							);
						case "line":
							return (
								<GridItem
									key={index}
									onClick={() => setItemSelected(item)}
									isSelected={
										itemSelected != undefined &&
										dashboardItems.findIndex(
											(element, index, array) =>
												element.type === itemSelected?.type &&
												element.title === itemSelected?.title &&
												element.colSpan === itemSelected?.colSpan
										) === index
									}
									{...item}
								>
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
											<CartesianGrid
												strokeDasharray='3 3' /*stroke='#8884d8'*/
											/>
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
								<GridItem
									key={index}
									onClick={() => setItemSelected(item)}
									isSelected={
										itemSelected != undefined &&
										dashboardItems.findIndex(
											(element, index, array) =>
												element.type === itemSelected?.type &&
												element.title === itemSelected?.title &&
												element.colSpan === itemSelected?.colSpan
										) === index
									}
									{...item}
								>
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
