$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        this.get('/index.html', renderHome);
        this.get('#/home', renderHome);

        this.get('#/about', function (ctx) {
            setContext(ctx);
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/about/about.hbs');
            });
        });

        this.get('#/login', function (ctx) {
            setContext(ctx);
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                loginForm: './templates/login/loginForm.hbs',
            }).then(function () {
                this.partial('./templates/login/loginPage.hbs');
            });
        });

        this.post('#/login', function (ctx) {
            const username = this.params.username;
            const password = this.params.password;

            auth.login(username, password)
                .then((data) => {
                    auth.saveSession(data);
                    auth.showInfo('Successfully logged in!');
                    renderHome(ctx);
                });
        });

        this.get('#/register', function (ctx) {
            setContext(ctx);
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                registerForm: './templates/register/registerForm.hbs',
            }).then(function () {
                this.partial('./templates/register/registerPage.hbs');
            });
        });

        this.post('#/register', function (ctx) {
            const username = ctx.params.username;
            const password = ctx.params.password;
            const repeatPassword = ctx.params.repeatPassword;
            if (password !== repeatPassword) {
                auth.showError('Passwords do not match');
            } else {
                auth.register(username, password)
                    .then((data) => {
                        auth.saveSession(data);
                        auth.showInfo('Successful registration!');
                        this.redirect(`#/home`);
                    }).catch(() => auth.handleError('User already exists!'));
            }
        });

        this.get('#/logout', function () {
            auth.logout()
                .then(() => {
                    sessionStorage.clear();
                    auth.showInfo('Successfully logged out!');
                    this.redirect(`#/home`);
                }).catch(auth.handleError)
        });

        this.get('#/catalog', renderCatalog);

        this.get('#/catalog/:teamId', renderTeamDetails);

        this.get('#/join/:teamId', function (ctx) {
            setContext(ctx);
            const teamId = ctx.params['teamId'];
            teamsService.joinTeam(teamId)
                .then(() => {
                    sessionStorage.setItem('teamId', teamId);
                    auth.showInfo('Successfully joined team!');
                    this.redirect(`#/catalog/${teamId}`);
                })
                .catch(() => auth.showError('Could not join team!'))
        });

        this.get('#/leave', function (ctx) {
            setContext(ctx);
            let teamId = ctx.teamId;
            teamsService.leaveTeam()
                .then(() => {
                    sessionStorage.setItem('teamId', 'undefined');
                    auth.showInfo('Successfully left team!');
                    this.redirect(`#/catalog/${teamId}`);
                })
                .cache(auth.handleError)
        });

        this.get('#/edit/:teamId', function (ctx) {
            setContext(ctx);
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                editForm: './templates/edit/editForm.hbs',
            }).then(function () {
                this.partial('./templates/edit/editPage.hbs');
            });
        });

        this.post('#/edit/:teamId', function (ctx) {
            setContext(ctx);
            const teamId = ctx.params.teamId;
            const name = ctx.params.name;
            const comment = ctx.params.comment;
            teamsService.edit(teamId, name, comment)
                .then(() => {
                    auth.showInfo('Successfully edited team!');
                    this.redirect(`#/catalog/${teamId}`);
                })
                .cache(auth.handleError)
        });

        this.get('#/create', function (ctx) {
            setContext(ctx);
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                createForm: './templates/create/createForm.hbs',
            }).then(function () {
                this.partial('./templates/create/createPage.hbs');
            });
        });

        this.post('#/create', function (ctx) {
            setContext(ctx);
            const name = ctx.params.name;
            const comment = ctx.params.comment;

            teamsService.createTeam(name, comment)
                .then(() => {
                    auth.showInfo('Successfully created team!');
                    renderCatalog(ctx);
                }).catch(auth.handleError)
        });

        // helpers
        function renderHome(ctx) {
            setContext(ctx);
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/home/home.hbs');
            });
        }

        async function renderCatalog(ctx) {
            setContext(ctx);
            const teams = await teamsService.loadTeams();
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                team: './templates/catalog/team.hbs'
            }).then(function () {
                ctx.teams = teams;
                this.partial('./templates/catalog/teamCatalog.hbs');
            });
        }

        async function renderTeamDetails(ctx) {
            setContext(ctx);
            const teamId = ctx.params['teamId'];

            let users = await teamsService.loadUsers();
            let members = users.filter(u => u.teamId && u.teamId === teamId);
            teamsService.loadTeamDetails(teamId)
                .then((data) => {
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        teamMember: './templates/catalog/teamMember.hbs',
                        teamControls: './templates/catalog/teamControls.hbs'
                    }).then(function () {
                        ctx.name = data.name;
                        ctx.comment = data.comment;
                        ctx.members = members;
                        ctx.teamId = data['_id'];
                        ctx.isOnTeam = sessionStorage.getItem('teamId') === teamId;
                        ctx.isAuthor = ctx.userId === data['_acl']['creator'];
                        this.partial('./templates/catalog/details.hbs');
                    });
                });
        }

        function setContext(ctx) {
            ctx.username = sessionStorage.getItem('username');
            ctx.userId = sessionStorage.getItem('userId');
            ctx.teamId = sessionStorage.getItem('teamId');
            ctx.loggedIn = !!sessionStorage.getItem('authtoken')
                && ctx.username !== 'undefined' && ctx.username !== null;
            ctx.hasNoTeam = sessionStorage.getItem('teamId') === 'undefined';
        }
    });

    app.run();
});