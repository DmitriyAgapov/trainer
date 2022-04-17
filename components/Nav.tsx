import React, {useEffect} from "react";
import Link from 'next/link'
import * as Scroll from 'react-scroll';
import {useRouter} from 'next/router'
import {Link as ScrollLink, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller} from 'react-scroll'
import {children} from "dom7";
// import { Link as ScrollLink, animateScroll as scroll, scrollSpy} from 'react-scroll'
// let Link      = Scroll.Link;
let Button = Scroll.Button;
let Element = Scroll.Element;
let Events = Scroll.Events;
let scroll = Scroll.animateScroll;
let scrollSpy = Scroll.scrollSpy;

function scrollToTop() {
	scroll.scrollToTop(options);
}

let options = {
	duration: 1500,
	delay: 100,
	smooth: 'easeInOutQuint'
}

// @ts-ignore
const MyLink:any = React.forwardRef<HTMLAnchorElement>(({onClick, href, children}, ref) => {
	onClick = Element.link
	return (
		<a href={href} onClick={onClick} ref={ref} className={'menu__link'}>
			{children}
		</a>
	)
})
export const Logo = () => <Link href={'/#intro'
} scroll={false}><a className={'logo'}>Easy Work</a></Link>
export const Nav = () => {
	const {asPath, isReady} = useRouter()
	// console.log(isReady)
	useEffect(() => {
		if (isReady) {
			Events.scrollEvent.register('begin', function (to, element) {
				// console.log('begin', arguments);
			});
			scrollSpy.update();
		}
	}, []);
	return (
		<nav className={"menu"}>
			<ul className={"menu__links"}>
				<li className={'menu__item'}>
					<Link href={'/#why'} passHref={true}>
						<MyLink>
							About
						</MyLink>
					</Link>
				</li>
				<li className={'menu__item'}>
					<Link href={'/#benefits'} passHref={true}>
						<MyLink>
							Course
						</MyLink>
					</Link>
				</li>
				<li className={'menu__item'}>
					<Link href={'/#pricing'} passHref={true}>
						<MyLink>
							Plans
						</MyLink>
					</Link>
				</li>
				<li className={'menu__item'}>
					<Link href={'/#contacts'} passHref={true}>
						<MyLink>
							Contacts
						</MyLink>
					</Link>
					</li>
				<li className={'menu__item'}>
					<Link href={'/blog'} passHref={true}>
						<MyLink>
							Blog
						</MyLink>
					</Link>
				
				</li>
			</ul>
		</nav>
	)
}