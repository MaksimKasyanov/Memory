const cards = document.querySelectorAll('.card');

let isCardFlipped, boardLocked = false;
let firstCard, secondCard = null;
const flipCard = event => {
	if(boardLocked) return;
	const target = event.target.parentElement;
	if(target === firstCard) return;
	target.classList.add("card_flipped");
	console.log(target.dataset.value)
	if(!isCardFlipped){
		isCardFlipped = true;
		firstCard = target;
	}else{
		isCardFlipped = false;
		secondCard = target;
		checkIsMatch()
	}
	// if(firstCard === secondCard){
	
	// 	isCardFlipped, firstCard, secondCard = false;
	// }else{
		
	// }
}

const checkIsMatch = () => {
	const isEqual = firstCard.dataset.value === secondCard.dataset.value
	isEqual ? disableCards() : unflipCards();
}

const disableCards = () => {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);
}

const unflipCards = () => {
	boardLocked = true;
	setTimeout(() => {
		firstCard.classList.remove("card_flipped");
		secondCard.classList.remove("card_flipped");
		boardLocked = false;
		firstCard = null;
	},1000);
}



cards.forEach(card => {
	card.addEventListener('click', flipCard);
	const randomIndex = Math.floor(Math.random() * cards.length);
	card.style.order = randomIndex;
})

