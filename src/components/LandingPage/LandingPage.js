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
            <div className="landingPage" style={{backgroundImage: `url(${images[2].url})`,}}>
                <div className="heading">
                    <h1>Welcome to High5-Learning</h1>
                </div>
                <div className="content">

                    <Switch>
                        {(this.state.modalDialogClass === "logIn") ?
                            <LogIn onUsername={this.onHandleChangeUsername} cancel={this.onClickCancelModalDialog}
                                   visible={this.state.modalDialogVisibility}/> :
                            <Register onUsername={this.onHandleChangeUsername} cancel={this.onClickCancelModalDialog}
                                      visible={this.state.modalDialogVisibility}/>
                        }
                    </Switch>
                    <p>
                        High-Five Learning is an e-learning platform to help teachers to manage and evaluate homework
                        with gained insights about students’ performance.
                    </p>
                    <br/><br/><br/><br/><br/>
                    <h2> How do we achieve this?</h2>

                    <ul>
                        <li>Modern, intuitive e-learning platform</li>
                        <li>Creation of virtual classes</li>
                        <li>Teacherspublish multiple choice homework</li>
                        <li>Instant feedback to teachers from students</li>
                        <li>Statistics for teachers about homework</li>
                        <li>Reusability of classes</li>

                    </ul>

                </div>
                <div className="buttonDiv">
                    <LogInButton onClickCallback={this.onClickLogInButton} content={images[0]}/>
                    <LogInButton onClickCallback={this.onClickRegisterButton} content={images[1]}/>
                </div>
                <section>
                    <Footer/>
                </section>
            </div>
        );
    }

}
