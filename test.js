
    // On lance le serveur node à tester
    var server = require('./server.js');

    var request = require('supertest');

    var request = request('http://localhost:3000');

    describe('Test backend API ' , function () {

        describe('Test getting all dailystats', function(){

            it('return 200 when i ask for every dailystats', function(done) {

                // on test que le serveur retourne bien une 200 lorsque on récupère l'ensemble des dailystats
                request
                    .get('/dailystats')
                    .send({
                        
                    })
                    .expect(200)
                    .end(done);
            });

            it('return 200 when i ask for a single page', function(done){
            	//on test que le serveur retourne bien une 200 lorsqu'on recupère uniquement une page des dailystats
            	request
            		.get('/dailystats?page=2')
            		.send({

            		})
            		.expect(200)
            		.end(done);
            });
        });


        describe('Test getting access to a user_dailystats',function(){

        	
            it('return 200 when i ask for an existing user data (here userA)', function(done){

                //on test que le serveur retourne bien une 200 lorsqu'on récupère les données d'un utilisateur de la base de données existant.
                request
                    .get('/dailystats/userA')
                    .send({
                        
                    })
                    .expect(200)
                    .end(done);
            });

            it('return 200 when i ask for a non existing user data', function(done){
            	//on test que le serveur retourne bien une 200 lorsque on récupère les données d'un utilisateur de la base de données non-existant.
            	request
            		.get('/dailystats/user15457867684')
            		.send({

            		})
            		.expect(200)
            		.end(done);
            });

        });
        
        describe('Test getting access to the average score of users',function(){

        	
            it('return 200 when i ask for average score with enough data', function(done){

                //on test que le serveur retourne bien une 200 lorsqu'on récupère les données d'un utilisateur de la base de données existant.
                request
                    .get('/statistics/average?date=2017-12-19')
                    .send({
                        
                    })
                    .expect(200)
                    .end(done);
            });

            it('return 200 when i ask for average score with not enough data', function(done){
            	//on test que le serveur retourne bien une 200 lorsque on récupère les données d'un utilisateur de la base de données non-existant.
            	request
            		.get('/statistics/average?date=2017-12-11')
            		.send({

            		})
            		.expect(200)
            		.end(done);
            });
        });
        
});