const baseUrl = Cypress.config('baseUrl')
class RozetkaTest {
    checkingURL() {
        return cy.url().should('eq', `${baseUrl}`)
    }
    getGamersMenu() {
        return cy.get(".fat-wrap > .menu-wrapper > .menu-categories > :nth-child(3) > .menu-categories__link").click()
    }
    getCatalogButtonBasket() {
        return cy.contains('Відеокарти').click()


    }
    getSecondCatalogButton() {
        return cy.contains("Процесори").first().click({ force: true })
    }
    getSearchButton() {
        return cy.contains('Знайти').click()
    }
    getFirstFilter() {
        return cy.get(".checkbox-filter__link[data-id='Gigabyte']").click()
    }
    getSecondFilter() {
        return cy.get(".checkbox-filter__link[data-id='8 ГБ']").click()
    }
    getAscendingOption() {
        return cy.get("rz-sort select").select(1).wait(3000)
    }
    getProductsPrices() {
        return cy.get('.goods-tile__price-value').then(($prices) => {
            const innerText = (el) => el.innerText
            const firstWord = (text) => text.split(' ')[0]
            const justDigits = (str) => str.replace(/[^0-9.]/g, '')
            const prices = Cypress._.map($prices, (el) => parseInt((justDigits(firstWord(innerText(el))))),).slice(4, -6);
            expect(prices).to.be.ascending
        });
    }
    getVideocardBuyButton() {
        cy.intercept('https://hard.rozetka.com.ua/ua/videocards/c80087/21805=7116/').as('buttonWait')
        cy.visit('https://hard.rozetka.com.ua/ua/videocards/c80087/21805=7116/')
        cy.wait('@buttonWait').then((interception) => {
            return cy.get("[aria-label$='Купити']").first().click()
        })


    }
    getBuyButton() {
        return cy.get('.buy-button').first().click()
    }
    getCatalogMenu() {
        return cy.get('#fat-menu').click()
    }
    getCart() {
        return cy.get("rz-cart[class='header-actions__component'] button[type='button']").click()
    }
    getProductCart() {
        return cy.get('.cart-product.ng-star-inserted').should('have.length', 2)
    }
    getProductCartName() {
        return cy.get('.cart-product__title').then(($item) => {
            const innerText = (el) => el.innerText
            const itemName = Cypress._.map($item, (el) => innerText(el))
            cy.log(itemName)
        })
    }
    getCartProductPrice() {
        return cy.get("[data-testid='cost']").then(($prices) => {
            const innerText = (el) => el.innerText
            const justDigits = (str) => str.replace(/[^0-9.]/g, '')
            const prices = Cypress._.map($prices, (el) => parseInt((justDigits((innerText(el))))),)
            cy.get('.cart-receipt__sum-price').then((h1) => {
                const sum = h1.text()
                const justDigits = (str) => str.replace(/[^0-9.]/g, '')
                const finalSum = parseInt(justDigits(sum))
                expect(prices[0] + prices[1]).to.equal(finalSum)
            })
        })
    }
    getCartDelete() {
        return cy.get("#cartProductActions0").click()
    }
    getDeleteButton() {
        return cy.get('.button.button--medium.button--with-icon.button--link').should('not.be.disabled').click()
    }
    getTotalCartProducts() {
        return cy.get('.cart-product__main').should('have.length.lessThan', 2)
    }
    getSearchField() {
        return cy.get("[name$='search']").type("Оперативна пам'ять")
    }
    getItemsName() {
        return cy.get('.goods-tile__title').then(($name) => {
            const innerText = (el) => el.innerText
            const itemName = Cypress._.map($name, (el) => innerText(el))
            itemName.forEach(element => {
                expect(element).includes("Оперативна пам'ять")
            })
        })
    }
    getProductPricesFailed() {
        return cy.get('.goods-tile__price-value').then(($prices) => {
            const innerText = (el) => el.innerText
            const firstWord = (text) => text.split(' ')[0]
            const justDigits = (str) => str.replace(/[^0-9.]/g, '')
            const prices = Cypress._.map($prices, (el) => parseInt((justDigits(firstWord(innerText(el))))),).slice(4, -6);
            expect(prices).to.be.descending

        });
    }
}
export default RozetkaTest;