import React from 'react';
import Header from '../../component/Header';
import s from './Core.less';
import '../../styles/core.less';

export const CoreLayout = ({ children }) => (
    <div className={s.root}>
        <Header />
        <div className={s.viewport}>
            {children}
        </div>
    </div>
);

CoreLayout.propTypes = {
    children : React.PropTypes.element.isRequired
};

export default CoreLayout
