import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/es/Typography/Typography";
import Divider from "@material-ui/core/es/Divider/Divider";
import TextField from "@material-ui/core/es/TextField/TextField";
import UserService from "../services/UserService";
import Button from "@material-ui/core/es/Button/Button";


// View to display a password reset for a single user
export default class MyProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            noMatch: false
        };

    }

    componentWillMount() {
        this.setState({
            username: UserService.getCurrentUser().username
        })
    };

    componentDidMount() {
        this.props.updateBreadcrumb([
            {
                link: '/myprofile',
                linkName: 'My profile'
            }
        ])
    };

    handleChangePassword = (event) => {
        this.setState({password: event.target.value, noMatch: event.target.value !== this.state.confirmPassword});
    };

    handleChangePassword2 = (event) => { // needed for confirmation textfield
        this.setState({confirmPassword: event.target.value, noMatch: event.target.value !== this.state.password});
    };

    handleSubmit = () => {
        if(!this.state.confirmPassword){
            this.props.handleNotification({
                title:'Confirmation needed',
                msg: 'Please enter your new password in both fields!',
                variant: 'warning'
            });
            return;
        }

        if(this.state.noMatch){
            this.props.handleNotification({
                title:'Passwords do not match',
                msg: 'The password you entered for confirmation does not match your password.',
                variant: 'warning'
            });
            return;
        }

        UserService.changePassword(this.state.password).then(() => {
            if (UserService.isAuthenticated()) {
                this.setState({password: '', confirmPassword: ''});
                this.props.handleNotification({
                    title:'Password changed',
                    msg: 'The password of your account has been successfully changed!',
                    variant: 'success'
                })
            } else {
                this.props.handleNotification({
                    code: 500,
                    title: 'Changing password failed',
                    msg: 'Password could not be changed, please try again.'
                })
            }
        }).catch((e) => {
            this.props.handleNotification(e);
        });
    };

    render() {

        return (
            <div>
                <Grid container spacing={16} justify={'center'}>
                    <Grid item xs={12} style={{minHeight:56}}>
                        <Typography variant={'title'}>My profile</Typography>
                        <Typography variant={'caption'}>Here you can change your password</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Username"
                            disabled
                            fullWidth
                            value={this.state.username}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            value={this.state.password}
                            label="New password"
                            helperText="Required"
                            type="password"
                            required={true}
                            onChange={this.handleChangePassword}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            value={this.state.confirmPassword}
                            label="Confirm new password"
                            helperText="Required"
                            type="password"
                            error={this.state.noMatch}
                            required={true}
                            onChange={this.handleChangePassword2}
                        />
                    </Grid>
                    <Grid item xs={12} style={{textAlign:'center'}}>
                        <Button
                            className="Button"
                            color="primary"
                            variant="raised"
                            onClick={this.handleSubmit}
                        >Change password</Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}