import"./assets/modulepreload-polyfill-3cfb730f.js";import{i as s}from"./assets/vendor-77e16229.js";const l="/goit-js-hw-10/assets/bi_x-octagon-4f06a8ee.svg",m="/goit-js-hw-10/assets/bi_check2-circle-286069d5.svg",o=document.querySelector(".form");o.addEventListener("submit",d);function d(c){c.preventDefault();const n=o.querySelector('input[name="state"]:checked').value,i=o.querySelector('input[name="delay"]'),t=Number(i.value);function r(e){return new Promise((u,a)=>{if(e==="rejected")return setTimeout(()=>a(`Error Rejected promise in ${t}ms`),t);setTimeout(()=>u(`OK Fulfilled promise in ${t}ms`),t)})}r(n).then(e=>{console.log(e),s.success({message:e,position:"topRight",iconUrl:m})}).catch(e=>{console.log(e),s.error({message:e,position:"topRight",iconUrl:l})}),o.reset()}
//# sourceMappingURL=commonHelpers2.js.map
