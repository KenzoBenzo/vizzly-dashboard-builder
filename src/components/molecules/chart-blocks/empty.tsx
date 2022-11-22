import React from "react";
import { Center } from "@chakra-ui/react";
import { Button } from "@saas-ui/react";
import { PlusIcon } from "../../atoms/icons";

export const Empty = () => {
	return (
		<Center minH={350} w='100%'>
			<Button leftIcon={<PlusIcon />} variant='ghost'>
				Add widget
			</Button>
		</Center>
	);
};
