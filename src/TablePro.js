import './App.css'
import React, {useMemo, useCallback, useState} from 'react'
import {DataSet, Table, AutoComplete, Button, CodeArea} from 'choerodon-ui/pro'
// 引入格式化器，注意使用模块的默认导出
import JSONFormatter from 'choerodon-ui/pro/lib/code-area/formatters/JSONFormatter'

const App = () => {
  const tableDS = useMemo(() => {
    return new DataSet({
      autoQuery: true, // 指定 DataSet 初始化后自动查询
      pageSize: 8, // 请求分页大小
      primaryKey: 'id', // 主键字段名，一般用作级联行表的查询字段
      name: 'user', // 对应后端接口，自动生成约定的 submitUrl, queryUrl...
      dataKey: 'content', // 数据对象名，默认值 'rows'
      // DataSet 中包含的字段，对应上述后端数据中每条记录中的字段
      fields: [
        {
          name: 'id', 
          type: 'number'
        },
        {
          name: 'name', 
          type: 'string', 
          label: '姓名',
          help: '主键，区分用户',
          unique: true,
          required: true
        },
        {
          name: 'age',
          type: 'number',
          label: '年龄',
          help: '用户年龄，可以排序',
          max: 100,
          main: 1,
          step: 1
        },
        {
          name: 'sex', 
          type: 'string', 
          label: '性别', 
          lookupUrl: 'https://www.fastmock.site/mock/423302b318dd24f1712751d9bfc1cbbc/mock/EMPLOYEE_GENDER',
          computedProps: {
            required: ({record}) => record.get('age') > 18
          }
        },
        {
          name: 'email',
          type: 'string',
          label: '邮箱',
          help: '用户邮箱，可以自动补全'
        },
        {
          name: 'code', 
          type: 'string', 
          label: '编码'
        },
        {
          name: 'startDate',
          type: 'date',
          label: '加入日期'
        },
        {
          name: 'active', 
          type: 'boolean', 
          label: '状态'
        }
      ],
      queryFields: [
        {
          name: 'name',
          type: 'string',
          label: '姓名',
        },
        {
          name: 'age',
          type: 'number',
          label: '年龄',
          max: 100,
          step: 1,
        },
        {
          name: 'email',
          type: 'string',
          label: '邮箱',
          help: '用户邮箱，可以自动补全',
        }
      ],
      //接口自定义配置
      transport: {
        //查询请求的axios配置或url字符串
        read: {
          url: 'https://www.fastmock.site/mock/423302b318dd24f1712751d9bfc1cbbc/mock/guide/user',
          method: 'GET'
        }
      },
      //DS事件回调
      events: {
        load: ({dataSet}) => {
          console.log('加载完成', dataSet)
        }
      }
    })
  }, [])

  const emailOptionDS = useMemo(() => {
    return new DataSet({
      fields: [
        {
          name: 'value',
          type: 'string'
        },
        {
          name: 'meaning',
          type:'string'
        }
      ]
    })
  }, [])

  const handleValueChange =useCallback((v) => {
    const {value} = v.target
    const suffixList = ['@qq.com', '@163.com', '@hand-china.com']
    if(value.indexOf('@') !== -1) {
      //如果输入值中包含@不配置数据，自定义输入
      emailOptionDS.loadData([])
    }else {
      emailOptionDS.loadData(
        suffixList.map((suffix) => ({
          value: `${value}${suffix}`,
          meaning: `${value}${suffix}`
        }))
      )
    }
  }, [emailOptionDS])

  //表格列配置
  const columns = useMemo(() => {
    return [
      {
        name: 'name', 
        editor: true
      },
      {
        name: 'age', 
        editor: true, 
        sortable: true
      },
      {
        name: 'sex', 
        editor: true
      },
      {
        name: 'email', 
        editor: () => {
          return (
            <AutoComplete
              onFocus={handleValueChange}
              onInput={handleValueChange}
              options={emailOptionDS}
            />
          )
        }
      },
      {
        name: 'code', 
        editor: true
      },
      {
        name: 'startDate', 
        editor: true
      },
      {
        name: 'active', 
        editor: true
      }
    ]
  }, [])

  const [consoleValue, setConsoleValue] = useState('');
  const toDataButton = (
    <Button onClick={() => setConsoleValue(tableDS.toData())}>
      toData
    </Button>
  );
  const toJSONDataButton = (
    <Button onClick={() => setConsoleValue(tableDS.toJSONData())}>
      toJSONData
    </Button>
  );
  const setQueryParamButton = (
    <Button onClick={() => tableDS.setQueryParameter('customPara', 'test')}>
      setQueryParameter
    </Button>
  );

  return (
    <div style={{width: 1200, padding: 100}}>
      <h1>C7N prop Table</h1>
      <Table 
        queryBar="professionalBar"
        queryFieldsLimit={2}
        dataSet={tableDS}
        columns={columns}
        buttons={['add', 'query', 'save', 'delete', 'reset', toDataButton, toJSONDataButton, setQueryParamButton]}
      />
      <CodeArea
        style={{ height: 280 }}
        formatter={JSONFormatter}
        value={JSON.stringify(consoleValue)}
      />
    </div>
    
  )
}
export default App;