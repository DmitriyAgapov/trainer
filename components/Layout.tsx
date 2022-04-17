import React, {useEffect, useState} from "react";
import Footer from './Footer'
import Head from "next/head";
import Header from "./Header";
import ButtonToTop from "./ButtonToTop";
import {useWindowSize} from "../utils";
import DotIndicator from "./DotIndicator";

export default function Layout({children, page}) {
	const {width} = useWindowSize();
	const [ burger, setBurger ] = useState(false);
	let { sections } = children.props
	useEffect(()=> {
		setBurger((width < 768 && width > 0)  ? true : false)
	})
	//
	// console.log(page)
	return (
		<>
			<Head>
				<title>Easy Work Landing page</title>
				<meta name="viewport" content="width=device-width, initial-scale=1"/>
			</Head>
				<Header className={page?.type} burger={burger}/>
				<DotIndicator props={page?.dots}/>
				<main>{children}</main>
			<ButtonToTop />
			<Footer/>
		</>
	)
}