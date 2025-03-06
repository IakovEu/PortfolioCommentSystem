export class Sorting {
    showListBtn = document.querySelector('#show-list');
    list = document.querySelector('.comments__list');
    pSort = document.querySelectorAll('#list__p');
    // Показать / убрать выпадающий список
    showList() {
        this.showListBtn.addEventListener('click', () => {
            this.list.classList.toggle('active');
        });
        this.pSelected();
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
            });
        });
    }
    // Сортировка
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
                .sort((a, b) => {
                return a - b;
            })
                .map((el) => {
                if (`${el}`.length !== 8) {
                    return '0' + el;
                }
            })
                .map((el) => {
                return el
                    .split('')
                    .toSpliced(2, 0, '.')
                    .toSpliced(5, 0, ' ')
                    .toSpliced(8, 0, ':')
                    .join('');
            });
            console.log(sortedByDate);
            // const x = this.getElementByText(comsAndResps[13])
            // const y = this.getElementByText(comsAndResps[12])
            // console.log(x.parentElement.parentElement);
            // console.log(y.parentElement.parentElement);
        }
        else if (nextHow === 'По количеству оценок') {
            console.log(2);
        }
        else if (nextHow === 'По актуальности') {
            console.log(3);
        }
        else {
            console.log(4);
        }
    }
    // Нода по тексту
    getElementByText(text) {
        const xpath = `//node()[normalize-space(text())='${text.trim()}']`;
        return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }
}
