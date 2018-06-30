import React from 'react';
import Button from '@material-ui/core/Button';

import LogInButton from '../User/LogInButton';
import LogIn from '../User/ModalDialogLogIn';
import Register from '../User/ModalDialogRegister'
import './LandingPage.css';
import UserService from "../../services/UserService";
import SchoolService from "../../services/SchoolService";
import PropTypes from "prop-types";

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
            modalDialogClass: "",
            username: "",
            width: window.innerWidth,
            schools: []
        };

        this.onClickLogInButton = this.onClickLogInButton.bind(this);
        this.onClickRegisterButton = this.onClickRegisterButton.bind(this);
        this.onClickCancelModalDialog = this.onClickCancelModalDialog.bind(this);
        this.onHandleChangeUsername = this.onHandleChangeUsername.bind(this);
    }

    componentWillMount() {
        SchoolService.getAllSchools().then((schools) => {
            this.setState({
                schools: schools
            });
        }).catch(error => {
            this.props.handleNotification(error);
        });

        window.addEventListener('resize', this.onHandleChangeWindowSize);
    }

    // make sure to remove the listener
    // when the component is not mounted anymore
    componentWillUnmount() {
        window.removeEventListener('resize', this.onHandleChangeWindowSize);
    }

    onHandleChangeWindowSize = () => {
        this.setState({width: window.innerWidth});
    };

    onHandleChangeUsername() {
        this.setState({
            username: "username"
        });
    }

    onClickRegisterButton() {
        this.setState({
            modalDialogClass: "register"
        });
    }

    onClickLogInButton() {
        this.setState({
            modalDialogClass: "logIn"
        });
    }

    // onClick method of the cancel buttons of the modal dialogues
    onClickCancelModalDialog() {
        this.setState({
            modalDialogClass: ""
        });
    }

    render() {
        const isMobile = (this.state.width <= 700);
        const images = [
            {
                url: `${window.location.origin}/img/login.jpg`,
                title: 'LogIn',
                width: '100%',
            },
            {
                url: `${window.location.origin}/img/register.jpg`,
                title: 'Register',
                width: '100%',
            },
            {
                url: `${window.location.origin}/img/elearning.jpg`,
            },
            {
                url: `${window.location.origin}/img/high-five.svg`,
            },
            {
                url: `${window.location.origin}/img/andre.jfif`,
            },
            {
                url: `${window.location.origin}/img/andrela.jpg`,
            },
            {
                url: `${window.location.origin}/img/hermann.jfif`,
            },
            {
                url: `${window.location.origin}/img/martin.jfif`,
            },
            {
                url: `${window.location.origin}/img/pencil-alt.svg`,
            },
            {
                url: `${window.location.origin}/img/signal.svg`,
            },
            {
                url: `${window.location.origin}/img/sync.svg`,
            },
            {
                url: `${window.location.origin}/img/users.svg`,
            },
            {
                url: `${window.location.origin}/img/graduation-cap.svg`,
            },
            {
                url: `${window.location.origin}/img/thumbs-up.svg`,
            },
        ];

        if (UserService.isAuthenticated()) {
            window.location = '/myclasses/';
        }

        return (
            <div className="landingPage">
                {/* modal dialog */}
                {(() => {
                    switch (this.state.modalDialogClass) {
                        case "logIn":
                            return <LogIn className="modal-dialog" onUsername={this.onHandleChangeUsername}
                                          cancel={this.onClickCancelModalDialog}
                                          handleNotification={this.props.handleNotification}/>;
                        case "register":
                            return <Register className="modal-dialog" onUsername={this.onHandleChangeUsername}
                                             cancel={this.onClickCancelModalDialog}
                                             handleNotification={this.props.handleNotification}
                                             schools={this.state.schools}/>;
                        default:
                            return;
                    }
                })()}
                {/* one pager content */}
                <div className="content">
                    {/* short slogan and nice background picture for the first page */}
                    <section className="content-page1">
                        <h1>WE LOVE LEARNING</h1>
                        <p>“Education is the most powerful weapon which you can use to change the world.”
                            <br/>― Nelson Mandela</p>
                    </section>
                    {/* titel of the landing page style={{backgroundImage: `url(${images[2].url})`,}}*/}
                    <section className="content-title">
                        <h1>MAIN PAGE</h1>
                    </section>
                    {/* about high 5 learning, our story */}
                    <section className="content-page2">
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
                    </section>
                    {/* about our product / service */}
                    <section className="content-page3">
                        <h1>WHAT WE OFFER</h1>
                        <div className="content-page3-offers">
                            <p><img className="icon" src={images[12].url} alt="High Five Icon"/>Modern, intuitive
                                e-learning platform</p>
                            <p><img className="icon" src={images[11].url} alt="High Five Icon"/>Creation of virtual
                                classes</p>
                            <p><img className="icon" src={images[8].url} alt="High Five Icon"/>Teachers publish multiple
                                choice homework</p>
                            <p><img className="icon" src={images[13].url} alt="High Five Icon"/>Instant feedback to
                                teachers from students</p>
                            <p><img className="icon" src={images[9].url} alt="High Five Icon"/>Statistics for teachers
                                about homework</p>
                            <p><img className="icon" src={images[10].url} alt="High Five Icon"/>Reusability of classes
                            </p>
                        </div>
                    </section>
                    {/* about our team / us */}
                    <section className="content-page4">
                        <h1>OUR TEAM</h1>
                        <div className="team">
                            {/* Andre Landgraf	Hermann Grübel	Martin Lindemann Andre Weinkötz */}
                            <div className="team-member">
                                <p><img src={images[6].url} alt="Hermann"/><br/>Hermann Grübel</p>
                            </div>
                            <div className="team-member">
                                <p><img src={images[5].url} alt="Andre"/><br/>Andre Landgraf</p>
                            </div>
                            <div className="team-member">
                                <p><img src={images[7].url} alt="Martin"/><br/>Martin Lindemann</p>
                            </div>
                            <div className="team-member" id="last-team-member">
                                <p><img src={images[4].url} alt="Andre"/><br/>Andre Weinkötz</p>
                            </div>
                        </div>
                    </section>
                </div>
                {/* transparent absolute div presenting brand name & logo */}
                <div className="head-line">
                    <div className="heading">
                        <h1><img className="icon" src={images[3].url} alt="High Five Icon"/> HIGH-FIVE LEARNING</h1>
                    </div>
                </div>
                {/* absolute div presenting login and register options */}

                {(isMobile) ?
                    <div className="mobileButtonDiv">
                        <Button
                            className="Button"
                            color="primary"
                            variant="raised"
                            onClick={this.onClickLogInButton}>Log-In</Button>
                        <Button
                            className="Button"
                            color="secondary"
                            variant="raised"
                            onClick={this.onClickRegisterButton}>Register</Button>
                    </div>
                    :
                    <div className="buttonDiv">
                        <LogInButton onClickCallback={this.onClickLogInButton} content={images[0]}/>
                        <LogInButton onClickCallback={this.onClickRegisterButton} content={images[1]}/>
                    </div>
                }
            </div>
        );
    }
}

LandingPage.proTypes = {
    handleNotification: PropTypes.func.isRequired
};