import { Node } from 'typescript';

// Делаю именно сорртировку, а не отрисовку по новой, чтобы сохранить события на элементах
export class Sorting {
	showListBtn: HTMLButtonElement = document.querySelector('#show-list');
	list: HTMLDivElement = document.querySelector('.comments__list');
	pSort: NodeListOf<Element> = document.querySelectorAll('#list__p');
	parentBlock: Element = document.querySelector('.main__comments');
	triangle: HTMLButtonElement = document.querySelector('#triangle');

	// Показать / убрать выпадающий список
	public showList(): void {
		this.showListBtn.addEventListener('click', (): void => {
			this.list.classList.toggle('active');
		});
		this.pSelected();
		this.orderTriangle();
	}
	// Треугольник отвечает за порядок сортировки (сначала выбрать порядок и потом жать на вид сортировки!)
	private orderTriangle(): void {
		this.triangle.addEventListener('click', (): void => {
			const order: string = this.triangle.getAttribute('order');
			if (order === 'normal') {
				this.triangle.style.rotate = '0deg';
				this.triangle.setAttribute('order', 'reverse');
			} else {
				this.triangle.style.rotate = '180deg';
				this.triangle.setAttribute('order', 'normal');
			}
		});
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
				setTimeout(() => {
					this.list.classList.toggle('active');
				}, 500);
			});
		});
	}
	// Сортировка (сортирую не только комменты, но и ответы)
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
			const sortedByDate: string[] = comsAndResps
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

			const order: string = this.triangle.getAttribute('order');

			if (order === 'normal') {
				sortedByDate.forEach((el) => {
					this.parentBlock.appendChild(
						this.getElementByText(el).parentElement.parentElement
					);
				});
			} else {
				sortedByDate.reverse().forEach((el) => {
					this.parentBlock.appendChild(
						this.getElementByText(el).parentElement.parentElement
					);
				});
			}
		} else if (nextHow === 'По количеству оценок') {
			const cA: number = +localStorage.getItem('commentsAmount');
			const rA: number = +localStorage.getItem('respAmount');
			const ratings: number[] = [];
			this.ratingsToArr(ratings, cA, 'p');
			this.ratingsToArr(ratings, rA, 'pp');
			const sortRatings: number[] = ratings.sort((a, b) => b - a);
			const allRatings: NodeListOf<Element> =
				document.querySelectorAll('[rating]');
			const order: string = this.triangle.getAttribute('order');

			if (order === 'normal') {
				sortRatings.forEach((r) => {
					allRatings.forEach((el) => {
						if (+el.getAttribute('rating') === r) {
							this.parentBlock.appendChild(
								el.parentElement.parentElement.parentElement
							);
						}
					});
				});
			} else {
				sortRatings.reverse().forEach((r) => {
					allRatings.forEach((el) => {
						if (+el.getAttribute('rating') === r) {
							this.parentBlock.appendChild(
								el.parentElement.parentElement.parentElement
							);
						}
					});
				});
			}
		} else if (nextHow === 'По актуальности') {
			alert('Все комментарии актуальны!');
		} else {
			const allResps: NodeListOf<Element> = document.querySelectorAll(
				'.publishCom__answered'
			);
			allResps.forEach((el: Element) => {
                console.log(el.children[1].textContent);
            });
		}
	}
	// Рейтинги в массив
	private ratingsToArr(rat: number[], amount: number, p: string): void {
		for (let i = 1; i <= amount; i++) {
			let r: number = +document.querySelector(`.${p}${i}`).textContent;
			let pNum: HTMLParagraphElement = document.querySelector(`.${p}${i}`);
			if (pNum.style.color === 'rgb(255, 0, 0)') {
				pNum.setAttribute('rating', `${r * -1}`);
				rat.push(r * -1);
			} else {
				pNum.setAttribute('rating', `${r}`);
				rat.push(r);
			}
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
