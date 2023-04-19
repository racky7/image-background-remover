document
  .querySelector("input[type=file]")
  .addEventListener("change", async function () {
    const resizedImage = await loadImage(this.files[0], {
		
	//resizing image using blue-load-image module
     
      maxWidth: 1500,
      maxHeight: 1500,
      canvas: true
    });

    resizedImage.image.toBlob(async function (inputBlob) {
      const formData = new FormData();
	  
	  //display table
	  
	  document.getElementById("myTable").removeAttribute("Hidden");
	  
	  //display input image 
	  const inputImage = document.createElement("img");
      document.querySelector("#result1").appendChild(inputImage);
      inputImage.style.width = "250px";
      inputImage.style.height = "250px";
      inputImage.src = URL.createObjectURL(inputBlob);
	  
	  //display loader
	  
	  const conImage = document.createElement("img");
      document.querySelector("#convert").appendChild(conImage);
      conImage.style.width = "25%";
      conImage.src = "spinner3.gif";
	  
	  //api call
      formData.append("image_file", inputBlob);

      const response = await fetch("https://sdk.photoroom.com/v1/segment", {
        method: "POST",
        headers: {
          "x-api-key": process.env.APIKEY
        },
        body: formData
      });
	    

     //output image
	 
      const outputBlob = await response.blob();
	  conImage.src = "arrow.png";
	  conImage.style.marginTop = "20%";
	  
      const outputImage = document.createElement("img");
      document.querySelector("#result").appendChild(outputImage);
      outputImage.style.width = "250px";
      outputImage.style.height = "250px";
      outputImage.src = URL.createObjectURL(outputBlob);
	  
	  //download button

      const getImg = document.createElement("a");
      const downBtn = document.querySelector("#downBtn");
	  downBtn.appendChild(getImg);
	  downBtn.removeAttribute("Hidden");
      getImg.href = URL.createObjectURL(outputBlob);
	  getImg.style.textDecoration = "none";
	  getImg.style.color = "inherit";
	  getImg.download = "removed-bg-image";
      getImg.innerText = "Download (PNG)";
	  
	  //display clear button
	  
      const clearBtn = document.querySelector("#clearBtn");
	  clearBtn.removeAttribute("Hidden");
	  
	  
      

    });
  })