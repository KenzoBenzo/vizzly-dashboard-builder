import {
	Box,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Spacer,
	Text,
	useColorMode,
	useDisclosure,
} from "@chakra-ui/react";
import { AppShell } from "@saas-ui/app-shell";
import { Divider, Property } from "@saas-ui/react";
import { Sidebar, SidebarSection, NavItem } from "@saas-ui/sidebar";
import { ReactNode } from "react";
import {
	ChevronLeftDoubleIcon,
	ChevronRightDoubleIcon,
	MoonStarIcon,
	SunIcon,
} from "../atoms/icons";

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
	const { colorMode, toggleColorMode } = useColorMode();
	const { isOpen, onToggle } = useDisclosure({
		defaultIsOpen: true,
	});

	return (
		<AppShell
			height='100vh'
			variant='fullscreen'
			aside={
				<Sidebar
					position='sticky'
					top='0'
					borderRight='none'
					borderLeft='1px solid'
					borderColor='inherit'
					variant={isOpen ? "default" : "condensed"}
					transition='width'
					transitionDuration='normal'
					minWidth='auto'
				>
					<SidebarSection>
						<NavItem
							icon={
								isOpen ? <ChevronRightDoubleIcon /> : <ChevronLeftDoubleIcon />
							}
							onClick={onToggle}
							label={`${isOpen ? "Collapse" : "Expand"} Sidebar`}
						/>
						<Divider mt={2} mb={4} />
					</SidebarSection>

					<SidebarSection display={isOpen ? "block" : "none"}>
						<Text fontWeight='bold' fontSize='sm' mb={2}>
							General
						</Text>
						<Property
							label='Number of columns'
							labelWidth='150px'
							value={
								<NumberInput size='sm' defaultValue={4} min={1}>
									<NumberInputField />
									<NumberInputStepper>
										<NumberIncrementStepper />
										<NumberDecrementStepper />
									</NumberInputStepper>
								</NumberInput>
							}
						/>

						<Divider my={4} />
						<Text fontWeight='bold' fontSize='sm' mb={2}>
							Component settings
						</Text>
						<Text color='muted'>
							Select a component on the dashboard to edit.
						</Text>
					</SidebarSection>
					<Spacer />
					<SidebarSection>
						<Divider mt={4} mb={2} />
						<NavItem
							icon={colorMode === "light" ? <MoonStarIcon /> : <SunIcon />}
							label={`Change to ${
								colorMode == "light" ? "dark" : "light"
							} mode`}
							onClick={toggleColorMode}
						/>
					</SidebarSection>
				</Sidebar>
			}
		>
			<Box as='main' flex='1' py='3' px='4' overflowY='auto'>
				{children}
			</Box>
		</AppShell>
	);
};
