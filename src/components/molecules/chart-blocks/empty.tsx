import React from "react";
import { Center } from "@chakra-ui/react";
import { Button } from "@saas-ui/react";
import { PlusIcon } from "../../atoms/icons";
import { useEditorContext } from "../../utils/editor-context";
const dataSet = require("../../../../public/us-sales.json");

export const Empty = () => {
	const { setDashboardItems, dashboardItems } = useEditorContext();
	return (
		<Center minH={20} minW='fit-content'>
			<Button
				leftIcon={<PlusIcon />}
				variant='ghost'
				onClick={() =>
					setDashboardItems([
						...dashboardItems,
						{
							id: dashboardItems.length + 2,
							type: "line",
							dataSource: "us-sales.json",
							data: dataSet,
							sliceData: 19,
							xAxisDataKey: "order_date",
							yAxisDataKey: "value",
							features: {
								cartesianGrid: undefined,
								legend: undefined,
								tooltip: undefined,
								dots: undefined,
								brush: undefined,
								color: "",
							},
						},
					])
				}
			>
				Add widget
			</Button>
		</Center>
	);
};
