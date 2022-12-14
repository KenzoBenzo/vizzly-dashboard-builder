import type { AppProps } from "next/app";
import { ModalsProvider, SaasProvider as SaasUIProvider } from "@saas-ui/react";
import Link, { LinkProps } from "next/link";
import { customTheme } from "../components/theme";
import { DefaultLayout } from "../components/templates/default-layout";
import { EditorContextProvider } from "../components/utils/editor-context";

// Create a link wrapper, this way Saas UI components will use the Next router.
const NextLink: React.FC<LinkProps> = (props) => <Link passHref {...props} />;

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SaasUIProvider theme={customTheme} linkComponent={NextLink}>
			<ModalsProvider>
				<EditorContextProvider>
					<DefaultLayout>
						<Component {...pageProps} />
					</DefaultLayout>
				</EditorContextProvider>
			</ModalsProvider>
		</SaasUIProvider>
	);
}
