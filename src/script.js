document.addEventListener('DOMContentLoaded', function() {
    const resetBtn = document.getElementById('reset_ingredients');

	if (resetBtn) {
		resetBtn.addEventListener('click', function() {
			ingredientsTotal = 0;
			for (let key in selectedIngredients) {
				delete selectedIngredients[key];
			}
			ingredientElements.forEach(function(ingredient) {
				const outline = ingredient.querySelector('.outline');
				if (outline) {
					outline.classList.remove('selected');
				}
			});
			updatePrice();
			updateIngredientsList();
		});
	}
	let basePrice = 129; // Початкова ціна Ø30 см
	let ingredientsTotal = 0;
	const priceElement = document.getElementById('price');
	const ingredientElements = document.querySelectorAll('.ingredient');
	const sizeRadios = document.querySelectorAll('input[name="size"]');
	const selectedIngredientsElement = document.getElementById('ingredient_list');

	// Об'єкт для підрахунку кількості кожного інгредієнта
	const selectedIngredients = {};

	function updatePrice() {
		priceElement.textContent = 'Ціна: ' + (basePrice + ingredientsTotal) + ' грн';
	}

	function updateIngredientsList() {
		const list = Object.entries(selectedIngredients)
			.map(([name, count]) => `${name} x${count}`)
			.join(' / ');
		if (selectedIngredientsElement) {
			selectedIngredientsElement.textContent = 'Інгрідієнти: ' + (list ? list : '');
		}
	}

	sizeRadios.forEach(function(radio) {
		radio.addEventListener('change', function() {
			if (radio.checked) {
				if (radio.id === 'check1') {
					basePrice = 129;
				} else if (radio.id === 'check2') {
					basePrice = 210;
				}
				updatePrice();
			}
		});
	});

	ingredientElements.forEach(function(ingredient) {
		ingredient.addEventListener('click', function() {
			const priceText = ingredient.querySelector('.ingredient_price').textContent;
			const price = parseInt(priceText);
			const name = ingredient.querySelector('.ingredient_name').textContent;
			if (!isNaN(price)) {
				ingredientsTotal += price;
				if (selectedIngredients[name]) {
					selectedIngredients[name] += 1;
				} else {
					selectedIngredients[name] = 1;
				}
				const outline = ingredient.querySelector('.outline');
				if (outline) {
					outline.classList.add('selected');
				}
				updatePrice();
				updateIngredientsList();
			}
		});
	});

	updatePrice();
	updateIngredientsList();
});
