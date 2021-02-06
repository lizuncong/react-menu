import React from 'react';
import './index.less';
import { TreeData } from '../typings';
import TreeNode from './tree-node';
interface Props {
    data: TreeData;
}
interface State {
    data: TreeData;
}
interface KeyNodeMap {
    [key: string]: TreeData;
}
class Tree extends React.Component<Props, State>{
    keyNodeMap: KeyNodeMap;
    constructor(props: Props){
        super(props);
        const { data } = props;
        this.state = {
            data
        }
        this.buildKeyMap();
    }
    buildKeyMap(){
        const { data } = this.state;
        this.keyNodeMap = {};
        this.keyNodeMap[data.key] = data;
        if(data.children && data.children.length > 0){
            this.walk(data.children, data);
        }
    }
    walk(children: TreeData[], parent:TreeData): void{
        children.forEach((item: TreeData) => {
            item.parent = parent;
            this.keyNodeMap[item.key] = item;
            if(item.children && item.children.length > 0){
                this.walk(item.children, item);
            }
        })
    }
    onCollapse(key: string){

    }
    render(){
        const { data } = this.props;
        console.log('this.keyNodeMap', this.keyNodeMap);
        return (
            <div className="tree">
                <div className="tree-nodes">
                    <TreeNode
                        data={data}
                        onCollapse={this.onCollapse}
                    />
                </div>
            </div>
        )
    }
}

export default Tree;
