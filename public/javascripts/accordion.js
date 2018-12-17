var accItem = document.getElementsByClassName("accordionItem");
var accHD = document.getElementsByClassName("accordionItemHeading");

console.log(accItem)
console.log(accHD)
for (i = 0; i < accHD.length; i++) {
  accHD[i].addEventListener("click", toggleItem, false);
}

function toggleItem() {
  var itemClass = this.parentNode.className;

  console.log(itemClass)

  for (i = 0; i < accItem.length; i++) {
    accItem[i].className = "accordionItem close";
  }

  if (itemClass == "accordionItem close") {
    this.parentNode.className = "accordionItem open";
  }
}


/*-------------------------*/

// DISPLAY NONE ACCORDION
// const accordion = (trigger, content) => {
//   trigger.addEventListener("click", function() {
//     trigger.classList.toggle("rotate");
//     if (content.style.display === "block") {
//       content.style.display = "none";
//     } else {
//       content.style.display = "block";
//     }
//   });
// };

// ANIMATE HEIGHT ACCORDION
const accordion = (trigger, content) => {
  trigger.addEventListener("click", function() {
    trigger.classList.toggle("rotate");
    content.classList.toggle("closed");
    if (!content.style.maxHeight || content.style.maxHeight ==="0px") {
      content.style.maxHeight = content.scrollHeight + 25 + "px";
      content.style.paddingTop = "1.5em";
    } else {
      content.style.maxHeight = "0px";
      content.style.paddingTop = "0em";
    }
  });
};

accordion(document.getElementById("expandComments"), document.getElementById("commentsAccordion"));
accordion(document.getElementById("expandPhenomena"), document.getElementById("phenomsAccordion"));
