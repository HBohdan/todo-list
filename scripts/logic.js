import {
	funcEdit,
	listArchivedTask,
	listArchivedIdea,
	listArchivedThought,
	objEditButtons,
	tableNotes,
	trs,
	tableArchive,
	objCategory,
	listTask,
	listIdea,
	listThought
} from './script.js';

export function createTableNotes(arr, table, objEdit) {
	for (let obj of arr) {
		let tr = getNote(obj);
		addButtonsEdit(tr, objEdit);

		table.appendChild(tr);
	}
}

function createCell(tr, tdConten, clList) {
	let td = document.createElement('td');
	td.innerHTML = `${tdConten}`;
	td.classList.add(clList);
	tr.appendChild(td);

	return td;
}

export function addButtonsEdit(tr, objEdit) {
	let td1 = createCell(tr, objEdit['edit'], 'edit');
	td1.addEventListener('click', funcEdit);
	tr.appendChild(td1);
	let td2 = createCell(tr, objEdit['archive'], 'archive');
	td2.addEventListener('click', performArchive);
	tr.appendChild(td2);
	let td3 = createCell(tr, objEdit['del'], 'del');
	td3.addEventListener('click', function () {
		this.parentNode.remove();
	});
	tr.appendChild(td3);
	return tr;
}

export function getNote(obj) {
	let tr = document.createElement('tr');
	for (let key in obj) {
		createCell(tr, obj[key], key);
	}

	return tr;
}

export function getData() {
	let arrMonths = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	let now = new Date();

	return arrMonths[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear();
}

export function giveString(str, value) {
	if (str.length > value) {
		return str.substr(0, value) + '...';
	} else {
		return str;
	}
}

export function fineDate(str) {
	let res = str.match(/(\d{1,2}\/\d{1,2}\/\d{4})/);
	if (res == null) {
		return '';
	} else {
		return res[0];
	}
}

export function editDates(str1, str2) {
	if (str1.length > 0 && str2.length > 0) {
		return str1 + ', ' + str2.substr(0, 8);
	} else if (str1.length == 0 && str2.length > 0) {
		return str2;
	} else if (str1.length > 0 && str2.length == 0) {
		return str1;
	} else {
		return '';
	}
}

/*____________ table archive ___________*/

let task = 0;
let idea = 0;
let randomThought = 0;
let numberArchivedTask = 0;
let numberArchivedIdea = 0;
let numberArchivedThought = 0;

export function createTableArchive(obj, table, obj2) {
	countCategory(obj, table, obj2, task, numberArchivedTask, 'Task');
	countCategory(obj, table, obj2, idea, numberArchivedIdea, 'Idea');
	countCategory(obj, table, obj2, randomThought, numberArchivedThought, 'Random Thought');
}

function countCategory(obj, table, obj2, arg, arg2, nameCategory) {
	for (let row of obj) {
		if (row.childNodes[3].innerHTML == nameCategory) {
			arg++;
		}
	}

	if (arg > 0 || arg2 > 0) {
		let tr = document.createElement('tr');
		tr.addEventListener('click', getListCategory);

		createCell(tr, obj2[nameCategory][1], 'tableArchive__icon');
		createCell(tr, obj2[nameCategory][0], 'tableArchive__noteCategory');
		createCell(tr, arg, 'tableArchive__active');
		createCell(tr, arg2, 'tableArchive__archived');

		table.appendChild(tr);
	}
}

function countArchivedPlus(rowCategory, nameCategory, arg) {
	if (rowCategory == nameCategory) {
		arg++;
	}
	return arg;
}

function countArchivedMinus(rowCategory, nameCategory, arg) {
	if (rowCategory == nameCategory) {
		arg--;
	}
	return arg;
}

function performArchive() {
	let rowCateg = this.parentNode.childNodes[3].innerHTML;
	numberArchivedTask = countArchivedPlus(rowCateg, 'Task', numberArchivedTask);
	numberArchivedIdea = countArchivedPlus(rowCateg, 'Idea', numberArchivedIdea);
	numberArchivedThought = countArchivedPlus(rowCateg, 'Random Thought', numberArchivedThought);

	let tr = this.parentNode;
	tr.remove();

	addToArchive(tr);
}

function getArchivedObj(arg) {
	let archivedObj = {
		icon: arg.childNodes[0].innerHTML,
		name: arg.childNodes[1].innerHTML,
		created: arg.childNodes[2].innerHTML,
		category: arg.childNodes[3].innerHTML,
		content: arg.childNodes[4].innerHTML,
		dates: arg.childNodes[5].innerHTML,
	};
	return archivedObj;
}

function addToArchive(arg) {
	let tr = getNote(getArchivedObj(arg));

	createCell(tr, objEditButtons['unarchive'], 'unarchive').addEventListener('click', performUnarchive);

	if (arg.childNodes[3].innerHTML == 'Task') {
		listArchivedTask.appendChild(tr);
	}
	if (arg.childNodes[3].innerHTML == 'Idea') {
		listArchivedIdea.appendChild(tr);
	}
	if (arg.childNodes[3].innerHTML == 'Random Thought') {
		listArchivedThought.appendChild(tr);
	}
}

function performUnarchive() {
	let rowCateg = this.parentNode.childNodes[3].innerHTML;
	numberArchivedTask = countArchivedMinus(rowCateg, 'Task', numberArchivedTask);
	numberArchivedIdea = countArchivedMinus(rowCateg, 'Idea', numberArchivedIdea);
	numberArchivedThought = countArchivedMinus(rowCateg, 'Random Thought', numberArchivedThought);

	let tr = this.parentNode;
	let trNote = getNote(getArchivedObj(tr));
	addButtonsEdit(trNote, objEditButtons);
	tableNotes.appendChild(trNote);
	tr.remove();

	tableArchive.innerHTML = "";
	createTableArchive(trs(), tableArchive, objCategory);
}

export function getListCategory() {
	let category = this.childNodes[1].innerHTML;
	if (category == 'Task') {
		listTask.classList.toggle('inactive');
	}
	if (category == 'Idea') {
		listIdea.classList.toggle('inactive');
	}
	if (category == 'Random Thought') {
		listThought.classList.toggle('inactive');
	}
}

