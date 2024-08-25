function quickSortProductAfterDiscount(products, sort) {
    if (products.length <= 1) {
        return products;
    }

    const pivot = products[products.length - 1];
    let left = [];
    let right = [];
    const pivotPriceAfterDiscount = Math.round(
        pivot.price - (pivot.price * pivot.discountPercentage) / 100
    );

    for (let i = 0; i < products.length - 1; i++) {
        const product = products[i];
        const priceAfterDiscount = Math.round(
            product.price - (product.price * product.discountPercentage) / 100
        );

        if (sort === "asc") {
            if (priceAfterDiscount <= pivotPriceAfterDiscount) {
                left.push(product);
            } else {
                right.push(product);
            }
        } else {
            // descending order
            if (priceAfterDiscount >= pivotPriceAfterDiscount) {
                left.push(product);
            } else {
                right.push(product);
            }
        }
    }

    return [
        ...quickSortProductAfterDiscount(left, sort),
        pivot,
        ...quickSortProductAfterDiscount(right, sort),
    ];
}

/// sort product by rating
function quickSortRating(products) {
    // console.log(products);

    if (products.length <= 1) {
        return products;
    }

    const pivot = products[products.length - 1];
    // console.log(pivot);

    let left = [];
    let right = [];
    const pivotrating = pivot?.averageRating;
    // console.log(pivotrating);


    for (let i = 0; i < products.length - 1; i++) {
        const product = products[i];
        // console.log(product.averageRating);

        if (product.averageRating >= pivotrating) {
            left.push(product);
        } else {
            right.push(product);
        }
    }

    return [...quickSortRating(left), pivot, ...quickSortRating(right)];
}


// const products = [
//     {
//         id: 123,
//         price: 90,
//         discountPercentage: 10,
//         images: ["eer"],
//         averageRating: 1
//     },
//     {
//         id: 123,
//         price: 10,
//         discountPercentage: 10,
//         images: ["eer"],
//         averageRating: 2
//     },
//     {
//         id: 34324,
//         price: 100,
//         discountPercentage: 0,
//         averageRating: 3
//     },
//     {
//         id: 9875934,
//         price: 1,
//         discountPercentage: 1,
//         averageRating: 1
//     }
// ]

// console.log(quickSortRating(products))

module.exports = { quickSortProductAfterDiscount, quickSortRating };