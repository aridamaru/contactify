import { observable, action, computed, runInAction } from 'mobx';
import { createContext, SyntheticEvent } from 'react';
import { IContact } from '../models/contact';
import agent from '../api/agent';

class ContactStore {
	@observable contactRegistry = new Map();
	@observable contact: IContact | null = null;
	@observable loadingInitial = false;
	@observable submitting = false;
	@observable target = '';

	@computed get contactsSorted() {
		return Array.from(this.contactRegistry.values());
	}

	@action loadContacts = async () => {
		this.loadingInitial = true;
		try {
			const contacts = await agent.Contacts.list();
			contacts.forEach((contact) => {
				this.contactRegistry.set(contact.id, contact);
			});
			this.loadingInitial = false;
		} catch (error) {
			console.log(error);
			this.loadingInitial = false;
		}
	};
	@action loadContact = async (id: string) => {
		let contact = this.getContact(id);
		if (contact) {
			this.contact = contact;
		} else {
			this.loadingInitial = true;
			try {
				contact = await agent.Contacts.details(id);
				runInAction('getting contact', () => {
					this.contact = contact;
					this.loadingInitial = false;
				});
			} catch (error) {
				runInAction('get contact error', () => {
					this.loadingInitial = false;
				});
				console.log(error);
			}
		}
	};
	@action clearContact = () => {
		this.contact = null;
	};
	getContact = (id: string) => {
		return this.contactRegistry.get(id);
	};
	@action createContact = async (contact: IContact) => {
		this.submitting = true;
		try {
			await agent.Contacts.create(contact);
			this.contactRegistry.set(contact.id, contact);
			this.submitting = false;
		} catch (error) {
			console.log(error);
			this.submitting = false;
		}
	};

	@action editContact = async (contact: IContact) => {
		this.submitting = true;
		try {
			await agent.Contacts.update(contact);
			this.contactRegistry.set(contact.id, contact);
			this.contact = contact;
			this.submitting = false;
		} catch (error) {
			this.submitting = false;
			console.log(error);
		}
	};

	@action deleteContact = async (
		event: SyntheticEvent<HTMLButtonElement>,
		id: string
	) => {
		this.submitting = true;
		this.target = event.currentTarget.name;
		try {
			await agent.Contacts.delete(id);
			this.contactRegistry.delete(id);
			this.submitting = false;
			this.target = '';
		} catch (error) {
			this.submitting = false;
			this.target = '';
			console.log(error);
		}
	};
}

export default createContext(new ContactStore());
