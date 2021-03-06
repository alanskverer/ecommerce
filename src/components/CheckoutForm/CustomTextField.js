import React from 'react';
import { useFormContext, Controller, SetVa } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';

const FormInput = ({ name, label, required }) => {
    const { control } = useFormContext();
    const isError = false;

    return (
        <Grid item xs={12} sm={6}>
            {/* <Controller
                as={TextField}
                name={name}
                control={control}
                label={label}
                fullWidth
                required={required}
                error={isError}
            /> */}
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <TextField
                        fullWidth
                        label={label}
                        required={required}
                        name={name}


                    />
                )}
            />
        </Grid>
    );
}

export default FormInput;