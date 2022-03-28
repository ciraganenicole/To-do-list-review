/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./modules/Tasks.js":
/*!**************************!*\
  !*** ./modules/Tasks.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Task {
  constructor(description, completed, index, editable) {
    this.description = description;
    this.completed = completed || false;
    this.index = index;
    this.editable = editable || false;
  }

  getHtml() {
    return ` <li class="task" draggable="true">
           <div class="description">
        <input type="checkbox" class="check"  id="checkbox-${this.index - 1}" ${this.completed ? 'checked' : ''}/>
        ${!this.editable ? `<p class="text">${this.description}</p>` : ''}
        ${this.editable ? `<input value='${this.description}' id="input-${this.index - 1}"/>` : ''}</div>
     <div id="myLinks-${this.index - 1}" style="display:none" class="list" >
     <a href="#" class='del' id="del-${this.index - 1}">Delete</a>
     <a href="#" class='edit'>Edit</a>
   </div>
     <button class="remove" id="remove-${this.index - 1}"><i class="fa-solid fa-ellipsis-vertical ellips"></i></button>
     </li>`;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Task);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./modules/TasksList.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Tasks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tasks.js */ "./modules/Tasks.js");


class Tasks {
    constructor() {
        this.tasks = [];
    }

    initialize() {
        const stored = localStorage.getItem('taskData');
        if (stored) {
            this.tasks = JSON.parse(stored)
                .map((task, index) => new _Tasks_js__WEBPACK_IMPORTED_MODULE_0__["default"](task.description, task.completed, index + 1));
            this.setHtml();
        }
        this.setup();
    }

    setup() {
        this.setupRemove();
        this.setupComplete();
        this.setupClearAll();
    }

    setupClearAll() {
        document.getElementById('clear').addEventListener('click', () => {
            this.assignTasks(this.tasks.filter((task) => !task.completed));
        });
    }

    assignTasks(tasks = this.tasks) {
        const newTasks = [];
        tasks.forEach((t, index) => {
            newTasks.push(new _Tasks_js__WEBPACK_IMPORTED_MODULE_0__["default"](t.description, t.completed, index + 1, t.editable));
        });
        this.tasks = newTasks;
        localStorage.setItem('taskData', JSON.stringify(this.tasks.map((t, index) => ({...t, index }))));
        this.setHtml();
        this.setup();
    }
    hamburger = () => {
        const remove = document.querySelectorAll('.remove');
        remove.forEach((rmBtn) => {
            const hamb = document.getElementById(rmBtn.id.replace('remove', 'myLinks'));
            rmBtn.addEventListener('click', () => {
                rmBtn.style.display = 'none';
                hamb.style.display = 'flex';
            });
        });
    };

    setupRemove() {
        hamburger();
        const del = document.querySelectorAll('.del');
        del.forEach((button) => {
            const removeFunc = () => {
                const index = parseInt(button.id.replace('del-', ''), 10);
                const newTasks = this.tasks.filter((t) => t.index !== index + 1);
                this.assignTasks(newTasks);
            };
            button.onclick = removeFunc;
        });

        const edit = document.querySelectorAll('.edit');
        edit.forEach((button, index) => {
            button.addEventListener('click', () => {
                this.tasks[index].editable = true;
                this.assignTasks();
                const input = document.getElementById(`input-${index}`);
                input.addEventListener('change', (e) => {
                    e.preventDefault();
                    this.tasks[index].description = e.target.value;
                    this.tasks[index].editable = false;
                    this.assignTasks();
                });
            });
        });
    }

    setupComplete() {
        const checkboxList = document.querySelectorAll('.check');
        checkboxList.forEach((checkbox) => {
            checkbox.addEventListener('click', () => {
                this.tasks[parseInt(checkbox.id.replace('checkbox-', ''), 10)].completed = checkbox.checked;
                this.assignTasks();
            });
        });
    }

    newTask(description, completed) {
        const task = new _Tasks_js__WEBPACK_IMPORTED_MODULE_0__["default"](description, completed, this.tasks.length + 1);
        this.tasks.push(task);
        this.assignTasks();
        return task;
    }

    getBookList() {
        let containerHtml = '';
        this.tasks.forEach((task) => {
            containerHtml += task.getHtml();
        });
        return containerHtml;
    }

