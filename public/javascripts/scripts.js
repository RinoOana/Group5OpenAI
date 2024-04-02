let toggle = button => {
    let element = document.getElementById("picture");
    let hidden = element.getAttribute("hidden");
    
    if (hidden) {
       element.removeAttribute("hidden");
       
    } else {
       element.setAttribute("hidden", "hidden");
       
    }
  }