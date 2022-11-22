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

interface CommonProps {
	id: number;
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
	| {
			type: "empty";
	  };

export type DashboardItem = CommonProps & ConditionalProps;

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
			type: "line",
			colSpan: 2,
			dataSource: "us-sales.json",
			data: dataSet,
			sliceData: 19,
			xAxisDataKey: "order_date",
			yAxisDataKey: "value",
			features: {
				cartesianGrid: true,
				legend: true,
				tooltip: true,
				dots: false,
				brush: false,
				color: primary500,
			},
		},
		{ id: 1, type: "empty", colSpan: 2 },
		{
			id: 2,
			type: "bar",
			colSpan: 4,
			dataSource: "us-sales.json",
			data: dataSet,
			sliceData: 19,
			xAxisDataKey: "order_date",
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
		{ id: 3, type: "empty" },
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
