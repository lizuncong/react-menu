import React from 'react';
import { TreeData } from '../typings';
import file from '../../assets/file.png';
import closedFolder from '../../assets/folder-close.png';
import openedFolder from '../../assets/file-open.png';
import loadingSrc from '../../assets/loading.png';

interface Props {
    data: TreeData;
    onCollapse: any;
    onCheck: any;
}

class TreeNode extends React.Component<Props>{
    constructor(props: Props){
        super(props);
    }

    render(){
        const { data: { name, loading, children, key, collapsed, checked }, onCollapse, onCheck, } = this.props;
        let caret;
        let icon;
        if(children){
            if(children.length > 0){
                caret = (
                    <span
                        className={`collapse ${collapsed ? 'caret-right' : 'caret-down'}`}
                        onClick={() => onCollapse(key)}
                    >
                    </span>
                )
                icon = collapsed ? closedFolder : openedFolder
            } else {
                caret = null;
                icon = file;
            }
        } else {
            caret = loading ?
                <img className="collapse" style={{ width: 14, top: '50%', marginTop: -7}} src={loadingSrc} alt=""/> :
                (
                <span
                    className={`collapse caret-right`}
                    onClick={() => onCollapse(key)}
                >
                </span>
            )
            icon = closedFolder;
        }
        return (
            <div className="tree-node">
                <div className="inner">
                    {caret}
                    <span className="content">
                        <input
                            type="checkbox"
                            checked={!!checked}
                            onChange={() => {
                                onCheck(key)
                            }}
                        />
                        <img style={{ width: '20px'}} src={icon} alt=""/>
                        {name}
                    </span>
                </div>
                {
                    children && children.length > 0 && !collapsed && (
                        <div className="children">
                            {
                                children.map((item: TreeData, index:number) => (
                                    <TreeNode
                                        onCollapse={onCollapse}
                                        onCheck={onCheck}
                                        data={item}
                                        key={item.key}
                                    />
                                ))
                            }
                        </div>
                    )
                }
            </div>
        )
    }
}


export default TreeNode
