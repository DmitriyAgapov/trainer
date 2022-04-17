import React from 'react';
// import Icon from "./Icon";
// import dynamic from "next/dynamic";

const Social = () => {
	// let src = [
	// 	{
	// 		url: 'http://instagram.com',
	// 		filename: 'insta.svg'
	// 	},
	// 	{
	// 		url: 'http://fb.com',
	// 		filename: 'fb.svg'
	// 	},
	// 	{
	// 		url: 'http://linkedin.com',
	// 		filename: 'ldn.svg'
	// 	},
	//
	// ]
	//
	// const DynamicComponent = dynamic(() => import(`../public/files/svg/${src[0].filename}`))
	// const DynamicComponentFb = dynamic(() => import(`../public/files/svg/${src[1].filename}`))
	// const DynamicComponentLdn = dynamic(() => import(`../public/files/svg/${src[2].filename}`))
	return (
		<div className={'social'}>
			<a href={'https://instagram.com'}>
				<div className={'social__item_image'}>
					<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M16.0036 7.7956C11.4632 7.7956 7.801 11.4587 7.801 16C7.801 20.5413 11.4632 24.2044 16.0036 24.2044C20.5439 24.2044 24.2061 20.5413 24.2061 16C24.2061 11.4587 20.5439 7.7956 16.0036 7.7956ZM16.0036 21.3339C13.0695 21.3339 10.6708 18.9419 10.6708 16C10.6708 13.0581 13.0624 10.6661 16.0036 10.6661C18.9448 10.6661 21.3363 13.0581 21.3363 16C21.3363 18.9419 18.9376 21.3339 16.0036 21.3339ZM26.4549 7.46C26.4549 8.52393 25.5982 9.37365 24.5417 9.37365C23.478 9.37365 22.6284 8.51679 22.6284 7.46C22.6284 6.40321 23.4851 5.54636 24.5417 5.54636C25.5982 5.54636 26.4549 6.40321 26.4549 7.46ZM31.8876 9.40221C31.7662 6.83878 31.1808 4.56811 29.3033 2.69731C27.4329 0.826509 25.1627 0.240991 22.5999 0.112462C19.9585 -0.0374874 12.0415 -0.0374874 9.40011 0.112462C6.8444 0.23385 4.57423 0.819368 2.69671 2.69017C0.819186 4.56097 0.240937 6.83164 0.112437 9.39507C-0.0374791 12.037 -0.0374791 19.9558 0.112437 22.5978C0.233798 25.1612 0.819186 27.4319 2.69671 29.3027C4.57423 31.1735 6.83726 31.759 9.40011 31.8875C12.0415 32.0375 19.9585 32.0375 22.5999 31.8875C25.1627 31.7661 27.4329 31.1806 29.3033 29.3027C31.1737 27.4319 31.7591 25.1612 31.8876 22.5978C32.0375 19.9558 32.0375 12.0442 31.8876 9.40221ZM28.4752 25.4326C27.9184 26.8321 26.8404 27.9103 25.434 28.4744C23.3281 29.3098 18.3308 29.117 16.0036 29.117C13.6763 29.117 8.67195 29.3027 6.57312 28.4744C5.1739 27.9174 4.09593 26.8392 3.53196 25.4326C2.69671 23.3261 2.88946 18.3278 2.88946 16C2.88946 13.6722 2.70385 8.66674 3.53196 6.56744C4.08879 5.16791 5.16676 4.0897 6.57312 3.52561C8.67909 2.69017 13.6763 2.88296 16.0036 2.88296C18.3308 2.88296 23.3352 2.69731 25.434 3.52561C26.8332 4.08256 27.9112 5.16077 28.4752 6.56744C29.3104 8.67388 29.1177 13.6722 29.1177 16C29.1177 18.3278 29.3104 23.3333 28.4752 25.4326Z" fill="currentColor"/>
					</svg>


				</div>
			</a>
			<a href={'https://fb.com'}>
				<div className={'social__item_image'}>
					<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M32 3.42857V28.5714C32 30.4643 30.4643 32 28.5714 32H22.4786V19.3429H26.8071L27.4286 14.5143H22.4786V11.4286C22.4786 10.0286 22.8643 9.07857 24.8714 9.07857H27.4286V4.76429C26.9857 4.70714 25.4714 4.57143 23.7 4.57143C20.0143 4.57143 17.4857 6.82143 17.4857 10.9571V14.5214H13.1429V19.35H17.4929V32H3.42857C1.53571 32 0 30.4643 0 28.5714V3.42857C0 1.53571 1.53571 0 3.42857 0H28.5714C30.4643 0 32 1.53571 32 3.42857Z" fill="currentColor"/>
					</svg>
				</div>
			</a>
			<a href={'https://linkedin.com'}>
				<div className={'social__item_image'}>
					<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g clipPath="url(#clip0_7_1500)">
							<path fillRule="evenodd" clipPath="evenodd" d="M4.50915 4C3.59686 4 3 4.64813 3 5.49968C3 6.33314 3.57955 7 4.47414 7H4.49145C5.42164 7 6 6.33314 6 5.49968C5.9823 4.64813 5.42164 4 4.50915 4ZM17 12.3969V18H14.0517V12.7724C14.0517 11.4598 13.626 10.5634 12.5585 10.5634C11.7438 10.5634 11.2599 11.1669 11.0462 11.7512C10.9686 11.9601 10.9485 12.2501 10.9485 12.543V17.9998H8C8 17.9998 8.03958 9.14592 8 8.22943H10.9488V9.61397C10.946 9.61909 10.9427 9.62414 10.9394 9.62915C10.9357 9.63482 10.932 9.64042 10.9292 9.64595H10.9488V9.61397C11.3406 8.94968 12.0394 8 13.606 8C15.5457 8 17 9.39642 17 12.3969ZM6 18H3V9H6V18Z" fill="currentColor"/>
							<mask id="mask0_7_1500" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="3" y="4" width="14" height="14">
								<path fillRule="evenodd" clipPath="evenodd" d="M4.50915 4C3.59686 4 3 4.64813 3 5.49968C3 6.33314 3.57955 7 4.47414 7H4.49145C5.42164 7 6 6.33314 6 5.49968C5.9823 4.64813 5.42164 4 4.50915 4ZM17 12.3969V18H14.0517V12.7724C14.0517 11.4598 13.626 10.5634 12.5585 10.5634C11.7438 10.5634 11.2599 11.1669 11.0462 11.7512C10.9686 11.9601 10.9485 12.2501 10.9485 12.543V17.9998H8C8 17.9998 8.03958 9.14592 8 8.22943H10.9488V9.61397C10.946 9.61909 10.9427 9.62414 10.9394 9.62915C10.9357 9.63482 10.932 9.64042 10.9292 9.64595H10.9488V9.61397C11.3406 8.94968 12.0394 8 13.606 8C15.5457 8 17 9.39642 17 12.3969ZM6 18H3V9H6V18Z" fill="white"/>
							</mask>
							<g mask="url(#mask0_7_1500)">
								<rect x="-2" y="-2" width="24" height="25" fill="currentColor"/>
							</g>
						</g>
						<defs>
							<clipPath id="clip0_7_1500">
								<rect width="20" height="20" fill="currentColor"/>
							</clipPath>
						</defs>
					</svg>

				</div>
			</a>
		</div>
	);
};

export default Social;
