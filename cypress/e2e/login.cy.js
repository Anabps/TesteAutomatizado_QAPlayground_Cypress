context("Login", () => {
  beforeEach(() => {
    cy.visit(
      "https://carlosfelixpenha-create.github.io/QAPlayground/index.html",
    );
  });

  it("Deve realizar um novo cadastro seguido de login", () => {
    cy.contains("Cadastro").click();

    cy.url().should("include", "/cadastro");

    cy.get("#nome").clear().type("Ana Soares").should("not.have.value");
    cy.get("#nome").should("have.value", "Ana Soares");

    cy.get("#email").clear().type("Ana@cypress.com");
    cy.get("#email").should("have.value", "Ana@cypress.com");

    cy.get("#senha").clear().type("Ana@cypress1");
    cy.get("#senha").should("have.value", "Ana@cypress1");

    cy.get("#confirmarSenha").clear().type("Ana@cypress1");
    cy.get("#confirmarSenha").should("have.value", "Ana@cypress1");

    cy.get('button[type="submit"]').click();

    cy.get("#modalTexto")
      .should("have.text", "Cadastro realizado com sucesso!")
      .wait(3000);
    cy.get("#modalOk").click();
    cy.contains("Voltar").click();

    cy.url().should("include", "/QAPlayground/index.html");
    cy.contains("Login").click();
    cy.url().should("include", "/login");

    cy.get("#usuario").clear().type("Ana@cypress.com");
    cy.get("#usuario").should("have.value", "Ana@cypress.com");

    cy.get("#senha").clear().type("Ana@cypress1");
    cy.get("#senha").should("have.value", "Ana@cypress1");

    cy.get("#captcha").click();

    cy.get('button[type="submit"]').click();
    cy.get("#modalTexto")
      .should("have.text", "Login realizado com sucesso!")
      .wait(3000);
  });

  it("Deve retornar erro ao tentar realizar um novo cadastro", () => {
    cy.contains("Cadastro").click();

    cy.url().should("include", "/cadastro");

    cy.get("#nome").clear().type("Ana Soares").should("not.have.value");
    cy.get("#nome").should("have.value", "Ana Soares");

    cy.get("#email").clear().type("Ana@cypress.com");
    cy.get("#email").should("have.value", "Ana@cypress.com");

    cy.get("#senha").clear().type("teste de falha");
    cy.get("#senha").should("have.value", "teste de falha");

    cy.get("#confirmarSenha").clear().type("teste de falha");
    cy.get("#confirmarSenha").should("have.value", "teste de falha");

    cy.get('button[type="submit"]').click();

    cy.get("#modalTextoErro")
      .should(
        "have.text",
        "Preencher corretamente o campo Senha,dúvida entrar em Requisitos!",
      )
      .wait(3000);
  });

  it("Deve retornar falha ao tentar realizar login", () => {
    cy.contains("Login").click();
    cy.url().should("include", "/login");

    cy.get("#usuario").clear().type("Ana@cypress.com");
    cy.get("#usuario").should("have.value", "Ana@cypress.com");

    cy.get("#senha").clear().type("Ana@cypress1");
    cy.get("#senha").should("have.value", "Ana@cypress1");

    cy.get("#captcha").click();

    cy.get('button[type="submit"]').click();
    cy.get("#modalTextoErro")
      .should(
        "have.text",
        "Nenhum cadastro encontrado. Realize o cadastro antes de fazer login.",
      )
      .wait(3000);
  });
});
