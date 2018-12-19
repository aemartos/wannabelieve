var accItem = document.getElementsByClassName("accordionItem");
var accHD = document.getElementsByClassName("accordionItemHeading");

//console.log(accItem);
//console.log(accHD);
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

// ANIMATE HEIGHT ACCORDION
const accordion = (trigger, content) => {
  content.style.maxHeight = '0px';
  content.style.overflow = 'hidden';
  content.style.opacity = '0';
  content.style.transform = 'translateY(0em)';
  content.style.transition = 'all 750ms cubic-bezier(0.4, 0, 0.2, 1)';
  content.style["webkitTransition"] = 'all 750ms cubic-bezier(0.4, 0, 0.2, 1)';
  content.style.setProperty('-webkit-transition', 'all 750ms cubic-bezier(0.4, 0, 0.2, 1)');
  trigger.addEventListener("click", function() {
    if (!content.style.maxHeight || content.style.maxHeight ==="0px") {
      trigger.style.transform = 'rotate(180deg)';
      content.style.opacity = '1';
      content.style.maxHeight = content.scrollHeight + 25 + "px";
      content.style.paddingTop = "1.5em";
    } else {
      trigger.style.transform = 'rotate(0deg)';
      content.style.maxHeight = "0px";
      content.style.paddingTop = "0em";
    }
  });
};

if(document.getElementById("expandComments")) accordion(document.getElementById("expandComments"), document.getElementById("commentsAccordion"));
if(document.getElementById("expandPhenomena")) accordion(document.getElementById("expandPhenomena"), document.getElementById("phenomsAccordion"));
if(document.getElementById("expandRoutes")) accordion(document.getElementById("expandRoutes"), document.getElementById("routesAccordion"));

