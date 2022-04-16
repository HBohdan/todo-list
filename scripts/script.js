import {
	createTableNotes,
	getNote,
	getData,
	giveString,
	fineDate,
	editDates,
	createTableArchive,
	// getListCategory,
	addButtonsEdit
} from './logic.js';

export let tableNotes = document.querySelector('.tableNotes tbody');
export let trs = () => tableNotes.querySelectorAll('tr');
let createNote = document.querySelector('#create');
let writeNote = document.querySelector('.writeNote');
let name = document.querySelector('#name');
let category = document.querySelector('#category');
let content = document.querySelector('#content');
let saveBut = document.querySelector('.saveBut');
let editBut = document.querySelector('.editBut');
let cancelBut = document.querySelector('.cancelBut');

let tablesArchive = document.querySelector('.tablesArchive');
export let tableArchive = document.querySelector('.tableArchive tbody');
// let trsArchive = () => tableArchive.querySelectorAll('tr');
export let listTask = document.querySelector('.listTask');
export let listIdea = document.querySelector('.listIdea');
export let listThought = document.querySelector('.listThought');
export let listArchivedTask = document.querySelector('.listArchivedTask tbody');
export let listArchivedIdea = document.querySelector('.listArchivedIdea tbody');
export let listArchivedThought = document.querySelector('.listArchivedThought tbody');
let closes = tablesArchive.querySelectorAll('p')



const notes = [
	{
		icon: '<span class="_icon-task"></span>',
		name: 'Shopping list',
		created: 'April 20, 2021',
		category: 'Task',
		content: 'Tomates, bread',
		dates: '',
	},
	{
		icon: '<span class="_icon-random-thought"></span>',
		name: 'The theory of ev...',
		created: 'April 27, 2021',
		category: 'Random Thought',
		content: 'The evolution...',
		dates: '',
	},
	{
		icon: '<span class="_icon-idea"></span>',
		name: 'New Feature',
		created: 'May 05, 2022',
		category: 'Idea',
		content: 'Implement new...',
		dates: '3/5/2021, 5/5/2021',
	},
	{
		icon: '<span class="_icon-idea"></span>',
		name: 'William Gaddis',
		created: 'May 07, 2021',
		category: 'Idea',
		content: 'Power doesn\'t c...',
		dates: '',
	},
	{
		icon: '<span class="_icon-task"></span>',
		name: 'Books',
		created: 'May 15, 2021',
		category: 'Task',
		content: 'The Lean Startup ',
		dates: '',
	},
];

export const objEditButtons = {
	edit: '<span class="_icon-edit"></span>',
	archive: '<span class="_icon-archive"></span>',
	unarchive: '<span class="_icon-unarchive"></span>',
	del: '<span class="_icon-delete"></span>',
};

export const objCategory = {
	'Task': ['Task', '<span class="_icon-task"></span>'],
	'Random Thought': ['Random Thought', '<span class="_icon-random-thought"></span>'],
	'Idea': ['Idea', '<span class="_icon-idea"></span>'],
};

createTableNotes(notes, tableNotes, objEditButtons);

createNote.addEventListener('click', function () {
	writeNote.style.display = 'block';
});

saveBut.addEventListener('click', function () {
	let newNote = {
		icon: objCategory[category.value][1],
		name: giveString(name.value, 18),
		created: getData(),
		category: objCategory[category.value][0],
		content: giveString(content.value, 16),
		dates: fineDate(content.value),
	};

	let tr = getNote(newNote);
	addButtonsEdit(tr, objEditButtons);
	tableNotes.appendChild(tr);

	writeNote.style.display = 'none';
	name.value = '';
	content.value = '';

	tableArchive.innerHTML = '';
	createTableArchive(trs(), tableArchive, objCategory);
});


let indexTr;
let datesValue;
editBut.addEventListener('click', function () {
	let i = indexTr;
	let tr = trs()[i];

	tr.childNodes[0].innerHTML = objCategory[category.value][1];
	tr.childNodes[1].innerHTML = giveString(name.value, 18);
	tr.childNodes[3].innerHTML = category.value;
	tr.childNodes[4].innerHTML = giveString(content.value, 16);
	tr.childNodes[5].innerHTML = editDates(fineDate(content.value), datesValue);

	writeNote.style.display = 'none';
	name.value = '';
	content.value = '';

	saveBut.style.display = 'block';
	editBut.style.display = 'none';

	tableArchive.innerHTML = "";
	createTableArchive(trs(), tableArchive, objCategory);
});

cancelBut.addEventListener('click', function () {
	writeNote.style.display = 'none';
	saveBut.style.display = 'block';
	editBut.style.display = 'none';
	name.value = '';
	content.value = '';
});

export function funcEdit() {
	writeNote.style.display = 'block';
	saveBut.style.display = 'none';
	editBut.style.display = 'block';

	let tr = this.parentNode;
	name.value = tr.childNodes[1].innerHTML;
	category.value = tr.childNodes[3].innerHTML;
	content.value = tr.childNodes[4].innerHTML;
	datesValue = tr.childNodes[5].innerHTML;

	let arrTrs = [];
	trs().forEach(elem => {
		arrTrs.push(elem);
	});

	indexTr = arrTrs.indexOf(tr);
}

/*__________ table archive ___________*/

tableNotes.addEventListener('click', function () {
	tableArchive.innerHTML = "";
	createTableArchive(trs(), tableArchive, objCategory);
});

createTableArchive(trs(), tableArchive, objCategory);

closes.forEach(elem => {
	elem.addEventListener('click', function () {
		console.log(this.parentNode)
		console.log(tableArchive.parentNode)
		this.parentNode.classList.toggle('inactive');
	});
});
