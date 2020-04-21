import axios, { AxiosResponse } from 'axios';
import { IContact } from '../models/contact';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
	get: (url: string) => axios.get(url).then(responseBody),
	post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
	put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
	del: (url: string) => axios.delete(url).then(responseBody),
};

const Contacts = {
	list: (): Promise<IContact[]> => requests.get('/contacts'),
	details: (id: string) => requests.get(`/contacts/${id}`),
	create: (contact: IContact) => requests.post(`/contacts/`, contact),
	update: (contact: IContact) =>
		requests.put(`/contacts/${contact.id}`, contact),
	delete: (id: string) => requests.del(`/contacts/${id}`),
};

export default {
	Contacts,
};
