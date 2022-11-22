import { Box } from "@chakra-ui/react";
import { AppShell } from "@saas-ui/app-shell";
import { ReactNode } from "react";
import { EditorSidebar } from "../organisms/editor-sidebar";

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
	return (
		<AppShell height='100vh' variant='fullscreen' aside={<EditorSidebar />}>
			<Box as='main' flex='1' py='3' px='4' overflowY='auto'>
				{children}
			</Box>
		</AppShell>
	);
};
