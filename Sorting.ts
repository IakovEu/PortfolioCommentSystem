export class Sorting {
	showListBtn: HTMLButtonElement = document.querySelector('#show-list');
	list: HTMLDivElement = document.querySelector('.comments__list');
	pSort: NodeListOf<Element> = document.querySelectorAll('#list__p');
	// Показать / убрать выпадающий список
	public showList(): void {
		this.showListBtn.addEventListener('click', (): void => {
			this.list.classList.toggle('active');
		});
		this.pSelected();
	}
	// Галочка на выбранный вид сортировки
	private pSelected(): void {
		this.pSort.forEach((el: Element): void => {
			el.addEventListener('click', (): void => {
				const how: string = this.showListBtn.getAttribute('how');
				const span: string = '<span id="remove-span">&#10004;</span>';

				if (how !== 'idk') {
					document.querySelector<Element>('#remove-span').remove();
				}
				this.showListBtn.setAttribute('how', el.textContent);
				el.insertAdjacentHTML('afterbegin', span);
				this.sortBy();
			});
		});
	}
	// Сортировка
	private sortBy(): void {
		const nextHow: string = this.showListBtn.getAttribute('how');
		const dateToSort: NodeListOf<Element> =
			document.querySelectorAll('.publishCom__span');
		const comsAndResps: string[] = [];

		if (nextHow === 'По дате') {
			dateToSort.forEach((el: Element): void => {
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
		} else if (nextHow === 'По количеству оценок') {
			console.log(2);
		} else if (nextHow === 'По актуальности') {
			console.log(3);
		} else {
			console.log(4);
		}
	}
	// Нода по тексту
	private getElementByText(text: string) {
		const xpath = `//node()[normalize-space(text())='${text.trim()}']`;
		return document.evaluate(
			xpath,
			document,
			null,
			XPathResult.FIRST_ORDERED_NODE_TYPE,
			null
		).singleNodeValue;
	}
}
