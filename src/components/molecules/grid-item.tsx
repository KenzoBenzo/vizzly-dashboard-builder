import { ResponsiveValue, GridItem as ChakraGridItem } from "@chakra-ui/react";
import { Card, CardBody, CardHeader, CardTitle } from "@saas-ui/react";
import { ReactNode } from "react";

export const GridItem = ({
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
