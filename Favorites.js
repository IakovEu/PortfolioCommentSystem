export class Favorites {
    // Добавить / убрать из избранного
    addRemoveMark() {
        const favs = document.querySelectorAll('#favs');
        favs.forEach((el) => {
            el.addEventListener('click', () => {
                const num = el.parentElement.parentElement.parentElement.getAttribute('num');
                const respNum = el.parentElement.parentElement.parentElement.getAttribute('respnum');
                let favorites = localStorage.getItem('favs');
                let result = '';
                num ? (result = `num="${num}"`) : (result = `respnum="${respNum}"`);
                if (el.childNodes[1].textContent === 'В избранное') {
                    el.innerHTML = `<img src="ImgForCommentSystem/filledHeart.svg" alt="*"><p>В избранном</p>`;
                    favorites
                        ? localStorage.setItem(`favs`, `${favorites} ${result}`)
                        : localStorage.setItem(`favs`, `${result}`);
                }
                else {
                    el.innerHTML = `<img src="ImgForCommentSystem/heart.svg" alt="*"><p>В избранное</p>`;
                    let newFavs = favorites
                        .split(' ')
                        .filter((el) => {
                        if (el != result) {
                            return el;
                        }
                    })
                        .join(' ');
                    localStorage.setItem('favs', newFavs);
                }
            });
        });
    }
    // Избранные при обновлении
    updateFavs() {
        const favs = localStorage.getItem('favs');
        if (favs) {
            favs.split(' ').forEach((el) => {
                let parentBlock = document.querySelector(`[${el}]`);
                parentBlock.querySelector('#favs').innerHTML = `<img src="ImgForCommentSystem/filledHeart.svg" alt="*"><p>В избранном</p>`;
            });
        }
    }
    // Показать только избранные
    showOnlyFavs() {
        const favs = localStorage.getItem('favs');
        const allComs = document.querySelectorAll('.comment__created');
        const allResps = document.querySelectorAll('.response__created');
        const comAttr = [];
        const respAttr = [];
        const comOnlyFavs = [];
        const respOnlyFavs = [];
        if (favs) {
            favs.split(' ').forEach((el) => {
                allComs.forEach((com) => {
                    let num = com.getAttribute('num');
                    if (`num="${num}"` === el) {
                        comOnlyFavs.push(num);
                    }
                });
                allResps.forEach((com) => {
                    let respnum = com.getAttribute('respnum');
                    if (`respnum="${respnum}"` === el) {
                        respOnlyFavs.push(respnum);
                    }
                });
            });
            allComs.forEach((com) => {
                comAttr.push(com.getAttribute('num'));
            });
            allResps.forEach((com) => {
                respAttr.push(com.getAttribute('respnum'));
            });
            const comsDelete = comAttr.filter((e) => !comOnlyFavs.includes(e));
            const respDelete = respAttr.filter((e) => !respOnlyFavs.includes(e));
            comsDelete.forEach((el) => {
                document.querySelector(`[num="${el}"]`).remove();
            });
            respDelete.forEach((el) => {
                document.querySelector(`[respnum="${el}"]`).remove();
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
