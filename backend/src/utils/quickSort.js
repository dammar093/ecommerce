function quickSortProductAfterDiscount(products, sort) {
    if (products.length <= 1) {
        return products;
    }

    const pivot = products[products.length - 1];
    let left = [];
    let right = [];
    const pivotPriceAfterDiscount = Math.round(pivot.price - pivot.price * pivot.discountPercentage / 100);

    for (let i = 0; i < products.length - 1; i++) {
        const product = products[i];
        const priceAfterDiscount = Math.round(product.price - product.price * product.discountPercentage / 100);

        if (sort === "asc") {
            if (priceAfterDiscount <= pivotPriceAfterDiscount) {
                left.push(product);
            } else {
                right.push(product);
            }
        } else { // descending order
            if (priceAfterDiscount >= pivotPriceAfterDiscount) {
                left.push(product);
            } else {
                right.push(product);
            }
        }
    }

    return [...quickSortProductAfterDiscount(left, sort), pivot, ...quickSortProductAfterDiscount(right, sort)];
}

module.exports = quickSortProductAfterDiscount;


// const products=[
//   {
//     id:123,
//     price:90,
//     discountPercentage:10,
//     images:["eer"]
//   },
//   {
//     id:123,
//     price:10,
//     discountPercentage:10,
//     images:["eer"]
//   },
//   {
//     id:34324,
//     price:100,
//     discountPercentage:0
//   },
//   {
//     id:9875934,
//     price:1,
//     discountPercentage:1
//   }
// ]

// console.log(quickSortProductAfterDiscount(products,"sort"))

module.exports = quickSortProductAfterDiscount