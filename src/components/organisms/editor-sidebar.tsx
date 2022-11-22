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
	IconButton,
	Flex,
} from "@chakra-ui/react";
import { Button, Property, PropertyList } from "@saas-ui/react";
import { Sidebar, SidebarSection, NavItem, Nav } from "@saas-ui/sidebar";
import {
	ChevronRightDoubleIcon,
	ChevronLeftDoubleIcon,
	MoonStarIcon,
	XCloseIcon,
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
				<Flex w='full' justify='space-between' align='center' gap={4}>
					<NavItem
						icon={
							isOpen ? <ChevronRightDoubleIcon /> : <ChevronLeftDoubleIcon />
						}
						onClick={onToggle}
						label={`${isOpen ? "Collapse" : "Expand"} Sidebar`}
						w='full'
					/>
					<Button
						leftIcon={<XCloseIcon />}
						title='close button'
						aria-label='close button'
						iconSpacing={0}
						size='xs'
						variant='ghost'
						display={isOpen ? "block" : "none"}
						onClick={() => setItemSelected(undefined)}
					/>
				</Flex>
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
				{!itemSelected ? (
					<Text color='muted'>
						Select a component on the dashboard to edit.
					</Text>
				) : (
					<>
						<PropertyList>
							<Property
								label='Title'
								labelWidth='150px'
								value={itemSelected.title}
							/>
							<Property
								label='Type'
								labelWidth='150px'
								value={itemSelected.type}
							/>
						</PropertyList>
					</>
				)}
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
