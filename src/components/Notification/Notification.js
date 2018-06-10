import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import blue from '@material-ui/core/colors/blue';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import {withStyles} from '@material-ui/core/styles';

/*
    Short description of the usage of the notification object in this component:
    To provide a message via this component, you simply need to call handleNotification (via props or this.props)
    and provide an notification object in the following form:

    notification: {
                title: // String,
                code: // Number - will only be displayed when variant === 'error',
                msg: // String and if multiline: separated with commas,
                variant: // Enum, one of ['warning', 'error', 'info', 'success']
            }
 */

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const styles = theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: blue[600],
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
    messageContent: {
        display: 'block',
        alignItems:'center'
    }
});

function NotificationContent(props) {
    const {classes, className, onClose, variant, ...other} = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={classNames(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)}/>
                    <span className={classes.messageContent}>{props.notification.title}{variant === 'error' ? ` (${props.notification.code})` : null}<br/>
                    {props.notification.msg.split(',').map((val,k) => <div key={k}>{val}<br key={k}/></div>)}
                    </span>
        </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={onClose}
                >
                    <CloseIcon className={classes.icon}/>
                </IconButton>,
            ]}
            {...other}
        />
    );
}

NotificationContent.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    notification: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['warning', 'error', 'info', 'success']).isRequired,
};

const NotificationContentWrapper = withStyles(styles)(NotificationContent);

function Notification(props) {

    const variant = props.notification.variant ? props.notification.variant : 'error';

    return <Snackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        open={props.visible}
        autoHideDuration={6000}
        onClose={props.closeDialog}
    >
        <NotificationContentWrapper
            onClose={props.closeDialog}
            variant={variant}
            notification={props.notification}
        />
    </Snackbar>


}

export default Notification;
