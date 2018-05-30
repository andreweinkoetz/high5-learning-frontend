import React from 'react';
import {Switch} from 'react-router-dom';

import Footer from '../Footer/Footer';
import LogInButton from '../User/LogInButton';
import LogIn from '../User/ModalDialogLogIn';
import Register from '../User/ModalDialogRegister'
import './LandingPage.css';
import UserService from "../../services/UserService";

/*
Landing Page. Appears if you are not logged in only.
 */
export default class LandingPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            modalDialogVisibility: false,
            modalDialogClass: "register",
            username: ""
        };

        this.onClickLogInButton = this.onClickLogInButton.bind(this);
        this.onClickRegisterButton = this.onClickRegisterButton.bind(this);
        this.onClickCancelModalDialog = this.onClickCancelModalDialog.bind(this);
        this.onHandleChangeUsername = this.onHandleChangeUsername.bind(this);
    }

    // Please check all these methods as i believe they don't do anything :D

    onHandleChangeUsername() {
        this.setState({
            username: "username"
        });
    }

    onClickRegisterButton() {
        this.setState({
            modalDialogVisibility: true,
            modalDialogClass: "register"
        });
    }

    onClickLogInButton() {
        this.setState({
            modalDialogVisibility: true,
            modalDialogClass: "logIn"
        });
    }

    onClickCancelModalDialog() {
        this.setState({
            modalDialogVisibility: false
        });
    }

    render() {
        const images = [
            {
                url: './img/login.jpg',
                title: 'LogIn',
                width: '100%',
            },
            {
                url: './img/register.jpg',
                title: 'Register',
                width: '100%',
            },
            {
                url: './img/elearning.jpg',
            }
        ];

        if (UserService.isAuthenticated()) {
            window.location = '/myclasses/';
        }

        return (
            <div className="landingPage">
                {/* transparent absolute div presenting brand name & logo */}
                <div className="heading">
                    <h1>HIGH-FIVE LEARNING</h1>
                </div>
                {/* modal dialog */}
                <Switch>
                    {(this.state.modalDialogClass === "logIn") ?
                        <LogIn onUsername={this.onHandleChangeUsername} cancel={this.onClickCancelModalDialog}
                               visible={this.state.modalDialogVisibility}/> :
                        <Register onUsername={this.onHandleChangeUsername} cancel={this.onClickCancelModalDialog}
                                  visible={this.state.modalDialogVisibility}/>
                    }
                </Switch>
                {/* one pager content */}
                <div className="content">
                    {/* short slogan and nice backgroud picture for the first page */}
                    <div className="content-page1" style={{backgroundImage: `url(${images[2].url})`,}}>
                        <h1>WE LOVE LEARNING</h1>
                    </div>
                    {/* titel of the landing page */}
                    <div className="content-titel">
                        <h1>MAIN PAGE</h1>
                    </div>
                    {/* about high 5 learning, our story */}
                    <div className="content-page2">
                        <h1>PROFILE</h1>
                        <p>
                            We love learning and believe in live long learning. Also, we love teachers with passion that
                            care about their students. We think you deserve support with that! Let´s make the world a
                            better place. High-Five Learning wants you and your students to succeed.
                            Dive into e learning now. Engage your students with our platform that helps you to manage
                            and evaluate their homework and saves your time. Start gaining real insights about your
                            students’ now! We want you all to succeed!
                        </p>
                    </div>
                    {/* about our produt / service */}
                    <div className="content-page3">
                        <h1>WHAT WE OFFER</h1>
                        <ul>
                            <li>Modern, intuitive e-learning platform</li>
                            <li>Creation of virtual classes</li>
                            <li>Teacherspublish multiple choice homework</li>
                            <li>Instant feedback to teachers from students</li>
                            <li>Statistics for teachers about homework</li>
                            <li>Reusability of classes</li>

                        </ul>
                    </div>
                    {/* about our team / us */}
                    <div className="content-page4">
                        <h1>OUR TEAM</h1>
                        <div className="table-of-team">
                            <ul>
                                <li>Andre</li>
                                <li>Andre</li>
                                <li>Hermann</li>
                                <li>Martin</li>

                            </ul>
                        </div>
                    </div>
                </div>
                {/* absolute div presenting login and register options */}
                <div className="buttonDiv">
                    <LogInButton onClickCallback={this.onClickLogInButton} content={images[0]}/>
                    <LogInButton onClickCallback={this.onClickRegisterButton} content={images[1]}/>
                </div>
                {/* footer */}
                <section>
                    <Footer/>
                </section>
            </div>
        );
    }

}
