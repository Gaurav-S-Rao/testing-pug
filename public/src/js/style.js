const navbar = document.getElementsByClassName('navbar')[0];
const logoutBtn = document.getElementById('logoutBtn');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const dropdown = document.getElementsByClassName('dropdown')[0];
const navbarLinks = document
	.getElementsByClassName('navbar-links')[0]
	.getElementsByTagName('*');
const slider = document.getElementById('slider');
const weightDropdown = document.getElementById('weight-dropdown');
const modal = document.getElementById('myModal');
const img = document.getElementById('myImg');
let close_icon = document.getElementsByClassName('close')[0];
window.addEventListener('load', () => {
	if (document.location.pathname !== '/') {
		navbar.style.background = '#ffffff';
		navbar.classList.add('shadow-z');
		for (let i = 0; i < navbarLinks.length; i++) {
			navbarLinks[i].style.color = '#5f6368';
		}
		document
			.getElementsByClassName('shopping-cart')[0]
			.classList.add('svg-dark-fill');
		document.getElementsByClassName('navbar-logo-text')[0].style.color =
			'#5f6368';
	}
});

window.addEventListener('scroll', () => {
	if (document.location.pathname === '/') {
		navbar.style.transition = '300ms';
		if (window.pageYOffset >= 150) {
			navbar.style.background = '#ffffff';
			navbar.classList.add('shadow-z');
			for (let i = 0; i < navbarLinks.length; i++) {
				navbarLinks[i].style.color = '#5f6368';
			}
			document
				.getElementsByClassName('shopping-cart')[0]
				.classList.add('svg-dark-fill');
			document.getElementsByClassName('navbar-logo-text')[0].style.color =
				'#5f6368';
		} else {
			navbar.style.background = 'transparent';
			navbar.classList.remove('shadow-z');
			for (let i = 0; i < navbarLinks.length; i++) {
				navbarLinks[i].style.color = '#fff';
			}
			document
				.getElementsByClassName('shopping-cart')[0]
				.classList.remove('svg-dark-fill');
			document.getElementsByClassName('navbar-logo-text')[0].style.color =
				'#fff';
		}
	}
});

function DualRangeSlider(slider) {
	const handles = [...slider.querySelectorAll('.slider-btn')];
	const sliderRect = slider.getBoundingClientRect();
	const handleRect = handles[0].getBoundingClientRect();
	const inputLowerPrice = document.getElementById('priceLower');
	const inputUpperPrice = document.getElementById('priceUpper');
	let startPos = '0px';
	let activeHandle;
	const minValue = 0;
	const MaxValue = 2000;
	const sliderWidth = Math.round(
		sliderRect.width - sliderRect.left - handleRect.width / 2
	);
	let currentLowerValue = 0;
	let currentHigherValue = 600;
	handles.forEach((handle) => {
		handle.addEventListener('mousedown', onMouseDown);
	});
	window.addEventListener('mouseup', onMouseUp);

	slider.style.setProperty('--x-a', startPos);
	slider.style.setProperty(
		'--x-b',
		sliderWidth * 0.3 - handleRect.width / 2 + 'px'
	);
	inputLowerPrice.value = currentLowerValue;
	inputUpperPrice.value = currentHigherValue;

	function onMouseDown(e) {
		startPos = e.offsetX;
		activeHandle = e.target;
		window.addEventListener('mousemove', onMouseMove);
	}

	function onMouseMove(e) {
		const isLeft = activeHandle.classList.contains('left');
		const property = isLeft ? '--x-a' : '--x-b';
		const parentRect = slider.getBoundingClientRect();
		const handleRect = activeHandle.getBoundingClientRect();
		let newLeftX = e.clientX - parentRect.x - startPos;
		let rightEdge = slider.offsetWidth - activeHandle.offsetWidth;
		if (newLeftX < 0) {
			newLeftX = 0;
		}
		if (newLeftX > rightEdge) {
			newLeftX = rightEdge;
		}
		if (isLeft) {
			const otherX = parseInt(slider.style.getPropertyValue('--x-b'));
			newLeftX = Math.min(newLeftX, otherX - handleRect.width);
			newLeftX = Math.max(newLeftX, 0 - handleRect.width / 2);
		} else {
			const otherX = parseInt(slider.style.getPropertyValue('--x-a'));
			newLeftX = Math.max(newLeftX, otherX + handleRect.width);
			newLeftX = Math.min(
				newLeftX,
				parentRect.width - handleRect.width / 2
			);
		}
		slider.style.setProperty(property, newLeftX + 'px');
		calcSetPrice(isLeft, newLeftX);
	}

	function calcSetPrice(isLeft, leftX) {
		let inputPrice = isLeft ? inputLowerPrice : inputUpperPrice;
		let price = Math.round((MaxValue - minValue) * (leftX / sliderWidth));
		if (price >= 2000) {
			price = 2000;
		}
		inputPrice.value = price;
	}

	function onMouseUp() {
		window.removeEventListener('mousemove', onMouseMove);
	}
}

