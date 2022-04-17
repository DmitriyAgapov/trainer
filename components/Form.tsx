
import React, {useEffect, useState} from "react";
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
export default function Form({props}) {
	const {register, handleSubmit, reset, formState: {errors, isSubmitSuccessful}} = useForm();
	const [{error, data}, signup] = useMutation(gql`
	mutation($name: String , $email: String, $phone: String) {
  createCallback(data: { name: $name, email: $email, phone: $phone }) {
    name
    email
    phone
    publishedDate
    message
  }
}

  `);
	const onSubmit = (data) => {
		const {email, phone, theme} = data
		let name = theme
		signup({name, email, phone}).then(result => {
			if (result.data?.createCallback) {
				// FIXME: there's a cache issue with Urql where it's not reloading the
				// current user properly if we do a client-side redirect here.
				// router.push('/');
				// console.log('Success ')
				// top.location.href = '/';
			}
		});
	}

	// function onSubmit() {
	// 	createFormData(data).then(r => console.log(r)).catch(errors => console.log(errors));
	// }

	// console.log({errors});
	// console.log({isSubmitSuccessful});


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


				<Select {...register("theme")}
					// defaultValue={props[0].title}
				>
					{props.map((item, index) => (
						<option key={item.id} value={item.title}>{item.title}</option>
					))}

				</Select>
				<textarea placeholder={'Write something...'} {...register("message", {})} />
				<input type="submit" className={'button button-primary'} value={'Send'}/>
			</>) : <>
				<div className={'section__form-result'}>Success</div>
				<div className={'divider'}/>
			</>}

			{isSubmitSuccessful ? (<input type="button" onClick={() => {
				reset({
					email: '',
					phone: '',
					message: ''
				}, {
					keepErrors: true,
					keepDirty: true,
					keepIsSubmitted: false,
					keepTouched: false,
					keepIsValid: false,
					keepSubmitCount: false,
				});
			}} className={'button button-text'} value={'Send one more '}/>) : null}
		</form>
	)
}
