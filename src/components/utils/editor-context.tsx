import { ResponsiveValue } from "@chakra-ui/react";
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
	const [itemSelected, setItemSelected] = useState<DashboardItem>();
	const [globalColumns, setGlobalColumns] = useState(4);
	const [dashboardItems, setDashboardItems] = useState<DashboardItem[]>([
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
