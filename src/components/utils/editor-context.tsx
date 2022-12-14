import { ResponsiveValue, useToken } from "@chakra-ui/react";
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useContext,
	useState,
} from "react";
const dataSet = require("../../../public/us-sales.json");

interface DashboardItem {
	id: number;
	colSpan?: ResponsiveValue<number | "auto"> | undefined;
	title?: string;
	type: "line" | "bar";
	xAxisDataKey: string;
	yAxisDataKey: string;
	dataSource: string;
	data: any[];
	sliceData?: number;
	features?: {
		cartesianGrid?: boolean;
		legend?: boolean;
		tooltip?: boolean;
		dots?: boolean;
		borderRadius?: number;
		color?: string;
		brush?: boolean;
	};
}

export interface EditorContextType {
	itemSelected: DashboardItem | undefined;
	setItemSelected: Dispatch<SetStateAction<DashboardItem | undefined>>;
	globalColumns: number;
	setGlobalColumns: Dispatch<SetStateAction<number>>;
	dashboardItems: DashboardItem[];
	setDashboardItems: Dispatch<SetStateAction<DashboardItem[]>>;
}

const EditorContext = createContext<EditorContextType | null>(null);

export const useEditorContext = () => {
	const context = useContext(EditorContext);
	if (!context) {
		throw new Error(
			"useEditorContext must be used within a EditorContextProvider"
		);
	}
	return context;
};

export function EditorContextProvider({ children }: { children: ReactNode }) {
	const [primary500] = useToken("colors", ["primary.500"]);
	const [itemSelected, setItemSelected] = useState<DashboardItem>();
	const [globalColumns, setGlobalColumns] = useState(4);
	const [dashboardItems, setDashboardItems] = useState<DashboardItem[]>([
		{
			id: 0,
			title: "Quantity ordered by date",
			type: "line",
			colSpan: 2,
			dataSource: "us-sales.json",
			data: dataSet,
			sliceData: 19,
			xAxisDataKey: "order_date",
			yAxisDataKey: "qty_ordered",
			features: {
				cartesianGrid: true,
				legend: true,
				tooltip: true,
				dots: false,
				brush: false,
				color: primary500,
			},
		},
		{
			id: 2,
			title: "Sales value by category",
			type: "bar",
			colSpan: 4,
			dataSource: "us-sales.json",
			data: dataSet,
			sliceData: 19,
			xAxisDataKey: "category",
			yAxisDataKey: "value",
			features: {
				cartesianGrid: true,
				legend: true,
				tooltip: true,
				brush: false,
				borderRadius: 8,
				color: primary500,
			},
		},
	]);

	const providerValue: EditorContextType = {
		itemSelected,
		setItemSelected,
		globalColumns,
		setGlobalColumns,
		dashboardItems,
		setDashboardItems,
	};
	return (
		<EditorContext.Provider value={providerValue}>
			{children}
		</EditorContext.Provider>
	);
}
