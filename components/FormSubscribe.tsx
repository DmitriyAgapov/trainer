import React from "react";
import {gql, useMutation} from 'urql';
import {useForm} from 'react-hook-form';
// @ts-ignore
const Select = React.forwardRef(({onChange, onBlur, name, label, children}, ref) => (
	<>
		<select name={name}
			// @ts-ignore
			ref={ref} onChange={onChange} onBlur={onBlur}>
			{children}
		</select>
	</>
));
export default function FormSubscribe() {
	const {register, handleSubmit, reset, formState: {errors, isSubmitSuccessful}} = useForm();
	const [{error, data}, signup] = useMutation(gql`
		mutation($name: String , $email: String) {
		  createCallback(data: { name: $name, email: $email}) {
		    name
		    email		   
		    publishedDate
		    message
		 }
		}
  `);
	const onSubmit = (data) => {
		const { email } = data
		let name = 'Form subscribe'
		signup({name, email}).then(result => {
			if (result.data?.createCallback) {
				// FIXME: there's a cache issue with Urql where it's not reloading the
				// current user properly if we do a client-side redirect here.
				// router.push('/');
				// console.log('Success ')
				// top.location.href = '/';
			}
		});
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{!isSubmitSuccessful ? (<>
				{/*<input type="text" placeholder="Name" {...register("Name", {required: true, maxLength: 80})} />*/}
				<div style={{position: 'relative'}}>
					{errors.email ?
						<span style={{position: 'absolute', color: 'red', top: '-1.125rem', fontSize: '.75rem'}}>Input correct email</span> : null}
					<input type="text" placeholder="Email" {...register("email", {
						required: true,
						pattern: /^\S+@\S+$/i
					})} />
				</div>
				{/*<div style={{position: 'relative'}}>*/}
				{/*	{errors.phone ?*/}
				{/*		<span style={{position: 'absolute', color: 'red', top: '-1.125rem', fontSize: '.75rem'}}>Input correct phone number</span> : null}*/}
				{/*	<input type="tel" placeholder="Phone number" {...register("phone", {*/}
				{/*		required: true,*/}
				{/*		maxLength: 12*/}
				{/*	})} />*/}
				{/*</div>*/}

				<input type="submit" className={'button button-primary'} value={'Keep me updated'}/>
			</>) : <>
				<div className={'section__form-result'}>Thank you for your subscription</div>

			</>}

			{/*{isSubmitSuccessful ? (<input type="button" onClick={() => {*/}
			{/*	reset({*/}
			{/*		email: '',*/}
			{/*		phone: '',*/}
			{/*		message: ''*/}
			{/*	}, {*/}
			{/*		keepErrors: true,*/}
			{/*		keepDirty: true,*/}
			{/*		keepIsSubmitted: false,*/}
			{/*		keepTouched: false,*/}
			{/*		keepIsValid: false,*/}
			{/*		keepSubmitCount: false,*/}
			{/*	});*/}
			{/*}} className={'button button-outline'} value={'Send one more '}/>) : null}*/}
		</form>
	)
}
