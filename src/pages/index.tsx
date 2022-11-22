import { Grid } from "@chakra-ui/react";
import {
	LineChart,
	BarChart,
	Empty,
} from "../components/molecules/chart-blocks";
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
									<Empty />
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
									<LineChart {...item} />
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
									<BarChart {...item} />
								</GridItem>
							);
					}
				})}
			</Grid>
		</>
	);
}
