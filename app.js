const totalPriceEl = document.querySelector(".total-price");
const prices = document.querySelectorAll(".price");
const changers = document.querySelectorAll(".changer");
const allInputEl = [...document.querySelectorAll("input[class]")];
const patterns = {
  text: /^\w{3,}(\s\w{3,})?$/,
  email: /^([a-z\d-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
  tel: /^(9)(8|7)\d{8}/,
  number: /^\d{5}$/,
};
allInputEl.pop();

allInputEl.forEach((inputEl) =>
  inputEl.addEventListener("keyup", (e) => {
    const parentEl = e.target.parentElement;
    const obj = {
      inputIcon: parentEl.lastElementChild,
      validatorIcon: parentEl.firstElementChild,
      regex: patterns[e.target.getAttribute("type")],
      value: e.target.value,
      field: e.target,
    };
    validate(obj);
  })
);

function validate({ inputIcon, validatorIcon, regex, value, field }) {
  if (regex.test(value)) {
    field.setAttribute("id", "validate-field");
    // validatorIcon.innerText = "keyboard_arrow_down"
    validatorIcon.innerText = "check_circle";
    validatorIcon.setAttribute("id", "validate-icon");
    inputIcon.setAttribute("id", "validate-icon");
    return;
  }
  field.setAttribute("id", "invalidate-field");
  validatorIcon.innerText = "error";
  validatorIcon.setAttribute("id", "invalidate-icon");
  inputIcon.setAttribute("id", "invalidate-icon");
}

changers.forEach((changer) => {
  changer.addEventListener("click", () => {
    const quantityEl = changer.parentElement.querySelector(".quantity");
    const priceEl =
      changer.parentElement.parentElement.firstElementChild.lastElementChild.querySelector(
        ".price"
      );
    const price = +changer.dataset.price;
    const actualPriceEl = priceEl.nextElementSibling;
    const currentActualDisplayedPrice = parseFloat(
      actualPriceEl.innerText.substr(1)
    );
    const actualPrice = parseFloat(actualPriceEl.dataset.price);
    const currentDisplayedPrice = +priceEl.innerText;
    let currentDisplayedQunatity = +quantityEl.innerText;
    switch (changer.dataset.type) {
      case "+":
        if (currentDisplayedQunatity == 20) return;
        priceEl.innerText = (price + currentDisplayedPrice).toFixed(2);
        currentDisplayedQunatity++;
        quantityEl.innerText = currentDisplayedQunatity;
        actualPriceEl.innerText = `$${(
          currentActualDisplayedPrice + actualPrice
        ).toFixed(2)}`;
        break;
      default:
        if (currentDisplayedQunatity == 1) return;
        priceEl.innerText = (currentDisplayedPrice - price).toFixed(2);
        currentDisplayedQunatity--;
        quantityEl.innerText = currentDisplayedQunatity;
        actualPriceEl.innerText = `$${(
          currentActualDisplayedPrice - actualPrice
        ).toFixed(2)}`;
    }
    const total =
      parseFloat(prices[0].innerText) + parseFloat(prices[1].innerText);
    totalPriceEl.innerText = "$" + total.toFixed(2);
  });
});
