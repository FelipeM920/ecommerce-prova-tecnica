import { Service } from './service.js';
import { OptionBox } from './enum.js';

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
        orderProducts(OptionBox.Options.MaiorValor);
        mapBarPaginationElements();
    })

const orderProducts = (orderBy) => {
    switch (orderBy) {
        case OptionBox.Options.MaiorValor:
            products.sort((a, b) => b.price - a.price)
            break;
        case OptionBox.Options.MenorValor:
            products.sort((a, b) => a.price - b.price)
            break;
        case OptionBox.Options.NomeAZ:
            products.sort((a, b) => b.name < a.name)
            break;
        case OptionBox.Options.NomeZA:
            products.sort((a, b) => b.name > a.name)
            break;
    }
    paginate(firstPage)
}

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

const addAnchorsEvents = () => {
    const anchors = document.querySelectorAll('a');
    anchors.forEach(function (anchor) {
        anchor.addEventListener('click', function () {
            if ((anchor.innerHTML == '❮' && actualAnchor == 1) || (anchor.innerHTML == '❯' && actualAnchor == totalPages))
                return;
            paginate(anchor.innerHTML)
            manipulateActiveAnchor(anchor.id)
        });
    })
}

const addOrderByEvents = () => {
    const options = document.querySelectorAll('option');
    options.forEach(function (option) {
        option.addEventListener('click', function () {
            orderProducts(option.value);
        });
    })
}

const openMobileMenu = () => {
    document.getElementById('sideNav').style.width = "350px";
}

const closeMobileMenu = () => {
    document.getElementById("sideNav").style.width = "0";
}

const addMobileMenuEvent = () => {
    document.getElementById('hamburguer').addEventListener('click', openMobileMenu);
    document.getElementById('closeButton').addEventListener('click', closeMobileMenu);
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

    addAnchorsEvents();
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
                    <img class="imgMobile" srcset="${product.image}">
                </picture>
                <p id="productName">
                    ${product.name}
                </p>
                <p>
                   R$ ${Math.trunc(product.price)}
                </p>
            </li>
        </ul>`
        productsDiv.insertAdjacentHTML('beforeend', template)
    });
}

addOrderByEvents();
addMobileMenuEvent();