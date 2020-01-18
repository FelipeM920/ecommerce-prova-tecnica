import { Service } from '../src/components/service.js';

const service = new Service();
const pageSize = 20;
const firstPage = 1;
let actualPage = 1;
let actualAnchor = 1;
let products = [];
let totalPages = 0;

service.loadProducts()
    .then(data => {
        totalPages = Math.ceil(data.products.length / pageSize);
        products = data.products
        paginate(firstPage)
        mapBarPaginationElements();
    })

const paginate = (pageNumber) => {
    if (pageNumber == '❮')
        --actualPage;
    else if (pageNumber == '❯')
        ++actualPage;
    else
        actualPage = --pageNumber;
        
    mapToHtml(products.slice(actualPage * pageSize, (actualPage + 1) * pageSize));
}

const setInactive = () => {
    const anchors = document.querySelectorAll('a');
    anchors.forEach(function (anchor) {
        anchor.classList.remove('active');
    })
}

const setActive = (anchorId) => {
    if (anchorId == 'arrowLeft')
        anchorId = `anchor${--actualAnchor}`;
    else if (anchorId == 'arrowRight')
        anchorId = `anchor${++actualAnchor}`;
    else
        actualAnchor = document.getElementById(anchorId).innerHTML;

    document.getElementById(anchorId).classList.add('active');
}

const manipulateActiveAnchor = (anchorId) => {
    setInactive();
    setActive(anchorId);
}

const addEvent = () => {
    const anchors = document.querySelectorAll('a');
    anchors.forEach(function (anchor) {
        anchor.addEventListener('click', function () {
            paginate(anchor.innerHTML)
            manipulateActiveAnchor(anchor.id)
        });
    })
}

const mapBarPaginationElements = () => {
    let template =
        `<a id="arrowLeft">❮</a>`;

    for (let actualPage = 1; actualPage <= totalPages; actualPage++) {
        template += `<a id="anchor${actualPage}">${actualPage}</a>`
    }

    template += `<a id="arrowRight">❯</a>`;
    document.getElementById('paginationSection').insertAdjacentHTML('beforeend', template);
    document.getElementById('anchor1').classList.add('active');

    addEvent();
}

const clearProducts = () => {
    const productsDiv = document.getElementById('products')
    let child = productsDiv.lastElementChild;
    if (child != null)
        while (child) {
            productsDiv.removeChild(child);
            child = productsDiv.lastElementChild;
        }
}

const mapToHtml = (products) => {
    clearProducts();
    const productsDiv = document.getElementById('products');
    products.forEach(product => {
        let template =
            `<ul class="container__items">
            <li>
                <picture>
                    <img srcset="${product.image}">
                </picture>
                <p>
                    ${product.name}
                </p>
                <p>
                    ${product.price}
                </p>
            </li>
        </ul>`
        productsDiv.insertAdjacentHTML('beforeend', template)
    });
}


