import React from 'react'

const items = ["Item 1", "Item 2", "Item 3"];
const hrefArr = ["/item/1", "/item/2", "/item/3"]
const handleClick = (e) => {
  e.preventDefault();
  console.log(e.target.href);
}

const liElements = items.map((item, index) =>
  React.createElement(
    "li",
    { key: index },
    React.createElement("a", { href: `${hrefArr[index]}`, onClick: handleClick }, item)
  )
);


const ulElement = React.createElement("ul", { style: { display: 'flex', gap: '10px' } }, liElements);
const Introduce = () => {
  return ulElement;
}

export default Introduce
