export interface Content {
	name: string;
	headers: string[];
}

export interface Book {
	name: string;
	id: string;
	source: string;
	group: string;
	coverUrl: string;
	published: string;
	author: string;
	contents: Content[];
}

export interface RootObject {
	book: Book[];
}