export interface FluffRaces {
	_meta: Meta;
	raceFluff: RaceFluff[];
	raceFluffMeta: RaceFluffMeta;
}

export interface Meta {
	internalCopies: string[];
}

export interface RaceFluff {
	name: string;
	source: string;
	entries: Entry[];
	images?: Image[] | null;
	_copy?: Copy;
	monstrous?: boolean;
	uncommon?: boolean;
}

export type Entry =
	| BaseEntry
	| ListEntry
	| SectionEntry
	| TitledEntry
	| TableEntry
	| QuoteEntry
	| string;

export interface Copy {
	name: string;
	source: string;
	_mod?: Mod;
}

export interface Mod {
	entries?: Entries;
	images?: Images;
}

export interface Entries {
	mode: Mode.PrependArr;
	items: Entry | Image | string;
}

export interface ListEntry {
	type: EntryType;
	style: ListStyleType;
	items: ListItem[];
}

export interface ListItem {
	type: ListEntryType.Item;
	name: string;
	entry: string;
	nameDot?: boolean;
}

export enum ListEntryType {
	Item = 'item'
}

export enum ListStyleType {
	ListHangNotitle = 'list-hang-notitle'
}

export enum EntryType {
	Entries = 'entries',
	Inset = 'inset',
	InsetReadaloud = 'insetReadaloud',
	List = 'list',
	Quote = 'quote',
	Table = 'table',
	Section = 'section',
    Image = 'image'
}

export enum Mode {
	PrependArr = 'prependArr'
}

export interface Images {
	mode: string;
	items: Image[] | Image;
}

export interface Href {
	type: HrefType.Internal;
	path: string;
}

export enum HrefType {
	Internal = 'internal'
}

export enum ImageType {
	Image = 'image'
}

export interface TableEntry {
	type: EntryType.Table;
	caption?: string;
	colLabels: string[];
	colStyles: string[];
	rows: Array<Array<number | string>>;
}

export interface SubEntry {
	type: EntryType;
	entries?: Array<QuoteEntry | string>;
	name?: string;
	caption?: string;
	colLabels?: string[];
	colStyles?: string[];
	rows?: Array<string[]>;
}

export interface QuoteEntry {
	type: EntryType.Quote;
	entries: string[];
	skipMarks: boolean;
	by: string;
}

export interface Image {
	type: EntryType.Image;
	href: Href;
	title?: string;
}

export interface RaceFluffMeta {
	uncommon: UncommonMeta;
	monstrous: MonstrousMeta;
}

export interface MonstrousMeta {
	name: string;
	type: EntryType.Section;
	entries: Entry[];
}

export interface UncommonMeta {
    name: string;
	type: EntryType.Inset;
	entries: Entry[];
}

export interface TitledEntry {
    name: string;
    type: EntryType.Entries | EntryType.Inset;
    entries: Entry[];
}

export interface BaseEntry {
	type: EntryType.Entries;
	entries: Entry[];
}

export interface SectionEntry {
	type: EntryType.Section;
	entries: Entry[];
}
