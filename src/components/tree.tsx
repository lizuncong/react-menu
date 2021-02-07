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
        this.onCollapse = this.onCollapse.bind(this);
        this.onCheck = this.onCheck.bind(this);
        this.state = {
            data
        }
    }
    componentDidMount(): void {
        this.buildKeyMap();
    }

    buildKeyMap(): void{
        const { data } = this.state;
        this.keyNodeMap = {};
        this.keyNodeMap[data.key] = data;
        if(data.children && data.children.length > 0){
            this.walk(data.children, data);
        }
        this.setState({ data })
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
    onCollapse(key: string): void{
        const data = this.keyNodeMap[key];
        if(data){
            const { children } = data;
            if(children){
                data.collapsed = !data.collapsed;
                data.children = data.children || [];
                // this.buildKeyMap();
                this.setState({ data: this.state.data })
            } else {
                data.loading = true;
                this.setState({
                    data: this.state.data
                })
                setTimeout(() => {
                    data.children = [
                        {
                            name: data.name + '的儿子1',
                            key: `${data.key}-1`,
                            type: 'folder',
                            collapsed: true,
                        },
                        {
                            name: data.name + '的儿子2',
                            key: `${data.key}-2`,
                            type: 'folder',
                            collapsed: true
                        }
                    ]
                    data.loading = false;
                    data.collapsed = false;
                    this.buildKeyMap();// 重新构建，重要的一步
                    this.setState({ data: this.state.data})
                }, 2000)
            }

        }
    }
    onCheck(key:string): void{
        const data = this.keyNodeMap[key];
        if(data){
            data.checked = !data.checked;
            if(data.checked){
                this.checkAllChildren(data.children, true);
                this.checkParent(data.parent); // 如果一个节点，它所有的子节点都被选中了，自己也要被选中
            } else {
                this.checkAllChildren(data.children, false);
                this.unCheckParent(data.parent);
            }
            this.setState({ data: this.state.data})
        }
    }
    unCheckParent(parent: TreeData):void{
        while (parent){
            parent.checked = false;
            parent = parent.parent;
        }
    }
    checkParent(parent: TreeData):void{
        while (parent){
            parent.checked = parent.children.every((item: TreeData) => item.checked)
            parent = parent.parent;
        }
    }
    checkAllChildren(children: TreeData[] = [], checked: boolean):void{
        children.forEach((item: TreeData) => {
            item.checked = checked;
            this.checkAllChildren(item.children, checked)
        })
    }
    render(){
        const { data } = this.props;
        console.log('this.keyNodeMap', this.keyNodeMap);
        return (
            <div className="tree">
                <div className="tree-nodes">
                    <TreeNode
                        onCheck={this.onCheck}
                        data={data}
                        onCollapse={this.onCollapse}
                    />
                </div>
            </div>
        )
    }
}

export default Tree;
