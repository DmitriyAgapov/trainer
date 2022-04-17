import '../assets/styles/styles.scss'
import Layout from "../components/Layout";
import {createClient, Provider} from 'urql';
import { AuthProvider } from '../components/auth';

export const client = createClient({
	url:
		typeof window === undefined
			? 'http://localhost:3000/api/graphql'
			: '/api/graphql',
});
export default function MyApp({Component, pageProps}) {

	return (
		<Provider value={client}>
			<AuthProvider>
			<Layout page={pageProps.page}>
				<Component {...pageProps} />
			</Layout>
			</AuthProvider>
		</Provider>
	)
}