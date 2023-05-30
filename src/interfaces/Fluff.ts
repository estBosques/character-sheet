export interface Welcome {
    raceFluff: RaceFluff[];
}

export interface RaceFluff {
    name:       string;
    source:     string;
    entries?:   Array<BaseEntry | string>;
    images?:    Image[] | null;
    _copy?:     Copy;
    monstrous?: boolean;
    uncommon?:  boolean;
}

export interface Copy {
    name:   string;
    source: string;
    _mod?:  Mod;
}

export interface Mod {
    entries?: Entries;
    images?:  Images;
}

export interface Entries {
    mode:  Mode;
    items: ItemsClass | string;
}

export interface ItemsClass {
    type:    BaseEntryType;
    entries: ItemsEntry[];
}

export interface ItemsEntry {
    type:    FluffyType;
    entries: Array<PurpleEntry | string>;
}

export interface PurpleEntry {
    type:       FluffyType;
    style?:     Style;
    items?:     EntryItem[];
    caption?:   string;
    colLabels?: string[];
    colStyles?: ColStyle[];
    rows?:      Array<string[]>;
    name?:      string;
    entries?:   Array<FluffyEntry | string>;
}

export enum ColStyle {
    Col10 = "col-10",
    Col2TextCenter = "col-2 text-center",
}

export interface FluffyEntry {
    type:  FluffyType;
    style: Style;
    items: EntryItem[];
}

export interface EntryItem {
    type:     PurpleType;
    name:     string;
    entry:    string;
    nameDot?: boolean;
}

export enum PurpleType {
    Item = "item",
}

export enum Style {
    ListHangNotitle = "list-hang-notitle",
}

export enum FluffyType {
    Entries = "entries",
    Inset = "inset",
    InsetReadaloud = "insetReadaloud",
    List = "list",
    Quote = "quote",
    Table = "table",
}

export enum BaseEntryType {
    Entries = "entries",
    Section = "section",
    Table = "table",
}

export enum Mode {
    PrependArr = "prependArr",
}

export interface Images {
    mode:  string;
    items: ItemsElement[] | ItemsElement;
}

export interface ItemsElement {
    type: ImageType;
    href: Href;
}

export interface Href {
    type: HrefType;
    path: string;
}

export enum HrefType {
    Internal = "internal",
}

export enum ImageType {
    Image = "image",
}

export interface BaseEntry {
    type:       BaseEntryType;
    entries?:   Array<StickyEntry | string>;
    caption?:   string;
    colLabels?: string[];
    colStyles?: string[];
    rows?:      Array<Array<number | string>>;
    name?:      string;
}

export interface StickyEntry {
    type:       FluffyType;
    entries?:   Array<IndigoEntry | string>;
    name?:      string;
    caption?:   string;
    colLabels?: string[];
    colStyles?: ColStyle[];
    rows?:      Array<string[]>;
}

export interface IndigoEntry {
    type:       FluffyType;
    name?:      string;
    entries?:   Array<PurpleEntry | string>;
    style?:     Style;
    items?:     EntryItem[];
    skipMarks?: boolean;
    by?:        string;
    caption?:   string;
    colLabels?: string[];
    colStyles?: ColStyle[];
    rows?:      Array<string[]>;
}

export interface Image {
    type:   ImageType;
    href:   Href;
    title?: string;
}
