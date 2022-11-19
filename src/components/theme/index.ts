import { extendTheme } from "@chakra-ui/react";
import { theme as baseTheme } from "@saas-ui/react";

export const customTheme = extendTheme(
	{
		components: {
			NavItem: {
				baseStyle: {
					item: {
						color: "chakra-body-text",
					},
				},
			},
		},
		global: () => ({
			"html, body": {
				height: "100%",
			},
		}),
	},
	baseTheme
);
