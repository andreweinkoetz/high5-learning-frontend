import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/es/Typography/Typography";
import Divider from "@material-ui/core/es/Divider/Divider";
import TextField from "@material-ui/core/es/TextField/TextField";
import UserService from "../services/UserService";
import Button from "@material-ui/core/es/Button/Button";


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

    handleChangePassword2 = (event) => {
        this.setState({confirmPassword: event.target.value, noMatch: event.target.value !== this.state.password});
    };

    handleSubmit = () => {
        UserService.changePassword(this.state.password).then(token => {
            if (UserService.isAuthenticated()) {
                this.setState({password: '', confirmPassword: ''});
                this.props.handleException({
                    title:'Password changed',
                    msg: 'The password of your account has been successfully changed!',
                    variant: 'info'
                })
            } else {
                this.props.handleException({
                    code: 500,
                    title: 'Changing password failed',
                    msg: 'Password could not be changed, please try again.'
                })
            }
        }).catch((e) => {
            this.props.handleException(e);
        });
    };

    render() {

        return (
            <div>
                <Grid container spacing={16}>
                    <Grid item xs={12}>
                        <Typography variant={'title'}>My profile</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Username"
                            disabled
                            value={this.state.username}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            helperText="Required"
                            type="password"
                            required={true}
                            onChange={this.handleChangePassword}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Confirm password"
                            helperText="Required"
                            type="password"
                            error={this.state.noMatch}
                            required={true}
                            onChange={this.handleChangePassword2}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            disabled={this.state.noMatch || (this.state.password === '' || this.state.confirmPassword === '')}
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