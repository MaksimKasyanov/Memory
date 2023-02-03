const cards = document.querySelectorAll('.card');
const reload = document.querySelector('.reload');

let couplesCounter = 0;
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
}

const checkIsMatch = () => {
	const isEqual = firstCard.dataset.value === secondCard.dataset.value
	isEqual ? matchedCards() : unmatchedCards();
}

const matchedCards = () => {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);
	document.querySelector('.title span').innerHTML = ++couplesCounter;
	if(couplesCounter === 8) return document.querySelector('.title').innerHTML = 'Умнічка =)';
}

const unmatchedCards = () => {
	boardLocked = true;
	setTimeout(() => {
		firstCard.classList.remove("card_flipped");
		secondCard.classList.remove("card_flipped");
		boardLocked = false;
		firstCard = null;
	},1000);
}

const matchesCounter = () => {

}
reload.addEventListener('click', () => {
	window.location.reload();
})
cards.forEach(card => {
	card.addEventListener('click', flipCard);
	const randomIndex = Math.floor(Math.random() * cards.length);
	card.style.order = randomIndex;
})

