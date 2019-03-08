'use strict';
const Generator = require('yeoman-generator');
module.exports = class extends Generator {
  async prompting() {

    const prompts = [
      {
        type: 'confirm',
        name: 'folder level confirm',
        message: 'Are you in right container that contain with css|js|html folder?',
        default: true

      },
      //重新命名文件
      {
        type: 'input',
        name: 'filename',
        message: 'Please input your files name',
        default: 'index'
      },
      //网页标题设置
      {
        type: 'input',
        name: 'title',
        message: 'Please input your page title',
        default: ''
      },
      //是否使用zepto
      {
        type: 'confirm',
        name: 'useZepto',
        message: 'Do you want use library zepto',
        default: true
      },
      //是否使用微信API
      {
        type: 'confirm',
        name: 'wxApi',
        message: 'Does this page need wx Api',
        default: false
      },
    //选择开发模式
      {
        type: 'confirm',
        name: 'model',
        message: 'You are developing in Phone?',
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {//重写新建文件名
    //不再正确得目录下退出
    if(this.props.confirm === false) return;
    const fileTypes = ['html', 'css', 'js'];
    for (let len = 0; len < fileTypes.length; len++) {
      let type = fileTypes[len];
      this.fs.copyTpl(
        this.templatePath(`indexnew.${type}`),
        this.destinationPath(`${type}/${this.props.filename}.${type}`),
        {...this.props}
      );
    }
  }
  end() {
    this.log('You have created a mobile web page, coding now!');
  }
};
