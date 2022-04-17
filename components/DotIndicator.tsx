import React, {useEffect} from 'react';

import {Link, animateScroll as scroll, scrollSpy, scroller} from 'react-scroll'

const DotIndicator = ({props}) => {

	let options = {
		duration: 1500,
		delay: 100,
		smooth: 'easeInOutQuint'
	}
	return (
		<div className={'dotindicator'}>
			<ul className={"dotindicator__links"}>
				{props?.map(item =>
					<li key={item?.id} className={'dotindicator__item'}>
						<Link
							className={"dotindicator__link"}
							activeClass="dotindicator__link-active"
							to={item?.link}
							spy={true}
							smooth="easeInOutCubic"
							hashSpy={true}
							duration={500}
							spyThrottle={500}
						/>
					</li>
				)}

			</ul>
		</div>

	);
};

export default DotIndicator;