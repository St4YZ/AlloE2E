const AlloUrl = Cypress.config('AlloUrl')
chai.use(require('chai-sorted'))
class AlloPOM {
    verifyURL() {
        return cy.url().should('eq', `${AlloUrl}`)
    }
    // First test case
    laptopsCategory() {
    return cy.get('.h-cat > .snap-slider__slider > :nth-child(5)').click()
    }
    monitorsCategory() {
    return cy.get(':nth-child(3) > .portal-group__title > .portal-group__title-link').click()
    }
    assertCategory() {
    return cy.get('.snap-slider__slider').should('contain.text', 'Монітори')
    }
    asusFilter() {
        return cy.get('[data-id="840"]').click()
    }
    forHomeFilter() {
        return cy.get('[data-id="149676"]').click()
    }
    gamingFilter() {
        return cy.get('[data-id="149677"]').click()
    }
    popupButton() {
        return cy.get('.f-popup').click()
    }
    triggerDropdown() {
        return cy.get('.sort-by__select').trigger('mouseover')
    }
    fromToFilter() {
        return cy.get("li[title='від дешевих до дорогих']").click().wait(1000)
    }
    assertFromTo() {
        return cy.get(".v-pb__cur .sum").then(($prices) => {
            const innerText = (el) => el.innerText
            const firstWord = (text) => text.split(' ')[0]
            const justDigits = (str) => str.replace(/[^0-9.]/g, '')
            const prices = Cypress._.map($prices, (el) => parseInt((justDigits(firstWord(innerText(el))))),);
            expect(prices).to.be.ascending
        });
    }
    // Second test case
    buyFirstItemButton() {
        return cy.get("[title$='Купити']").eq(0).click()
    }
    comebackButton() {
        return cy.get('.comeback').click() // clicking comeback button in cart
    }
    catalogButton() {
        return cy.get('.mh-burger__btn').click() // click catalog
    }
    catalogProductsButton() {
        return cy.get('.mh-button.mh-catalog-btn').click() // clicks on catalog with products
    }
    chooseProduct() {
        return cy.get(':nth-child(2) > .mm__a').click() // choosing the products
    }
    headsetCategory() {
        cy.contains("Навушники").eq(0).click() // choosing the headset category
    }
    wirelessCategory() {
        cy.contains("Бездротові").eq(0).click() // choosing the wireless category
    }
    assertInBasket() {
        return cy.get('.products_list_item').should('have.length', 2)
    } // assert count of products in basket
    assertSumInBasket() {
        return cy.get(".price-box__cur").then(($prices) => {
            const innerText = (el) => el.innerText
            const justDigits = (str) => str.replace(/[^0-9.]/g, '')
            const prices = Cypress._.map($prices, (el) => parseInt((justDigits((innerText(el))))),)
            cy.get('.total-box__price').then((h1) => {
                const sum = h1.text()
                const justDigits = (str) => str.replace(/[^0-9.]/g, '')
                const finalSum = parseInt(justDigits(sum))
                expect(prices[0] + prices[1]).to.equal(finalSum)
            })
        })
    } // asserting the sum in the basket
    assertDisabledButton() {
        return cy.get('.vi.i-shared.vi__close.remove').eq(0).should('not.be.disabled').click()
    } // asserting if the delete button clickable
    assertLessThan() {
        cy.get('.products_list_item').should('have.length.lessThan', 2)
    } // asserting if products in basket more than 2
    searchInput() {
        return cy.get("#search-form__input").type("Мікроскопи")
    }
    assertButtonEnabled () {
        return cy.get("button[class='search-result__nav-link']").should('be.enabled').click()
    }
    // searchItem() {
    //     const searchType = cy.get("#search-form__input").type("Мікроскопи")
    //     const buttonEnable = cy.get("button[class='search-result__nav-link']").should('be.enabled').click()
    // }
    assertItems() {
        return cy.get('.product-card__content .product-card__title').then(($name) => {
            const innerText = (el) => el.innerText
            const itemName = Cypress._.map($name, (el) => innerText(el))
            const finalItem = itemName.map(element => element.toLowerCase());
            finalItem.forEach(element => {
                expect(element).includes("мікроскоп")
            })
        })
    }








}
export default AlloPOM;