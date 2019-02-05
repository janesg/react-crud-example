import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {

    // Long-hand approach setting each property separately    
    // renderInput = (formProps) => {
    //     return (
    //         <input 
    //             value={ formProps.input.value }
    //             onChange={ formProps.input.onChange } 
    //         />
    //     );    
    // }

    // Much reduced syntax for the above using destructuring & spread 
    // - label property is passed through from the Field definition
    // - meta property has info about field including error messages
    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        
        return (
            <div className={ className }>
                <label>{ label }</label>
                <input { ...input } autoComplete="off" />
                { this.renderError(meta) }
            </div>
        );
    }
    
    // meta property destructured as required
    renderError = ({ error, touched }) => {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{ error }</div>
                </div>
            );
        }
    }
    
    // Using redux-form we don't need to handle events or preventDefault
    onSubmit = (formValues) => {
        // console.log(formValues);
        this.props.onSubmit(formValues);
    }
    
    render() {
        // We have to add class name of error to form to have error messages show up
        return (
            <form onSubmit={ this.props.handleSubmit(this.onSubmit) } className="ui form error">
                {/* Properties (such as label) that are unknown to the Field are passed to component */} 
                <Field name="title" component={ this.renderInput } label="Enter Title" />
                <Field name="description" component={ this.renderInput } label="Enter Description" />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = formValues => {
    const errors = {};
    
    if (!formValues.title) {
        errors.title = 'You must enter a title';
    }
    
    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }
    
    return errors;
}

export default reduxForm({ 
    form: 'streamForm',
    validate
})(StreamForm);
