import { extendTheme } from "@chakra-ui/react";
import { theme as baseTheme } from "@saas-ui/react";

export const customTheme = extendTheme(
	{
		components: {
			Checkbox: {
				baseStyle: {
					control: {
						borderRadius: "4px",
					},
				},
			},
			Input: {
				sizes: {
					xs: {
						field: {
							borderRadius: "md",
						},
					},
				},
			},
			NumberInput: {
				sizes: {
					xs: {
						field: {
							borderRadius: "md",
						},
					},
				},
			},
			Select: {
				sizes: {
					xs: {
						field: {
							borderRadius: "md",
						},
					},
				},
			},
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
