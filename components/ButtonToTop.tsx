import React, {useEffect, useState} from "react";
import { animateScroll as scroll} from 'react-scroll'
import {useWindowScrollPositions} from "../utils";
import {useWindowSize} from "../utils";

const ButtonToTop = () => {
	const { height } = useWindowSize()
	const { scrollY } = useWindowScrollPositions()
	const [hide, setHide] = useState(false)
	useEffect(()=> {
		if((height * 3) < scrollY) {
			setHide(true)
		} else setHide(false)
	})

	return hide ?(
		<a className={'button button-to-top'} onClick={scroll.scrollToTop}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
				<path d="M352 352c-8.188 0-16.38-3.125-22.62-9.375L192 205.3l-137.4 137.4c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25C368.4 348.9 360.2 352 352 352z"/>
			</svg>

	</a>) : null
}

export default ButtonToTop