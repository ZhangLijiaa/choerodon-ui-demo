const DataSet = {
  primaryKey: 'id',
  queryUrl: '/tree.mock',
  autoQuery: true,
// 实现Tree数据平铺转嵌套的关键
  parentField: 'parentId',
  idField: 'id',
// 布尔值，收集哪个Tree节点被展开了
  expandField: 'expand',
  fields: [
    { name: 'id', type: 'number' },
    { name: 'expand', type: 'boolean' },
    { name: 'parentId', type: 'number' },
  ],
  transport: {
    read: {
      url: 'https://www.fastmock.site/mock/423302b318dd24f1712751d9bfc1cbbc/mock/tree',
      method: 'post',
    }
  },
  events: {
  // 这里新增的事件与下面的checkable配合，当一个节点被选中时，就会触发下面的事件
    select: ({ record, dataSet }) => console.log('select', record, dataSet),
    unSelect: ({ record, dataSet }) => console.log('unSelect', record, dataSet),
  },
};
export default DataSet;