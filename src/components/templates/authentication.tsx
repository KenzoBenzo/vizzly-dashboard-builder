import { Box, Center, Text, useColorModeValue } from "@chakra-ui/react";
import { Auth } from "@saas-ui/react";
import { GoogleIcon } from "../atoms/icons";

export const AuthenticationLayout = () => {
	const defaultBackground = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");
	// const logoColor = useColorModeValue("gray.900", "white");

	return (
		<Center>
			<Box maxW='400px' w='100%'>
				<Auth
					providers={{
						google: {
							icon: GoogleIcon,
							name: "Google",
						},
					}}
				/>
			</Box>
			<Box ml='400px'>
				<Box
					h='100vh'
					w='2px'
					bgColor={borderColor}
					display='flex'
					alignItems='center'
				>
					<Box p={4} bgColor={defaultBackground} ml='-46px'>
						<Text fontWeight='bold'>Hello world</Text>
					</Box>
				</Box>
			</Box>
		</Center>
	);
};
