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
				{dashboardItems.map((item) => (
					<GridItem
						key={item.id}
						onClick={() => setItemSelected(item)}
						isSelected={item.id == itemSelected?.id}
						{...item}
					>
						{item.type === "empty" ? (
							<Empty />
						) : item.type === "line" ? (
							<LineChart {...item} />
						) : item.type === "bar" ? (
							<BarChart {...item} />
						) : null}
					</GridItem>
				))}
			</Grid>
		</>
	);
}
