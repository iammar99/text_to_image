// ----------------------------- For Image Genrator -----------------------------

let image = document.getElementById("image")
let token = "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"
let input = document.getElementById("floatingInput")

async function query() {
	showLoader()
	let result
	try{
		const response = await fetch(
			"https://api-inference.huggingface.co/models/Melonie/text_to_image_finetuned",
			{
				headers: { Authorization: `Bearer ${token}` },
				method: "POST",
				body: JSON.stringify({ inputs: input.value }),
			}
		);
		 result = await response.blob();
	}
	catch{
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
	query().then((response) => {
		const objectURL = URL.createObjectURL(response)
		image.src = objectURL
	})
}

// ----------------------------- For Color Picker -----------------------------

function handleColor(){
	let color = document.getElementById("color")
	let body = document.getElementById("body")
	let BackColorValue = color.value
	let colorValue = ""
	console.log('BackColorValue', BackColorValue)
	if(BackColorValue == "#000000"){
		console.log('colorValue', colorValue)
		colorValue = "#FFFFFF"
	}
	else{
		colorValue = "#000000"
	}
	body.style.backgroundColor = BackColorValue
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
