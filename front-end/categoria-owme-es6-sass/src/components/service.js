class Service {
    async loadProducts() {
        try {
            const resp = await fetch('https://raw.githubusercontent.com/ArezzoCo/ecommerce-prova-tecnica/master/front-end/categoria-owme-es6-sass/mock-products.json')
            return resp.json();
        } catch (err) {
            console.log(err)
        }
    }
}
export { Service };