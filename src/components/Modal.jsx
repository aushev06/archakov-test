import React, {useState, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";

import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const TYPES = {name: "name", surname: 'surname', email: 'email', phone: 'phone'};

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: "absolute",
        backgroundColor: theme.palette.background.paper,
        borderRadius: '5px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        left: "50%",
    },

    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: "100%",
    },

    flexBox: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    h3Title: {
        color: "#455A64",
        fontSize: "16px",
        fontWeight: "bold",
        lineHeight: "17px",
    },

    description: {
        color: "#99ABB4",
        fontSize: "14px",
        fontWeight: "500",
        lineHeight: "15px",
        marginBottom: "30px",
    }

}));

export default function SimpleModal({fields}) {
    const classes = useStyles();

    // state
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [fieldTypes, setFieldTypes] = useState(TYPES);

    // methods
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const showTablePreview = () => {
        let outputObject = {};

        fields.forEach((item, key) => {
            outputObject = {...outputObject, [item.type]: key}
        })
        console.log(outputObject)
        alert(JSON.stringify(outputObject))
    }


    return (
        <div>
            <Button style={{marginTop: 15}} variant="contained" onClick={handleOpen}>
                Show Modal
            </Button>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
                className={"MuiDialog-scrollPaper"}
            >
                <div style={modalStyle} className={classes.paper}>
                    <div className="MuiDialogTitle-root" id="alert-dialog-title"><h2
                        className="MuiTypography-root MuiTypography-h6">Import Customers Base</h2>
                    </div>

                    <div>
                        <h3 className={classes.h3Title}>
                            Fields from uploaded CSV file
                        </h3>
                        <p className={classes.description}>Please choose correct columns
                            and click Show Table Preview to see your imported data.
                            <br/>
                            <a href="/">Send us your base
                                file</a> and we'll import it ourselves if you have any problems with that.
                        </p>
                    </div>

                    {fields && fields.map((field, key) => {
                        return (
                            <div key={key} style={{marginTop: 15}} className={classes.flexBox}>
                                <TextField
                                    label={`Field ${key + 1}`}
                                    defaultValue={field.value}
                                    variant="outlined"
                                    style={{width: '100%'}}
                                />

                                <FormControl variant="filled" className={classes.formControl}>
                                    <Select
                                        style={{width: "100%"}}
                                        labelId="demo-simple-select-filled-label"
                                        id="demo-simple-select-filled"
                                        value={(field.type == "") ? "empty" : field.type}
                                        onChange={() => {
                                        }}
                                    >
                                        <MenuItem value={"empty"}>
                                            Choose Column
                                        </MenuItem>

                                        {Object.keys(fieldTypes).map((fieldType, idx) => {
                                            return (
                                                <MenuItem  style={{width: '100%'}} value={fieldType}
                                                          key={`${fieldType} - ${idx}`}>
                                                    {fieldType}
                                                </MenuItem>
                                            )
                                        })}

                                    </Select>
                                </FormControl>

                            </div>
                        )
                    })}

                    <Button style={{width: '100%'}} variant="outlined"  color="primary" onClick={showTablePreview}>
                        Show Table Preview
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