    setHtml() {
        const container = document.getElementById('tasks');
        container.innerHTML = this.getBookList();
        this.setupRemove();
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tasks);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFza3NMaXN0LmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsZUFBZSxJQUFJLGdDQUFnQztBQUNoSCxVQUFVLG9DQUFvQyxpQkFBaUI7QUFDL0QsVUFBVSxpQ0FBaUMsaUJBQWlCLGNBQWMsZUFBZSxVQUFVO0FBQ25HLHdCQUF3QixlQUFlO0FBQ3ZDLHVDQUF1QyxlQUFlO0FBQ3REO0FBQ0E7QUFDQSx5Q0FBeUMsZUFBZTtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLElBQUk7Ozs7OztVQ3ZCbkI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ044QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxpREFBSTtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsaURBQUk7QUFDbEMsU0FBUztBQUNUO0FBQ0EsdUZBQXVGLGFBQWE7QUFDcEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0QsTUFBTTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLGlEQUFJO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLEtBQUssRSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLWxpc3QvLi9tb2R1bGVzL1Rhc2tzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbW9kdWxlcy9UYXNrc0xpc3QuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgVGFzayB7XHJcbiAgY29uc3RydWN0b3IoZGVzY3JpcHRpb24sIGNvbXBsZXRlZCwgaW5kZXgsIGVkaXRhYmxlKSB7XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XHJcbiAgICB0aGlzLmNvbXBsZXRlZCA9IGNvbXBsZXRlZCB8fCBmYWxzZTtcclxuICAgIHRoaXMuaW5kZXggPSBpbmRleDtcclxuICAgIHRoaXMuZWRpdGFibGUgPSBlZGl0YWJsZSB8fCBmYWxzZTtcclxuICB9XHJcblxyXG4gIGdldEh0bWwoKSB7XHJcbiAgICByZXR1cm4gYCA8bGkgY2xhc3M9XCJ0YXNrXCIgZHJhZ2dhYmxlPVwidHJ1ZVwiPlxyXG4gICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXNjcmlwdGlvblwiPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjbGFzcz1cImNoZWNrXCIgIGlkPVwiY2hlY2tib3gtJHt0aGlzLmluZGV4IC0gMX1cIiAke3RoaXMuY29tcGxldGVkID8gJ2NoZWNrZWQnIDogJyd9Lz5cclxuICAgICAgICAkeyF0aGlzLmVkaXRhYmxlID8gYDxwIGNsYXNzPVwidGV4dFwiPiR7dGhpcy5kZXNjcmlwdGlvbn08L3A+YCA6ICcnfVxyXG4gICAgICAgICR7dGhpcy5lZGl0YWJsZSA/IGA8aW5wdXQgdmFsdWU9JyR7dGhpcy5kZXNjcmlwdGlvbn0nIGlkPVwiaW5wdXQtJHt0aGlzLmluZGV4IC0gMX1cIi8+YCA6ICcnfTwvZGl2PlxyXG4gICAgIDxkaXYgaWQ9XCJteUxpbmtzLSR7dGhpcy5pbmRleCAtIDF9XCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIiBjbGFzcz1cImxpc3RcIiA+XHJcbiAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz0nZGVsJyBpZD1cImRlbC0ke3RoaXMuaW5kZXggLSAxfVwiPkRlbGV0ZTwvYT5cclxuICAgICA8YSBocmVmPVwiI1wiIGNsYXNzPSdlZGl0Jz5FZGl0PC9hPlxyXG4gICA8L2Rpdj5cclxuICAgICA8YnV0dG9uIGNsYXNzPVwicmVtb3ZlXCIgaWQ9XCJyZW1vdmUtJHt0aGlzLmluZGV4IC0gMX1cIj48aSBjbGFzcz1cImZhLXNvbGlkIGZhLWVsbGlwc2lzLXZlcnRpY2FsIGVsbGlwc1wiPjwvaT48L2J1dHRvbj5cclxuICAgICA8L2xpPmA7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUYXNrOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFRhc2sgZnJvbSAnLi9UYXNrcy5qcyc7XHJcblxyXG5jbGFzcyBUYXNrcyB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnRhc2tzID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdGlhbGl6ZSgpIHtcclxuICAgICAgICBjb25zdCBzdG9yZWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFza0RhdGEnKTtcclxuICAgICAgICBpZiAoc3RvcmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFza3MgPSBKU09OLnBhcnNlKHN0b3JlZClcclxuICAgICAgICAgICAgICAgIC5tYXAoKHRhc2ssIGluZGV4KSA9PiBuZXcgVGFzayh0YXNrLmRlc2NyaXB0aW9uLCB0YXNrLmNvbXBsZXRlZCwgaW5kZXggKyAxKSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0SHRtbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldHVwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0dXAoKSB7XHJcbiAgICAgICAgdGhpcy5zZXR1cFJlbW92ZSgpO1xyXG4gICAgICAgIHRoaXMuc2V0dXBDb21wbGV0ZSgpO1xyXG4gICAgICAgIHRoaXMuc2V0dXBDbGVhckFsbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldHVwQ2xlYXJBbGwoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsZWFyJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYXNzaWduVGFza3ModGhpcy50YXNrcy5maWx0ZXIoKHRhc2spID0+ICF0YXNrLmNvbXBsZXRlZCkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFzc2lnblRhc2tzKHRhc2tzID0gdGhpcy50YXNrcykge1xyXG4gICAgICAgIGNvbnN0IG5ld1Rhc2tzID0gW107XHJcbiAgICAgICAgdGFza3MuZm9yRWFjaCgodCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgbmV3VGFza3MucHVzaChuZXcgVGFzayh0LmRlc2NyaXB0aW9uLCB0LmNvbXBsZXRlZCwgaW5kZXggKyAxLCB0LmVkaXRhYmxlKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy50YXNrcyA9IG5ld1Rhc2tzO1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0YXNrRGF0YScsIEpTT04uc3RyaW5naWZ5KHRoaXMudGFza3MubWFwKCh0LCBpbmRleCkgPT4gKHsuLi50LCBpbmRleCB9KSkpKTtcclxuICAgICAgICB0aGlzLnNldEh0bWwoKTtcclxuICAgICAgICB0aGlzLnNldHVwKCk7XHJcbiAgICB9XHJcbiAgICBoYW1idXJnZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVtb3ZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJlbW92ZScpO1xyXG4gICAgICAgIHJlbW92ZS5mb3JFYWNoKChybUJ0bikgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBoYW1iID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocm1CdG4uaWQucmVwbGFjZSgncmVtb3ZlJywgJ215TGlua3MnKSk7XHJcbiAgICAgICAgICAgIHJtQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcm1CdG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgIGhhbWIuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHNldHVwUmVtb3ZlKCkge1xyXG4gICAgICAgIGhhbWJ1cmdlcigpO1xyXG4gICAgICAgIGNvbnN0IGRlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kZWwnKTtcclxuICAgICAgICBkZWwuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlbW92ZUZ1bmMgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHBhcnNlSW50KGJ1dHRvbi5pZC5yZXBsYWNlKCdkZWwtJywgJycpLCAxMCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdUYXNrcyA9IHRoaXMudGFza3MuZmlsdGVyKCh0KSA9PiB0LmluZGV4ICE9PSBpbmRleCArIDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hc3NpZ25UYXNrcyhuZXdUYXNrcyk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGJ1dHRvbi5vbmNsaWNrID0gcmVtb3ZlRnVuYztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgZWRpdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5lZGl0Jyk7XHJcbiAgICAgICAgZWRpdC5mb3JFYWNoKChidXR0b24sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFza3NbaW5kZXhdLmVkaXRhYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXNzaWduVGFza3MoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGlucHV0LSR7aW5kZXh9YCk7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhc2tzW2luZGV4XS5kZXNjcmlwdGlvbiA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFza3NbaW5kZXhdLmVkaXRhYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hc3NpZ25UYXNrcygpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNldHVwQ29tcGxldGUoKSB7XHJcbiAgICAgICAgY29uc3QgY2hlY2tib3hMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNoZWNrJyk7XHJcbiAgICAgICAgY2hlY2tib3hMaXN0LmZvckVhY2goKGNoZWNrYm94KSA9PiB7XHJcbiAgICAgICAgICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YXNrc1twYXJzZUludChjaGVja2JveC5pZC5yZXBsYWNlKCdjaGVja2JveC0nLCAnJyksIDEwKV0uY29tcGxldGVkID0gY2hlY2tib3guY2hlY2tlZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXNzaWduVGFza3MoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmV3VGFzayhkZXNjcmlwdGlvbiwgY29tcGxldGVkKSB7XHJcbiAgICAgICAgY29uc3QgdGFzayA9IG5ldyBUYXNrKGRlc2NyaXB0aW9uLCBjb21wbGV0ZWQsIHRoaXMudGFza3MubGVuZ3RoICsgMSk7XHJcbiAgICAgICAgdGhpcy50YXNrcy5wdXNoKHRhc2spO1xyXG4gICAgICAgIHRoaXMuYXNzaWduVGFza3MoKTtcclxuICAgICAgICByZXR1cm4gdGFzaztcclxuICAgIH1cclxuXHJcbiAgICBnZXRCb29rTGlzdCgpIHtcclxuICAgICAgICBsZXQgY29udGFpbmVySHRtbCA9ICcnO1xyXG4gICAgICAgIHRoaXMudGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xyXG4gICAgICAgICAgICBjb250YWluZXJIdG1sICs9IHRhc2suZ2V0SHRtbCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBjb250YWluZXJIdG1sO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEh0bWwoKSB7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2tzJyk7XHJcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IHRoaXMuZ2V0Qm9va0xpc3QoKTtcclxuICAgICAgICB0aGlzLnNldHVwUmVtb3ZlKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRhc2tzOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==