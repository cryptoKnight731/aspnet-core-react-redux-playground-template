import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import { RouteComponentProps } from 'react-router-dom';
import { actionCreators, reducer } from '../store/form';
import { DROPDOWN_TEST_DATA } from '../config/constants';
import { Checkbox, Dropdown } from '../components/controls';

type FormProps = ReturnType<typeof reducer> & typeof actionCreators & RouteComponentProps<{}>;

class Form extends React.PureComponent<FormProps> {
    public render(): React.ReactNode {
        return (
            <section className='section'>
                <div className='container is-centered box'>
                    <div className='columns form-columns'>
                        { this.renderCounterGroup() }
                        { this.renderDropdownGroup() }
                        { this.renderCheckboxGroup() }
                    </div>
                </div>
            </section>
        );
    }

    private renderCounterGroup(): React.ReactNode {
        return (
            <div className='column is-4'>
                <h3 className='title is-4'>Counter</h3>
                <h5 className='subtitle is-5'>Simple example of a React component</h5>
                <p className='subtitle is-5'>Current count: <strong>{this.props.count}</strong></p>
                <div className='field is-grouped'>
                    <p className='control'>
                        <button className='button is-danger' onClick={() => { this.props.decrement(); }}>
                            <span className='icon'>
                                <i className='fa fa-minus'></i>
                            </span>
                            <span>Decrement</span>
                        </button>
                    </p>
                    <p className='control'>
                        <button className='button is-success' onClick={() => { this.props.increment(); }}>
                            <span className='icon'>
                                <i className='fa fa-plus'></i>
                            </span>
                            <span>Increment</span>
                        </button>
                    </p>
                </div>
            </div>
        );
    }

    private renderDropdownGroup(): React.ReactNode {
        return (
            <div className='column is-4'>
                <h3 className='title is-4'>Dropdown</h3>
                <h5 className='subtitle is-5'>Select an option from the dropdown</h5>
                <p className='subtitle is-5'>Option: <strong>{JSON.stringify(this.props.selectedDropdownOption)}</strong></p>
                <div className='field is-grouped'>
                    <div className='control'>
                        <Dropdown options={DROPDOWN_TEST_DATA}
                                  labelKey='label'
                                  selectedOptionLabel={this.props.selectedDropdownOption.label}
                                  parentClass='normal-width'
                                  dispatchHandler={this.props.selectOption} />
                    </div>
                </div>
            </div>
        );
    }

    private renderCheckboxGroup(): React.ReactNode {
        return (
            <div className='column is-4'>
                <h3 className='title is-4'>Checkbox</h3>
                <h5 className='subtitle is-5'>Toggle the checkbox</h5>
                <p className='subtitle is-5'>Checked: <strong>{this.props.checkboxValue.toString()}</strong></p>
                <div className='field is-grouped'>
                    <Checkbox dispatchHandler={this.props.doCheck}
                              checked={this.props.checkboxValue} />
                </div>
            </div>
        );
    }
}

// Wire up the React component to the Redux store
export default connect((state: ApplicationState) => state.form, actionCreators)(Form);