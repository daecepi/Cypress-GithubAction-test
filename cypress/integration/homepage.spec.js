/// <reference types="Cypress" />

describe('Evaluates the homepage element', () => {
  it('Displays the menu normally', ()=>{
    cy.visit("https://copper.lndo.site/");

    cy.get('[data-cy=why-copper-menu-element]').click();

    cy.get("[data-cy=general-nav-dropdown]").should("be.visible");
  });

  it('Redirects to /demos with query params', () => {
    cy.visit("https://copper.lndo.site/");

    cy.get("[data-cy=general-menu-CTA]").first().click();
    cy.location('pathname').should('eq', '/demos');
    cy.location().should((loc) => {
      expect(loc.search).to.contain('utm_adgroup');
    });
  });

  // It opens animations
  it('All images display', () => {
    cy.visit("https://copper.lndo.site/");
    cy.get('img')
      .should('be.visible')
      .and(($img) => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect($img[0].naturalWidth).to.be.greaterThan(0)
      });
  });

  /*it('Tests nav links', () => {
    cy.visit("https://copper.lndo.site/");

    cy.get('a').first().click();


  });

  it('Tests side', () => {
    cy.visit("https://copper.lndo.site/");

    cy.get('a').each( ($a) => {
      $a.click();
    });
  });*/
});
