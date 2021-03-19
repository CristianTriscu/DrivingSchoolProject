import React, { Component } from 'react';
import './WelcomePage.css'

class WelcomePage extends Component {
    constructor() {
        super();

        this.state = {


            signUp: false,
            signIn: false,
            signUpCompany: false,
            signInCompany: false,
            notLogged: false,
            okGDPR: false

        };
    }
        render(){

            return (
                <div>
                <header class="masthead">
                    <div class="container h-100">
                        <div class="row h-100 align-items-center justify-content-center text-center">
                          
                          
                        </div>
                    </div>
                </header>

                <section class="page-section bg-primary" id="about">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-8 text-center">
                                <h2 class="text-white mt-0">We've got what you need!</h2>
                                <hr class="divider light my-4" />
                                <p class="text-white-50 mb-4">We help you to become a skilled driver</p>
             
                            </div>
                        </div>
                    </div>
                </section>

                <section class="page-section" id="services">
                    <div class="container">
                        <h2 class="text-center mt-0">Statistics Section</h2>
                        <hr class="divider my-2" />
                        <div class="row">
                            <div class="col-lg-6 col-md-6 text-center">
                                cati canditati au reusit % , cati instructori avem, cate categorii avem 
                            </div>

                            <div class="col-lg-6 col-md-6 text-center">
                             
                            </div>

                        </div>
                    </div>
                </section>




                <section class="page-section bg-primary" id="contact">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-8 text-center">
                                <h2 class="mt-0">Let's Get In Touch!</h2>
                                <hr class="divider my-4" />
                                <p class="text-muted mb-5">Are you ready to start driving? Give us a call or send us an email and we will get back to you as soon as possible!</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-4 ml-auto text-center mb-5 mb-lg-0">
                                <i class="fas fa-phone fa-3x mb-3 text-muted"></i>
                                <div>0751816395</div>
                            </div>
                            <div class="col-lg-4 mr-auto text-center">
                                <i class="fas fa-envelope fa-3x mb-3 text-muted"></i>
                               
                            </div>
                        </div>
                    </div>
                </section>

                <footer class="bg-light py-5">
                    <div class="container"><div class="small text-center text-muted">Driving School Online Platform - Trișcu Cristian</div></div>
                </footer>
                </div>
            )
        }
    }
    export default WelcomePage;