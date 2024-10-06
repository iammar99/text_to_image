// import { REACT_APP_HUGGINGFACE_API_KEY } from "../config"
// ----------------------------- For Image Genrator -----------------------------

let image = document.getElementById("image")
let token = REACT_APP_HUGGINGFACE_API_KEY
let input = document.getElementById("floatingInput")

async function query() {
	showLoader()
	let result
	try {
		const response = await fetch(
			"https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4",
			{
				headers: { Authorization: `Bearer ${token}` },
				method: "POST",
				body: JSON.stringify({ inputs: input.value }),
			}
		);
		result = await response.blob();
	}
	catch {
		swal({
			icon: "error",
			title: "Oops...",
			text: "Something went wrong!",
		});
	}
	hideLoader()
	return result;
}

const handleSubmit = async () => {
	query()
	.then((response) => {
		const objectURL = URL.createObjectURL(response)
		image.src = objectURL
	})
	.catch((error)=>{
		console.log(error)
	})
}

// ----------------------------- For Color Picker -----------------------------

const handleBodyColor = () => {
	let body = document.getElementById("body")
	let bodyColor = document.getElementById("bodyColor")
	let BackColorValue = bodyColor.value
	body.style.backgroundColor = BackColorValue
}

const handleColor = () => {
	let body = document.getElementById("body")
	let color = document.getElementById("color")
	let colorValue = color.value
	body.style.color = colorValue
}


// ----------------------------- For Year -----------------------------

let date = document.getElementById("year")
let year = new Date
year = year.getFullYear()
date.innerHTML = year

// ----------------------------- For Loader -----------------------------

const showLoader = () => {
	let loader = document.getElementById("loader")
	loader.style.display = "flex"
}

const hideLoader = () => {
	let loader = document.getElementById("loader")
	loader.style.display = "none"

}

// ----------------------------- For Remove image ----------------------------- 

const handleRemove = () => {
	swal({
		icon: "error",
		title: "Removed",
		text: "You Deleted Generated Image",
	});
	image.src = ""
}
