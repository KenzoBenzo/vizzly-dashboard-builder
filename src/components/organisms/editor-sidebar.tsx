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
	Flex,
	Input,
	Select,
	Checkbox,
} from "@chakra-ui/react";
import { Button, Property, PropertyList } from "@saas-ui/react";
import { Sidebar, SidebarSection, NavItem } from "@saas-ui/sidebar";
import {
	ChevronRightDoubleIcon,
	ChevronLeftDoubleIcon,
	MoonStarIcon,
	XCloseIcon,
} from "../atoms/icons";
import { useEditorContext } from "../utils/editor-context";
const dataSet = require("../../../public/us-sales.json");

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
					label='Columns'
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
								value={
									<Input
										size='sm'
										w='full'
										value={itemSelected?.title || "Auto-generated ✨"}
									/>
								}
							/>
							<Property
								label='Type'
								value={
									<Select size='sm' value={itemSelected.type}>
										<option value='empty'>Empty</option>
										<option value='line'>Line Chart</option>
										<option value='bar'>Bar Chart</option>
									</Select>
								}
							/>
							<Property
								label='Column span'
								value={
									<NumberInput
										size='sm'
										// @ts-expect-error TODO: coerce column type to number type
										value={
											itemSelected?.colSpan == "auto" ||
											itemSelected?.colSpan == undefined
												? 1
												: itemSelected?.colSpan
										}
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
							{itemSelected.type !== "empty" && (
								<>
									<Property
										label='Data source'
										value={
											<Select
												size='sm'
												value={itemSelected?.dataSource}
												isDisabled
											>
												<option value='us-sales.json'>us-sales.json</option>
											</Select>
										}
									/>
									<Property
										label='X axis'
										value={
											<Select size='sm' value={itemSelected?.xAxisDataKey}>
												{Object.keys(dataSet[0])
													.filter((key) => key !== itemSelected.yAxisDataKey)
													.map((dataKey) => (
														<option key={dataKey}>{dataKey}</option>
													))}
											</Select>
										}
									/>
									<Property
										label='Y axis'
										value={
											<Select size='sm' value={itemSelected?.yAxisDataKey}>
												{Object.keys(dataSet[0])
													.filter((key) => key !== itemSelected.xAxisDataKey)
													.map((dataKey) => (
														<option key={dataKey}>{dataKey}</option>
													))}
											</Select>
										}
									/>
									<Text fontWeight='bold' fontSize='sm' mt={8} mb={2}>
										Chart features
									</Text>

									<Property
										label='Cartesian grid'
										value={<Checkbox>Applied</Checkbox>}
									/>
									<Property
										label='Tooltip'
										value={<Checkbox>Applied</Checkbox>}
									/>
									<Property
										label='Legend'
										value={<Checkbox>Applied</Checkbox>}
									/>
									<Property
										label='Brush'
										value={<Checkbox>Applied</Checkbox>}
									/>
									{itemSelected.type === "line" && (
										<Property
											label='Dots'
											value={<Checkbox>Applied</Checkbox>}
										/>
									)}
									{itemSelected.type === "bar" && (
										<Property
											label='Border radius'
											value={
												<NumberInput size='sm' min={0}>
													<NumberInputField />
													<NumberInputStepper>
														<NumberIncrementStepper />
														<NumberDecrementStepper />
													</NumberInputStepper>
												</NumberInput>
											}
										/>
									)}
									{/* TODO: add some input level validation for acceptable color strings */}
									<Property label='Color' value={<Input size='sm' />} />
								</>
							)}
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
