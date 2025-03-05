export class Favorites {
    // Добавить / уборать из избранного
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
}
