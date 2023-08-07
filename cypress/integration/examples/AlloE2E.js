import AlloPOM from '../../../PageObject/AlloPOM'
const alloPOM = new AlloPOM();
const AlloUrl = Cypress.config('AlloUrl')
chai.use(require('chai-sorted'))

describe('Allo Test Suite', () => {
    it('Verify if the price filter working correctly for the following marketplaces”', () => {
        // Open marketplace url. Verify it.
        cy.visit(AlloUrl);
        alloPOM.verifyURL();
        // Open category and subcategory if it is necessary. 
        alloPOM.laptopsCategory();
        alloPOM.monitorsCategory();
        alloPOM.assertCategory();
        // Navigate to the filters section, for the following marketplaces it is located on the left side. Apply 2 3 filters.
        alloPOM.asusFilter();
        alloPOM.forHomeFilter();
        alloPOM.gamingFilter();
        alloPOM.popupButton();
        // Verify that all the items on the page are sorted correctly by the from and to price filters you entered.
        alloPOM.triggerDropdown();
        alloPOM.fromToFilter();
        alloPOM.assertFromTo();
    })

   it('Add items to the basket', () => {
        // Open marketplace url. Verify it.
        cy.visit(AlloUrl);
        alloPOM.verifyURL();
        // Open category and subcategory if it is necessary
        alloPOM.laptopsCategory();
        alloPOM.monitorsCategory();
        alloPOM.assertCategory();
        // Add any item to the basket.
        alloPOM.buyFirstItemButton();
        // Select another category and add an item from that category.
        alloPOM.comebackButton();
        alloPOM.catalogButton();
        alloPOM.catalogProductsButton();
        alloPOM.chooseProduct();
        alloPOM.headsetCategory();
        alloPOM.wirelessCategory();
        alloPOM.buyFirstItemButton();
        // Verify information of items inside the basket.
        alloPOM.assertInBasket();
        // Verify that the price is calculated correctly.
        alloPOM.assertSumInBasket();
        // Verify that item deleted
        alloPOM.assertDisabledButton();
        alloPOM.assertLessThan();


    })
    it('Search the item', () => {
        // Open marketplace url. Verify it.
        cy.visit(AlloUrl);
        alloPOM.verifyURL();
        //  Search random item by name.
        alloPOM.searchInput();
        alloPOM.assertButtonEnabled();
        // Verify that all items are correctly displayed according to your searching request (only on the first page).
        alloPOM.assertItems();
    })
})