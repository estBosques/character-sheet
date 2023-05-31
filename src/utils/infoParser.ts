import type { Entry, TableEntry, TitledEntry } from '$src/interfaces/Fluff';

let text = '';

function parseTable(entries: TableEntry) {
	text = `${text}<table class="table table-striped"><thead>`;

	//add column labels
	for (const i in entries.colLabels) {
		text = `${text}<th class="${entries.colStyles[i]}">${entries.colLabels[i]}</th>`;
	}
	text = `${text}</thead><tbody>`;

	//add rows
	for (const row of entries.rows) {
		text = `${text}<tr>`;
		for (const cell of row) {
			text = `${text}<td>${cell}</td>`;
		}
		text = `${text}</tr>`;
	}
	text = `${text}</tbody></table>`;
}

function parseInset(entries: TitledEntry) {
	text = `${text}<div class="alert alert-secondary mt-3"><p class="callout"><strong>${entries.name}</strong></p>`;

	//add paragraph to callout
	parseDescription(entries.entries);
	text = `${text}</div>`;
}

function parseTextWithTitle(entries: TitledEntry) {
	text = `${text}<div class="entry_with_title"><p class="entry_title"><strong>${entries.name}. </strong>`; // add title, let the p tag open

	// add each entry as paragraph
	parseDescription(entries.entries, true);
	text = `${text}</div>`;
}

function parseDescription(entries: Entry[], openTag = false) {
	// go through each entry
	entries.forEach((el: Entry) => {
		// if element is a string just add it as a paragraph
		if (typeof el === 'string')
			text = `${text}${openTag ? '' : '<p>'}${el}</p>${openTag ? '<p class="subparagraph">' : ''}`;
		// if element is an object, check what type of object
		else if (typeof el === 'object') {
			// if it is an object check if it is an entry (aka. regular text)
			if (el.type === 'entries' || el.type === 'section') {
				// if it is an entry, check if it has a name (aka. title)
				if ('name' in el) parseTextWithTitle(el);
				// if it doesn't have a title, then you need to parse it
				else if ('entries' in el) parseDescription(el.entries);

				// if it is not an entry, check if it is an inset (aka. callout)
			} else if (el.type === 'inset' && 'entries' in el && 'name' in el) parseInset(el);
			// if it is not an entry, check if it is a table
			else if (el.type === 'table' && 'colLabels' in el && 'colStyles' in el) parseTable(el);
			else console.warn(`Unknown type ${el.type}`, el);
			// TODO: Consider adding meta for uncommon races
		}
	});

	return text;
}

function parser(entries: Entry[]): string {
	text = '';
	parseDescription(entries);
	return text;
}

export default parser;
