

import {Logo, Nav} from "./Nav";
import Social from "./Social";
import {useAuth} from "./auth";
import {Link} from "./ui/link";


const Footer = () => {
	const auth = useAuth();
	return (
		<footer className={'footer'}>
			<div className={'footer__inner'}>
				<Logo />
				<Nav />
				<Social/>
				<div className={'info'}>
					<div className={'info__site'}>
						<a>
						©2022 - Site title
						</a>
					</div>
					<div className={'info__privacy'}>
						<a>
							Privicy Policy
						</a>
					</div>
					<div className={'info__site'}>
						<a>
						Terms & Conditions
						</a>
					</div>
					<div className={'info__login'}>
						<a>
							Login
						</a>
						{auth.ready && auth.sessionData ? (
							<p>
								You're signed in as {auth.sessionData.name} |{' '}
								<button onClick={() => auth.signOut()}>sign out</button>
							</p>
						) : (
							<p>
								<Link href="/signin">Sign In</Link> | <Link href="/signup">Join</Link>
							</p>
						)}
					</div>

				</div>
			</div>
		</footer>
	);
};

export default Footer;