function WeightDropdown(dropdownElement) {
	const items = dropdownElement.querySelectorAll('.dropdown-content-item');
	const displayContent = document.getElementById('weight-dropdown-display');
	items.forEach((item) => {
		item.addEventListener('click', itemOnClick);
	});

	function itemOnClick(e) {
		displayContent.innerText = e.target.innerText;
	}
}

if (dropdown) {
	console.log('dropdown is present');
	dropdown.addEventListener('click', function (e) {
		const dropContent = document.getElementsByClassName(
			'dropdown-content'
		)[0];
		if (dropContent.style.display === 'none')
			dropContent.style.display = 'flex';
		else dropContent.style.display = 'none';
	});
}

if (loginForm) {
	loginForm.addEventListener('submit', async function (e) {
		e.preventDefault();
		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;
		try {
			const response = await axios.post(
				'http://localhost:3000/api/user/login', {
				email,
				password,
			}
			);
			if (response.data.status === 'success') {
				window.setTimeout(window.location.assign('/'), 500);
			}
		} catch (err) {
			console.log(err);
		}
	});
}

if (signupForm) {
	signupForm.addEventListener('submit', async function (e) {
		e.preventDefault();
		const email = document.getElementById('email').value;
		const username = document.getElementById('username').value;
		const password = document.getElementById('password').value;
		const confirmPassword = document.getElementById('confirmPassword')
			.value;
		try {
			const response = await axios.post(
				'http://127.0.0.1:3000/api/user/signup', {
				email,
				username,
				password,
				confirmPassword,
			}
			);
			if (response.data.status === 'success') {
				window.setTimeout(window.location.assign('/'), 500);
			}
		} catch (err) {
			console.log(err);
		}
	});
}
if (slider) {
	DualRangeSlider(slider);
}

if (weightDropdown) {
	WeightDropdown(weightDropdown);
}

// if (logoutBtn) {
// 	logoutBtn.addEventListener('click', async function (e) {
// 		e.preventDefault();
// 		try {
// 			const response = await axios.get('http://localhost:3000/api/user/logout');
// 			if (response.data.status === 'success') {
// 				window.setTimeout(window.location.assign('/'), 500);
// 			}
// 		} catch (err) {

// 		}
// 	})
// }

let url = document.getElementById('myImg').currentSrc;

if (url) {
	let http = new XMLHttpRequest();
	// Get the image and insert it inside the modal, using its "alt" text as a caption
	let modalImg = document.getElementById('imgUser');
	let captionText = document.getElementById('caption');
	img.onclick = function () {
		console.log(url);
		http.open('HEAD', url, false);
		http.send();
		if (http.status === 200) {
			modal.style.display = 'block';
			modalImg.src = url;
			captionText.innerHTML = this.alt;
		} else {
			modal.style.display = 'none';
		}
	};

	// Get the <span> element that closes the modal

	close_icon.onclick = function () {
		modal.style.display = 'none';
	};
}









///////////////////////////////////////////////////////////////////








// // This is a funtionality for scroll
// const navbar = document.getElementsByClassName("navbar")[0];
// const bannerSection = document.getElementsByClassName("banner")[0];

// window.addEventListener("scroll", () => {
//   // console.log(window.pageYOffset);
//   navbar.style.transition = "300ms";
//   if (window.pageYOffset >= 150) {
//     navbar.style.background = "#ffffff";
//   } else {
//     navbar.style.background = "transparent";
//   }
// });

// /////////////////////////////////////////////////////////////////

// // This is a modal to view the Profile photo
// var check = document.getElementsByClassName("profile-photo");
// var modal = document.getElementById("myModal");

// // To check if the src file is present
// var img = document.getElementById("myImg");
// var url = img.src;
// var http = new XMLHttpRequest();
// // Get the image and insert it inside the modal, using its "alt" text as a caption
// var modalImg = document.getElementById("imgUser");
// var captionText = document.getElementById("caption");
// img.onclick = function () {
//   http.open("HEAD", url, false);
//   http.send();
//   if (http.status === 200) {
//     modal.style.display = "block";
//     modalImg.src = this.src;
//     captionText.innerHTML = this.alt;
//   } else {
//     modal.style.display = "none";
//   }
// };

// // Get the <span> element that closes the modal
// var close_icon = document.getElementsByClassName("close")[0];

// close_icon.onclick = function () {
//   modal.style.display = "none";
// };
