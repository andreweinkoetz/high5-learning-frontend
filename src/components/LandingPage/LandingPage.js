import React from 'react';
import {Switch} from 'react-router-dom';

import Footer from '../Footer/Footer';
import LogInButton from '../User/LogInButton';
import LogIn from '../User/ModalDialogLogIn';
import Register from '../User/ModalDialogRegister'
import './LandingPage.css';
import UserService from "../../services/UserService";

/*
Landing Page. Appears only if you are not logged-in.
 */
export default class LandingPage extends React.Component {

    constructor(props) {
        super(props);

        // username is just the trigger state to load myclasses view
        // modalDialogClass tells the render function which modal dialog to load
        // modalDialogVisibility tells the render if the modal dialogs should be visible
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

    // onClick method of the cancel buttons of the modal dialogues
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
            },
            {
                url: './img/high-five.svg',
            }
        ];

        if (UserService.isAuthenticated()) {
            window.location = '/myclasses/';
        }

        return (
            <div className="landingPage">
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
                    <div className="content-page1">
                        <h1>WE LOVE LEARNING</h1>
                        <p>“Education is the most powerful weapon which you can use to change the world.”
                            <br/>― Nelson Mandela</p>
                    </div>
                    {/* titel of the landing page style={{backgroundImage: `url(${images[2].url})`,}}*/}
                    <div className="content-title">
                        <h1>MAIN PAGE</h1>
                    </div>
                    {/* about high 5 learning, our story */}
                    <div className="content-page2">
                        <h1>PROFILE</h1>
                        <p>
                            We believe in live long learning and we love teachers with passion.
                            Let´s make the world a better place and support teachers in their mission.
                            <br/>
                            <b>High-Five Learning</b> wants you and your students to succeed.
                            Dive into e-learning now. Engage your students with our platform that helps you to manage
                            and evaluate their homework and saves your time. Start gaining real insights about your
                            students’ <b>now</b>! We want you all to succeed!
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
                {/* transparent absolute div presenting brand name & logo */}
                <div className="head-line">
                    <div className="heading">
                        <h1><img className="icon" src={images[3].url} alt="High Five Icon" height="60"
                                 width="60"/> HIGH-FIVE LEARNING</h1>
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
