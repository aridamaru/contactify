import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { IContact } from '../../../app/models/contact';
import { v4 as uuid } from 'uuid';
import ContactStore from '../../../app/stores/contactStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';

interface DetailParams {
	id: string;
}

const ContactForm: React.FC<RouteComponentProps<DetailParams>> = ({
	match,
	history,
}) => {
	const contactStore = useContext(ContactStore);
	const {
		createContact,
		editContact,
		submitting,
		contact: initialFormState,
		loadContact,
		clearContact,
	} = contactStore;

	const [contact, setContact] = useState<IContact>({
		id: '',
		name: '',
		lastName: '',
		email: '',
		phoneNumber: '',
	});

	useEffect(() => {
		if (match.params.id && contact.id.length === 0) {
			loadContact(match.params.id).then(
				() => initialFormState && setContact(initialFormState)
			);
		}
		return () => {
			clearContact();
		};
	}, [
		loadContact,
		match.params.id,
		clearContact,
		initialFormState,
		contact.id.length,
	]);

	const handleSubmit = () => {
		if (contact.id.length === 0) {
			let newContact = {
				...contact,
				id: uuid(),
			};
			createContact(newContact).then(() =>
				history.push(`/contacts/${newContact.id}`)
			);
		} else {
			editContact(contact).then(() => history.push(`/contacts/${contact.id}`));
		}
	};
	const handleInputChange = (
		event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.currentTarget;
		setContact({ ...contact, [name]: value });
	};

	return (
		<Segment clearing>
			<Form onSubmit={handleSubmit}>
				<Form.Input
					onChange={handleInputChange}
					name='name'
					placeholder='Name'
					value={contact.name}
				/>
				<Form.Input
					onChange={handleInputChange}
					name='lastName'
					placeholder='Last Name'
					value={contact.lastName}
				/>
				<Form.Input
					onChange={handleInputChange}
					name='email'
					type='email'
					placeholder='Email'
					value={contact.email}
				/>
				<Form.Input
					onChange={handleInputChange}
					name='phoneNumber'
					placeholder='Phone Number'
					value={contact.phoneNumber}
				/>
				<Button
					loading={submitting}
					floated='right'
					positive
					type='submit'
					content='Submit'
				/>
				<Button
					onClick={() => history.push('/contacts')}
					floated='right'
					type='button'
					content='Cancel'
				/>
			</Form>
		</Segment>
	);
};
export default observer(ContactForm);
