"use strict"
window.onload = function () {
	let todoList = [];
	const ul = document.getElementById('list-todo');

	function saveIsLS(key, arrItemTodo) {
		localStorage.setItem(key, JSON.stringify(arrItemTodo));
	}

	function createDOMElement(id, text, fontSizeToTask) {
		const i = String(id);
		const li = document.createElement('li');
		const txt = document.createTextNode(text);
		li.id = i;
		li.className = "list-tasks";
		li.style.fontSize = `${fontSizeToTask}px`;
		li.appendChild(txt);
		ul.appendChild(li);
	}

	function outTodo(arrTodoLS) {
		let todo,
			check, id, out = "";
		for (let i = 0; i < arrTodoLS.length; i++) {
			todo = arrTodoLS[i].todo;
			check = arrTodoLS[i].check;
			id = arrTodoLS[i].id;

			out = `<li class="list-tasks ${check ? 'checked' : ''}" id="${id}">${todo}</li>`;
		}
		ul.innerHTML = out;
	}

	function proofId() {
		return String(`t${todoList.length}`);
	}

	function addItemTodo(text) {
		if (text === "") {
			console.log(text);
			return alert("Вы ввели пустую строку");
		}
		let temp = {};
		temp.todo = text;
		temp.check = false;
		temp.id = proofId();
		const i = todoList.length;
		todoList[i] = temp;
		const taskFontSize = localStorage.getItem('fontSize');
		createDOMElement(temp.id, text, taskFontSize);
		saveIsLS('todo', todoList);
		document.getElementById('add-text').value = "";
	}

	function delItemTodo() {
		const UL = ul.querySelectorAll('.checked');
		if (UL.length < 1) {
			return alert('Выберите удаляемые элементы');
		}
		for (let i = 0; i < UL.length; i++) {
			const id = UL[i].id;
			const el = document.getElementById(id);
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
			return alert('Вы кликнули не по заметке.');
		}
		/* Проверяем есть ли елемент по которому кликнули */
		if (e.target.tagName === 'LI') {
			e.target.classList.toggle("checked");
			for (let k = 0; k < todoList.length; k++) {
				const idLi = e.target.id;
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

	function allItemCheckedTodo(e) {
		const allLi = ul.getElementsByTagName("li");
		for (let l = 0; l < allLi.length; l++) {
			if (allLi[l].classList !== "checked") {
				allLi[l].classList.toggle("checked");
				const idLi = allLi[l].id;
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
		saveIsLS('iAllCheck', Number(e.target.checked));
	}

	function supportsHtml5Storage() {
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
			console.log(e);
			return false;
		}
	}

	const op1 = document.getElementById('todo-font-size');
	const op2 = document.getElementById('todo-background-color');
	const op3 = document.getElementById('todo-font-color');

	function appFStoListTodo(fSize) {
		const listTasks = document.getElementsByClassName('list-tasks');
		for (let r = 0; r < listTasks.length; r++) {
			listTasks[r].style.fontSize = `${fSize}px`;
		}
	}

	function initParametrTodo() {
		if (!supportsHtml5Storage) return;
		let localKey = {};
		for (let key = 0; key < localStorage.length; key++) {
			const clue = localStorage.key(key);
			localKey[clue] = localStorage.getItem(clue);
		}
		if (localKey.todo !== undefined) {
			todoList = JSON.parse(localKey.todo);
			outTodo(todoList);
		} else {
			return function () {
				let newTodo = prompt('Приветствую тебя пользователь ToDo!\nЭто ваш первый запуск приложения.\nВведите своё первое дело и нажмите \"OK\"');
				if (newTodo) {
					console.log(newTodo);
					addItemTodo(newTodo);
				}

				return false;
			}();
		}
		if (localKey.iAllCheck !== undefined) {
			document.getElementById('allCheck').checked = Number(localKey.iAllCheck);
		}
		if (localKey.settFontSize) {
			op1.value = localKey.settFontSize;
			appFStoListTodo(localKey.settFontSize);
		}
		if (localKey.settBackgroundToDo) {
			let bgColor = localKey.settBackgroundToDo.replace(/"/g, '')
			document.querySelector('.form').style.background = `#${bgColor}`;
			op2.value = bgColor;
		}
		if (localKey.settFontColorTasks) {
			const listTasks = document.getElementsByClassName('list-tasks');
			let fontColor = localKey.settFontColorTasks.replace(/"/g, '')
			for (let r = 0; r < listTasks.length; r++) {
				listTasks[r].style.color = `#${fontColor}`;
			}
			op3.value = fontColor;
		}
	}

	function settFontSize() {
		appFStoListTodo(Number(this.value));
		saveIsLS("settFontSize", Number(this.value))
	}

	function settBackgroundToDo() {
		let bColorHex = this.value;
		console.log(typeof (bColorHex));
		if (bColorHex) {
			document.querySelector('.form').style.background = `#${this.value}`;
			saveIsLS("settBackgroundToDo", this.value);
		}
	}

	function settFontColorTasks() {
		let fColorTask = this.value;
		console.log(fColorTask);
		if (fColorTask) {
			const listTasks = document.getElementsByClassName('list-tasks');
			for (let r = 0; r < listTasks.length; r++) {
				listTasks[r].style.color = `#${fColorTask}`;
			}
			saveIsLS("settFontColorTasks", fColorTask);
		}
	}

	function settingsTodo() {
		op1.addEventListener("input", settFontSize);
		op2.addEventListener("input", settBackgroundToDo);
		op3.addEventListener("input", settFontColorTasks);
	}

	document.getElementById('cog').onclick = function () {
		const settings = document.getElementById('sett');
		let className = settings.className;
		if (className.indexOf(' expanded') == -1) {
			className += ' expanded';
			settingsTodo();
		} else {
			className = className.replace(' expanded', '');
			op1.removeEventListener("input", settFontSize, false);
			op2.removeEventListener("input", settBackgroundToDo, false);
			op3.removeEventListener("input", settFontColorTasks, false);
			console.log("removeEventListener: Removed from all options");
		}
		settings.className = className;
		return false;
	};

	initParametrTodo();

	document.getElementById('allCheck').addEventListener("click", allItemCheckedTodo);
	document.getElementById('add').addEventListener("click", function () {
		let addTaskTodo = document.getElementById('add-text').value;
		addItemTodo(addTaskTodo);
	});
	document.getElementById('del').addEventListener("click", delItemTodo);
	ul.addEventListener("click", checkItemTodo);
}