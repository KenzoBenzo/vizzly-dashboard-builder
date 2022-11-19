import type { AppProps } from "next/app";
import {
	AuthProvider,
	ModalsProvider,
	SaasProvider as SaasUIProvider,
} from "@saas-ui/react";
import Link, { LinkProps } from "next/link";
import { ClerkAuthProvider } from "@saas-ui/clerk";
import { customTheme } from "../components/theme";
import { DefaultLayout } from "../components/templates/default-layout";

// Create a link wrapper, this way Saas UI components will use the Next router.
const NextLink: React.FC<LinkProps> = (props) => <Link passHref {...props} />;

const frontendApi = process.env.NEXT_PUBLIC_CLERK_API;

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ClerkAuthProvider frontendApi={frontendApi}>
			{({ authService }) => (
				<SaasUIProvider theme={customTheme} linkComponent={NextLink}>
					<ModalsProvider>
						<AuthProvider {...authService}>
							<DefaultLayout>
								<Component {...pageProps} />
							</DefaultLayout>
						</AuthProvider>
					</ModalsProvider>
				</SaasUIProvider>
			)}
		</ClerkAuthProvider>
	);
}
