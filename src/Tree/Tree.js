import React from 'react';
import TreeDS from './DataSet';
import { DataSet, Tree } from 'choerodon-ui/pro';
import '../App.css'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.treeDataSet = new DataSet(TreeDS);
	}	
	
	nodeRenderer({ record }) {
		return record.get('text');
	}
	
	render() {
		return (
			<Tree
				dataSet={this.treeDataSet}
				// 这个标定Tree中的字段是否可选
				checkable
				// 这个用来覆盖Tree本身的节点渲染
				renderer={this.nodeRenderer}
			/>
		)
	}
}
export default App;