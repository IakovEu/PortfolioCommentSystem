export class Sorting {
    // Делаю именно сортировку, а не отрисовку по новой, чтобы сохранить события на элементах
    showListBtn = document.querySelector('#show-list');
    list = document.querySelector('.comments__list');
    pSort = document.querySelectorAll('#list__p');
    parentBlock = document.querySelector('.main__comments');
    triangle = document.querySelector('#triangle');
    // Показать / убрать выпадающий список
    showList() {
        this.showListBtn.addEventListener('click', () => {
            this.list.classList.toggle('active');
        });
        this.pSelected();
        this.orderTriangle();
    }
    // Треугольник отвечает за порядок сортировки (сначала выбрать порядок и потом жать на вид сортировки!)
    orderTriangle() {
        this.triangle.addEventListener('click', () => {
            const order = this.triangle.getAttribute('order');
            if (order === 'normal') {
                this.triangle.style.rotate = '0deg';
                this.triangle.setAttribute('order', 'reverse');
            }
            else {
                this.triangle.style.rotate = '180deg';
                this.triangle.setAttribute('order', 'normal');
            }
        });
    }
    // Галочка на выбранный вид сортировки
    pSelected() {
        this.pSort.forEach((el) => {
            el.addEventListener('click', () => {
                const how = this.showListBtn.getAttribute('how');
                const span = '<span id="remove-span">&#10004;</span>';
                const delMe = document.querySelector('#remove-span');
                if (how !== 'idk' && delMe !== null) {
                    delMe.remove();
                }
                if (el.textContent !== null) {
                    this.showListBtn.setAttribute('how', el.textContent);
                }
                el.insertAdjacentHTML('afterbegin', span);
                this.sortBy();
                setTimeout(() => {
                    this.list.classList.toggle('active');
                }, 500);
            });
        });
    }
    // Сортировка (сортирую не только комменты, но и ответы)
    sortBy() {
        const nextHow = this.showListBtn.getAttribute('how');
        const dateToSort = document.querySelectorAll('.publishCom__span');
        const comsAndResps = [];
        const order = this.triangle.getAttribute('order');
        const respDivs = document.querySelectorAll('.response__created');
        if (nextHow === 'По дате') {
            this.showListBtn.innerHTML = 'По дате';
            if (dateToSort.length > 0) {
                dateToSort.forEach((el) => {
                    comsAndResps.push(el.textContent);
                });
            }
            // Я не умею пользоваться регулярками(
            const sortedByDate = comsAndResps
                .map((el) => {
                return +el.replace('.', '').replace(' ', '').replace(':', '');
            })
                .sort((a, b) => a - b)
                .map((el) => {
                if (`${el}`.length !== 8) {
                    return ('0' + el)
                        .split('')
                        .toSpliced(2, 0, '.')
                        .toSpliced(5, 0, ' ')
                        .toSpliced(8, 0, ':')
                        .join('');
                }
            });
            if (order === 'normal') {
                sortedByDate.forEach((el) => {
                    this.parentBlock.appendChild(this.getElementByText(el).parentElement.parentElement);
                });
            }
            else {
                sortedByDate.reverse().forEach((el) => {
                    this.parentBlock.appendChild(this.getElementByText(el).parentElement.parentElement);
                });
            }
        }
        else if (nextHow === 'По количеству оценок') {
            this.showListBtn.innerHTML = 'По количеству оценок';
            const cA = document.querySelectorAll('.comment__created').length;
            const allResps = document.querySelectorAll('.response__created');
            const ratings = [];
            for (let i = 0; i <= cA - 1; i++) {
                let pNum = document.querySelector(`.p${i}`);
                if (pNum !== null) {
                    let r = +document.querySelector(`.p${i}`).textContent;
                    if (pNum.style.color === 'rgb(255, 0, 0)') {
                        pNum.setAttribute('rating', `${r * -1}`);
                        ratings.push(r * -1);
                    }
                    else {
                        pNum.setAttribute('rating', `${r}`);
                        ratings.push(r);
                    }
                }
            }
            allResps.forEach((el) => {
                const pp = el.children[2].children[1].children[1];
                const r = +pp.textContent;
                if (pp.getAttribute('style') === 'color: rgb(255, 0, 0);') {
                    pp.setAttribute('rating', `${r * -1}`);
                    ratings.push(r * -1);
                }
                else {
                    pp.setAttribute('rating', `${r}`);
                    ratings.push(r);
                }
            });
            const sortRatings = ratings.sort((a, b) => b - a);
            const allRatings = document.querySelectorAll('[rating]');
            if (order === 'normal') {
                sortRatings.forEach((r) => {
                    allRatings.forEach((el) => {
                        if (+el.getAttribute('rating') === r) {
                            this.parentBlock.appendChild(el.parentElement.parentElement.parentElement);
                        }
                    });
                });
            }
            else {
                sortRatings.reverse().forEach((r) => {
                    allRatings.forEach((el) => {
                        if (+el.getAttribute('rating') === r) {
                            this.parentBlock.appendChild(el.parentElement.parentElement.parentElement);
                        }
                    });
                });
            }
        }
        else if (nextHow === 'По актуальности') {
            this.showListBtn.innerHTML = 'По актуальности';
            alert('Все комментарии актуальны!');
        }
        else {
            this.showListBtn.innerHTML = 'По количеству ответов';
            const allResps = document.querySelectorAll('.publishCom__answered');
            const allComs = document.querySelectorAll('.comment__created');
            const answeredTo = {};
            const sortedNums = [];
            const orderNames = [];
            allResps.forEach((el) => {
                let name = el.children[1].textContent;
                if (name in answeredTo) {
                    answeredTo[name] += 1;
                }
                else {
                    answeredTo[name] = 1;
                }
            });
            for (let key in answeredTo) {
                sortedNums.push(answeredTo[key]);
            }
            sortedNums.sort((a, b) => b - a);
            sortedNums.forEach((el) => {
                for (let key in answeredTo) {
                    if (answeredTo[key] === el) {
                        orderNames.push(key);
                    }
                }
            });
            // Повторяющиеся имена убираю
            const finalOrder = [...new Set(orderNames)];
            if (order === 'normal') {
                finalOrder.forEach((name) => {
                    allComs.forEach((el) => {
                        let userName = el.children[0].children[0].children[1].textContent;
                        if (userName === name) {
                            el.setAttribute('hasresps', 'yes');
                            this.parentBlock.append(el);
                        }
                    });
                });
                allComs.forEach((el) => {
                    if (el.getAttribute('hasresps') !== 'yes') {
                        this.parentBlock.append(el);
                    }
                });
            }
            else {
                finalOrder.reverse().forEach((name) => {
                    allComs.forEach((el) => {
                        let userName = el.children[0].children[0].children[1].textContent;
                        if (userName === name) {
                            el.setAttribute('hasresps', 'yes');
                            this.parentBlock.append(el);
                        }
                    });
                });
            }
            respDivs.forEach((r) => {
                const respNum = +r.getAttribute('respnum').split('-')[0];
                allComs.forEach((el) => {
                    const num = +el.getAttribute('num');
                    if (respNum === num) {
                        el.after(r);
                    }
                });
            });
        }
    }
    // Нода по тексту
    getElementByText(text) {
        const xpath = `//node()[normalize-space(text())='${text.trim()}']`;
        return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }
}
