import React, {PropTypes as type} from 'react';
import SideBar from '../SideBar';
import s from './Editor.less';

const Editor = ({node}) => {

    return (
        <SideBar>

        </SideBar>
    );
};

Editor.propTypes = {
    node: type.object
};

export default Editor;

