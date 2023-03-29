import {DataSet} from 'choerodon-ui/pro';
import SexOptionDataSet from './sexOptionDataSet';
import LanguageOptionDataSet from './languageOptionDataSet';
const sexOptionDataSet = new DataSet(SexOptionDataSet);
const languageOptionDataSet = new DataSet(LanguageOptionDataSet);
const FormDataSet = {
  // DataSet 不和后端交互时，自动新建一条数据
  autoCreate: true,
  fields: [
      // 这里是与后端约定的，上传时用到的字段
      {name: 'phone', type: 'string', label: '手机号', pattern: '1[0-9]{10}', required: true},
      {name: 'password', type: 'string', label: '密码'},
      {name: 'confirmPassword', type: 'string', label: '确认密码', required: true, validator: (value, name, record) => {
        if (value !== record.get('password')) {
            return '您两次输入的密码不一致，请重新输入';
        }
        return true;
      }},
      {name: 'age', type: 'number', label: '年龄', required: true},
      // textField指的是下层的options中被指定用于显示选项名称的字段，这里我们已经定成text了
      // 同理，valueField 指下层options中被指定用于传输给后端的值，这里我们指定为value
      {name: 'sex', type: 'string', label: '性别', textField: 'text', valueField: 'value', options: sexOptionDataSet, required: true},
      {name: 'language', type: 'string', label: '语言', textField: 'text', valueField: 'value', options: languageOptionDataSet, required: true},
      {name: 'email', type: 'string', label: '邮箱', required: true},
      {name: 'homePage', type: 'string', label: '个人主页', required: true},
      {name: 'birth', type: 'date', label: '生日', required: true},
  ],
  transport: {
      // 创建时 DataSet 将会调用的方法
      // create / read / update / destroy 都可以等量替换成函数，create涉及到上传新创建的数据，因此需要用到data
      create: ({ data, params, dataSet }) => {
          console.log(data+" ", params+" ", dataSet.toJSONData());
          return ({
              // url: 'v1/projects/${projectId}',
              // method: 'post',
              // data,
          })
      }
  },
  events: {
      load: ({ dataSet }) => {
          console.log('加载完成', dataSet)
      }
  }
};
export default FormDataSet;