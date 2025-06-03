export class Favorites {
    // Добавить / убрать из избранного
    addRemoveMark() {
        const favs = document.querySelectorAll('#favs');
        favs.forEach((el) => {
            const favListener = el.getAttribute('hasFavListener') ?? 'no';
            if (favListener === 'no') {
                el.setAttribute('hasFavListener', 'yes');
                el.addEventListener('click', () => {
                    const num = el.parentElement.parentElement.parentElement.getAttribute('num');
                    const respNum = el.parentElement.parentElement.parentElement.getAttribute('respnum');
                    const favs = JSON.parse(localStorage.getItem('favorites')) ?? [];
                    let result = '';
                    num ? (result = `num="${num}"`) : (result = `respnum="${respNum}"`);
                    if (el.childNodes[1].textContent === 'В избранное') {
                        el.innerHTML = `<img src="ImgForCommentSystem/filledHeart.svg" alt="*"><p>В избранном</p>`;
                        favs.push(result);
                        localStorage.setItem('favorites', JSON.stringify(favs));
                    }
                    else {
                        el.innerHTML = `<img src="ImgForCommentSystem/heart.svg" alt="*"><p>В избранное</p>`;
                        let newFavs = favs.filter((elem) => {
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
    updateFavs() {
        const favs = JSON.parse(localStorage.getItem('favorites')) ?? [];
        if (favs.length > 0) {
            favs.forEach((el) => {
                const parentBlock = document.querySelector(`[${el}]`);
                const btn = parentBlock.querySelector('#favs');
                btn.innerHTML = `<img src="ImgForCommentSystem/filledHeart.svg" alt="*"><p>В избранном</p>`;
            });
        }
    }
    // Показать только избранные
    showOnlyFavs() {
        const favs = JSON.parse(localStorage.getItem('favorites')) ?? [];
        const allComs = document.querySelectorAll('.comment__created');
        const allResps = document.querySelectorAll('.response__created');
        const comAttr = [];
        const respAttr = [];
        const comOnlyFavs = [];
        const respOnlyFavs = [];
        const amount = document.querySelector('.comments__amount');
        amount.innerHTML = `(${favs.length})`;
        if (favs.length > 0) {
            favs.forEach((el) => {
                allComs.forEach((com) => {
                    let num = com.getAttribute('num');
                    if (`num="${num}"` === el && num !== null) {
                        comOnlyFavs.push(num);
                    }
                });
                allResps.forEach((com) => {
                    let respnum = com.getAttribute('respnum');
                    if (`respnum="${respnum}"` === el && respnum !== null) {
                        respOnlyFavs.push(respnum);
                    }
                });
            });
            allComs.forEach((com) => {
                let cAttr = com.getAttribute('num');
                if (cAttr !== null) {
                    comAttr.push(cAttr);
                }
            });
            allResps.forEach((com) => {
                let rAttr = com.getAttribute('respnum');
                if (rAttr !== null) {
                    respAttr.push(rAttr);
                }
            });
            const comsDelete = comAttr.filter((e) => !comOnlyFavs.includes(e));
            const respDelete = respAttr.filter((e) => !respOnlyFavs.includes(e));
            comsDelete.forEach((el) => {
                const delMe = document.querySelector(`[num="${el}"]`);
                delMe !== null ? delMe.remove() : delMe;
            });
            respDelete.forEach((el) => {
                const delMe = document.querySelector(`[respnum="${el}"]`);
                delMe !== null ? delMe.remove() : delMe;
            });
        }
        else {
            allComs.forEach((com) => {
                com.remove();
            });
            allResps.forEach((com) => {
                com.remove();
            });
        }
    }
    // Убрать избранные
    backToComs() {
        const allComs = document.querySelectorAll('.comment__created');
        const allResps = document.querySelectorAll('.response__created');
        allComs.forEach((el) => {
            el.remove();
        });
        allResps.forEach((el) => {
            el.remove();
        });
    }
}
