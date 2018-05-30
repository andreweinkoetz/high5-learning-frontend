import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
// this was not included, why? https://material-ui.com/getting-started/installation/
const styles = theme => ({
    root: {
        minWidth: 400,
        float: 'left',
        clear: 'none',
        marginLeft: '10px',
        marginRight: '10px',
    },
    image: {
        position: 'relative',
        height: 200,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '4px solid currentColor',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
});

function ButtonBases(props) {
    const {classes} = props;
    const onClickCallback = props.onClickCallback;
    const content = props.content;
    return (
        <div className={classes.root}>
            <ButtonBase
                onClick={onClickCallback}
                focusRipple
                key={content.title}
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{
                    width: content.width,
                }}
            >
          <span
              className={classes.imageSrc}
              style={{
                  backgroundImage: `url(${content.url})`,
              }}
          />
                <span className={classes.imageBackdrop}/>
                <span className={classes.imageButton}>
            <Typography
                component="span"
                variant="subheading"
                color="inherit"
                className={classes.imageTitle}
            >
              {content.title}
                <span className={classes.imageMarked}/>
            </Typography>
          </span>
            </ButtonBase>
        </div>
    );
}

ButtonBases.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonBases);