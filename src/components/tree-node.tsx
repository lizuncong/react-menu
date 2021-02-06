import React from 'react';
import { TreeData } from '../typings';
import file from '../../assets/file.png';
import closedFolder from '../../assets/folder-close.png';
import openedFolder from '../../assets/file-open.png';

interface Props {
    data: TreeData;
    onCollapse: any;
}

class TreeNode extends React.Component<Props>{
    constructor(props: Props){
        super(props);
    }

    render(){
        const { data: { name, children, key, collapsed }, onCollapse} = this.props;
        let caret;
        let icon;
        if(children){
            if(children.length > 0){
                caret = (
                    <span
                        className={`collapse caret-right`}
                        onClick={onCollapse(key)}
                    >
                    </span>
                )
            }
        } else {
            caret = (
                <span
                    className={`collapse caret-right`}
                    onClick={onCollapse(key)}
                >
                </span>
            )
            icon = closedFolder;
        }
        return (
            <div className="tree-node">
                <div className="inner">
                    {}
                    <span className="content">{name}</span>
                </div>
                {
                    children && children.length > 0 && (
                        <div className="children">
                            {
                                children.map((item: TreeData, index:number) => (
                                    <TreeNode
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
