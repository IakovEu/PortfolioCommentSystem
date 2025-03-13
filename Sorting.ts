export class Sorting {
	// Делаю именно сортировку, а не отрисовку по новой, чтобы сохранить события на элементах
	showListBtn: HTMLButtonElement = document.querySelector('#show-list')!;
	list: HTMLDivElement = document.querySelector('.comments__list')!;
	pSort: NodeListOf<Element> = document.querySelectorAll('#list__p')!;
	parentBlock: Element = document.querySelector('.main__comments')!;
	triangle: HTMLButtonElement = document.querySelector('#triangle')!;

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
			const order: string = this.triangle.getAttribute('order')!;
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
				const how: string = this.showListBtn.getAttribute('how')!;
				const span: string = '<span id="remove-span">&#10004;</span>';
				const delMe: Element | null = document.querySelector('#remove-span');

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
	private sortBy(): void {
		const nextHow: string = this.showListBtn.getAttribute('how')!;
		const dateToSort: NodeListOf<Element> =
			document.querySelectorAll('.publishCom__span');
		const comsAndResps: string[] = [];
		const order: string = this.triangle.getAttribute('order')!;
		const respDivs: NodeListOf<Element> =
			document.querySelectorAll('.response__created');

		if (nextHow === 'По дате') {
			this.showListBtn.innerHTML = 'По дате';

			if (dateToSort.length > 0) {
				dateToSort.forEach((el: Element): void => {
					comsAndResps.push(el.textContent!);
				});
			}
			// Я не умею пользоваться регулярками(
			const sortedByDate: (string | undefined)[] = comsAndResps
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
					this.parentBlock.appendChild(
						this.getElementByText(el!)!.parentElement!.parentElement!
					);
				});
			} else {
				sortedByDate.reverse().forEach((el) => {
					this.parentBlock.appendChild(
						this.getElementByText(el!)!.parentElement!.parentElement!
					);
				});
			}
		} else if (nextHow === 'По количеству оценок') {
			this.showListBtn.innerHTML = 'По количеству оценок';
			const cA: number = document.querySelectorAll('.comment__created').length;
			const allResps: NodeListOf<Element> =
				document.querySelectorAll('.response__created');
			const ratings: number[] = [];

			for (let i = 0; i <= cA - 1; i++) {
				let pNum: HTMLParagraphElement | null = document.querySelector(
					`.p${i}`
				);

				if (pNum !== null) {
					let r: number = +document.querySelector(`.p${i}`)!.textContent!;
					if (pNum.style.color === 'rgb(255, 0, 0)') {
						pNum.setAttribute('rating', `${r * -1}`);
						ratings.push(r * -1);
					} else {
						pNum.setAttribute('rating', `${r}`);
						ratings.push(r);
					}
				}
			}

			allResps.forEach((el) => {
				const pp: Element = el.children[2].children[1].children[1];
				const r: number = +pp.textContent!;
				if (pp.getAttribute('style') === 'color: rgb(255, 0, 0);') {
					pp.setAttribute('rating', `${r * -1}`);
					ratings.push(r * -1);
				} else {
					pp.setAttribute('rating', `${r}`);
					ratings.push(r);
				}
			});

			const sortRatings: number[] = ratings.sort((a, b) => b - a);
			const allRatings: NodeListOf<Element> =
				document.querySelectorAll('[rating]');

			if (order === 'normal') {
				sortRatings.forEach((r) => {
					allRatings.forEach((el) => {
						if (+el.getAttribute('rating')! === r) {
							this.parentBlock.appendChild(
								el.parentElement!.parentElement!.parentElement!
							);
						}
					});
				});
			} else {
				sortRatings.reverse().forEach((r) => {
					allRatings.forEach((el) => {
						if (+el.getAttribute('rating')! === r) {
							this.parentBlock.appendChild(
								el.parentElement!.parentElement!.parentElement!
							);
						}
					});
				});
			}
		} else if (nextHow === 'По актуальности') {
			this.showListBtn.innerHTML = 'По актуальности';
			alert('Все комментарии актуальны!');
		} else { 
			this.showListBtn.innerHTML = 'По количеству ответов';
			const allResps: NodeListOf<Element> = document.querySelectorAll(
				'.publishCom__answered'
			);
			const allComs: NodeListOf<Element> =
				document.querySelectorAll('.comment__created');
			type x = {
				[key: string]: number;
			};
			const answeredTo: x = {};
			const sortedNums: number[] = [];
			const orderNames: string[] = [];

			allResps.forEach((el: Element) => {
				let name: string = el.children[1].textContent!;
				if (name in answeredTo) {
					answeredTo[name] += 1;
				} else {
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
			const finalOrder: string[] = [...new Set(orderNames)];

			if (order === 'normal') {
				finalOrder.forEach((name) => {
					allComs.forEach((el) => {
						let userName: string =
							el.children[0].children[0].children[1].textContent!;
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
			} else {
				finalOrder.reverse().forEach((name) => {
					allComs.forEach((el) => {
						let userName: string =
							el.children[0].children[0].children[1].textContent!;
						if (userName === name) {
							el.setAttribute('hasresps', 'yes');
							this.parentBlock.append(el);
						}
					});
				});
			}
			respDivs.forEach((r) => {
				const respNum: number = +r.getAttribute('respnum')!.split('-')[0];
				allComs.forEach((el) => {
					const num: number = +el.getAttribute('num')!;
					if (respNum === num) {
						el.after(r);
					}
				});
			});
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
