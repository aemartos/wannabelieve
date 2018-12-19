
window.onload = function() {
/*-------------------------*/

// ANIMATE HEIGHT ACCORDION
const accordion = (trigger, content) => {
  content.style.maxHeight = '0px';
  content.style.overflow = 'hidden';
  content.style.opacity = '0';
  content.style.transform = 'translateY(0em)';
  trigger.style.transition = 'all 750ms cubic-bezier(0.4, 0, 0.2, 1)';
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
if(document.getElementById("sightSection")) accordion(document.getElementById("sightSection"), document.getElementById("sightAccordion"));
if(document.getElementById("regSection")) accordion(document.getElementById("regSection"), document.getElementById("regAccordion"));
if(document.getElementById("favSection")) accordion(document.getElementById("favSection"), document.getElementById("favAccordion"));
}