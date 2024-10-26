import Footer from "#/components/common/footer/Footer";
import Navbar from "#/components/common/navigation/Navbar";
import { useAuth } from "#/hooks/auth";
import { getAccessToken } from "#/utils/token";

export default function MainLayouts({ children }: { children: React.ReactNode }) {
	const { getUser } = useAuth();
	const token = getAccessToken();

	const { user } = getUser(token || 'guest');
	console.log(user)
	return (
		<main>
			<Navbar user={user} />
			<main className="">{children}</main>
			<Footer />
		</main>
	);
}
