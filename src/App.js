import './App.css';
import React, { useMemo } from 'react';
import { DataSet, Table } from 'choerodon-ui/pro';

const App = () => {
  const tableDS = new DataSet({
      // 指定 DataSet 初始化后自动查询
      autoQuery: true,
      // 请求分页大小
      pageSize: 8,
      // 主键字段名，一般用作级联行表的查询字段
      primaryKey: 'id',
      // 对应后端接口，自动生成约定的 submitUrl, queryUrl...
      name: 'user',
      // 数据对象名，默认值 'rows'
      dataKey: 'content',
      // DataSet 中包含的字段，对应上述后端数据中每条记录中的字段
      fields: [
          { name: 'id', type: 'number' },
          { name: 'name', type: 'string', label: '姓名', help: '主键，区分用户', unique: true, required: true },
          { name: 'code', type: 'string', label: '编码' },
          { name: 'sex', type: 'string', label: '性别', computedProps: { required: ({ record }) => record.get('age') > 18 }},
          { name: 'active', label: '状态', type: 'boolean' },
          // { name: 'age', type: 'number', label: '年龄', help: '用户年龄，可以排序', max: 100, min: 1, step: 1 },
          // { name: 'email', type: 'string', label: '邮箱', help: '用户邮箱，可以自动补全' },
          // { name: 'startDate', type: 'date', label: '加入日期' }
      ],
      // 接口自定义配置
      transport: {
          // 查询请求的 axios 配置或 url 字符串
          read: {
              url: 'https://www.fastmock.site/mock/423302b318dd24f1712751d9bfc1cbbc/mock/guide/user',
              method: 'GET',
          }
      },
      // DS 事件回调
      events: {
          load: ({ dataSet }) => {
              console.log('加载完成', dataSet)
          }
      }
  });
  
  // 表格列配置
  const columns = useMemo(()=>{
    return [
      { name: 'name', editor:true  },
      { name: 'sex', editor:true },
      { name: 'code', editor:true  },
      { name: 'active', editor:true  },
      // { name: 'email', editor:true },
      // { name: 'age', editor: true, sortable: true },
      // { name: 'startDate', editor: true },
    ];
  }, []);
  return (
    <div style={{ width: 1200, padding: 100 }}>
      <h1>C7N Pro Table</h1>
      <Table
        dataSet={tableDS}
        columns={columns}
      />
    </div>
  );
};
export default App;