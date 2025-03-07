export class Sorting {
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
                if (how !== 'idk') {
                    document.querySelector('#remove-span').remove();
                }
                this.showListBtn.setAttribute('how', el.textContent);
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
        if (nextHow === 'По дате') {
            dateToSort.forEach((el) => {
                comsAndResps.push(el.textContent);
            });
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
            const order = this.triangle.getAttribute('order');
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
            const cA = +localStorage.getItem('commentsAmount');
            const rA = +localStorage.getItem('respAmount');
            const ratings = [];
            this.ratingsToArr(ratings, cA, 'p');
            this.ratingsToArr(ratings, rA, 'pp');
            const sortRatings = ratings.sort((a, b) => b - a);
            const allRatings = document.querySelectorAll('[rating]');
            const order = this.triangle.getAttribute('order');
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
            alert('Все комментарии актуальны!');
        }
        else {
            console.log(4);
        }
    }
    // Рейтинги в массив
    ratingsToArr(rat, amount, p) {
        for (let i = 1; i <= amount; i++) {
            let r = +document.querySelector(`.${p}${i}`).textContent;
            let pNum = document.querySelector(`.${p}${i}`);
            if (pNum.style.color === 'rgb(255, 0, 0)') {
                pNum.setAttribute('rating', `${r * -1}`);
                rat.push(r * -1);
            }
            else {
                pNum.setAttribute('rating', `${r}`);
                rat.push(r);
            }
        }
    }
    // Нода по тексту
    getElementByText(text) {
        const xpath = `//node()[normalize-space(text())='${text.trim()}']`;
        return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }
}
