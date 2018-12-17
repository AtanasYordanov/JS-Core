$(() => {
    const app = Sammy('#container', function () {
            this.use('Handlebars', 'hbs');

            this.get('/index.html', renderHome);
            this.get('#/home', renderHome);
            this.get('#/home/:category', renderHomeByCategory);
            this.get('#/login', renderLogin);
            this.post('#/login', processLogin);
            this.get('#/register', renderRegister);
            this.post('#/register', processRegister);
            this.get('#/logout', processLogout);
            this.get('#/addPet', renderAddPet);
            this.post('#/addPet', processAddPet);
            this.get('#/myPets', renderMyPets);
            this.get('#/details/:id', renderPetDetails);
            this.get('#/edit/:id', renderEditPet);
            this.post('#/edit/:id', processEditPet);
            this.get('#/delete/:id', renderDeletePet);
            this.post('#/delete/:id', processDeletePet);
            this.get('#/:id/pet', likePet);

            function likePet(ctx) {
                let petId = ctx.params.id;
                petService.loadPetDetails(petId)
                    .then((data) => {
                        let currentLikes = +data.likes;
                        let likedPet = {...data, likes: currentLikes + 1};
                        petService.editPet(petId, likedPet)
                            .then(() => {
                                history.back();
                            })
                            .catch(notification.handleError);
                    })
                    .catch(notification.handleError);
            }

            function processDeletePet(ctx) {
                ctx.isAuthed = auth.isAuthed();
                let petId = ctx.params.id;
                petService.deletePet(petId)
                    .then(() => {
                        notification.showInfo('Pet removed successfully!');
                        this.redirect('#/home');
                    })
                    .catch(notification.handleError);
            }

            function renderDeletePet(ctx) {
                ctx.isAuthed = auth.isAuthed();
                ctx.username = sessionStorage.getItem('username');
                let petId = ctx.params.id;
                petService.loadPetDetails(petId)
                    .then((data) => {
                        ctx.pet = data;
                        this.loadPartials({
                            header: 'templates/common/header.hbs',
                            footer: 'templates/common/footer.hbs',
                        }).then(function () {
                            this.partial('templates/pets/delete-pet.hbs');
                        });
                    })
                    .catch(notification.handleError);
            }

            function processEditPet(ctx) {
                let description = ctx.params.description;
                let petId = ctx.params.id;
                petService.loadPetDetails(petId)
                    .then((data) => {
                        let updatedPet = {...data, description: description};
                        petService.editPet(petId, updatedPet)
                            .then(() => {
                                notification.showInfo('Updated successfully!');
                                this.redirect('#/home');
                            })
                            .catch(notification.handleError);
                    })
                    .catch(notification.handleError);
            }

            function renderEditPet(ctx) {
                ctx.isAuthed = auth.isAuthed();
                ctx.username = sessionStorage.getItem('username');
                let petId = ctx.params.id;
                petService.loadPetDetails(petId)
                    .then((data) => {
                        ctx.pet = data;
                        this.loadPartials({
                            header: 'templates/common/header.hbs',
                            footer: 'templates/common/footer.hbs',
                        }).then(function () {
                            this.partial('templates/pets/edit-pet.hbs');
                        });
                    })
                    .catch(notification.handleError);
            }

            function renderPetDetails(ctx) {
                ctx.isAuthed = auth.isAuthed();
                ctx.username = sessionStorage.getItem('username');
                let petId = ctx.params.id;
                petService.loadPetDetails(petId)
                    .then((data) => {
                        ctx.pet = data;
                        this.loadPartials({
                            header: 'templates/common/header.hbs',
                            footer: 'templates/common/footer.hbs',
                        }).then(function () {
                            this.partial('templates/pets/details.hbs');
                        });
                    })
                    .catch(notification.handleError);
            }

            function renderMyPets(ctx) {
                ctx.isAuthed = auth.isAuthed();
                ctx.username = sessionStorage.getItem('username');
                let userId = sessionStorage.getItem('userId');
                petService.loadMyPets(userId)
                    .then((data) => {
                        ctx.pets = data;
                        this.loadPartials({
                            header: 'templates/common/header.hbs',
                            footer: 'templates/common/footer.hbs',
                            myPet: 'templates/pets/myPet.hbs',
                        }).then(function () {
                            this.partial('templates/pets/myPets.hbs');
                        });
                    })
                    .catch(notification.handleError);
            }

            function processAddPet(ctx) {
                let pet = {
                    name: ctx.params.name,
                    description: ctx.params.description,
                    imageURL: ctx.params.imageURL,
                    category: ctx.params.category,
                    likes: 0
                };
                petService.addPet(pet)
                    .then(() => {
                        notification.showInfo('Pet created.');
                        this.redirect('#/home');
                    })
                    .catch(notification.handleError);
            }

            function renderAddPet(ctx) {
                ctx.isAuthed = auth.isAuthed();
                ctx.username = sessionStorage.getItem('username');
                this.loadPartials({
                    header: 'templates/common/header.hbs',
                    footer: 'templates/common/footer.hbs'
                }).then(function () {
                    this.partial('templates/pets/addPet.hbs');
                });
            }

            function processLogout() {
                auth.logout()
                    .then(() => {
                        notification.showInfo('Logout successful.');
                        sessionStorage.clear();
                        this.redirect('#/home');
                    })
                    .catch(notification.handleError);
            }

            function processRegister(ctx) {
                let username = ctx.params.username;
                let password = ctx.params.password;

                if (!validate(username, password)) {
                    return;
                }

                auth.register(username, password)
                    .then(() => {
                        notification.showInfo('User registration successful!');
                        this.redirect('#/home');
                    })
                    .catch(notification.handleError);
            }

            function processLogin(ctx) {
                let username = ctx.params.username;
                let password = ctx.params.password;

                if (!validate(username, password)) {
                    return;
                }

                auth.login(username, password)
                    .then((res) => {
                        auth.saveSession(res);
                        notification.showInfo('Login successful.');
                        this.redirect('#/home');
                    })
                    .catch(notification.handleError);
            }

            function renderRegister() {
                this.loadPartials({
                    header: 'templates/common/header.hbs',
                    footer: 'templates/common/footer.hbs'
                }).then(function () {
                    this.partial('templates/register/register.hbs');
                });
            }

            function renderLogin() {
                this.loadPartials({
                    header: 'templates/common/header.hbs',
                    footer: 'templates/common/footer.hbs'
                }).then(function () {
                    this.partial('templates/login/login.hbs');
                });
            }

            function renderHome(ctx) {
                ctx.isAuthed = auth.isAuthed();
                ctx.username = sessionStorage.getItem('username');
                let userId = sessionStorage.getItem('userId');
                if (ctx.isAuthed) {
                    this.loadPartials({
                        header: 'templates/common/header.hbs',
                        footer: 'templates/common/footer.hbs',
                    }).then(function () {
                        this.partial('templates/home/auth-home.hbs');
                    });
                    petService.loadPets()
                        .then((data) => {
                            ctx.pets = data.filter(pet => pet['_acl']['creator'] !== userId);
                            this.loadPartials({
                                header: 'templates/common/header.hbs',
                                footer: 'templates/common/footer.hbs',
                                pet: 'templates/pets/pet.hbs',
                            }).then(function () {
                                this.partial('templates/home/auth-home.hbs');
                            });
                        }).catch(notification.handleError);
                } else {
                    this.loadPartials({
                        header: 'templates/common/header.hbs',
                        footer: 'templates/common/footer.hbs'
                    }).then(function () {
                        this.partial('templates/home/not-auth-home.hbs');
                    });
                }
            }

            function renderHomeByCategory(ctx) {
                ctx.isAuthed = auth.isAuthed();
                ctx.username = sessionStorage.getItem('username');
                let category = ctx.params.category;
                let userId = sessionStorage.getItem('userId');
                if (ctx.isAuthed) {
                    this.loadPartials({
                        header: 'templates/common/header.hbs',
                        footer: 'templates/common/footer.hbs',
                    }).then(function () {
                        this.partial('templates/home/auth-home.hbs');
                    });
                    petService.loadPetsByCategory(category)
                        .then((data) => {
                            ctx.pets = data.filter(pet => pet['_acl']['creator'] !== userId);
                            this.loadPartials({
                                header: 'templates/common/header.hbs',
                                footer: 'templates/common/footer.hbs',
                                pet: 'templates/pets/pet.hbs',
                            }).then(function () {
                                this.partial('templates/home/auth-home.hbs');
                            });
                        }).catch(notification.handleError);
                } else {
                    this.loadPartials({
                        header: 'templates/common/header.hbs',
                        footer: 'templates/common/footer.hbs'
                    }).then(function () {
                        this.partial('templates/home/not-auth-home.hbs');
                    });
                }
            }

            // helpers
            function validate(username, password) {
                if (!username || !password) {
                    notification.showError('Please fill in all input fields!');
                    return false;
                } else if (!/^[a-zA-Z0-9]{3,}$/.test(username)) {
                    notification.showError('Username must be at least 3 symbols!');
                    return false;
                } else if (!/^[a-zA-Z0-9]{6,}$/.test(password)) {
                    notification.showError('Password must be at least 6 symbols!');
                    return false;
                }
                return true;
            }
        }
    );

    app.run();
});