$(() => {
    const app = Sammy('#container', function () {
            this.use('Handlebars', 'hbs');

            this.get('/index.html', renderHome);
            this.get('#/home', renderHome);
            this.get('#/login', renderLogin);
            this.post('#/login', processLogin);
            this.get('#/register', renderRegister);
            this.post('#/register', processRegister);
            this.get('#/logout', processLogout);
            this.get('#/details/:id', renderCarDetails);
            this.get('#/createListing', renderCreateListing);
            this.post('#/createListing', createListing);
            this.get('#/myListings', renderMyListings);
            this.get('#/edit/:id', renderEditListing);
            this.post('#/edit/:id', editListing);
            this.get('#/delete/:id', deleteListing);

            function deleteListing(ctx) {
                carService.removeListing(ctx.params.id)
                    .then(() => {
                        notification.showInfo('Successfully removed listing!');
                        this.redirect('#/home');
                    })
                    .catch(notification.handleError);
            }

            function editListing(ctx) {
                ctx.isAuthed = auth.isAuthed();

                let car = {
                    title: ctx.params.title,
                    description: ctx.params.description,
                    brand: ctx.params.brand,
                    model: ctx.params.model,
                    year: ctx.params.year,
                    imageUrl: ctx.params.imageUrl,
                    fuel: ctx.params.fuelType,
                    price: ctx.params.price,
                    seller: sessionStorage.getItem('username')
                };

                if (!validateListing(car)) {
                    return;
                }

                carService.editListing(ctx.params.id, car)
                    .then(() => {
                        notification.showInfo('Successfully edited listing!');
                        this.redirect('#/home');
                    })
                    .catch(notification.handleError);
            }

            function renderEditListing(ctx) {
                ctx.isAuthed = auth.isAuthed();
                carService.loadCarDetails(ctx.params.id)
                    .then((data) => {
                        ctx.car = data;
                        ctx.id = ctx.params.id;
                        this.loadPartials({
                            header: 'templates/common/header.hbs',
                            footer: 'templates/common/footer.hbs'
                        }).then(function () {
                            this.partial('templates/cars/edit-listing.hbs');
                        });
                    })
                    .catch(notification.handleError);
            }

            function renderMyListings(ctx) {
                ctx.isAuthed = auth.isAuthed();
                let username = sessionStorage.getItem('username');

                carService.loadMyListings(username)
                    .then(data => {
                        ctx.listings = data;
                        this.loadPartials({
                            header: 'templates/common/header.hbs',
                            footer: 'templates/common/footer.hbs',
                            myListing: 'templates/cars/my-listing.hbs',
                        }).then(function () {
                            this.partial('templates/cars/my-listings.hbs');
                        });
                    })
                    .catch(notification.handleError);
            }

            function createListing(ctx) {
                let car = {
                    title: ctx.params.title,
                    description: ctx.params.description,
                    brand: ctx.params.brand,
                    model: ctx.params.model,
                    year: ctx.params.year,
                    imageUrl: ctx.params.imageUrl,
                    fuel: ctx.params.fuelType,
                    price: ctx.params.price,
                    seller: sessionStorage.getItem('username')
                };

                if (!validateListing(car)) {
                    return;
                }

                carService.listCar(car)
                    .then(() => {
                        notification.showInfo('Successfully listed!');
                        this.redirect('#/home');
                    })
                    .catch(notification.handleError);
            }

            function renderCreateListing(ctx) {
                ctx.isAuthed = auth.isAuthed();
                this.loadPartials({
                    header: 'templates/common/header.hbs',
                    footer: 'templates/common/footer.hbs'
                }).then(function () {
                    this.partial('templates/cars/create-listing.hbs');
                });
            }

            function renderCarDetails(ctx) {
                ctx.isAuthed = auth.isAuthed();
                let userId = sessionStorage.getItem('userId');
                let listingId = ctx.params.id;
                carService.loadCarDetails(listingId)
                    .then(data => {
                        ctx.car = data;
                        ctx.car.isAuthor = data['_acl']['creator'] === userId;
                        this.loadPartials({
                            header: 'templates/common/header.hbs',
                            footer: 'templates/common/footer.hbs'
                        }).then(function () {
                            this.partial('templates/cars/details.hbs');
                        });
                    })
                    .catch(notification.handleError);
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
                let confirmPassword = ctx.params.repeatPass;

                if (!validateRegistration(username, password, confirmPassword)) {
                    return;
                }

                auth.register(username, password)
                    .then(() => {
                        notification.showInfo('Successful registration.');
                        this.redirect('#/home');
                    })
                    .catch(notification.handleError);
            }

            function processLogin(ctx) {
                let username = ctx.params.username;
                let password = ctx.params.password;

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
                let userId = sessionStorage.getItem('userId');
                if (ctx.isAuthed) {
                    carService.loadCars()
                        .then((data) => {
                                ctx.listings = data;
                                data.forEach(car => {
                                    car.isAuthor = car['_acl']['creator'] === userId;
                                });
                                this.loadPartials({
                                    header: 'templates/common/header.hbs',
                                    footer: 'templates/common/footer.hbs',
                                    carListing: 'templates/cars/listing.hbs',
                                }).then(function () {
                                    this.partial('templates/home/auth-home.hbs');
                                });
                            }
                        );

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
            function validateListing(car) {
                if (!car.title || !car.brand || !car.description || !car.fuel
                    || !car.imageUrl || !car.model || !car.price || !car.year) {
                    notification.showError('Please fill in all input fields!');
                    return false;
                } else if (car.title.length > 33) {
                    notification.showError('Title too long!');
                    return false;
                } else if (car.description.length > 450 || car.description.length < 30) {
                    notification.showError('Description must be between 30 and 450 characters!');
                    return false;
                } else if (car.brand.length > 11) {
                    notification.showError('Brand too long!');
                    return false;
                } else if (car.fuel.length > 11) {
                    notification.showError('Fuel type too long!');
                    return false;
                } else if (car.model.length > 11) {
                    notification.showError('Model too long!');
                    return false;
                } else if (!car.imageUrl.startsWith('http')) {
                    notification.showError('Invalid image link!');
                    return false;
                }
                return true;
            }

            function validateRegistration(username, password, confirmPassword) {
                if (!username || !password || !confirmPassword) {
                    notification.showError('Please fill in all input fields!');
                    return false;
                } else if (!/^[a-zA-Z0-9]{3,}$/.test(username)) {
                    notification.showError('Username must be at least 3 characters long!');
                    return false;
                } else if (!/^[a-zA-Z0-9]{6,}$/.test(password)) {
                    notification.showError('Password must be at least 6 characters long!');
                    return false;
                } else if (password !== confirmPassword) {
                    notification.showError('Password do not match!');
                    return false;
                }
                return true;
            }
        }
    );

    app.run();
});