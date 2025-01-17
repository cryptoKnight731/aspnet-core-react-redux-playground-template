﻿import * as React from 'react';
import { AuthStatusEnum } from '../../store/auth/types';

type AuthenticatorProps = {
    authStatus?: string;
    runResultTime?: number;
    successDispatcher: Function;
    failDispatcher: Function;
};

type AuthenticatorState = typeof initialState;

const initialState = Object.freeze({
    show: false
});

export default class Authenticator extends React.PureComponent<AuthenticatorProps, AuthenticatorState> {
    static defaultProps = {
        runResultTime: 2500,
        authStatus: AuthStatusEnum.None as string
    };

    constructor(props: AuthenticatorProps) {
        super(props);
        this.state = initialState;
    }

    public componentWillReceiveProps(nextProps: AuthenticatorProps): void {
        const nextAuthStatus = nextProps.authStatus || AuthStatusEnum.None;
        const authStatusChanged = nextAuthStatus !== this.props.authStatus;

        if (!authStatusChanged)
            return;

        if (nextAuthStatus.isIn(AuthStatusEnum.Success, AuthStatusEnum.Fail)) {
            setTimeout(() => {
                if (nextAuthStatus === AuthStatusEnum.Success) {
                    this.props.successDispatcher();
                } else {
                    this.props.failDispatcher();
                }
            }, this.props.runResultTime);
        } else {
            this.setState({
                show: (nextAuthStatus === AuthStatusEnum.Process)
            });
        }
    }

    public render(): React.ReactNode {
        return this.state.show ? this.renderAuthAnimation() : null;
    }

    private renderAuthAnimation(): React.ReactNode {
        return (
            <div className={`atom-loader ${this.props.authStatus}`}>
                <div></div>
                <div></div>
            </div>
        );
    }
}