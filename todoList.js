"use strict"
window.onload = function () {
	let todoList = [];
	const ul = document.getElementById('list-todo');

	function saveIsLS(key, arrItemTodo) {
		localStorage.setItem(key, JSON.stringify(arrItemTodo));
	}

	function createDOMElement(id, text) {
		let i = String("t" + id);
		let li = document.createElement('li');
		let txt = document.createTextNode(text);
		li.id = i;
		li.appendChild(txt);
		document.getElementById('list-todo').appendChild(li);
	}

	function outTodo(arrTodoLS) {
		let todo,
			check, id, out = "";
		for (let i = 0; i < arrTodoLS.length; i++) {
			todo = arrTodoLS[i].todo;
			check = arrTodoLS[i].check;
			id = arrTodoLS[i].id;
			if (check === false) {
				out += '<li class="list-tasks" id="' + id + '">' + todo + '</li>';
			} else {
				out += '<li class="list-tasks checked" id="' + id + '">' + todo + '</li>';
			}
		}
		ul.innerHTML = out;
	}

	function proofId() {
		return String('t' + todoList.length);
	}

	function addItemTodo() {
		let d = document.getElementById('add-text').value;
		if (d === "" || d === " ") {
			return alert("Вы ввели пустую строку");
		}
		let temp = {};
		temp.todo = d;
		temp.check = false;
		temp.id = proofId();
		let i = todoList.length;
		todoList[i] = temp;
		createDOMElement(temp.id, d);
		saveIsLS('todo', todoList);
		document.getElementById('add-text').value = "";
	}

	function delItemTodo() {
		let lL = ul.querySelectorAll('.checked');
		if (lL.length < 1) {
			return alert('Выберите удаляемые элементы');
		}
		for (let i = 0; i < lL.length; i++) {
			let id = lL[i].id;
			let el = document.getElementById(id);
			el.parentNode.removeChild(el);
			for (let j = 0; j < todoList.length; j++) {
				if (todoList[j].id == id) {
					todoList.splice(j, 1);
				}
			}
		}
		saveIsLS('todo', todoList);
	}

	function checkItemTodo(e) {
		if (e.target.tagName !== "LI") {
			console.log(e);
			return alert('Что-то пошло не так');
		}
		/* Проверяем есть ли елемент по которому кликнули */
		if (e.target.tagName === 'LI') {
			e.target.classList.toggle("checked");
			for (let k = 0; k < todoList.length; k++) {
				let idLi = e.target.id;
				if (todoList[k].id === idLi) {
					if (todoList[k].check === false) {
						todoList[k].check = true;
					} else {
						todoList[k].check = false;
					}
				}
			}
			saveIsLS('todo', todoList);
		}
	}

	function allItemTodo() {
		const allLi = ul.getElementsByTagName("li");
		for (let l = 0; l < allLi.length; l++) {
			if (allLi[l].classList !== "checked") {
				allLi[l].classList.toggle("checked");
				let idLi = allLi[l].id;
				for (let m = 0; m < todoList.length; m++) {
					if (todoList[m].id === idLi) {
						if (todoList[m].check === false) {
							todoList[m].check = true;
						} else {
							todoList[m].check = false;
						}
					}
				}
			}
		}
		saveIsLS('todo', todoList);
	}

	function ListOutTodo() {
		if (localStorage.getItem('todo') != undefined) {
			todoList = JSON.parse(localStorage.getItem('todo')); // Распарсиваем JSON-строку в массив
			outTodo(todoList);
		} else {
			console.log(todoList);
			return alert('Произошла ошибка при извлечение записей из базы данных');
		}
	}

	// function initListsTodo() {
	// 	let listUl = document.querySelectorAll('ul');
	// 	let sDisplay;
	// 	for (let i = 0; i < listUl.length; i++) {
	// 		if (listUl[0].style.display === "" || listUl[i].style.display == "none") {
	// 			sDisplay = "list-item";
	// 		} else {
	// 			sDisplay = "none";
	// 		}
	// 		listUl[i].style.display = sDisplay;
	// 	}
	// 	// console.log(listUl);
	// 	return listUl;
	// }

	// function nextListTodo() {
	// 	let list = document.querySelectorAll('ul');
	// 	for (let j = 0; j < list.length;) {
	// 		if (list[j].style.display === "list-item") {
	// 			list[j].style.display = "none";
	// 			console.log(list[j].style.display);
	// 		} else {
	// 			list[j].style.display = "list-item";
	// 			++j;
	// 		}
	// 	}
	// }

	ListOutTodo();

	document.getElementById('allCheck').addEventListener("click", allItemTodo);
	document.getElementById('add').addEventListener("click", addItemTodo);
	document.getElementById('del').addEventListener("click", delItemTodo);
	ul.addEventListener("click", checkItemTodo);
	// document.getElementById('nextList').addEventListener("click", nextListTodo);
}