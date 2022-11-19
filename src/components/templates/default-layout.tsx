import { Box, DarkMode, Spacer, Text, useColorMode } from "@chakra-ui/react";
import { UserButton } from "@clerk/clerk-react";
import { AppShell } from "@saas-ui/app-shell";
import { useAuth } from "@saas-ui/react";
import { Sidebar, SidebarSection, NavItem } from "@saas-ui/sidebar";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import {
	ChartBreakoutSquareIcon,
	MoonStarIcon,
	Settings01Icon,
	SunIcon,
} from "../atoms/icons";
import { AuthenticationLayout } from "./authentication";

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
	const router = useRouter();
	const { colorMode, toggleColorMode } = useColorMode();
	const { isAuthenticated, isLoading, isLoggingIn } = useAuth();

	if (isLoading || isLoggingIn) {
		return <div>Loading...</div>;
	}

	if (!isAuthenticated) {
		return <AuthenticationLayout />;
	}

	return (
		<AppShell
			height='100vh'
			variant='fullscreen'
			sidebar={
				<DarkMode>
					<Sidebar
						position='sticky'
						top='0'
						m={3}
						backgroundColor='gray.900'
						borderRadius='lg'
						borderRight='none'
					>
						<SidebarSection
							direction='row'
							justifyContent='space-between'
							alignItems='center'
						>
							<Text fontWeight='bold' color='chakra-body-text'>
								Hello world
							</Text>
							<UserButton afterSignOutUrl='/' />
						</SidebarSection>
						<SidebarSection>
							<NavItem
								icon={<ChartBreakoutSquareIcon />}
								label='Home'
								href='/'
								isActive={router.asPath === `/`}
								variant='subtle'
								colorScheme='secondary'
							/>
						</SidebarSection>
						<Spacer />
						<SidebarSection>
							<NavItem
								icon={colorMode === "light" ? <MoonStarIcon /> : <SunIcon />}
								label={`Change to ${
									colorMode == "light" ? "dark" : "light"
								} mode`}
								onClick={toggleColorMode}
							/>
							<NavItem
								icon={<Settings01Icon />}
								label='Settings'
								href='/settings'
								isActive={router.asPath === `/settings`}
							/>
						</SidebarSection>
					</Sidebar>
				</DarkMode>
			}
		>
			<Box as='main' flex='1' py='3' px='4' overflowY='auto'>
				{children}
			</Box>
		</AppShell>
	);
};
