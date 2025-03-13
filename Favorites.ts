export class Favorites {
	// Добавить / убрать из избранного
	public addRemoveMark(): void {
		const favs: NodeListOf<Element> = document.querySelectorAll('#favs');

		favs.forEach((el) => {
			const favListener: string = el.getAttribute('hasFavListener') ?? 'no';
			if (favListener === 'no') {
				el.setAttribute('hasFavListener', 'yes');
				el.addEventListener('click', () => {
					const num: string =
						el.parentElement!.parentElement!.parentElement!.getAttribute(
							'num'
						)!;
					const respNum: string =
						el.parentElement!.parentElement!.parentElement!.getAttribute(
							'respnum'
						)!;

					const favs: string[] =
						JSON.parse(localStorage.getItem('favorites')!) ?? [];
					let result: string = '';
					num ? (result = `num="${num}"`) : (result = `respnum="${respNum}"`);

					if (el.childNodes[1].textContent === 'В избранное') {
						el.innerHTML = `<img src="ImgForCommentSystem/filledHeart.svg" alt="*"><p>В избранном</p>`;
						favs.push(result);
						localStorage.setItem('favorites', JSON.stringify(favs));
					} else {
						el.innerHTML = `<img src="ImgForCommentSystem/heart.svg" alt="*"><p>В избранное</p>`;
						let newFavs: string[] = favs.filter((elem) => {
							if (elem !== result) {
								return elem;
							}
						});
						localStorage.setItem('favorites', JSON.stringify(newFavs));
					}
				});
			}
		});
	}
	// Избранные при обновлении
	public updateFavs(): void {
		const favs: string[] = JSON.parse(localStorage.getItem('favorites')!) ?? [];

		if (favs.length > 0) {
			favs.forEach((el: string): void => {
				const parentBlock: HTMLDivElement = document.querySelector(`[${el}]`)!;
				const btn: HTMLButtonElement = parentBlock.querySelector('#favs')!;

				btn.innerHTML = `<img src="ImgForCommentSystem/filledHeart.svg" alt="*"><p>В избранном</p>`;
			});
		}
	}
	// Показать только избранные
	public showOnlyFavs(): void {
		const favs: string[] = JSON.parse(localStorage.getItem('favorites')!) ?? [];
		const allComs: NodeListOf<Element> =
			document.querySelectorAll('.comment__created');
		const allResps: NodeListOf<Element> =
			document.querySelectorAll('.response__created');
		const comAttr: string[] = [];
		const respAttr: string[] = [];
		const comOnlyFavs: string[] = [];
		const respOnlyFavs: string[] = [];
		const amount: Element = document.querySelector('.comments__amount')!;

		amount.innerHTML = `(${favs.length})`;

		if (favs.length > 0) {
			favs.forEach((el: string): void => {
				allComs.forEach((com: Element): void => {
					let num: string | null = com.getAttribute('num');
					if (`num="${num}"` === el && num !== null) {
						comOnlyFavs.push(num);
					}
				});
				allResps.forEach((com: Element): void => {
					let respnum: string | null = com.getAttribute('respnum');
					if (`respnum="${respnum}"` === el && respnum !== null) {
						respOnlyFavs.push(respnum);
					}
				});
			});
			allComs.forEach((com: Element): void => {
				let cAttr: string | null = com.getAttribute('num');
				if (cAttr !== null) {
					comAttr.push(cAttr);
				}
			});
			allResps.forEach((com: Element): void => {
				let rAttr: string | null = com.getAttribute('respnum');
				if (rAttr !== null) {
					respAttr.push(rAttr);
				}
			});

			const comsDelete = comAttr.filter(
				(e: string): boolean => !comOnlyFavs.includes(e)
			);
			const respDelete = respAttr.filter(
				(e: string): boolean => !respOnlyFavs.includes(e)
			);

			comsDelete.forEach((el: string) => {
				const delMe: HTMLDivElement | null =
					document.querySelector<HTMLDivElement>(`[num="${el}"]`);
				delMe !== null ? delMe.remove() : delMe;
			});
			respDelete.forEach((el: string) => {
				const delMe: HTMLDivElement | null =
					document.querySelector<HTMLDivElement>(`[respnum="${el}"]`);
				delMe !== null ? delMe.remove() : delMe;
			});
		} else {
			allComs.forEach((com: Element): void => {
				com.remove();
			});
			allResps.forEach((com: Element): void => {
				com.remove();
			});
		}
	}
	// Убрать избранные
	public backToComs(): void {
		const allComs: NodeListOf<Element> =
			document.querySelectorAll('.comment__created');
		const allResps: NodeListOf<Element> =
			document.querySelectorAll('.response__created');
		allComs.forEach((el: Element): void => {
			el.remove();
		});
		allResps.forEach((el: Element): void => {
			el.remove();
		});
	}
}
