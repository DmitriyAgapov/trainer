import {Logo, Nav} from "./Nav";
import React, {useEffect, useState} from "react";
import {useWindowSize} from "../utils";
import Social from "./Social";

const useToggle = (initialState) => {
	const [isToggled, setIsToggled] = useState(initialState);

	// put [setIsToggled] into the useCallback's dependencies array
	// this value never changes so the callback is not going to be ever re-created
	const toggle = React.useCallback(
		() => setIsToggled(state => !state),
		[setIsToggled],
	);

	return [isToggled, toggle];
}
const Burger = () => {
	const [isToggled, toggle] = useToggle(false);
	return (
		<div className={'burger'} data-open={isToggled} onClick={toggle}>
			<div className={'burger__trigger'}/>
			<div className={'burger__line'}/>
			<Logo/>
			<Nav/>
			<Social/>
		</div>
	)
}

const Header = ({className, burger}) => {

	return (
		<>
			<header className={`header header__${className}`}>
				<div className={'header__inner'}>
					<Logo/>
					{(!burger) ? <Nav/> : null}
				</div>
			</header>
			{(burger) ? <Burger/> : null}

		</>
	);
};

export default Header;