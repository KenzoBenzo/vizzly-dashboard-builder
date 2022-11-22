import { SunIcon } from "@chakra-ui/icons";
import {
	Divider,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	Spacer,
	Text,
	useColorMode,
	useDisclosure,
} from "@chakra-ui/react";
import { Property } from "@saas-ui/react";
import { Sidebar, SidebarSection, NavItem } from "@saas-ui/sidebar";
import {
	ChevronRightDoubleIcon,
	ChevronLeftDoubleIcon,
	MoonStarIcon,
} from "../atoms/icons";
import { useEditorContext } from "../utils/editor-context";

export const EditorSidebar = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const { isOpen, onToggle } = useDisclosure({
		defaultIsOpen: true,
	});
	const { itemSelected, setItemSelected, globalColumns, setGlobalColumns } =
		useEditorContext();
	return (
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
					icon={isOpen ? <ChevronRightDoubleIcon /> : <ChevronLeftDoubleIcon />}
					onClick={onToggle}
					label={`${isOpen ? "Collapse" : "Expand"} Sidebar`}
				/>
				<Divider mt={2} />
			</SidebarSection>

			<SidebarSection display={isOpen ? "block" : "none"}>
				<Text fontWeight='bold' fontSize='sm' mb={2}>
					General
				</Text>
				<Property
					label='Number of columns'
					labelWidth='150px'
					value={
						<NumberInput
							size='sm'
							value={globalColumns}
							onChange={(e) => setGlobalColumns(parseInt(e))}
							min={1}
						>
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
				<Text color='muted'>Select a component on the dashboard to edit.</Text>
			</SidebarSection>
			<Spacer />
			<SidebarSection>
				<Divider mt={4} mb={2} />
				<NavItem
					icon={colorMode === "light" ? <MoonStarIcon /> : <SunIcon />}
					label={`Change to ${colorMode == "light" ? "dark" : "light"} mode`}
					onClick={toggleColorMode}
				/>
			</SidebarSection>
		</Sidebar>
	);
};
