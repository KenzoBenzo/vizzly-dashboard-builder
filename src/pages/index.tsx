import { Flex, Grid, GridItem as ChakraGridItem } from "@chakra-ui/react";
import { Divider } from "@saas-ui/react";
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
						{item.type === "line" ? (
							<LineChart {...item} />
						) : item.type === "bar" ? (
							<BarChart {...item} />
						) : null}
					</GridItem>
				))}
				{/* <ChakraGridItem colSpan={1}>
					<Empty />
				</ChakraGridItem> */}
			</Grid>
			<Flex justify='center' align='center'>
				<Divider />
				<Empty />
				<Divider />
			</Flex>
		</>
	);
}
