mocha.setup('bdd');
const { expect, assert } = chai;
//sinon = rquare('sinon');

describe('Tests', function() {
    describe('Get cookies tests', function() {
        const result = {
            result: []
        };

        beforeEach(function() {
            sinon.stub(requester, 'getJSON', (route) => {
                return new Promise((resolve, reject) => {
                    if (route !== '/api/cookies') {
                        reject(new Error(`invalid route ${route}`));
                    }
                    resolve(result);
                });
            });
        });
        afterEach(function() {
            requester.getJSON.restore();
        });

        it("expect dataService.cookies() to return correct result", function(done) {
            dataService.cookies()
                .then(obj => {
                    expect(obj).to.eql(result);
                })
                .then(done, done);
        });


        // it('expect cookies() to return a response', function(done) {
        //     dataService.cookies()
        //         .then(obj => {
        //             expect(obj).to.exist;
        //         })
        //         .then(done, done);
        // });
        // it('expect cookiesResponse to have property result property', function(done) {
        //     dataService.cookies()
        //         .then(obj => {
        //             expect(obj).to.have.property('result');
        //         })
        //         .then(done, done);
        // });
        // it('expect cookiesResponse.result to be an array', function(done) {
        //     dataService.cookies()
        //         .then(obj => {
        //             expect(obj.result).to.be.a('array');
        //         })
        //         .then(done, done);
        // });

        // it('expect cookiesResponse.result items to be cookie objects', function(done) {
        //     const expected = ['text', 'category', 'userId', 'likes', 'dislikes', 'img', 'shareDate', 'id', 'hours'];
        //     dataService.cookies()
        //         .then(obj => {
        //             obj.result.forEach(cookie => {
        //                 const actual = Object.keys(cookie);

        //             });
        //         })
        //         .then(done, done);
        // });
    });

    describe('Register tests', function() {
        beforeEach(function() {
            sinon.stub(requester, 'postJSON', (route, user) => {
                return new Promise((resolve, reject) => {
                    if (route !== '/api/users') {
                        reject(new Error(`invalid route ${route}`));
                        return;
                    }
                    resolve(user);
                });
            });
        });

        afterEach(function() {
            requester.postJSON.restore();
        });

        const user = {
            username: 'pesho',
            passHash: 'pesho42'
        };

        it('Register user test', function(done) {
            dataService.register(user)
                .then(actual => {
                    expect(actual).to.eql(user);
                })
                .then(done, done);
        });
    });
    describe('Login tests', function() {
        beforeEach(function() {
            sinon.stub(requester, 'putJSON', ((route, user) => {
                return new Promise((resolve, reject) => {

                });
            }));
        });
    });
});


mocha.run();